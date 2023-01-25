import { Router } from "express";
import { body } from "express-validator";
import { isAuthenticated } from "../middlewares";
import { userController } from "../controllers";
import { noteController } from "../controllers/noteController";

const router = Router();

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 32 }),
  userController.register
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);

router.get("/noteNames", isAuthenticated, noteController.getNoteNames);
router.post(
  "/notes",
  isAuthenticated,
  body("id").isString(),
  body("title").isString(),
  noteController.createNote
);
router.get("/notes", isAuthenticated, noteController.getNote);
router.put("/notes", isAuthenticated, noteController.updateNote);
router.delete("/notes", isAuthenticated, noteController.deleteNote);

export default router;
