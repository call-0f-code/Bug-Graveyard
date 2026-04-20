const mongoose = require('mongoose');
 
const bugSchema = new mongoose.Schema(
  {
    title:
    {
      type:String,
      required:true,
      trim:true
    },
    description: 
    {
      type: String,
      required: true
    },
    techStack: 
    [{
      type: String,
      lowercase: true,
      trim: true
    }],
    tags: 
    [{
      type: String,
      lowercase: true,
      trim: true
    }],
    difficulty: 
    {
      type: String,
      enum: ["EASY", "MEDIUM", "HARD"],
      index: true
    },
    reward: 
    {
      type: Number,
      required: true,
      min: 1
    },
    status: 
    {
      type: String,
      enum: ["OPEN", "SOLVED", "CLOSED"],
      default: "OPEN",
      index: true
    },
    ownerId: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true
    },
    acceptedSolutionId: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Solution"
    },
    solutionCount: 
    {
      type: Number,
      default: 0
    },
    github: 
    {
      repoUrl: String,
      filePath: String,
      issueUrl: String
    },
    deadline: Date,
    isRewardLocked: 
    {
      type: Boolean,
      default: true
    },
    isAbusive: 
    {
      type: Boolean,
      default: false
    },
    refundProcessed: 
    {
      type: Boolean,
      default: false
    }
},
{
    timestamps: true
}
);
module.exports = mongoose.model('Bug',bugSchema);