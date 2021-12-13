const {MongoClient} = require("mongodb");
const debug = require('debug')('backend:server');

class MongoDriver {

    static _COLLECTION = 'songs';
    static _URI = 'mongodb://127.0.0.1:27017';
    static _DATABASE = 'spotify';

    constructor() {
        if (!MongoDriver.instance) {
            this._isInitialized = false;
            MongoDriver.instance = this;
        }

        return MongoDriver.instance;
    }

    async _init() {
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
            await this.closeConnection();
        }
    }

    async executeFindQuery(query, options) {
        debug("Executing find query with:\nquery:\n\t" + query + "\noptions:\n\t" + options)

        const results = this._db.collection(MongoDriver._COLLECTION).find(query, options);
        return await results.toArray()
    }

    async executeAggregationQuery(pipeline) {
        debug("Executing aggregation query with pipeline:\n\t" + JSON.stringify(pipeline));

        const results = this._db.collection(MongoDriver._COLLECTION).aggregate(pipeline);
        return await results.toArray()
    }

    async closeConnection() {
        try {
            await this._client.close();
            debug("Closed Mongo database connection");
        } catch (e) {
            debug("Error closing Mongo database connection");
        }
    }
}

const mongoDriver = new MongoDriver();
module.exports = async () => {
    if (!mongoDriver._isInitialized) {
        mongoDriver._isInitialized = true;
        await mongoDriver._init();
        Object.freeze(mongoDriver);
    }
    return mongoDriver;
};
