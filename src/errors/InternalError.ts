class InternalError extends Error{
    constructor(
        public message: string, 
        public status: number, 
        public description: string = "Algo deu errado! Por favor tente novamente mais tarde!"
    ){
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default InternalError;