class DaoUtils {

    static generateOffsetAndLimit(page, itemsPerPage) {
        const offsetAndLimit = [];

        if (page !== null && itemsPerPage !== null) {
            offsetAndLimit.push({$skip: page * itemsPerPage}, {$limit: itemsPerPage})
        }

        return offsetAndLimit;
    }

    static generateMatch(artist, country, genre) {
        const match = [];

        if (!!artist) {
            match.push({$or: [{artist: artist.toLowerCase()}, {co_artists: artist.toLowerCase()}]})
        }
        if (!!country) {
            match.push({countries: country.toLowerCase()})
        }
        if (!!genre) {
            match.push({genre: genre.toLowerCase()})
        }

        if (!match.length) {
            return null;
        }

        return {
            $match: {$and: match}
        }
    }

    static project_normalization = {
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
}

module.exports = DaoUtils;

