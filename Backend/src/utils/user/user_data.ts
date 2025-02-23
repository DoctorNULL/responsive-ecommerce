import { PrismaClient } from "@prisma/client";
import { find_user } from "./create_user";

export async function verify_user (user: string, code: string) : Promise<boolean>
{
    const prisma = new PrismaClient();

    const data = await find_user(user);

    if (data?.code === code)
    {
        await prisma.user.update({data: {is_verified: true}, where: {id: user}});
    }
    else
    {
        return false;
    }

    await prisma.$disconnect();
    return true;
}