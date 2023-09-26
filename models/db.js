const mongoose = require('mongoose');

const dnaSchema = new mongoose.Schema({
  sequence: { 
    type: String, 
    unique: true },
  hasMutation: Boolean
});

const Dna = mongoose.model('Dna', dnaSchema);

module.exports = Dna;
