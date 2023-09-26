const server = require('./app');
const dbConnect = require('./config/mongo');
require('dotenv').config();

const port = process.env.PORT || 3001;

server.listen(port, () => {
    console.log(`Api listening on PORT: ${port}`)
})

dbConnect();