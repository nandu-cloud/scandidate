const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statecitySchema = new Schema({
    stateName: {
        type: Array,
    },
    city: {
        type: Array,
    },
    district: {
        type: Array,
    }
});

module.exports = mongoose.model("State", statecitySchema);