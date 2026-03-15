import { Routes, Route } from "react-router";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Home from "./Pages/Home";
import Favourite from "./Pages/Favourite";
import Login from "./Pages/Login";
import MyRecipe from "./Pages/MyRecipe";
import Context from "./Context/Context";

function App() {
  return (
    <Context>
      <Header />
      <div className="min-h-screen bg-black ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/myrecipe" element={<MyRecipe />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </Context>
  );
}

export default App;
