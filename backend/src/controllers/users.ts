import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UsersController{
    public async index(req: Request, res: Response ): Promise<Response>{
        const result = await prisma["user"].findMany({
            select: {
                id: true,
                name: true,
                username: true,
                description: true,
                email: true,
                github: true,
                linkedin: true,
                location: true,
                image: true
            }
        });
        
        return res.status(200).json({message: "Usuários listados com sucesso", result});
    }

    public async create(req: Request, res: Response ): Promise<Response>{
        const { name, username, description, email, github, linkedin, location, image, password } = req.body;

        await prisma["user"].create({
            data: {
                name, 
                username,
                description,
                email,
                github,
                linkedin,
                location,
                image,
                password
            }
        });

        return res.status(201).json({message: "Usuário criado com sucesso!"});
    }

    public async update(req: Request, res: Response ): Promise<Response>{
        const { name, username, description, email, github, linkedin, location, image, password } = req.body;
        const {id} = req.params;

        await prisma["user"].update({
            data: {
                name, 
                username,
                description,
                email,
                github,
                linkedin,
                location,
                image,
                password
            },
            where: {
                id: Number(id)
            }
        });

        return res.status(200).json({message: "Usuário atualizado com sucesso!"});
    }

    public async delete(req: Request, res: Response ): Promise<Response>{
        const {id} = req.params;

        await prisma["user"].delete({
            where: {
                id: Number(id)
            }
        });

        return res.status(200).json({message: "Usuário excluído com sucesso!"});
    }
}

export default new UsersController();