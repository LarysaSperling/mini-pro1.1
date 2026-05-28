import express from "express";
import { getDB } from "../db/index.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = getDB();

    const posts = await db.collection("posts").find().toArray();

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content, published } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        error: "Title and content are required",
      });
    }

    const db = getDB();

    const result = await db.collection("posts").insertOne({
      title,
      content,
      published: published ?? false,
      authorId: req.user.id,
      authorUsername: req.user.username,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "Post created successfully",
      postId: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;