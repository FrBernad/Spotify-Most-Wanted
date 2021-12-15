const neo4j = require('neo4j-driver')
const debug = require('debug')('backend:server');

class NeoDriver {

    static _URI = process.env.NEO4J_URI;
    static _DATABASE = process.env.NEO4J_DATABASE;
    static _USER = process.env.NEO4J_DATABASE_USER;
    static _PASSWORD = process.env.NEO4J_DATABASE_PASSWORD;

    constructor() {
        if (!NeoDriver.instance) {
            this._isInitialized = false;
            NeoDriver.instance = this;
        }

        return NeoDriver.instance;
    }

    async _init() {
        try {

            // Create a new NeoClient
            this._client = neo4j.driver(NeoDriver._URI, NeoDriver._USER ? neo4j.auth.basic(NeoDriver._USER, NeoDriver._PASSWORD) : null);

            // Verify the client connection to the server
            await this._client.verifyConnectivity();

            debug("Connected successfully to Neo database");
        } catch (e) {
            // Ensures that the client will close when you finish/error
            debug("Error connecting to Neo database:\n" + e);
            this.closeConnection();
        }
    }

    async executeQuery(query, variables) {
        const session = this._client.session();
        try {
            const result = await session.readTransaction(tx =>
                tx.run(query, variables)
            )

            await session.close()
            return result.records;
        } catch (error) {
            debug(`unable to execute Neo query. ${error}`);

            await session.close();
            throw new Error("500");
        }
    }

    async closeConnection() {
        try {
            await this._client.close();
            debug("Closed Neo database connection")
        } catch (e) {
            debug("Error closing Neo database connection")
        }
    }
}

const neoDriver = new NeoDriver();
module.exports = async () => {
    if (!neoDriver._isInitialized) {
        neoDriver._isInitialized = true;
        await neoDriver._init();
        Object.freeze(neoDriver);
    }
    return neoDriver;
};
