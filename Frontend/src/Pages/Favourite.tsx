import { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../Context/Context";
import { BsStopwatch } from "react-icons/bs";

const Favourite = () => {
  const context = useContext(RecipeContext);
  if (!context) return null;

  const { api } = context;

  const [favRecipes, setFavRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFav = async () => {
      try {
        const res = await api.get("/api/data");

        const userString = localStorage.getItem("user");
        if (!userString) {
          setLoading(false);
          return;
        }

        const user = JSON.parse(userString);

        // ✅ filter favorites
        const filtered = res.data.data.filter((item: any) =>
          item.favirate?.includes(user._id)
        );

        setFavRecipes(filtered);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getFav();
  }, []);

  return (
    <section className="text-white p-6">
      <h2 className="text-2xl mb-6 text-center">My Favourite Recipes ❤️</h2>

      {loading ? (
        <div className="text-center text-xl">Loading...</div>
      ) : favRecipes.length === 0 ? (
        <div className="text-center text-xl">No favourite recipes found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favRecipes.map((x: any) => (
            <div
              key={x._id}
              className="border border-gray-400 rounded-2xl overflow-hidden"
            >
              <img
                src={`http://localhost:3000/image/${x.image}`}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="text-xl font-bold">{x.title}</h3>
                <p className="flex items-center gap-2 text-sm mt-2">
                  <BsStopwatch /> {x.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Favourite;