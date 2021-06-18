interface FileInterface{
    path: string;
    filename: string;
}

declare namespace Express {
    export interface Request {
        file?: FileInterface
    }
}