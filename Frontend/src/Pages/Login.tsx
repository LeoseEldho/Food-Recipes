import  { PiPassword } from "react-icons/pi";

const Login = () => {
  return (
    <section className="max-w-7xl m-auto p-6 text-white">
      <form action="" className="border border-gray-400 rounded-4xl p-6 space-y-3.5 ">
        <h3 className="text-center text-2xl">User Register </h3>
        <label htmlFor="" >Name:</label>
        <input type="text" placeholder="enter your name" className=" outline-0 text-center" /><br />
        <label htmlFor="">Email:</label>
        <input type="email" placeholder="enter your email" className=" outline-0 text-center"/>
        <label htmlFor="">
          :</label>
        <input type="password" placeholder="enter your password" className=" outline-0 text-center" />
        <button className="bg-amber-100 text-center flex justify-center w-full text-black font-extrabold p-2 rounded-4xl">Submit</button>
      </form>
    </section>
  );
};

export default Login;