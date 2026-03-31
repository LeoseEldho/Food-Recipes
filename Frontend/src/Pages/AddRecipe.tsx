import { useContext, useState } from "react";
import { RecipeContext } from "../Context/Context";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AddRecipe = () => {
  const context = useContext(RecipeContext);
  if (!context) return null;
  const { api } = context;
  const [form, setForm] = useState({
    title: "",
    time: "",
    ingredients: "",
    instructions: "",
    file: null,
  });
  const navigate=useNavigate()
  const handleChange = (e: any) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const recipeHandler =async (e: any) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/add", {
        title: form.title,
        time: form.time,
        ingredients: form.ingredients,
        instructions: form.instructions,
        image:form.file
    })
      if (res.data) {
      toast.success(res.data.message)
      navigate("/")
    }
    } catch (error:any) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }
  return (
    <section className="flex justify-center">
      <div className="w-full max-w-2xl bg-black text-white p-6 rounded-2xl">
        <h2 className="text-2xl mb-6 text-center">Add New Recipe</h2>

        <form className="space-y-5" onSubmit={recipeHandler}>
          {/* Title */}
          <div className="flex flex-col">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="p-2 bg-gray-800 rounded-md"
            />
          </div>

          {/* Time */}
          <div className="flex flex-col">
            <label>Time</label>
            <input
              type="text"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="p-2 bg-gray-800 rounded-md"
            />
          </div>

          {/* Ingredients */}
          <div className="flex flex-col">
            <label>Ingredients</label>
            <textarea
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
              className="p-2 bg-gray-800 rounded-md"
            />
          </div>

          {/* Instructions */}
          <div className="flex flex-col">
            <label>Instructions</label>
            <textarea
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              className="p-2 bg-gray-800 rounded-md"
            />
          </div>

          {/* Image */}
          <div className="flex flex-col">
            <label>Recipe Image</label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="p-2 bg-gray-800 rounded-md"
            />
          </div>
          <button className="flex justify-center border border-gray-400 w-full p-2 rounded-2xl hover:bg-white hover:text-black font-extrabold transition-all ease-in duration-700">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default AddRecipe;
