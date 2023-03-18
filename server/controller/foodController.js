const foodModel = require("./../models/foodModel");
const Restaurant = require("./../models/restaurantModel");
const fs = require("fs");
const path = require("path");
exports.getAllFoods = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    const result = await foodModel.find();
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getFoodbyName = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    const { name } = req.body;
    const result = await foodModel.findOne({ name });

    if (result) {
      return res.status(200).json({
        status: "success",
        data: result,
      });
    }

    res.status(400).json({
      status: "fail",
      message: "No data find with that foodName",
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getFoodbyCategory = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    const { category } = req.body;
    const result = await foodModel.find({ category });

    if (result.length > 0) {
      return res.status(200).json({
        status: "success",
        data: result,
      });
    }

    res.status(400).json({
      status: "fail",
      message: "No data find with that Category",
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createItem = async (req, res) => {
  console.log(req.body);
  let result = " ";
  try {
    const { name, restaurant, category, description, img, story } =
      req.body;

   
    const hotel = Restaurant.findOne({ name: restaurant });
    // console.log("Where is issue")
    result = await foodModel.create({
      name,
      hotel,
      category,
      description,
      img,
      story,
    });
    // console.log(result)

    if (result) {
      return res.status(201).json({
        status: "success",
        data: result,
      });
    }
    // }

    res.status(400).json({
      status: "fail",
      message: "Insufficient Data Given",
    });
  } catch (err) {
    return res.status(400).json({
      messageE: result,
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateItemById = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    const { name, restaurant, category, description } = req.body;

    const updatedResult = await foodModel.findByIdAndUpdate(
      req.params.id,
      { name, restaurant, category, description },
      { new: true }
    );

    if (updatedResult) {
      return res.status(200).json({
        status: "success",
        message: "Data got updated",
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteItem = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    const result = await foodModel.findByIdAndDelete(req.params.id);

    if (result) {
      return res.status(200).json({
        status: "success",
      });
    }

    return res.status(400).json({
      status: "fail",
      message: "No Such Id Exists",
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.mapFoodRestaurant = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    const { foodId, restaurantId } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(400).json({
        status: "fail",
        message: "No Such Id Exists",
      });
    }
    const mapFood = await foodModel.findByIdAndUpdate(
      foodId,
      { restaurant },
      { new: true }
    );

    if (!mapFood) {
      return res.status(400).json({
        status: "fail",
        message: "No Such Id Exists",
      });
    }

    res.status(200).json({
      status: "success",
      data: mapFood,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
//ADD new Food
exports.addFood = (req, res) => {
  const {id, name, description, image, category } = req.body;


  fs.readFile(path.join(__dirname, "../../src/fakeData/index.js"), (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    const foods = JSON.parse(data);
    const newFood = { id, name, description, image, category };
    const categoryFoods = foods[category];

    categoryFoods.push(newFood);
    foods[category] = categoryFoods;

    fs.writeFile(
      path.join(__dirname, "../../src/fakeData/index.js"),
      JSON.stringify(foods),
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal Server Error");
        }

        return res.status(200).send("Success");
      }
    );
  });
};