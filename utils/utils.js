// Function to verify sequences
const checkSequence = (row, col, dx, dy, dna) => {
    let base = dna[row][col];
    
    for (let i = 1; i < 4; i++) {
    let newRow = row + i * dx;
    let newCol = col + i * dy;
    if (newRow < 0 || newRow >= dna.length || newCol < 0 || newCol >= dna[0].length) {
        return false;
    }
    
    if (dna[newRow][newCol] !== base) {
        return false;
    }
    }
    
    return true;
};

// Function to check if the matrix is ​​square
const isSquareMatrix = (matrix) => {
    const n = matrix.length;
    for (let row of matrix) {
      if (row.length !== n) {
        return false;
      }
    }
    return true;
  }
  
const checkForMultipleSequences = (dna) => {
let count = 0;

// We go through each cell of the matrix
for (let row = 0; row < dna.length; row++) {
    for (let col = 0; col < dna[row].length; col++) {
    // We check in each direction
    if (checkSequence(row, col, 1, 0, dna)) count++;  // Horizontal
    if (checkSequence(row, col, 0, 1, dna)) count++;  // Vertical
    if (checkSequence(row, col, 1, 1, dna)) count++;  // Diagonal down and right
    if (checkSequence(row, col, -1, 1, dna)) count++; // Diagonal up and right
    
    
    if (count > 1) {
        return true;
    }
    }
}
return false;
}


module.exports = {
    checkSequence,
    isSquareMatrix,
    checkForMultipleSequences
}