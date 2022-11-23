module.exports = app => {
    const stations = require("../controllers/station.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Station
    router.post("/", stations.create);
  
    // Retrieve all Stations
    router.get("/", stations.findAll);
  
  
    // Retrieve a single Station with id
    router.get("/:id", stations.findOne);
  
    // Update a Station with id
    router.put("/:id", stations.update);
  
    // Delete a Station with id
    router.delete("/:id", stations.delete);
  
    // delete all stations
    router.delete("/", stations.deleteAll);
  
    app.use("/api/stations", router);
  };
  