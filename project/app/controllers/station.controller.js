const Station = require("../models/station.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a station
  const station = new Station({
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });

  // Save station in the database
  station
    .save(station)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Station."
      });
    });
};

// Retrieve all Station from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Station.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving station."
      });
    });
};

// Find a single station with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Station.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found station with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving station with id=" + id });
    });
};

// Update a Station by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Station.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Station with id=${id}. Maybe Station was not found!`
        });
      } else res.send({ message: "Station was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Station with id=" + id
      });
    });
};

// Delete a Station with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Station.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Station with id=${id}. Maybe Station was not found!`
        });
      } else {
        res.send({
          message: "Station was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Station with id=" + id
      });
    });
};

// Delete all stations from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} stations were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all station."
      });
    });
};

