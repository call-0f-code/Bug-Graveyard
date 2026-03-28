import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },
    passwordHash: {
      type: String,
      required: function () {
        return !this.authProviders?.github?.githubId;
      }
    },
    authProviders: {
      github: {
        githubId: {
          type: String,
          unique: true,
          sparse: true
        },
        username: String,
        profileUrl: String
      }
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
    },

    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED", "BANNED"],
      default: "ACTIVE"
    },
    stats: {
      bugsPosted: { type: Number, default: 0 },
      bugsSolved: { type: Number, default: 0 },
      solutionAccepted: {type: Number , default: 0},
      coinsEarned: { type: Number, default: 0 },
      coinsSpent: { type: Number, default: 0 },
      successRate: { type: Number, default: 0 }
    },
    badges: [
      {
        badgeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Badge"
        },

        name: String,          
        description: String,   
        awardedAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

export default User;