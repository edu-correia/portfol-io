import dotenv from "dotenv";
import app from "./app";

dotenv.config();
app.listen(3334, () => console.log("Server is running..."));