import { useContext, useEffect, useState } from "react";
import { FaHeart, FaSearch } from "react-icons/fa";
import { RecipeContext } from "../Context/Context";
import { BsStopwatch } from "react-icons/bs";

const Home = () => {
  const context = useContext(RecipeContext);
  if (!context) return null;
  const { api } = context;
  const [recipe, setRecipe] = useState<any[]>([]);
  console.log(recipe);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respone = await api.get("/api/data");
        setRecipe(respone.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [api]);

  return (
    <section className="text-white max-w-7xl m-auto px-6 ">
      <div className="flex  justify-center pt-6 mb-6">
        <div className="w-full max-w-3xl">
          <form
            action=""
            className="flex items-center border border-gray-400 rounded-2xl outline-0"
          >
            <FaSearch className="ml-5" />
            <input
              type="text"
              placeholder="Seach for Recipe"
              className="pl-3 py-4 outline-0"
            />
            <button className="bg-purple-600 rounded-3xl px-3 text-sm font-bold py-1.5">
              Search
            </button>
          </form>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 text-white gap-6">
          {recipe.map((x: any) => (
            <div className="flex flex-col rounded-3xl relative border border-gray-400 overflow-hidden ">
              <div className="h-56 relative">
                <img
                  className="w-full h-full object-cover"
                  src="src\assets\food\image.png"
                  alt="Recipe Image"
                />
                <div className="absolute top-3 left-2 p-2 rounded-full border-gray-400 border inline-block items-center bg-black">
                  <FaHeart />
                </div>
              </div>
              <div className="flex flex-col justify-between p-6 space-y-2">
                      <h3 className="text-2xl font-bold">{ x.title}</h3>
                <p className="  flex gap-1.5  items-center text-sm"><BsStopwatch/> {x.time}</p>
                <button className="mt-3 rounded-full border border-gray-400 py-3 bg-yellow-100 text-black font-extrabold">
                 View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
