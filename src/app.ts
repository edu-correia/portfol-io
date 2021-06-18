import express, { Application } from "express";
import cors from "cors";

import usersRouter from "./routes/users";
import languagesRouter from "./routes/languages";

import Error from "./errors/errors";

class App{
    public express: Application

    public constructor(){
        this.express = express();
        this.middlewares();
        this.routes();
        this.errors();
    }

    private middlewares(): void{
        this.express.use(express.json());
        this.express.use(cors());
    }

    private routes(): void{
        this.express.use("/users", usersRouter);
        this.express.use("/languages", languagesRouter);
    }

    private errors(): void{
        this.express.use(Error.notFound);
        this.express.use(Error.defaultError);
    }
}

export default new App().express;