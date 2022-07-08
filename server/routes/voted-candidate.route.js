const express = require("express")
const router = express.Router()
const mongoose = require("mongoose");
const { registerDefinition } = require("swaggiffy");
const {VotedCandidate} = require('../models/voted-candidate.model')
const {Candidate} = require('../models/candidate.model')

router.post('/register', async (req, res) => {

    try{

         

        // check if voted candidate already exists
        const votedCandidateFound = await VotedCandidate.findOne({
            user: req.body.user,
            candidate: req.body.candidate,
        })

        if(votedCandidateFound){
            return res.json({
                status: 'error',
                message: 'You are not allowed to vote again for this candidate',
            })
        }

        // check if candidate exists
        const candidate = await Candidate.findOne({
            candidate: req.body.candidate,
        })

        if(!candidate){
            return res.json({
                status: 'error',
                message: 'Candidate does not exist',
            })
        }

        // update candidate details
        candidate.nbrOfVotes = candidate.nbrOfVotes + 1
        await candidate.save()
        

        const votedCandidate = await VotedCandidate.create({
            user: req.body.user,
            candidate: req.body.candidate,
        })

        if(votedCandidate){
            res.status(201).json({
                status: 'You have voted successfully',
                data: votedCandidate,
            })
        }

        

    } catch (err){

        console.log('Error: ' + err)

        res.status(500).json({
            status: 'Error Occured',
            message: err
        })

    }

});

router.route('/get-all').get(async (req, res) => {
    try{
        const votedCandidates = await VotedCandidate.find()

        if(votedCandidates){
            res.status(200).json({
                status: '200 OK',
                data: votedCandidates,
            })
        }

       



    } catch (err){

        console.log('Error: ' + err)

        res.status(500).json({
            status: 'Error Occured',
            message: err
        })

    }
}
)

registerDefinition(router, {basePath: "/api/voted-candidates", tags: "VotedCandidate", mappedSchema: "VotedCandidate"})

module.exports = router