const Bug = require("../models/Bug");
const Vector = require("../models/Vector");
const { cosineSimilarity } = require("../utils/similarityScore");

exports.getSimilarBugs = async (req, res) => {
  try {
    const bugId = req.params.id;
    
    const currentVectorDoc = await Vector.findOne({ bugId });

    if (!currentVectorDoc) {
      return res.status(404).json({ message: "Vector not found" });
    }
    const currentVector = currentVectorDoc.vector;
    const allVectors = await Vector.find({ bugId: { $ne: bugId } });
    const similarities = allVectors.map((item) => ({
      bugId: item.bugId,
      score: cosineSimilarity(currentVector, item.vector)
    }));
    const top5 = similarities
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    const bugs = await Bug.find({
      _id: { $in: top5.map(i => i.bugId) }
    });
    const bugMap = new Map();
    bugs.forEach(b => bugMap.set(b._id.toString(), b));

    const finalRecommendations = top5.map(item => {
      const bug = bugMap.get(item.bugId.toString());
      if (!bug) return null;
      return {
        ...bug.toObject(),
        similarityScore: item.score
      };
    }).filter(Boolean);
    res.json({
      recommendations: finalRecommendations
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching recommendations" });
  }
};