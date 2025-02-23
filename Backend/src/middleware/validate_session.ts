import { Request, Response, NextFunction } from "express";
import { validate_session } from "../utils/user/session";

export async function validate_session_middleware(req:Request, res: Response, next: NextFunction)
{
    const token = req.body.token;
    const ip = req.ip;

    if (ip && token)
    {
        if (await validate_session(ip, token))
        {
            next();
        }
        else
        {
            res.json("Invalid Session");
        }
    }
    else
    {
        res.json("Invalid Request");
    }
}