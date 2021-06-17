import express, {Application} from "express";
import cors from "cors";

import usersRouter from "./routes/users";

class App{
    public express: Application

    public constructor(){
        this.express = express();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void{
        this.express.use(express.json());
        this.express.use(cors());
    }

    private routes(): void{
        this.express.use("/users", usersRouter);
    }
}

export default new App().express;