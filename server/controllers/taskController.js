import Task from "../models/Task.js";

/**
 * @desc    Get all tasks for the logged-in user
 * @route   GET /api/tasks
 * @access  Private
 */
export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new task for the logged-in user
 * @route   POST /api/tasks
 * @access  Private
 */
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    // Input validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    if (title.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Title must be at least 3 characters long",
      });
    }

    const task = await Task.create({
      user: req.user._id,
      title: title.trim(),
      description: description.trim(),
      status,
    });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a task by ID (only if owned by user)
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
export const updateTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    // Input validation
    if (title && title.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Title must be at least 3 characters long",
      });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        ...(title && { title: title.trim() }),
        ...(description && { description: description.trim() }),
        ...(status && { status }),
      },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a task by ID (only if owned by user)
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};
