const debug = require('debug')('backend:server');
const daoUtils = require('@persistence/daos/utils/dao_utils');

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

        try {
            const project = {$project: {_id: 0, countries: 1}};
            const unwind = {$unwind: "$countries"};
            const group = {$group: {"_id": "$countries"}};
            const sort = {$sort: {_id: 1}};

            const pipeline = [project, unwind, group, sort];

            return await this._mongoDriver.executeAggregationQuery(pipeline);

        } catch (error) {
            debug(error);
            return null;
        }
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
