const debug = require('debug')('backend:server');

class CountriesDao {

    constructor() {
        if (!CountriesDao.instance) {
            this._isInitialized = false;
            CountriesDao.instance = this;
        }

        return CountriesDao.instance;
    }

    async _init() {
        this._mongoDriver = await require("@persistence/drivers/mongo_driver")();
    }

    async getCountries() {
        const project = {$project: {_id: 0, countries: 1}};
        const unwind = {$unwind: "$countries"};
        const group = {$group: {"_id": "$countries"}};
        const project2 = {$project: {_id: 0, name: "$_id"}};
        const sort = {$sort: {name: 1}};

        const pipeline = [project, unwind, group, project2, sort];

        return await this._mongoDriver.executeAggregationQuery(pipeline);
    }


}

const countriesDao = new CountriesDao();
module.exports = async () => {
    if (!countriesDao._isInitialized) {
        countriesDao._isInitialized = true;
        await countriesDao._init();
        Object.freeze(countriesDao);
    }
    return countriesDao;
};
