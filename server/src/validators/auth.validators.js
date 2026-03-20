const isEmail = (value = "") =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());

export const validateRegisterBody = (body) => {
  const errors = [];
  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const password = String(body.password || "");

  if (!name || name.length < 2) {
    errors.push("Name must be at least 2 characters.");
  }

  if (!isEmail(email)) {
    errors.push("A valid email is required.");
  }

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters.");
  }

  return errors;
};

export const validateLoginBody = (body) => {
  const errors = [];
  const email = body.email?.trim().toLowerCase();
  const password = String(body.password || "");

  if (!isEmail(email)) {
    errors.push("A valid email is required.");
  }

  if (!password) {
    errors.push("Password is required.");
  }

  return errors;
};
