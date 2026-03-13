import { Routes, Route } from "react-router";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Home from "./Pages/Home";
import Favourite from "./Pages/Favourite";
import Login from "./Pages/Login";
import MyRecipe from "./Pages/MyRecipe";

function App() {
  return (
    <div className="min-h-screen bg-black ">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/myrecipe" element={<MyRecipe />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
