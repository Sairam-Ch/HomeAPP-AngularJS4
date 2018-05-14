
var conf = {
    web : {
        host : '0.0.0.0',
        port : '86',
        method : 'session',
        views : {},
        static : {}
    },
    database : {
        api : 'mongodb',
        host : '10.0.2.184',
        port : '27017',
        schema : 'neoHome',
        auth : false,
        username : '',
        password : '',
        url:'mongodb://10.0.2.184:27017/neoHome'
    },
    aws_S3:{
        "accessKeyId":"AKIAJ5TIGHSQYMMRALNQ",
        "secretAccessKey":"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",
        "region": 'us-east-1'
    }

};

module.exports = conf;
