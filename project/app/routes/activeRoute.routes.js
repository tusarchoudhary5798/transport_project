module.exports = app => {
    const activeRoute = require("../controllers/activeRoute.controller.js");
  
    const router = require("express").Router();
  
    // Create a new activeRoute
    router.post("/", activeRoute.create);
  
    // Retrieve all activeRoutes
    router.get("/", activeRoute.findAll);
  
  
    // Retrieve a single activeRoute with id
    router.get("/:id", activeRoute.findOne);
  
    // Update a activeRoute with id
    router.put("/:id", activeRoute.update);
  
    // Delete a activeRoute with id
    router.delete("/:id", activeRoute.delete);
  
    // delete all activeRoute
    router.delete("/", activeRoute.deleteAll);
  
    app.use("/api/activeRoute", router);
  };
  