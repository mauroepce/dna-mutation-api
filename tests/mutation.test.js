const request = require('supertest');
const app = require('../app');  

describe('POST /mutation', () => {

  // Case: Mutation detected
  it('should return 200 when mutation is detected', async () => {
    const res = await request(app)
      .post('/mutation')
      .send({
        dna: ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
      });
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Mutation detected');
  });

  // Case: No mutation detected
  it('should return 403 when no mutation is detected', async () => {
    const res = await request(app)
      .post('/mutation')
      .send({
        dna: ["ATGCGA","CAGTGC","TTATGT","AGAACG","CCTCTA","TCACTG"]
      });
    expect(res.statusCode).toEqual(403);
    expect(res.text).toEqual('No mutation detected');
  });

  // Case: The matrix is ​​not square
  it('should return 403 when the matrix is not square', async () => {
    const res = await request(app)
      .post('/mutation')
      .send({
        dna: ["ATG","CAGTGC","TTA"]
      });
    expect(res.statusCode).toEqual(403);
    expect(res.text).toEqual('The matrix must be square');
  });

  // Case: Missing or incorrect parameter
  it('should return 400 when the dna parameter is missing or incorrect', async () => {
    const res = await request(app)
      .post('/mutation')
      .send({});
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual('The dna parameter must exist or must be a non-empty array.');
  });

  // Case: DNA sequence already verified
  // Note: This case assumes that you have already made a request with the same DNA sequence
  it('should return 409 when the DNA sequence has already been verified', async () => {
    const res = await request(app)
      .post('/mutation')
      .send({
        dna: ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
      });
    expect(res.statusCode).toEqual(409);
    expect(res.text).toEqual('This DNA sequence has already been verified.');
  });

});
