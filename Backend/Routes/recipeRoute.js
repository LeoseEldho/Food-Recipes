import express from "express";
import { getRecipes,getRecipesById,editRecipes,addRecipes,deleteRecips,upload } from "../Controller/recipeController.js";

const router = express.Router();

router.get('/data', getRecipes)
router.get('/:id', getRecipesById)
//name="file" 
router.post('/add',upload.single("file"), addRecipes)
router.put("/:id", editRecipes)
router.delete("/:id",deleteRecips)

export default router