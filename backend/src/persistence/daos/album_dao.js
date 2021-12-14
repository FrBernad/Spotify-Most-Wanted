const debug = require('debug')('backend:server');
const daoUtils = require('@persistence/daos/utils/dao_utils');
const {getOrDefault} = require("@webapp/utils/request_utils");

class AlbumDao {

    constructor() {
        if (!AlbumDao.instance) {
            this._isInitialized = false;
            AlbumDao.instance = this;
        }

        return AlbumDao.instance;
    }

    async _init() {
        this._mongoDriver = await require("@persistence/drivers/mongo_driver")();
        this._neoDriver = await require("@persistence/drivers/neo_driver")();
    }

    async getMostPopularAlbumsCount(artist, country, genre) {
        const project0 = {
            $project:{
                title: {$toLower: "$title"},
                uri: "$uri",
                popularity: "$popularity",
                artist: {$toLower: "$artist"},
                artist_followers: "$artist_followers",
                co_artists:{
                    $map:{
                        input: "$co_artists",
                        as: "co_artist",
                        in:{$toLower: "$$co_artist"}
                    }
                }, 
                genre: {$toLower: "$genre"},
                countries: {
                    $map:{
                        input: "$countries",
                        as: "country",
                        in:{$toLower: "$$country"}
                    }
                },
                album: {$toLower: "$album"},
                release_date: "$release_date",
                tempo: "$tempo"
            }
        }
        const match = daoUtils.generateMatch(artist, country, genre);
        const project1 = {
            $project: {
                _id: 0,
                album: {albumName: "$album", by: "$artist"},
                value: {
                    title: "$title",
                    popularity: "$popularity",
                    uri: "$uri",
                    artists: {$setUnion: [["$artist"], "$co_artists"]}
                }
            }
        };
        const group = {$group: {"_id": "$album", "songs": {"$addToSet": "$value"}}};

        const count = {$count: "totalItems"};

        const pipeline = [project0, match, project1, group, count];

        const result = await this._mongoDriver.executeAggregationQuery(pipeline);

        return result.length > 0 ? result[0].totalItems : 0;
    }

    async getMostPopularAlbums(artist, country, genre, page, itemsPerPage) {
            const project0 = {
                $project:{
                    title: {$toLower: "$title"},
                    uri: "$uri",
                    popularity: "$popularity",
                    artist: {$toLower: "$artist"},
                    artist_followers: "$artist_followers",
                    co_artists:{
                        $map:{
                            input: "$co_artists",
                            as: "co_artist",
                            in:{$toLower: "$$co_artist"}
                        }
                    }, 
                    genre: {$toLower: "$genre"},
                    countries: {
                        $map:{
                            input: "$countries",
                            as: "country",
                            in:{$toLower: "$$country"}
                        }
                    },
                    album: {$toLower: "$album"},
                    release_date: "$release_date",
                    tempo: "$tempo"
                }
            }
            const match = daoUtils.generateMatch(artist, country, genre);
            const project1 = {
                $project: {
                    _id: 0,
                    album: {title: "$album", author: "$artist"},
                    songs: {
                        title: "$title",
                        popularity: "$popularity",
                        uri: "$uri",
                        artists: {$setUnion: [["$artist"], "$co_artists"]}
                    },
                }
            };
            const group = {$group: {"_id": "$album", "songs": {"$addToSet": "$songs"}, "album_popularity": {"$sum":"$songs.popularity"}}};
            const project2 = {$project: {_id: 0, title: "$_id.title", author: "$_id.author", songs: "$songs", album_popularity: "$album_popularity"}};
            const sort = {$sort: {album_popularity: -1}};
            const offsetAndLimit = daoUtils.generateOffsetAndLimit(page, itemsPerPage);

            const pipeline = [project0, match, project1, group, project2, sort, ...offsetAndLimit];

            return await this._mongoDriver.executeAggregationQuery(pipeline);
    }

}

const albumDao = new AlbumDao();
module.exports = async () => {
    if (!albumDao._isInitialized) {
        albumDao._isInitialized = true;
        await albumDao._init();
        Object.freeze(albumDao);
    }
    return albumDao;
};
