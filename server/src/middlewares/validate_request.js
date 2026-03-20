const validateRequest = (schema) => (req, res, next) => {
  const issues = schema(req.body || {});
  if (issues.length) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: issues,
    });
  }
  return next();
};

export default validateRequest;
