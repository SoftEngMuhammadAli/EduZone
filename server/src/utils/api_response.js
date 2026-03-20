export const sendSuccess = (
  res,
  {
    statusCode = 200,
    message = "Success",
    data = null,
    meta = undefined,
    success = true,
  } = {},
) => {
  const payload = { success, message };

  if (data !== null && data !== undefined) {
    payload.data = data;
  }

  if (meta) {
    payload.meta = meta;
  }

  return res.status(statusCode).json(payload);
};

export const sendError = (
  res,
  { statusCode = 500, message = "Internal Server Error", errors = undefined } = {},
) => {
  const payload = { success: false, message };

  if (errors) {
    payload.errors = errors;
  }

  return res.status(statusCode).json(payload);
};
