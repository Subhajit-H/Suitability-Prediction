import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [currentState, setCurrentState] = useState("Login");
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

    const [ name, setName ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ number, setNumber ] = useState("");
    const [ showPassword, setShowPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const onSubmitHandler = async (event) => {
      event.preventDefault();
      setLoading(true);
      try {
        if (currentState === "Sign Up") {
          const response = await axios.post(backendUrl + "/api/user/register", {
            name,
            number,
            password,
          });
          if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
          } else {
            toast.error("Not logged in!");
          }
        } else {
          const response = await axios.post(backendUrl + "/api/user/login", {
            number,
            password,
          });
          if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
          } else {
            toast.error(response.data.message);
          }
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      if (token) {
        navigate("/");
      }
    }, [token, navigate]);
   
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto">
          <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="w-full border p-3 rounded-md" placeholder="Name" required />
        </div>
      )}

      <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto">
        <input type="text" onChange={(e) => setNumber(e.target.value)} value={number} className="w-full border p-3 rounded-md" placeholder="Mobile Number" required autoComplete={currentState === "Login" ? "number" : "username"} />

        <div className="relative w-full">
          <input type={showPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} value={password} className="w-full border p-3 rounded-md pr-10" placeholder="Password" required autoComplete={currentState === "Login" ? "current-password" : "new-password"} />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <div className="w-full flex justify-between text-sm -mt-8px">
          <p onClick={()=>navigate('reset-password')} className="cursor-pointer">Forget your password</p>
          {currentState === "Login" ? (
            <p onClick={()=>setCurrentState("Sign Up")} className="cursor-pointer">Create account</p>
          ) : (
            <p onClick={() => setCurrentState("Login")} className="cursor-pointer">Login Here</p>
          )}
        </div>
        <button disabled={loading} type="submit" className={`bg-black text-white font-light px-8 py-2 mt-4 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>{loading ? "Loading..." : currentState === "Login" ? "Sign In" : "Sign Up"}</button>
        {currentState === "Login" ? ("") : (<div className="flex flex-row gap-x-4"></div>)}
      </div>

    </form>
  )
}

export default Login
