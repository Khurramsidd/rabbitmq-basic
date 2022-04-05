var amqp = require('amqplib/callback_api');


function  connectRabbitMq() {
    try{
       let promise =  new Promise((resolve, reject) => {
           amqp.connect('amqp://localhost', "",(err, conn)=>{
               if(err) {
                   reject(err);
               }else {
                   resolve(conn);
               }
           })
       })
        promise.then((data) =>{
            return data;
        });
       return promise;



    }catch(err){
        console.log(err)
        throw err
    }
};
let createChannelRabbitMq = (connection,queue) => {
    try{
        let promise =  new Promise((resolve, reject) => {

            connection.createChannel(function (error1, channel) {
                if (error1) {
                    reject(error1);
                } else {
                    channel.assertQueue(queue, {
                        durable: false
                    });
                    resolve(channel);
                }

            });
        });
        promise.then((data) =>{
            return data;
        });
        return promise;
    }catch(err){
        console.log(err)
        throw err
    }
};

let getFromQueue = (channel,queue) => {
    try{
        let promise =  new Promise((resolve, reject) => {

            channel.consume(queue, function(msg) {
                resolve(msg.content.toString());
                }, {
                noAck: true
            });
        });
        promise.then((data) =>{
            return data;
        });
        return promise;
    }catch(err){
        console.log(err)
        throw err
    }
};
let disconnectRabbitMq = (connection) => {
    try{
        setTimeout(function() {
            connection.close();
        }, 500);

    }catch(err){
        console.log(err)
        throw err
    }
};
module.exports = {
    connectRabbitMq,
    disconnectRabbitMq,
    createChannelRabbitMq,
    getFromQueue
};