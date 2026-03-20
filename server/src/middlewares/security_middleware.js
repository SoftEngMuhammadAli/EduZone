const securityHeaders = (req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  next();
};

const cleanObject = (payload) => {
  if (Array.isArray(payload)) {
    return payload.map(cleanObject);
  }

  if (!payload || typeof payload !== "object") {
    return payload;
  }

  const sanitized = {};
  for (const [rawKey, value] of Object.entries(payload)) {
    // Remove keys that can trigger MongoDB operator injection.
    const key = rawKey.replace(/\$/g, "").replace(/\./g, "");
    sanitized[key] = cleanObject(value);
  }
  return sanitized;
};

const sanitizeBody = (req, _res, next) => {
  if (req.body && typeof req.body === "object") {
    req.body = cleanObject(req.body);
  }
  if (req.query && typeof req.query === "object") {
    const sanitizedQuery = cleanObject(req.query);
    for (const key of Object.keys(req.query)) {
      delete req.query[key];
    }
    Object.assign(req.query, sanitizedQuery);
  }
  next();
};

const createRateLimiter = ({ windowMs = 15 * 60 * 1000, max = 300 } = {}) => {
  const hits = new Map();

  return (req, res, next) => {
    const key = req.ip || req.headers["x-forwarded-for"] || "unknown";
    const now = Date.now();
    const record = hits.get(key) || { count: 0, start: now };

    if (now - record.start > windowMs) {
      record.count = 0;
      record.start = now;
    }

    record.count += 1;
    hits.set(key, record);

    if (record.count > max) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Please try again later.",
      });
    }

    next();
  };
};

export { securityHeaders, sanitizeBody, createRateLimiter };
