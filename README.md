# DNA Mutation API

This is a DNA Mutation API, built with Node.js and MongoDB, that detects if a human has a mutation based on their DNA sequence.

## Prerequisites

- Node.js
- MongoDB
- npm

## Installation

1. Clone the repository:
    ```bash
    git clone git@github.com:mauroepce/dna-mutation-api.git
    ```

2. Navigate to the project directory:
    ```bash
    cd dna-mutation-api
    ```

3. Install the required packages:
    ```bash
    npm install
    ```

4. Copy `.env.example` to `.env` and fill in the environment variables:
    ```bash
    cp .env.example .env
    ```

5. Start the MongoDB service if it's not already running.

## MongoDB URIs

In the `.env` file, you need to provide two MongoDB URIs:

- `DB_URI`: This will be the URI for the production database.
- `TEST_DB_URI`: This will be the URI for testing purposes (mandatory).

Example:

```bash
MONGO_URI=mongodb://username:password@your-prod-server/db-name
TEST_DB_URI=mongodb://username:password@your-test-server/test-db-name
```

## Running the Application

You have two options for running the application:

- Run the application using Node.js:
    ```bash
    npm start
    ```
  
- Or, if you want to run the application during development with live-reload, use nodemon:
    ```bash
    npm run dev
    ```

When you start the application, it will also establish a connection to MongoDB.

### Note
The server will start listening on the port defined in your `.env` file or fallback to `3001` by default. You should see a message saying `Api listening on PORT: <port>` where `<port>` will be the port number.

## Usage

The API has two endpoints:

1. For mutation detection:

    ```
    POST /mutate
    ```

    #### Request Payload

    The payload should be a JSON object containing an array of DNA sequences:

    ```json
    {
      "dna": ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCGCTA", "TCACTG"]
    }
    ```

    #### Response

    The API will respond with a `200 OK` status if a mutation is detected, or a `403 Forbidden` status if no mutation is detected.

2. For getting mutation statistics:

    ```
    GET /stats
    ```

    #### Response

    The API will respond with a JSON object containing the count of DNA records with mutations, the count of DNA records without mutations, and the ratio of the two:

    ```json
    {
      "count_mutations": 40,
      "count_no_mutation": 100,
      "ratio": 0.4
    }
    ```

## Contributing

If you find any bugs or have a feature request, please open an issue on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.