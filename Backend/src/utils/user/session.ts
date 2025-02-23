import jwt from 'jsonwebtoken';
import { find_user } from './create_user';

interface session_data{
    ip : string;
    id : string;
    admin: boolean;
    verified: boolean;
}

export function create_session (ip: string, id: string, isVerified: boolean, isAdmin = false) : string 
{   
    let key =  process.env.KEY?? "1234";

    return jwt.sign({ ip: ip, id: id, admin: isAdmin, verified: isVerified }, key, {
        expiresIn: '1h'
    });
}

export async function validate_session (ip: string, token: string) : Promise<boolean>
{   
    let data;
    try{
        data = jwt.verify(token, process.env.KEY??"1234");
    }
    catch(e)
    {
        return false;
    }

    data = data as session_data;

    console.log(data);

    if (data)
    {
        if (ip === data.ip)
        {
            const user = await find_user(data.id);

            return user !== null;
        }

        return false;
    }
    
    return false;
}

export function get_session_data (token: string) : session_data
{
    return jwt.decode(token) as session_data;
}