const ActiveRoute = require("../models/activeRoute.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a activeRoute
  const activeRoute = new ActiveRoute({
    name: req.body.name,
    driver: req.body.driver,
    passangers: req.body.passangers,
    route: req.body.route,
    next_station: req.body.next_station,
    arrive_time: req.body.arrive_time,

  });

  // Save activeRoute in the database
  activeRoute
    .save(activeRoute)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ActiveRoute."
      });
    });
};



// Retrieve all ActiveRoute from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  ActiveRoute.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving activeRoute."
      });
    });
};

// Find a single activeRoute with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ActiveRoute.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found activeRoute with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving activeRoute with id=" + id });
    });
};

// Update a ActiveRoute by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  ActiveRoute.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update ActiveRoute with id=${id}. Maybe ActiveRoute was not found!`
        });
      } else res.send({ message: "ActiveRoute was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating ActiveRoute with id=" + id
      });
    });
};

// Delete a ActiveRoute with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ActiveRoute.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete ActiveRoute with id=${id}. Maybe ActiveRoute was not found!`
        });
      } else {
        res.send({
          message: "ActiveRoute was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete ActiveRoute with id=" + id
      });
    });
};

// Delete all activeRoutes from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} activeRoutes were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all activeRoute."
      });
    });
};

