exports.cosineSimilarity = (A, B) => {
  let dot = 0.0;
  let normA = 0.0;
  let normB = 0.0;

  for (let i = 0; i < A.length; i++) {
    dot += A[i] * B[i];
    normA += A[i] * A[i];
    normB += B[i] * B[i];
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
};