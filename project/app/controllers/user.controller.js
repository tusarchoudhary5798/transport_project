const User = require("../models/user.model.js");
const Station = require("../models/station.model.js");
const axios = require('axios');

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a user
  const user = new User({
    name: req.body.name,
    role: req.body.role,
    journey_history: []
  });

  // Save user in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Update a User by the id in the request
exports.book = async(req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  let journey = {
    "source": req.body.pickup_station,
    "destination": req.body.drop_station
  }
  response = await calculateFair(journey.source, journey.destination)

  journey = { ...response }
  User.findByIdAndUpdate(id, { $push: { "journey_history": journey } })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot book ticket for user id=${id}. Maybe User was not found!`
        });
      } else res.send({
        message: "ticket booked successfully.", distance: journey.distance,
        expected_time: journey.time, cost: journey.cost
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error booking ticket for User with id=" + id
      });
    });
};

async function calculateFair(pickup, drop) {

  let pickup_station = await Station.findById(pickup)
  let drop_station = await Station.findById(drop)

  let journey = await calculateDistanceancTime(pickup_station, drop_station)
  journey["cost"] = journey.distance * 5
  journey["description"] = "cost depend on distance you travel (Rs 5 per Km)"

  return journey
}

async function calculateDistanceancTime(pickup_point, drop_point) {
  let options = {
    'method': 'GET',
    'url': `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${pickup_point.latitude},${pickup_point.longitude}&origins=${drop_point.latitude},${drop_point.longitude}&key=AIzaSyC1ih_04Z_rq2h0Cj0jrW7N_jbO_QzBa2Y`,
    'headers': {
      'Accept': 'application/json'
    },
    json: true,
  };
  let response
  try {
    response = await axios(options);
  } catch (err) {
    console.log(err);
    return err;
  }
  response = response.data
  distance_and_time = {
    "distance": (response.rows[0].elements[0].distance.value) / 1000,
    "time": response.rows[0].elements[0].duration.text
  }
  return distance_and_time

}

// Retrieve all User from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    });
};

// Find a single user with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found user with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving user with id=" + id });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all user."
      });
    });
};

