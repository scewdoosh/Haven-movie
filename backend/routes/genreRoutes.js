import express from "express";
const router = express.Router();

// Controllers
import {
  createGenre,
  updateGenre,
  removeGenre,
  listGenres,
  readGenre,
} from "../controllers/genreController.js";

// Middlewares
import { authenticated, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticated, authorizeAdmin, createGenre);
router.route("/:id").put(authenticated, authorizeAdmin, updateGenre);
router.route("/:id").delete(authenticated, authorizeAdmin, removeGenre);
router.route("/genres").get(listGenres);
router.route("/:id").get(readGenre);

export default router;