const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    posts:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userschema);
