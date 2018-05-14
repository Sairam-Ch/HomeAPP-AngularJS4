
var conf = {
    web: {
        host: "0.0.0.0",
        port: "3002",
        method: "session",
        views: {},
        static: {}
    },
    database: {
        api: 'mongodb',
        host: '127.0.0.1',
        port: '27107',
        schema: 'neoHome',
        auth: false,
        username: '',
        password: '',
        url:'mongodb://127.0.0.1:27017/neoHome'
    },
    aws_S3:{
        "accessKeyId":"AKIAJ5TIGHSQYMMRALNQ",
        "secretAccessKey":"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",
        "region": 'us-east-1'
    }

};

module.exports = conf;
