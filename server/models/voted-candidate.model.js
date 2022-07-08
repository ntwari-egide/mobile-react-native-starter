const mongoose = require('mongoose')
const Joi = require("joi")
const { registerSchema } = require('swaggiffy')

const VotedCandidate = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        candidate: {
            type: mongoose.Schema.Types.ObjectId,
        }
    }
)

registerSchema("VotedCandidate", VotedCandidate, {orm: "mongoose"})

const model = mongoose.model("Voted-candidates", VotedCandidate)


module.exports.VotedCandidate = model;

