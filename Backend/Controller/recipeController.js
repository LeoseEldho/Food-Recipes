import Recipe from "../Model/recipeModel.js";
import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/image')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.fieldname
    cb(null, filename)
  }
})
export const upload = multer({ storage: storage })

export const getRecipes = async (req, res) => {
  try {
    const recipe = await Recipe.find({});
    if (!recipe) {
      return res.status(200).json({ message: "Add Recipes To See" });
    }
    res
      .status(200)
      .json({ success: true, message: "All Recipes", data: recipe });
  } catch (error) {
    console.log("Something Went Error", error);
    res.status(500).json({ success: false });
  }
};

export const getRecipesById = async (req, res) => {
  try {
    const id = req.params.id;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res
        .status(200)
        .json({ success: false, message: "There is no Data with this Id" });
    }
    res.status(200).json({ success: true, message: "Recipes", data: recipe });
  } catch (error) {
    console.log("Something Went Error", error);
    res.status(500).json({ success: false });
  }
};

export const addRecipes = async (req, res) => {
  try {
    const { title, ingredients, instructions, time } = req.body;
     const image = req.file ? req.file.filename : null;

    if (!title || !ingredients || !instructions || !time) {
      return res.status(400).json({
        success: false,
        message: "missing credentials",
      });
    }

    const isRecipe = await Recipe.findOne({ title });
    if (isRecipe) {
      return res.status(400).json({
        success: false,
        message: "Item already Exist",
      });
    }
    const newRecipe = await Recipe.create({
      title: title,
      ingredients: ingredients,
      instructions: instructions,
      time: time,
      image: image,
      createdBy: req.userId.id
    });

    newRecipe.save();
    res.status(200).json({
      success: true,
      message: "Recipe Added Successfully",
      data:newRecipe
    });
  } catch (error) {
    console.log("Something Went Wrong !", error);
    res.status(500).json({ success: false,message:"Something Went Wrong !" });
  }
};

export const editRecipes = async (req, res) => {
  try {

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(400).json({
        success: false,
        message: "This Recipe is not Present",
      });
    }
    const updateRecipe = await Recipe.findByIdAndUpdate(recipe, req.body, {
      new: true,
    });
    res
      .status(201)
      .json({ success: true, message: "Recipe Updated", data: updateRecipe });
  } catch (error) {
    console.log("Something Went Wrong !", error);
    res.status(500).json({ success: false });
  }
};

export const deleteRecips = async (req, res) => {
  try {
    const id = req.params.id;
    const recipe = await Recipe.findById( id );
    if (!recipe) {
      return res
        .status(400)
        .json({ success: false, message: "There is no product " });
    }
    const deleteRecips = await Recipe.findByIdAndDelete(recipe);
    res.status(200).json({success:true,message:"Recipe has been Deleted"})
  } catch (error) {
    console.log("Something Went Wrong !", error);
    res.status(500).json({ success: false });
  }
};
