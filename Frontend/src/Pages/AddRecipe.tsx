import { useContext, useState } from "react";
import { RecipeContext } from "../Context/Context";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useEffect } from "react";

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
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const target = e.target;

    const name = target.name;

    if (target instanceof HTMLInputElement && target.type === "file") {
      setForm((prev) => ({
        ...prev,
        [name]: target.files ? target.files[0] : null,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: target.value,
      }));
    }
  };

  const recipeHandler = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("time", form.time);
      formData.append("ingredients", form.ingredients);
      formData.append("instructions", form.instructions);

      if (form.file) {
        formData.append("file", form.file);
      }
      const res = await api.post("/api/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data) {
        toast.success(res.data.message);
        navigate("/");
        setForm({
          title: "",
          time: "",
          ingredients: "",
          instructions: "",
          file: null,
        });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <section className="flex justify-center">
      <div className="w-full max-w-2xl bg-black text-white p-6 rounded-2xl">
        <h2 className="text-2xl mb-6 text-center">Add New Recipe</h2>

        <form className="space-y-5" onSubmit={recipeHandler}>
          {/* Title */}
          <div className="flex flex-col">
            <label>Title</label>
            <input
              required
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
              required
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
              required
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
              required
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
              // required
              accept="image/*"
              type="file"
              name="file"
              onChange={handleChange}
              className="p-2 bg-gray-800 rounded-md"
            />
          </div>
          <button className="flex justify-center border border-gray-400 w-full p-2 rounded-2xl hover:bg-white hover:text-black font-extrabold transition-all ease-in duration-700">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddRecipe;
