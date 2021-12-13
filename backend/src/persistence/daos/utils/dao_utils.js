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
            match.push({$or: [{artist: artist}, {co_artists: artist}]})
        }
        if (!!country) {
            match.push({countries: country})
        }
        if (!!genre) {
            match.push({genre: genre})
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

