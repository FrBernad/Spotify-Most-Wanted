const neo4j = require('neo4j-driver')
const debug = require('debug')('backend:server');

class NeoDriver {

    static _URI = 'neo4j://127.0.0.1:7687';
    static _DATABASE = 'neo4j';

    constructor() {
        if (!NeoDriver.instance) {
            this._init = false;
            NeoDriver.instance = this;
        }

        return NeoDriver.instance;
    }

    async initConnection() {
        try {
            // Create a new NeoClient
            this._client = neo4j.driver(NeoDriver._URI, null);

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
        let result;
        try {
            result = await session.readTransaction(tx =>
                tx.run(query, variables)
            )
        } catch (error) {
            debug(`unable to execute Neo query. ${error}`)
        } finally {
            await session.close()
            return result.records;
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
    if (!neoDriver._init) {
        neoDriver._init = true;
        await neoDriver.initConnection();
        Object.freeze(neoDriver);
    }
    return neoDriver;
};
