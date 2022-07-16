/*
    *Test Service
*/

const db = require('../db/db.config');
const mongoose = require("mongoose");
const ObjectId = require('mongoose').Types.ObjectId;
const itemSchema = {
    _id: {
        type: ObjectId,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: false
    },
    restaurantId: {
        type: ObjectId,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    carbs: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: false
    },
    filters: {
        type: Array,
        required: false
    }
};

db.item=mongoose.model('items',itemSchema);
const item = {}

item.getByID = async(id) => {

    return new Promise(async(resolve, reject) => {

        try {

            const foundEatery = await db.item.findOne({_id:new ObjectId(id)});
            resolve({code: 201, result: foundEatery});

        } catch (e) {

            reject({code: 406, error: e});

        }
    })
}

item.getByEateryId = async(eateryId) => {

    return new Promise(async(resolve, reject) => {

        try {

            const foundItems = await db.item.find({restaurantId:new ObjectId(eateryId)});
            resolve({code: 200, result: foundItems});

        } catch (e) {

            reject({code: 406, error: e});

        }
    })
}

item.getAll = async() => {

    return new Promise(async(resolve,reject) => {

        try{

            const allItems = await db.item.find({});
            resolve({code: 200, results: allItems});

        } catch (e) {

            reject({code: 406, error: e});

        }

    })
}

item.getByFilters = async(rawFilters) => {

    return new Promise(async(resolve,reject) => {

        try{

            let filters = rawFilters.split(",");
            const foundItems = await db.item.find({filters:{$all:filters}});
            resolve({code: 200, results: foundItems});

        } catch (e) {

            reject({code: 406, error: e});

        }

    })

}

item.getByEateryIdAndFilters = async(eateryId, rawFilters) => {

    return new Promise(async(resolve,reject) => {

        try{
            let filters = rawFilters.split(",");
            const foundItems = await db.item.find({restaurantId:new ObjectId(eateryId), filters:{$all:filters}});
            resolve({code: 200, results: foundItems});

        } catch (e) {

            reject({code: 406, error: e});

        }

    })

}


module.exports = item;