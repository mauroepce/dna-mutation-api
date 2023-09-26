const Dna = require("../models/db");

const stats = async (req, res) => {
    try {
        const countMutations = await Dna.countDocuments({ hasMutation: true });
        const countNoMutation = await Dna.countDocuments({ hasMutation: false });
        const ratio = countMutations / (countNoMutation || 1);
    
        res.json({
          count_mutations: countMutations,
          count_no_mutation: countNoMutation,
          ratio: ratio
        });
      } catch (e) {
        res.status(500).send('Error interno del servidor');
      }
}

module.exports = stats;