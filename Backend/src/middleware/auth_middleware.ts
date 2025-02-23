import { Request, Response, NextFunction } from "express";
import { get_session_data, validate_session } from "../utils/user/session";

export async function is_verified_middleware(req:Request, res: Response, next: NextFunction)
{
    const token = req.body.token;

    if (token)
    {
        const data = get_session_data(token);

        if (data.verified)
            next();
        else
        {
            res.json("Not Verified");
        }
    }
    else
    {
        res.json("Invalid Request");
    }
}

export async function is_admin_middleware(req:Request, res: Response, next: NextFunction)
{
    const token = req.body.token;

    if (token)
    {
        const data = get_session_data(token);

        if (data.admin)
            next();
        else
        {
            res.json("No Authority");
        }
    }
    else
    {
        res.json("Invalid Request");
    }
}