import {Router} from "express";
import ImagesController from "../controllers/images";
import upload from "../middlewares/imageUpload";

const router = Router();

router.post("/", upload.single("file"), ImagesController.upload);

export default router;