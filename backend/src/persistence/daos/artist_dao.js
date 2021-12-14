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
            const sort = {$sort: {popularity: 1}};
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

                MATCH (a)-[r1:CO_ARTIST]->(s)<-[r2:CO_ARTIST]-(b)\
    async getArtistRelations(artist, itemsPerPage) {
        const relations = await this._neoDriver.executeQuery(
            `
                CALL {
                    MATCH (a:Artist{name:\'${artist}\'\})-[r1]->(s)<-[r2]-(b:Artist)
                    RETURN  a,b,s,r1,r2 LIMIT ${itemsPerPage}
                }
                WITH apoc.coll.toSet(collect(s)+collect(a)+collect(b)) as nodes, 
                apoc.coll.toSet(collect(r1)+collect(r2)) as relationships
                CALL apoc.export.json.data(nodes,relationships,null,{useTypes:true, stream: true, jsonFormat:'JSON'})
                YIELD data
                RETURN data`)

        return JSON.parse(relations[0]._fields[0] + '}');
    }

    async getArtist(artist) {
        const relations = await this._neoDriver.executeQuery(
            `
            MATCH (a:Artist{name:\'${artist}\'})
            WITH collect(a) as artist
            CALL apoc.export.json.data(artist,[],null,{useTypes:true, stream: true, jsonFormat:'JSON'})
            YIELD data
            RETURN data
            `);

        const nodes = JSON.parse(relations[0]._fields[0] + '}').nodes;
        if (nodes.length === 0) {
            return null;
        }
        return nodes[0];
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
