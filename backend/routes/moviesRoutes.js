import express from "express";
const router = express.Router();

// Controllers
import {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  movieReview,
  deleteMovie,
  deleteComment,
  getNewMovies,
  getTopMovies,
  getRandomMovies,
} from "../controllers/movieController.js";
// Middlewares
import { authenticated, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

// Public Routes
router.get("/all-movies", getAllMovies);
router.get("/specific-movie/:id", getSpecificMovie);
router.get("/new-movies", getNewMovies);
router.get("/top-movies", getTopMovies);
router.get("/random-movies", getRandomMovies);

// Restricted Routes
router.post("/:id/reviews", authenticated, checkId, movieReview);

// Admin
router.post("/create-movie", authenticated, authorizeAdmin, createMovie);
router.put("/update-movie/:id", authenticated, authorizeAdmin, updateMovie);
router.delete("/delete-movie/:id", authenticated, authorizeAdmin, deleteMovie);
router.delete("/delete-comment", authenticated, authorizeAdmin, deleteComment);
export default router;