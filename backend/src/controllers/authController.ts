import errHandler from "../middlewares/errHandler";
import UserModel from "../models/userModel";
import {Request, Response, NextFunction} from "express"

export const signUp = errHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  const existingUser = await UserModel.findOne({ where: { email } });
  if (existingUser) throw new Error("user already exist");
  const user = await UserModel.create({ name, email, password });
  req.session.isLoggedIn = true;
  req.session.user = user;
  res.status(200).json({ name: user.name, email: user.email });
});

export const login = errHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  let user = await UserModel.findOne({ where: { email } });
  if (user && password === user.password) {
    user = { id: user.id, name: user.name, email: user.email };
    req.session.isLoggedIn = true;
    req.session.user = user;
    res.status(200).json({ user });
  }else {
    throw new Error("Email or password does not match")
  }
});

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy(() => {
    res.status(200).json({ message: "Logout success" });
  });
};
