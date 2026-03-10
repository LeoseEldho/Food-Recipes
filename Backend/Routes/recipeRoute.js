import express from "express";
import { getRecipes,getRecipesById,editRecipes,addRecipes,deleteRecips } from "../Controller/recipeController.js";

const router = express.Router();

router.get('/data', getRecipes)
router.get('/:id',getRecipesById)
router.post('/', addRecipes)
router.put("/:id", editRecipes)
router.delete("/:id",deleteRecips)

export default router