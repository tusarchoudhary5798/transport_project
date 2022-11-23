module.exports = app => {
    const routes = require("../controllers/route.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Route
    router.post("/", routes.create);
  
    // Retrieve all Routes
    router.get("/", routes.findAll);
  
  
    // Retrieve a single Route with id
    router.get("/:id", routes.findOne);
  
    // Update a Route with id
    router.put("/:id", routes.update);
  
    // Delete a Route with id
    router.delete("/:id", routes.delete);
  
    // delete all routes
    router.delete("/", routes.deleteAll);
  
    app.use("/api/route", router);
  };
  