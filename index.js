var express = require('express')
var bodyParser = require('body-parser')
var enc = require("./enc");
const rabbiMq = require("./rabbitmq")
var app = express()
var port = 5000
// create application/json parser
var jsonParser = bodyParser.json()

app.post('/decrypt', jsonParser, function (req, res) {
    let encrypted = enc.decrypt(req)
  res.send(encrypted)
})

app.post('/encrypt', jsonParser, function (req, res) {
    let decrypted = enc.encrypt(req);
    res.send(decrypted)

});

app.post('/rabbitMqSend', jsonParser,  async function (req, res) {
    console.log(req.body)
    let connection =  await rabbiMq.connectRabbitMq();
    console.log(" rabbiMq Connection Created");
    let channel = await rabbiMq.createChannelRabbitMq(connection,req.body.queue)
    console.log("channel Crated")
    channel.sendToQueue(req.body.queue, Buffer.from(req.body.msg));
    console.log("data sent to queue ");
    rabbiMq.disconnectRabbitMq(connection);
    console.log("Connection Close ");
    res.send({msg: `Sent to ${req.body.queue} queue`})

});
app.get('/rabbitMqReceive', jsonParser,  async function (req, res) {
    console.log(req.query);
    let connection =  await rabbiMq.connectRabbitMq();
    console.log(" rabbiMq Connection Created");
    let channel = await rabbiMq.createChannelRabbitMq(connection,req.query.queue)
    console.log("channel Crated")
    let data =   await rabbiMq.getFromQueue(channel,req.query.queue);
    rabbiMq.disconnectRabbitMq(connection);
    console.log("Connection Close ");
    res.send({msg: data})

});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});