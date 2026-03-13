import { useState } from "react";
import { Link } from "react-router";
import { FaFilter } from "react-icons/fa";

const Header = () => {
  const [open, setopen] = useState<boolean>(false)
const navbar = [
  { name: "Home", path: "/" },
  { name: "My Recipe", path: "/myrecipe" },
  { name: "Favourite", path: "/favourite" },
  { name: "Login", path: "/login" }
];
  return (
    <section id="header" className="border-b border-gray-400 sticky top-0">
      <div className="px-6 max-w-7xl m-auto">
        <div className="flex justify-between  h-20 items-center">
          <div className="text-4xl text-white">Recipes</div>
                  <div className="relative sm:hidden">
                      <button className="text-white text-2xl" onClick={()=>setopen(!open)}>
                          <FaFilter/>
                      </button>
            {
              open&& <div className="absolute right-0 mt-2 bg-white rounded shadow w-40">
                {navbar.map((e) => (<Link defaultValue={"/"} to={e.path} className="p-2 block hover:bg-gray-100 cursor-pointer">{ e.name}</Link>))}
            </div>
             }
          </div>
          <ul className="hidden sm:flex text-white ">
            {navbar.map((x) => (<Link to={x.path} className="px-2.5">{ x.name}</Link>))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Header;
