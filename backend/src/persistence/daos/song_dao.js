class SongsDao {

    constructor() {
        if (!SongsDao.instance) {
            this._isInitialized = false;
            SongsDao.instance = this;
        }

        return SongsDao.instance;
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

}

const songsDao = new SongsDao();
module.exports = async () => {
    if (!songsDao._isInitialized) {
        songsDao._isInitialized = true;
        await songsDao._init();
        Object.freeze(songsDao);
    }
    return songsDao;
};
