import express from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All task routes are protected
router.use(protect);

// GET all tasks / POST create task
router.route("/").get(getAllTasks).post(createTask);

// PUT update task / DELETE task by id
router.route("/:id").put(updateTask).delete(deleteTask);

export default router;
