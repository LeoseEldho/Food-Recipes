import { useContext, useEffect, useState } from "react";
import { FaHeart, FaSearch } from "react-icons/fa";
import { RecipeContext } from "../Context/Context";
import { BsStopwatch } from "react-icons/bs";
import { Link, useNavigate } from "react-router";

const Home = () => {
  const context = useContext(RecipeContext);
  if (!context) return null;
  const { api } = context;
  const [recipe, setRecipe] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respone = await api.get("/api/data");
        setRecipe(respone.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [api]);

  return (
    <section className="text-white max-w-7xl m-auto px-6 ">
      <div className="flex  justify-center pt-6 mb-6">
        <div className="w-full ">
          <form
            action=""
            className="flex items-center border border-gray-400 rounded-2xl outline-0 "
          >
            <FaSearch className="ml-5 w-5" />
            <input
              type="text"
              placeholder="Seach for Recipe"
              className="pl-3 py-4 outline-0 w-full"
            />
            <button className="bg-purple-600 rounded-3xl px-3 text-sm font-bold py-1.5 mr-3">
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="grid  items-center mb-6 border sm:grid-cols-1 p-4 rounded-3xl">
        <h3 className="px-2">Add Your Recipe Ideas :</h3>
        <div className="hidden sm:block">
          <img src="src\assets\food\image.png" alt="" />
        </div>
        <div className="flex justify-between my-2.5 border border-gray-400 rounded-2xl px-2.5 py-3 w-full">
          <h2 className="font-extrabold">Add New Recipe</h2>
          <button
            onClick={() => navigate("/addRecipe")}
            className="bg-green-600 rounded-4xl px-2 font-bold"
          >
            Add
          </button>
        </div>
      </div>
      <div>
        {loading ? (
          <div className="flex justify-center text-2xl">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 text-white gap-6 sm:grid-cols-2 items-center justify-center">
            {recipe.map((x: any) => (
              <div
                key={x._id}
                className="flex flex-col rounded-3xl relative border border-gray-400 overflow-hidden "
              >
                <div className="h-56 relative">
                  <img
                    className="w-full h-full object-cover"
                    src={`http://localhost:3000/image/${x.image}`}
                    alt={x.name}
                  />
                  <div className="absolute top-3 left-2 p-2 rounded-full border-gray-400 border inline-block items-center bg-black">
                    <FaHeart />
                  </div>
                </div>
                <div className="flex flex-col justify-between p-6 space-y-2">
                  <h3 className="text-2xl font-bold">{x.title}</h3>
                  <p className="  flex gap-1.5  items-center text-sm">
                    <BsStopwatch /> {x.time}
                  </p>
                  <Link to={`/detailRecipe/${x._id}`} className="">
                  <button className="mt-3 rounded-full border w-full border-gray-400 py-3  bg-yellow-100 text-black font-extrabold">
                    
                      View Recipe
                  </button>

                    </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
