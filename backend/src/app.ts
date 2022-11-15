import express, {Express} from "express";
import session from "express-session"
import sequelize from "./middlewares/database"
import {Request, Response, NextFunction } from "express"
import accessRoutes from "./routes/accessRoutes"
import authRoutes from "./routes/authRoutes"
import dotenv from "dotenv"
const app: Express = express();

declare module 'express-session' {
  interface SessionData {
     user: { [key: string]: any };
     isLoggedIn: boolean
   } 
}

dotenv.config()
app.use(express.json());
app.use(
  session({ secret: "session-secret", resave: false, saveUninitialized: false })
);
app.use(accessRoutes);
app.use(authRoutes);
app.use((req, res, next) => {
  console.log(req)
})
app.use((err: any, req: Request, res:Response, next : NextFunction) => {
  console.log(err.message)
  res.status(400).json(err.message);
});

sequelize.sync().then(() => {
  app.listen(8080);
});

//https://documenter.getpostman.com/view/19514705/2s8YmEz6Th
