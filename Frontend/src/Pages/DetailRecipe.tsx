import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { RecipeContext } from "../Context/Context"

const DetailRecipe = () => {
    const { id } = useParams()
    const context = useContext(RecipeContext)
    if (!context) return null;
    const { api } = context;
    const [recipe,setRecipe]=useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get(`/api/${id}`);
            setRecipe(res.data.data)
        }
        fetchData()
    }, [])
    console.log(recipe)
    return (
    <div className="text-white text-2xl">
      {recipe}
    </div>
  )
}

export default DetailRecipe
