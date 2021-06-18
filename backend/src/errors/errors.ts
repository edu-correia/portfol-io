import { Request, Response, NextFunction } from "express";
import InternalError from "./InternalError";

class Error{
    public notFound(req: Request, res: Response, next: NextFunction): void {
        const err = new InternalError("Rota não encontrada", 404);
        next(err);
    }

    public defaultError(
        error: unknown, 
        req: Request, 
        res: Response, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next: NextFunction 
    ): Response {
        if(error instanceof InternalError){
            const {status, description, message, stack} = error;

            return res.status(status).json({
                error: message,
                description,
                stack
            });
        }
        
        return res.status(500).json(error);

    }
}

export default new Error();