import { useContext, useEffect } from "react"
import { FaSearch } from "react-icons/fa"
import { RecipeContext } from "../Context/Context"

const Home = () => {
    const api = useContext(RecipeContext)
    useEffect(() => {
        const respone=api.post("/data")
    })

  return (
      <section className="text-white max-w-7xl m-auto px-6 ">
          <div className="flex  justify-center mt-6 mb-6">
              <div className="w-full max-w-3xl">
                  <form action="" className="flex items-center border border-gray-400 rounded-2xl">
                  <  FaSearch className="ml-5" />
                      <input type="text" placeholder="Seach for Recipe" className="pl-3 py-4" />
                      <button className="bg-purple-600 rounded-3xl px-3 text-sm font-bold py-1.5">Search</button>
              </form></div>
          </div>
          Home
          
    </section>
  )
}

export default Home
