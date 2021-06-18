import {Router} from "express";
import PhotosController from "../controllers/photos";

const router = Router();

router.get("/", PhotosController.index);
router.post("/", PhotosController.create);
router.put("/:id", PhotosController.update);
router.delete("/:id", PhotosController.delete);

export default router;