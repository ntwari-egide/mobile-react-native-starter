const mongoose = require('mongoose')
const Joi = require("joi")
const { registerSchema } = require('swaggiffy')

const Candidate = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        nationalId: {
            type: String,
            required: true,
        },
        profileUrl: {
            type: String,
            required: true
        },
        gender: {
            type: String
        },
        missionStatement: {
            type: String
        },
        nbrOfVotes: {
            type: Number,
            default: 0
        }
    }
)

registerSchema("Candidate", Candidate, {orm: "mongoose"})

const model = mongoose.model("Candidate", Candidate)

function validateCandidate(candidate) {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(250).required(),
        secondName: Joi.string().min(3).max(250).required(),
        profileUrl: Joi.string().required(),
    });

    return schema.validate(candidate);
}

module.exports.Candidate = model;
module.exports.validateCandidate = validateCandidate;

