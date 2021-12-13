const debug = require('debug')('backend:server');
const daoUtils = require('@persistence/daos/utils/dao_utils');

class ExtraInfoDao {

    constructor() {
        if (!ExtraInfoDao.instance) {
            this._isInitialized = false;
            ExtraInfoDao.instance = this;
        }

        return ExtraInfoDao.instance;
    }

    async _init() {
        this._mongoDriver = await require("@persistence/drivers/mongo_driver")();
    }

    async getCountries() {

        try {

            let project = {$project:{_id:0,countries:1}};

            let unwind = {$unwind:"$countries"};

            let group = {$group:{"_id":"$countries"}};

            let sort = {$sort:{_id:1}};

            const pipeline = daoUtils.generateResultsPipeline(null,project, unwind,group,sort, null, null);

            return await this._mongoDriver.executeAggregationQuery(pipeline);

        } catch (error) {
            debug(error);
            return null;
        }
    }


}

const extraInfoDao = new ExtraInfoDao();
module.exports = async () => {
    if (!extraInfoDao._isInitialized) {
        extraInfoDao._isInitialized = true;
        await extraInfoDao._init();
        Object.freeze(extraInfoDao);
    }
    return extraInfoDao;
};
