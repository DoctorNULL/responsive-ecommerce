import { Request, Response } from "express";
import { create_user, find_user_by_username } from "../utils/user/create_user";
import { createHash } from 'crypto';
import { create_session, get_session_data } from "../utils/user/session";
import { verify_user } from "../utils/user/user_data";

export async function create_user_handle (req: Request, res: Response)
{
    const name = req.body.fullname;
    const user = req.body.username;
    const pass = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone;

    if (name && user && pass && email)
    {
        if (await create_user(name, user, pass, email, phone))
        {
            res.json("Success");
        }
        else
        {
            res.json("User Exisits");
        }
    }
    else
    {
        res.json("Invalid Request");
    }
}

export async function login_handle (req: Request, res: Response)
{
    const user = req.body.username;
    const pass = req.body.password;
    
    if (user && pass)
    {
        const data = await find_user_by_username(user);

        if (data)
        {
            const hash = createHash("sha256").update(pass).digest("base64");

            if (hash === data.password)
            {
                const session = create_session(req.ip?? "No IP", data.id, data.is_verified, data.is_admin);

                if (data.is_verified)
                {
                    res.json({status: "Success", session: session});
                }
                else
                {
                    res.json({status: "Not Verified", session: session});
                }
            }
            else 
            {
                res.json("Invalid Auth");
            }
        }
        else
        {
            res.json("Invalid Auth");
        }
    }
    else
    {
        res.json("Invalid Request");
    }
}

export async function verify_handle (req: Request, res: Response)
{
    const token = get_session_data(req.body.token??"");
    const code = req.body.code;

    if (code)
    {
        if (await verify_user(token.id, code))
        {
            res.json("Verified");
        }
        else
        {
            res.json("Invalid Code");
        }
    }
    else
    {
        res.json("Invalid Request");
    }
}