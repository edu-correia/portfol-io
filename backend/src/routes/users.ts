import {Router} from "express";
import UsersController from "../controllers/users";

const router = Router();

router.get("/", UsersController.index);
router.post("/", UsersController.create);
router.put("/:id", UsersController.update);
router.delete("/:id", UsersController.delete);

export default router;