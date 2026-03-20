const allowedLevels = ["Beginner", "Intermediate", "Advanced"];

export const validateCreateCourseBody = (body) => {
  const errors = [];

  if (!body.title?.trim()) errors.push("Title is required.");
  if (!body.description?.trim()) errors.push("Description is required.");
  if (!body.duration?.trim()) errors.push("Duration is required.");
  if (!body.category?.trim()) errors.push("Category is required.");

  if (!allowedLevels.includes(body.level)) {
    errors.push(`Level must be one of: ${allowedLevels.join(", ")}.`);
  }

  return errors;
};
