import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    time: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);
const Recipe=mongoose.model("Recipe",recipeSchema)

export default Recipe
