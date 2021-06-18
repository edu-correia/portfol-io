import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface PhotosInterface{
    link: string;
    caption: string;
} 

class ProjectsController{
    public async index(req: Request, res: Response ): Promise<Response>{
        const result = await prisma["project"].findMany({
            include: {
                photos: true
            }
        });
        
        return res.status(200).json({message: "Projetos listados com sucesso", result});
    }

    public async create(req: Request, res: Response ): Promise<Response>{
        const { name, repo, description, link, photos, userId } = req.body;

        const {id: projectId} = await prisma["project"].create({
            data: {
                name, 
                repo, 
                description, 
                link, 
                userId
            }
        });

        const photosList = photos.map(({link, caption}: PhotosInterface) => {
            return {link, caption, projectId};
        });

        await prisma["photo"].createMany({
            data: photosList
        });

        return res.status(201).json({message: "Projeto criado com sucesso!"});
    }

    public async update(req: Request, res: Response ): Promise<Response>{
        const { name, repo, description, link, userId } = req.body;
        const {id} = req.params;

        await prisma["project"].update({
            data: {
                name, 
                repo, 
                description, 
                link, 
                userId
            },
            where: {
                id: Number(id)
            }
        });

        return res.status(200).json({message: "Projeto atualizado com sucesso!"});
    }

    public async delete(req: Request, res: Response ): Promise<Response>{
        const {id} = req.params;

        await prisma["project"].delete({
            where: {
                id: Number(id)
            }
        });

        return res.status(200).json({message: "Projeto excluído com sucesso!"});
    }
}

export default new ProjectsController();