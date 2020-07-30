const express = require('express')
const mongoose = require('mongoose')
const IpInfo = require('./models/IpInfo')
const app = express()

mongoose.connect('mongodb://localhost/ipInfo', {
  useNewUrlParser: true, useUnifiedTopology: true
})

mongoose.connection.once('open', function() {  
    console.log("mongodb is ready, delete old data")   

    IpInfo.find({}, (err, ipInfos) => {

      if (err) {
        return console.error(err);
      }
      ipInfos.forEach(ipInfo => {
        //console.log("ready to delelte: " + ipInfo.ip)
        IpInfo.deleteOne({ip : ipInfo.ip}, function (err) {})
      });
    });

    app.emit('ready')
});

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const ipInfos = await IpInfo.find()
  res.render('index', { informations: ipInfos })
})

app.post('/requestIp', async (req, res) => {
  var reqIp = req.body.ip
  const ipInfo = await IpInfo.findOne({ ip: reqIp })
  if (ipInfo == null) {
    await IpInfo.create({ ip: reqIp })
    setInterval( async function(){ 
      await IpInfo.updateOne({ ip: reqIp }, { count: 0 })  
    }, 60 * 1000, reqIp);
  }
  else{
    await IpInfo.updateOne({ ip: reqIp }, {$inc: { count: 1 } })
  }

  res.redirect('/')
});

app.on('ready', function() { 
  app.listen(process.env.PORT || 3006)
});