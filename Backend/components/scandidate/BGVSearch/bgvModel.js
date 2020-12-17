const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const scandidateSearchCount = new Schema(
  {
    searchedById: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    bgvSearchCount: {
      type: Number,
      required: false,
    },
    bgvSearchedDate: {
      type: Date,
      required: false,
    },
    bgvSearchedId: [{ type: Schema.Types.ObjectId, required: false }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ScandidateSearchCount", scandidateSearchCount);
