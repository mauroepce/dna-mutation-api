const Dna = require("../models/db");
const { isSquareMatrix, checkForMultipleSequences } = require("../utils/utils");


const hasMutation = async (req, res) => {

    const dnaSequence = req.body.dna;
    
    try {
        if (!dnaSequence || !Array.isArray(dnaSequence) || dnaSequence.length === 0) {
            return res.status(400).send('The dna parameter must exist or must be a non-empty array.');
        } else {
            if (!isSquareMatrix(dnaSequence)) {
                return res.status(403).send('The matrix must be square');
            } else {
            // Mutation checking
            const sequenceString = dnaSequence.join(',');
            const mutation = checkForMultipleSequences(dnaSequence);
            
            // Save to database
            const newDna = new Dna({
                sequence: sequenceString,
                hasMutation: mutation
            });

            await newDna.save();

            if (mutation) {
                res.status(200).send('Mutation detected');
            } else {
                res.status(403).send('No mutation detected');
            }
            }
        } 
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).send('This DNA sequence has already been verified.');
          } else {
            res.status(500).send('Internal Server Error');
          }
    }
}

module.exports = hasMutation;