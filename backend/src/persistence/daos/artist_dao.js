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
        const group =
            {
                $group: {
                    "_id": "$artists",
                    "songs": {"$addToSet": "$song"},
                    "artist_popularity": {"$sum": "$song.popularity"}
                }
            };
        const project2 = {$project: {_id: 0, name: "$_id", songs: "$songs", artist_popularity: "$artist_popularity"}};
        const sort = {$sort: {artist_popularity: -1, _id: -1}};
        const offsetAndLimit = daoUtils.generateOffsetAndLimit(page, itemsPerPage);

        const pipeline = [daoUtils.project_normalization, match, project, unwind, group, project2, sort, ...offsetAndLimit];

        return await this._mongoDriver.executeAggregationQuery(pipeline);
    }

    async getMostPopularArtistsCount(country, genre) {
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

        const pipeline = [daoUtils.project_normalization, match, project, unwind, group, count];

        const result = await this._mongoDriver.executeAggregationQuery(pipeline);

        return result.length > 0 ? result[0].totalItems : 0;
    }

    async getArtistRelations(artist, itemsPerPage) {
        const relations = await this._neoDriver.executeQuery(
            `
                CALL {
                    MATCH (a:Artist)-[r1]->(s)<-[r2]-(b:Artist)
                    WHERE toLower(a.name) = toLower('${artist}')
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
            MATCH (a:Artist)
            WHERE toLower(a.name) = toLower('${artist}')
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
