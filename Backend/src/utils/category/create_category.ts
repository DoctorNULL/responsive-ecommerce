import { PrismaClient } from "@prisma/client";

export async function create_category(name:string) : Promise<boolean> 
{
    const prisma = new PrismaClient();

    const data = await find_category_by_name(name);

    if (data)
    {
        await prisma.$disconnect();
        return false;
    }

    await prisma.category.create({data: {name: name}});

    await prisma.$disconnect();

    return true; 
}

export async function find_category_by_name(name:string) : Promise<number | undefined>
{
    const prisma = new PrismaClient();

    const data = await prisma.category.findFirst({where: {name: name}, select: {id: true}});

    await prisma.$disconnect();

    return data?.id;
}

export async function find_category(id: number) : Promise<string | undefined>
{
    const prisma = new PrismaClient();

    const data = await prisma.category.findFirst({where: {id: id}, select: {name: true}});

    await prisma.$disconnect();

    return data?.name;
}

export async function change_category_name(category:number, name: string) : Promise<boolean>
{
    const prisma = new PrismaClient();

    try{
        prisma.category.update({
            data:{
                name: name
            },
            where: {
                id: category
            }
        });
    }
    catch(e)
    {
        
        await prisma.$disconnect();
        return false;
    }

    await prisma.$disconnect();

    return true;
}