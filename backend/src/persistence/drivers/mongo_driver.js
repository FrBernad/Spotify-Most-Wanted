const { MongoClient } = require("mongodb");
const debug = require('debug')('backend:server');

class MongoDriver {

    static _URI = 'mongodb://127.0.0.1:27017';
    static _DATABASE = 'spotify';
    static _COLLECTION = 'songs';

    constructor() {
        if (!MongoDriver.instance) {
            this._init = false;
            MongoDriver.instance = this;
        }

        return MongoDriver.instance;
    }

    async initConnection() {
        try {
            // Create a new MongoClient
            this._client = new MongoClient(MongoDriver._URI);

            // Connect the client to the server
            await this._client.connect();

            // Connect to db
            this._db = this._client.db(MongoDriver._DATABASE);
            debug("Connected successfully to Mongo database");

        } catch (e) {
            // Ensures that the client will close when you finish/error
            debug("Error connecting to Mongo database");
            this.closeConnection();
        }
    }

    getSongsCollection() {
        return this._db.collection(MongoDriver._COLLECTION)
    }

    async closeConnection() {
        try {
            await this._client.close();
            debug("Closed Mongo database connection")
        } catch (e) {
            debug("Error closing Mongo database connection")
        }
    }
}

const mongoDriver = new MongoDriver();
module.exports = async () => {
    if (!mongoDriver._init) {
        mongoDriver._init = true;
        await mongoDriver.initConnection();
        Object.freeze(mongoDriver);
    }
    return mongoDriver;
};
