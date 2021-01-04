const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const scandidateSearchRecord = new Schema(
  {
    searchdedBy: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    successfullSearch: {
      type: Boolean,
      required: false,
    },
    totalRecords: {
      type: Number,
      required: false,
    },
    typeOfSearch: {
      type: String,
      required: false,
    },
    userInputData: {
      type: Object,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ScandidateSearchReord",
  scandidateSearchRecord
);
