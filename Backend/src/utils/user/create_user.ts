import { PrismaClient, User } from "@prisma/client";
import { createTransport } from "nodemailer";
import { generate_code } from "../common/common";
import { createHash } from 'crypto';

export async function create_user(name: string, username:string,
     password: string, email: string, phone: string | null) : Promise<boolean>
{
    const prisma = new PrismaClient();
    
    if (await find_user_by_email(email))
    {
        await prisma.$disconnect();
        return false;
    }
    
    if (phone)
    {        
        if (await find_user_by_phone(phone))
        {
            await prisma.$disconnect();
            return false;
        }
    }

    const code = generate_code();
    const hash = createHash("sha256").update(password).digest("base64");

    try{

        await prisma.user.create({
            data: {
                email: email,
                fullname: name,
                password: hash,
                username: username,
                phone: phone,
                code: code
            }
        });

        sendCode(email, name, code);

    }catch (Exception)
    {
        await prisma.$disconnect();
        return false;    
    }

    await prisma.$disconnect();
    return true;
}


export async function find_user_by_email(email:string) : Promise<User | null>
{
    const prisma = new PrismaClient();

    const data = await prisma.user.findFirst({where: {email: email}});

    await prisma.$disconnect();

    return data;
}

export async function find_user_by_username(username:string) : Promise<User | null>
{
    const prisma = new PrismaClient();

    const data = await prisma.user.findFirst({where: {username: username}});

    await prisma.$disconnect();

    return data;
}

export async function find_user(id:string) : Promise<User | null>
{
    const prisma = new PrismaClient();

    const data = await prisma.user.findFirst({where: {id: id}});

    await prisma.$disconnect();

    return data;
}

export async function find_user_by_phone(phone:string) : Promise<User | null>
{
    const prisma = new PrismaClient();

    const data = await prisma.user.findFirst({where: {phone: phone}});

    await prisma.$disconnect();

    return data;
}

function sendCode (email: string, name: string, code: string) : boolean
{
    const sender = createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.CODE
        }
    });

    const message = `Hi ${name},
        Someone is trying to access your account,
        We would like to confirm this operation so we have sent this code to you,

        ${code}

        Use this code to confirm your account and use it wisely and do NOT share it with anyone
        
        
        Bestwises,
        ${process.env.APPNAME??"Our"} team.
    `;

    let res = true;

    sender.sendMail({
        to: email,
        text: message,
        subject: "Verification Code"
    },
    
    (error, info) => {
        if (error)
            res = false;
    });

    return res;
}