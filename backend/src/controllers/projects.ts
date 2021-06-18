import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface PhotosInterface{
    link: string;
    caption: string;
} 

class ProjectsController{
    public async index(req: Request, res: Response ): Promise<Response>{

        const projects = await prisma["project"].findMany({
            include: {
                photos: true,
                projectLanguages: {
                    include: {
                        language: true
                    }
                }
            }
        });
        
        return res.status(200).json({message: "Projetos listados com sucesso", projects});
    }

    public async create(req: Request, res: Response ): Promise<Response>{
        const { name, repo, description, link, photos, languages, userId } = req.body;

        const {id: projectId} = await prisma["project"].create({
            data: {
                name, 
                repo, 
                description, 
                link, 
                userId
            }
        });

        //Create initial photos
        const photosList = photos.map(({link, caption}: PhotosInterface) => {
            return {link, caption, projectId};
        });

        await prisma["photo"].createMany({
            data: photosList
        });

        //Create inital languages
        const languagesList = languages.map((languageId: number) => {
            return { projectId, languageId };
        });

        await prisma["projectLanguage"].createMany({
            data: languagesList
        });

        return res.status(201).json({message: "Projeto criado com sucesso!"});
    }

    public async update(req: Request, res: Response ): Promise<Response>{
        const { name, repo, description, link, languages } = req.body;
        const {id} = req.params;

        //Updating the project
        await prisma["project"].update({
            data: {
                name, 
                repo, 
                description, 
                link
            },
            where: {
                id: Number(id)
            }
        });

        //Getting the current languages relations
        const linkedLanguages = await prisma["projectLanguage"].findMany({
            where: {
                projectId: Number(id)
            },
            select: {
                languageId: true
            }
        });

        const linkedLanguagesIDs = linkedLanguages.map(lang => lang.languageId);

        //Filtering the new relations from the current ones
        const languagesToAdd = languages.filter((id: number) => !linkedLanguagesIDs.includes(id));

        //Filtering the current relations from the old ones
        const languagesToRemove = linkedLanguagesIDs.filter((id: number) => !languages.includes(id));

        //Creating the new relations
        const toAddList = languagesToAdd.map((languageId: number) => {
            return { projectId: Number(id), languageId };
        });

        await prisma["projectLanguage"].createMany({
            data: toAddList
        });

        //Deleting the old relations
        for (const lang of languagesToRemove) {
            await prisma["projectLanguage"].delete({
                where: {
                    projectId_languageId: {
                        projectId: Number(id),
                        languageId: lang
                    }  
                }
            });
        }

        return res.status(200).json({message: "Projeto atualizado com sucesso!"});
    }

    public async delete(req: Request, res: Response ): Promise<Response>{
        const {id} = req.params;

        await prisma["photo"].deleteMany({
            where: {
                projectId: Number(id)
            }
        });

        await prisma["projectLanguage"].deleteMany({
            where: {
                projectId: Number(id)
            }
        });

        await prisma["project"].delete({
            where: {
                id: Number(id)
            }
        });

        return res.status(200).json({message: "Projeto excluído com sucesso!"});
    }
}

export default new ProjectsController();