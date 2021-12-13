class DaoUtils {

    static generateResultsPipeline(match, project, unwind, group, sort, page, itemsPerPage) {
        const pipeline = [];

        if (!!match) {
            pipeline.push(match);
        }

        if (!!project) {
            pipeline.push(project);
        }
        if (!!unwind) {
            pipeline.push(unwind);
        }

        if (!!group) {
            pipeline.push(group);
        }

        if (!!sort) {
            pipeline.push(sort);
        }

        if (!!page && !!itemsPerPage){
            pipeline.push({$skip: page * itemsPerPage}, {$limit: itemsPerPage})
        }

        return pipeline;
    }

    static generateCountPipeline(match, project, unwind, group) {
        const pipeline = [];

        if (!!match) {
            pipeline.push(match);
        }

        if (!!project) {
            pipeline.push(project);
        }
        if (!!unwind) {
            pipeline.push(unwind);
        }

        if (!!group) {
            pipeline.push(group);
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

