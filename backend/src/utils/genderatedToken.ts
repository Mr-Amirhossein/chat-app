import jwt from "jsonwebtoken";
import type { Response } from "express";

export const genderatedToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, //prevent xss cross site scripting
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "strict", //CSRF attack cross-site request forgery
    secure: process.env.NODE_ENV !== "development", //https
  });
  return token;
};

export default genderatedToken;
