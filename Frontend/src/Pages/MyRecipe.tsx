import { useContext, useEffect, useState } from "react";
import { BsStopwatch } from "react-icons/bs";
import { FaEdit, FaHeart } from "react-icons/fa";
import { RecipeContext } from "../Context/Context";
import { Link, useNavigate } from "react-router";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

const MyRecipe = () => {
  const context = useContext(RecipeContext);
  if (!context) return null;
  const { api } = context;
  const [loading, setLoading] = useState(true);
  const [userRecipe, setUserRecipe] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await api.get("/api/data");

        if (res.data) {
          const allRecipes = res.data.data;

          const userString = localStorage.getItem("user");

          if (!userString) {
            setLoading(false); 
            return;
          }

          const user = JSON.parse(userString);

          const filtered = allRecipes.filter(
            (item: any) => item.createdBy?.toString() === user._id
          );
          setUserRecipe(filtered);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  const DeleteRecipe =async (id:any) => {
    try {
      let res = await api.delete(`/api/${id}`);
      if (res.data) {
        toast(res.data.message);
        navigate("/");
      }
    } catch (error:any) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  }
  return (
    <section className="text-white max-w-7xl m-auto px-6  min-h-screen">
      {loading ? (
        <div className="flex text-2xl justify-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 text-white gap-6 sm:grid-cols-2 items-center justify-center p-6 z-10 md:grid-cols-3">
          {userRecipe.length === 0 ? (
            <div className="flex text-center w-full text-2xl py-8 ml-14">No recipes found</div>
          ) : (
            userRecipe.map((x: any) => (
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
                  <div className="absolute top-3 right-12 p-2 rounded-full border-gray-400 border inline-block items-center bg-black">
                    <Link to={`/editRecipe/${x._id}`}> <FaEdit /></Link>
                  </div>
                  <div className="absolute top-3 right-2 p-2 rounded-full border-gray-400 border inline-block items-center bg-black">
                     <MdDeleteForever onClick={()=>DeleteRecipe(x._id)} />
                  </div>
                   
                </div>
                <div className="flex flex-col justify-between p-6 space-y-2">
                  <h3 className="text-2xl font-bold">{x.title}</h3>
                  <p className="  flex gap-1.5  items-center text-sm">
                    <BsStopwatch /> {x.time}
                  </p>
                  <button className="mt-3 rounded-full border border-gray-400 py-3 bg-yellow-100 text-black font-extrabold">
                    View Recipe
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default MyRecipe;
