/**
 * Created by Sairam on 11/02/18.
 */

var Service = function (app) {
    this.app = app;

};
module.exports = Service;

Service.prototype.findDataAll = function (tableName, criteria, callback) {
    var self = this;
    var db = self.app.db;
    var collection = db.collection(tableName);

    var condition = criteria.condition ? criteria.condition : {};
    var projection = criteria.projection ? criteria.projection : {};
    var sortOrder = criteria.sortOrder ? criteria.sortOrder : {};
    var limit = criteria.limit ? criteria.limit : 0;
    var skip = criteria.skip ? criteria.skip : 0;
    collection.find(condition, projection).sort(sortOrder).skip(skip).limit(limit).toArray(function (err, user) {
        if (user== null) {
            callback(err, false)
        }
        if (user) {
            callback(err, user)
        }
    });
};


Service.prototype.find = function (Condition,projection,tableName,callback) {
    var self = this;
    var db = self.app.db;
    var collection = db.collection(tableName);
    collection.find(Condition,projection).toArray(function (err, user) {
        if (user == null) {
            callback(err, false)
        }
        if (user) {
            callback(err, user)
        }
    });
};

Service.prototype.findOne = function (Condition,tableName,callback) {
    var self = this;
    var db = self.app.db;
    var collection = db.collection(tableName);

    collection.findOne(Condition, function (err, user) {
        //console.log(user);
        if (user === null) {
            callback(err, false);
        }
        if (user) {
            callback(false, user);
        }
    });
};

// insert for single Document

Service.prototype.insert = function (Condition,tableName,callback) {
    var self = this;
    var db = self.app.db;
    var collection = db.collection(tableName);
    collection.insert(Condition, function (err, user) {
        if (user === null) {
            callback(err, false);
        }
        if (user) {
            callback(err, user);
        }
    });
};


// update single document

Service.prototype.updateDocument = function (condition, updateData, tablename, callback) {
    var self = this;
    var db = self.app.db;
    var collection = db.collection(tablename);
    collection.update(condition, {$set: updateData}, function (err, resp) {
        if (resp) {

            callback(err, true)
        }
        else {
            callback(err, false)
        }
    })
};

Service.prototype.couQuestion = function (condition,tableName,callback) {
    var self = this;
    var db = self.app.db;
    var collection = db.collection(tableName);

    // console.log('db.'+tableName+'.find('+JSON.stringify(condition)+').count()');

    collection.find(condition).count(function (err, count) {
        console.log(JSON.stringify(count));
        if(count){
            callback(err,count);
        }
        else{
            callback(err,'false');
        }
    });

};

Service.prototype.findAndModifyDocument = function (criteria,tableName,callback) {
    var self = this;
    var db = self.app.db;

    var condition = criteria.condition ? criteria.condition : {};
    var sortOrder = criteria.sortOrder ? criteria.sortOrder : [];
    var updateData = criteria.updateData ? criteria.updateData : {};
    var newUp = criteria.newUp ? criteria.newUp : {};

    var collection = db.collection(tableName);
    collection.findAndModify(condition,sortOrder,updateData,newUp, function (err, user) {
        if (user) {
            callback(null, user);
        }
        else{
            callback(err, null);
        }
    });
};
