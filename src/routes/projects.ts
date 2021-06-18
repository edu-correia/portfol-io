import {Router} from "express";
import ProjectsController from "../controllers/projects";

const router = Router();

router.get("/", ProjectsController.index);
router.post("/", ProjectsController.create);
router.put("/:id", ProjectsController.update);
router.delete("/:id", ProjectsController.delete);

export default router;