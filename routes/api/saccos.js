const express = require('express');
const router = express.Router();
const Sacco = require('../../models/Sacco');

// THIS IS THE SACCOS APIS
// get all saccos
router.get('/', (req, res) => {
    Sacco.find()
      .exec()
      .then((saccos) => {
        res.status(200).json(saccos);
      }).catch((err) => {
        res.send(`Internal server error${err.stack}`).status(400);
      });
  });
  router.get('/:id', (req, res) => { // parameter
    let saccoId;
    try {
      saccoId = req.params.id;
    } catch (error) {
      res.json({ message: `Invalid sacco id ${error}` });
    }
  
    router.findById({ _id: saccoId }).then((sacco) => {
      res.json(sacco).status(200);
    }).catch((err) => {
      res.send(`Internal server error${err.stack}`).status(400);
    });
  });
  
  // post api
  router.post('/', (req, res) => {
    const newSacco = new Sacco(req.body);
    newSacco.save().then((addedSacco) => {
      // console.log(addedSacco);
      res.status(200).json(addedSacco);
    }).catch((error) => {
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
  });
  
  router.delete('/:id', (req, res) => {
    let saccosId;
    try {
      saccosId = req.params.id;
    } catch (error) {
      res.status(400).send({ message: `Invalid saccos ID:${saccosId}` });
    }
    // THE REQ.BODY IS OPTIONAL INTHE FINDBYIDANREMOVE METHOD
    Sacco.findByIdAndRemove({ _id: saccosId }, req.body).then((result) => {
      res.json(result);
    }).catch((err) => {
      console.log({ message: `Unable to delelete the saccos profile ${err}` });
    });
  });
  
  
  router.put('/:id', (req, res) => {
    let saccosId;
    try {
      saccosId = req.params.id;
    } catch (error) {
      res.status(400).send({ message: `Invalid saccos ID:${saccosId}` });
    }
    const newSacco = req.body;
  
    Sacco.findByIdAndUpdate({ _id: saccosId }, newSacco).find({ _id: saccosId }).then((updatedSacco) => {
      res.json(updatedSacco);
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ message: `Unable to update the saccos information ${err}` });
    });
  });
  
  module.exports = router;