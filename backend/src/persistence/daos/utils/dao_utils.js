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

}

module.exports = DaoUtils;

