const express = require("express");
const foodController = require("./../controller/foodController");

const router = express.Router();

router.get("/getallfoods", foodController.getAllFoods); 
router.post("/getFoodbyName", foodController.getFoodbyName);
router.post("/getFoodbyCategory", foodController.getFoodbyCategory);
router.post("/createItem", foodController.createItem);
router.delete("/deleteItem/:id", foodController.deleteItem);
router.post("/addFood", foodController.addFood);
module.exports = router;
