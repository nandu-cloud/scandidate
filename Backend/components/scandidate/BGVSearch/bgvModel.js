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
    bgvSearchExpireDate:{
      type:Date,
      required:false
    },
    bgvSearchedId: { type: Schema.Types.ObjectId, required: false },
    adharNumber: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required:false,
    },
    dateOfBirth: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },


  },
  { timestamps: true }
);

module.exports = mongoose.model("ScandidateSearchCount", scandidateSearchCount);
