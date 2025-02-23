import crypto from 'crypto';

export function generate_code (size : number = 6) : string
{
    return crypto.randomBytes(size/2).toString("hex");
}