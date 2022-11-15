import {Request, Response, NextFunction, RequestHandler} from "express"

export default function errHandler(fn: Function) : RequestHandler {
  return function(req : Request, res : Response, next: NextFunction) {
    fn(req, res, next).catch((err: any) => next(err))
  }
}
