import {Router} from "express";
import LanguagesController from "../controllers/languages";

const router = Router();

router.get("/", LanguagesController.index);
router.post("/", LanguagesController.create);
router.put("/:id", LanguagesController.update);
router.delete("/:id", LanguagesController.delete);

export default router;