const Route = require("../models/route.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.route_name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a route
  const route = new Route({
    route_name: req.body.route_name,
    stations: req.body.stations,
  });

  // Save route in the database
  route
    .save(route)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Route."
      });
    });
};

// Retrieve all Route from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Route.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving route."
      });
    });
};

// Find a single route with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Route.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found route with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving route with id=" + id });
    });
};

// Update a Route by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Route.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Route with id=${id}. Maybe Route was not found!`
        });
      } else res.send({ message: "Route was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Route with id=" + id
      });
    });
};

// Delete a Route with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Route.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Route with id=${id}. Maybe Route was not found!`
        });
      } else {
        res.send({
          message: "Route was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Route with id=" + id
      });
    });
};

// Delete all routes from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} routes were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all route."
      });
    });
};

