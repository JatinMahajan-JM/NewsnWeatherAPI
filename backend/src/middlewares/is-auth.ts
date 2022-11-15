import {Request, Response, NextFunction} from "express"

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.isLoggedIn) throw new Error("User authentication failed");
  next();
};
