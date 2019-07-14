var express = require('express');
var router = express.Router();

// setup mongodb/mongoose
var mongoose = require('mongoose');
const connectionString = process.env.MONGO_URI;
mongoose.connect(connectionString, { useNewUrlParser: true });
const dbConnect = mongoose.connection;
mongoose.set('useFindAndModify', false);
dbConnect.once('open', function () { console.log('Accesing MAIN FRAME...\nHACKING THE MAIN FRAME...'); });
let messageModel = require('../models/messageschema.js');

router.get('/get', function (req, res, next) {
  messageModel.Message.find(function (err, messages) {
    if (err) {
      console.log(err);
    } else {
      res.json(messages);
    }
  });
});

router.post('/post', function (req, res, next) {
  console.log('req.body:');
  console.log(req.body);
  let msg = new messageModel.Message({
    username: req.body.username,
    message: req.body.message,
    _id: req.body._id
  });
  msg.save()
    .then(msg => { res.status(200).json({ 'message': 'message added' }); })
    .catch(e => { res.json({ error: e.message }); });
});

router.put('/put', function (req, res, next) {
  console.log('req.body @ put \n');
  console.log(req.body); console.log('\n');
  console.log(req.params); console.log('\n');

  let editedMsg = new messageModel.Message({
    username: req.body.username,
    message: req.body.message,
    _id: req.body._id
  });

  messageModel.Message.findByIdAndUpdate(editedMsg._id, editedMsg, { new: true }, (err, msg) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(msg);
    }
  });
});

router.delete('/delete', function (req, res, next) {
  // console.log(req.query.messageToDelete);
  // console.log('\n');
  let parsedMessageToDelete = JSON.parse(req.query.messageToDelete);
  // console.log(parsedMessageToDelete);
  // console.log('\n');
  messageModel.Message.findByIdAndRemove(parsedMessageToDelete, (err, msg) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(msg._id);
    }
  });
});

module.exports = router;
