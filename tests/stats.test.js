const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');  
const Dna = require('../models/db');
require('dotenv').config();

beforeAll(async () => {
  // Connection to a test database
  const url = process.env.TEST_DB_URI
  try {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('**Successful connection to mongoDB**')
    })
    } catch (error) {
        console.log('***Error of connection to mongoDB: ', error);
    }
});

afterEach(async () => {
  // Cleaning after each test
  await Dna.deleteMany();
});

afterAll(async () => {
  // Disconnection from the database
  await mongoose.connection.close();
});

describe('GET /stats', () => {

  it('should return 200 with mutation statistics', async () => {
    const res = await request(app).get('/stats');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('count_mutations');
    expect(res.body).toHaveProperty('count_no_mutation');
    expect(res.body).toHaveProperty('ratio');
  });

  it('should return ratio 0 when no mutations are detected', async () => {
    await new Dna({ sequence: 'AAAA,TTTT,CCCC,GGGG', hasMutation: false }).save();
    await new Dna({ sequence: 'AAAA,TTTT,CCCC,GGGG', hasMutation: false }).save();
    const res = await request(app).get('/stats');
    expect(res.statusCode).toEqual(200);
    expect(res.body.ratio).toEqual(0);
  });

  it('should return ratio 1 when all are mutations', async () => {
    await new Dna({ sequence: 'AAAA,AAAA,AAAA,AAAA', hasMutation: true }).save();
    await new Dna({ sequence: 'AAAA,AAAA,AAAA,AAAA', hasMutation: true }).save();
    const res = await request(app).get('/stats');
    expect(res.statusCode).toEqual(200);
    expect(res.body.ratio).toEqual(1);
  });

});
