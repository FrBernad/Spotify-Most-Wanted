const debug = require('debug')('backend:server');
const daoUtils = require('@persistence/daos/utils/dao_utils');


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

    async getMostPopularArtists(country, genre, page, itemsPerPage) {

        try {

            const match = daoUtils.generateMatch(null, country, genre);
            const project =
                {
                    $project: {
                        _id: 0,
                        artists: {$setUnion: [["$artist"], "$co_artists"]},
                        song: {title: "$title", popularity: "$popularity", uri: "$uri", album: "$album"}
                    }
                };
            const unwind = {$unwind: "$artists"};
            const group = {$group: {"_id": "$artists", "songs": {"$addToSet": "$song"}}};
            const project2 = {$project: {_id: 0, name: "$_id", songs: "$songs"}};
            const sort = {$sort: {name: 1}};
            const offsetAndLimit = daoUtils.generateOffsetAndLimit(page, itemsPerPage);

            const pipeline = [match, project, unwind, group, project2, sort, ...offsetAndLimit];

            return await this._mongoDriver.executeAggregationQuery(pipeline);

        } catch (error) {
            debug(error);
            return null;
        }
    }

    async getMostPopularArtistsCount(country, genre) {
        try {
            const match = daoUtils.generateMatch(null, country, genre);
            const project =
                {
                    $project: {
                        _id: 0,
                        key: {$setUnion: [["$artist"], "$co_artists"]},
                        value: {title: "$title", popularity: "$popularity", uri: "$uri", album: "$album"}
                    }
                };
            const unwind = {$unwind: "$key"};
            const group = {$group: {"_id": "$key", "songs": {"$addToSet": "$value"}}};
            const count = {$count: "totalItems"};

            const pipeline = [match, project, unwind, group, count];

            const result = await this._mongoDriver.executeAggregationQuery(pipeline);
            return result[0].totalItems;

        } catch (error) {
            debug(error);
            return null;
        }
    }

    async getArtitstCollab(artist, page, itemsPerPage){
        try{
            const collabs = await this._neoDriver.executeQuery(`MATCH (a:Artist{name:\'${artist}\'}\) CALL{\
                WITH a\
                MATCH (a)-[r1:MAIN_ARTIST]->(s)<-[r2:CO_ARTIST]-(b)\
                RETURN DISTINCT b\
                UNION\
                WITH a\
                MATCH (a)-[r1:CO_ARTIST]->(s)<-[r2:CO_ARTIST]-(b)\
                RETURN DISTINCT b\
                UNION\
                WITH a\
                MATCH (a)-[r1:CO_ARTIST]->(s)<-[r2:MAIN_ARTIST]-(b)\
                RETURN DISTINCT b\
                }\
                RETURN b.name SKIP ${page * itemsPerPage} LIMIT ${itemsPerPage}`);
            let toReturn = [];
            collabs.map((record)=>{toReturn.push(record._fields)});
            return toReturn;
        } catch (error){
            debug(error);
            return null;
        }

    }

    async getArtitstCollabCount(artist){
        try{
            const count = await this._neoDriver.executeQuery(`MATCH (a:Artist{name:\'${artist}\'}\) CALL{\
                WITH a\
                MATCH (a)-[r1:MAIN_ARTIST]->(s)<-[r2:CO_ARTIST]-(b)\
                RETURN DISTINCT b\
                UNION\
                WITH a\
                MATCH (a)-[r1:CO_ARTIST]->(s)<-[r2:CO_ARTIST]-(b)\
                RETURN DISTINCT b\
                UNION\
                WITH a\
                MATCH (a)-[r1:CO_ARTIST]->(s)<-[r2:MAIN_ARTIST]-(b)\
                RETURN DISTINCT b\
                }\
                RETURN COUNT(b.name)`);

            // const collabs = await this._neoDriver.executeQuery(`MATCH (n:Artist) RETURN n LIMIT 25`);

            // var aNumber = count.toInt();
            // if (this._neoDriver.integer.inSafeRange(count)) {
            //     aNumber = count.toNumber()
            //   }else{
            //       aNumber = count.toString();
            //   }
            return count[0]['_fields'].toString();
        } catch (error){
            debug(error);
            return null;
        }

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
