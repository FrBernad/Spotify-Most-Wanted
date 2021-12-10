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

    async getMostPopularSongsByArtist(artist, page, itemsPerPage) {
        try {
            
            const pipeline = [
                {
                    $unwind: "$co_artists", preserveNullAndEmptyArrays: true
                },
                {
                    $match: {
                        $or: [
                            { artist: artist },
                            { co_artists: artist },
                        ]
                    }
                },
                {
                    $sort: {
                        popularity: -1
                    }
                },
                {
                    $skip: page * itemsPerPage
                },
                {
                    $limit: itemsPerPage
                }
            ];

            return await mongoDriver.executeAggregationQuery(pipeline);
        } catch (error) {
            return null;
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
