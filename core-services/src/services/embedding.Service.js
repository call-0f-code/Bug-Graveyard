const axios = require("axios");

exports.getEmbedding = async (bug) => {
  try {
    const res = await axios.post(
      `${process.env.AI_SERVICE_URL}/embed`,
      {
        title: bug.title,
        description: bug.description,
        tags: bug.tags,
        techStack: bug.techStack,
        difficulty: bug.difficulty
      }
    );

    return res.data.embedding;

  } catch (err) {
    console.error("Embedding error:", err.message);
    throw err;
  }
};