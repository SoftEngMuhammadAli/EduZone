import bcrypt from "bcryptjs";
import { signAccessToken } from "./token.js";

export const hashAuthPassword = async (password) => {
  try {
    const mySalt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password, mySalt);
    return securePassword;
  } catch (error) {
    console.error("Error while hashing the password:", error);
    throw new Error("The process of hashing password is failed!");
  }
};

export const compareAndSecurePassword = async (password, hashedPassword) => {
  try {
    const isValidPassword = await bcrypt.compare(password, hashedPassword);
    return isValidPassword;
  } catch (error) {
    console.error("Error while comparing passwords:", error);
    throw new Error("The process of comparing passwords failed!");
  }
};

export const generateToken = (user) => {
  return signAccessToken(user);
};

export const formatUserResponse = (user) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    user_type: user.user_type,
    profile_picture_url: user.profile_picture_url,
    bio: user.bio,
    registration_date: user.registration_date,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
