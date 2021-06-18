import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PhotosController{
    public async index(req: Request, res: Response ): Promise<Response>{
        const result = await prisma["photo"].findMany();
        
        return res.status(200).json({message: "Fotos listadas com sucesso", result});
    }

    public async create(req: Request, res: Response ): Promise<Response>{
        const { link, caption, projectId } = req.body;

        await prisma["photo"].create({
            data: {
                link, 
                caption, 
                projectId
            }
        });

        return res.status(201).json({message: "Foto criada com sucesso!"});
    }

    public async update(req: Request, res: Response ): Promise<Response>{
        const { link, caption, projectId } = req.body;
        const {id} = req.params;

        await prisma["photo"].update({
            data: {
                link, 
                caption, 
                projectId
            },
            where: {
                id: Number(id)
            }
        });

        return res.status(201).json({message: "Foto atualizada com sucesso!"});
    }

    public async delete(req: Request, res: Response ): Promise<Response>{
        const {id} = req.params;

        await prisma["photo"].delete({
            where: {
                id: Number(id)
            }
        });

        return res.status(200).json({message: "Foto excluída com sucesso!"});
    }
}

export default new PhotosController();