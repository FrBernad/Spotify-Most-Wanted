class ArtistDao {

    constructor() {
        if (!ArtistDao.instance) {
            this._isInitialized = false;
            ArtistDao.instance = this;
        }

        return ArtistDao.instance;
    }

    async _init() {
        this._mongoDriver = await require("@persistence/drivers/mongo_driver")();
        this._neoDriver = await require("@persistence/drivers/neo_driver")();
    }

    async _executeQuery(query, variables) {
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

    async getArtists(){
        const artists = await this._neoDriver.executeQuery('MATCH (n:Artist) RETURN n LIMIT 25');
        return artists;
    }

}

const artistDao = new ArtistDao();
module.exports = async () => {
    if (!artistDao._isInitialized) {
        artistDao._isInitialized = true;
        await artistDao._init();
        Object.freeze(artistDao);
    }
    return artistDao;
};
