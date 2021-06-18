import { Request, Response } from "express";
import B2 from "easy-backblaze";
import InternalError from "../errors/InternalError";

const b2 = new B2(process.env.B2_ACCOUNT_ID, process.env.B2_APP_KEY);

class ImagesController{
    public async upload(req: Request, res: Response): Promise<void>{
        if(!req.file){
            throw new InternalError("Campo 'file' em falta!", 400);
        }

        await b2.uploadFile(req.file.path, {
            name: req.file.filename,
            bucket: "portfol-io-storage"
        }, (error: Error, file: string) => {
            if(error) throw new InternalError("Erro ao salvar imagem!", 400);

            return res.status(200).json({file});
        });
    }
}

export default new ImagesController();