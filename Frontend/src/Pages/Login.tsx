import { useContext, useState } from "react";
import { RecipeContext } from "../Context/Context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Login = () => {
  const context = useContext(RecipeContext);
  if (!context) return null;
  const { api, isRegister, setisRegister, setlogin } = context;

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onsubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister == "Register") {
        const response = await api.post("/api/register", {
          name,
          password,
          email,
        });
        if (response.data.success) {
          toast.success(response.data.message);
          setisRegister("login");
          localStorage.setItem("token", response.data.token);
        }
      } else {
        const response = await api.post("/api/login", { email, password });
        if (response.data.success) {
          toast.success(response.data.message);
          setlogin(true);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        }
      }
    } catch (error: any) {
      console.log(error);

      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };

  return (
    <section className="max-w-96 m-auto px-6 py-16 text-white h-full flex justify-center items-center ">
      <form
        onSubmit={onsubmit}
        action=""
        className="border border-gray-400 rounded-4xl p-6 space-y-3.5 w-full   "
      >
        {isRegister == "login" ? (
          <h3 className="text-center text-2xl">User Login </h3>
        ) : (
          <h3 className="text-center text-2xl">User Register </h3>
        )}
        {isRegister == "Register" && (
          <>
            <label htmlFor="">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="enter your name"
              className=" outline-0 text-center ml-3"
            />
            <br />
          </>
        )}
        <label htmlFor="">Email:</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="enter your email"
          className=" outline-0 text-center ml-3"
        />
        <br />

        <label htmlFor="">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="enter your password"
          className=" outline-0 text-center"
        />
        {isRegister == "login" && (
          <h3
            className="text-sm text-center underline"
            onClick={() => setisRegister("Register")}
          >
            Don't have an account?
          </h3>
        )}
                {isRegister == "Register" && (
          <h3
            className="text-sm text-center underline"
            onClick={() => setisRegister("login")}
          >
            I already have an account
          </h3>
        )}
        {isRegister == "login" ? (
          <button
            type="submit"
            className="bg-amber-100 text-center flex justify-center w-full mt-5 text-black font-extrabold p-2 rounded-4xl"
          >
            Login
          </button>
        ) : (
          <button className="bg-amber-100 text-center flex justify-center w-full mt-5 text-black font-extrabold p-2 rounded-4xl">
            Submit
          </button>
        )}
      </form>
    </section>
  );
};

export default Login;
