class DaoUtils {

    static generateResultsPipeline(match, page, itemsPerPage, extra) {
        const pipeline = [];

        if (!!match) {
            pipeline.push(match);
        }

        if(!!extra){
            pipeline.push(extra);
        }

        pipeline.push({$skip: page * itemsPerPage}, {$limit: itemsPerPage})

        return pipeline;
    }

    static generateCountPipeline(match, extra) {
        const pipeline = [];

        if (!!match) {
            pipeline.push(match);
        }

        if (!!extra) {
            pipeline.push(extra);
        }

        pipeline.push({$count: "totalItems"})

        return pipeline;
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

