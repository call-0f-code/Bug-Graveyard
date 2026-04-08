const mongoose = require("mongoose");
const Bug = require("../models/Bug");
const Vector = require("../models/Vector");
const { getEmbedding } = require("../services/embedding.Service");

exports.createVector = async (req, res) => {
  try {
    const { bugId } = req.body;

    if (!bugId) {
      return res.status(400).json({ message: "bugId is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(bugId)) {
      return res.status(400).json({ message: "Invalid bugId format" });
    }

    const bug = await Bug.findById(bugId);

    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    const embedding = await getEmbedding(bug);

    const vectorDoc = await Vector.findOneAndUpdate(
      { bugId: bug._id },
      {
        bugId: bug._id,
        vector: embedding,
        modelVersion: "all-MiniLM-L6-v2",
        updatedAt: new Date(),
      },
      { upsert: true, returnDocument: "after"}
    );

    return res.status(200).json({
      message: "Vector created successfully",
      data: vectorDoc,
    });

  } catch (error) {
    console.error("VECTOR ERROR:", error);
    return res.status(500).json({ message: "Error creating vector" });
  }
};