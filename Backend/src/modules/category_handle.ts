import { Request, Response } from "express";
import { change_category_name, create_category } from "../utils/category/create_category";

export async function create_category_handle(req:Request, res: Response) 
{
    const cat = req.body.category;
    
    if (cat)
    {
        if (await create_category(cat))
        {
            res.json("Success");
        }
        else
        {
            res.json("Category Exists");
        }
    }
    else
    {
        res.json("Invalid Request");
    }
}

export async function change_category_name_handle(req:Request, res: Response) 
{
    const cat = req.body.category;
    const name = req.body.name;
    
    if (cat && name)
    {
        try
        {
            if (await change_category_name(parseInt(cat), name))
                {
                    res.json("Success");
                }
                else
                {
                    res.json("Category Exists");
                }
        }
        catch
        {
            res.json("Invalid Request");
        }
    }
    else
    {
        res.json("Invalid Request");
    }
}