
const express = require('express');
const router = express.Router();
const Rider = require('../../models/Rider');
/* GET ALL RIDERS */
router.get('/', (req, res) => {
    Rider.find().then((rider) => {
      if (!rider) res.status(404).json({ message: 'No avilable Riders in the system' });
      else res.json(rider);
    })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
      });
  });
  
  // fetch single rider
  /* GET SINGLE RIDER BY ID */
  router.get('/:id', (req, res) => {
    let ridersId;
    try {
      ridersId = new ObjectId(req.params.id);
    } catch (error) {
      res.status(400).send({ message: `Invalid riders ID:${ridersId}` });
    }
    Rider.findById({ _id: ridersId }).then((rider) => {
      if (!rider) res.status(404).json({ message: `No such Rider: ${ridersId}` });
      else res.json(rider);
    })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
      });
  });
  
  /* SAVE RIDERS */
  router.post('/', (req, res) => {
    const newRider = req.body;
    Rider.create(newRider).then((result) => {
      Rider.findById({ _id: result.insertedId }).then(((addedRider) => {
        res.json(addedRider);
      }));
    }).catch((error) => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
  });
  
  /* UPDATE PRODUCT */
  router.put('/:id', (req, res) => {
    let ridersId;
    try {
      ridersId = new ObjectId(req.params.id);
    } catch (error) {
      res.status(400).send({ message: `Invalid riders ID:${ridersId}` });
    }
    const newRider = req.body;
    Rider.findByIdAndUpdate({ _id: ridersId }, newRider).find({ _id: ridersId }).then((updatedRider) => {
      res.json(updatedRider);
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ message: `Unable to update the riders information ${err}` });
    });
  });
  
  
  /* DELETE PRODUCT */
  router.delete('/:id', (req, res) => {
    let ridersId;
    try {
      ridersId = new ObjectId(req.params.id);
    } catch (error) {
      res.status(400).send({ message: `Invalid riders ID:${ridersId}` });
    }
    // THE REQ.BODY IS OPTIONAL INTHE FINDBYIDANREMOVE METHOD
    Rider.findByIdAndRemove({ _id: ridersId }, req.body).then((result) => {
      res.json(result);
    }).catch((err) => {
      console.log({ message: `Unable to delelete the riders profile ${err}` });
    });
  });

  module.exports = router;