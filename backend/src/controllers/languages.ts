import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class LanguagesController{
    public async index(req: Request, res: Response ): Promise<Response>{
        const result = await prisma["language"].findMany();
        
        return res.status(200).json({message: "Linguagens listadas com sucesso", result});
    }

    public async create(req: Request, res: Response ): Promise<Response>{
        const { name, color } = req.body;

        await prisma["language"].create({
            data: {
                name, 
                color
            }
        });

        return res.status(201).json({message: "Linguagem criada com sucesso!"});
    }

    public async update(req: Request, res: Response ): Promise<Response>{
        const { name, color } = req.body;
        const {id} = req.params;

        await prisma["language"].update({
            data: {
                name,
                color
            },
            where: {
                id: Number(id)
            }
        });

        return res.status(200).json({message: "Linguagem atualizada com sucesso!"});
    }

    public async delete(req: Request, res: Response ): Promise<Response>{
        const {id} = req.params;

        await prisma["language"].delete({
            where: {
                id: Number(id)
            }
        });

        return res.status(200).json({message: "Linguagem excluída com sucesso!"});
    }
}

export default new LanguagesController();