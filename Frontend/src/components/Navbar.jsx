import { useContext, useState } from "react";
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [ visible, setVisible ] = useState(false);
  const { navigate, backendUrl, token, setToken, setIsLoggedin, setUserData } = useContext(ShopContext);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(`${backendUrl}/api/user/logout`, {}, {withCredentials: true})
      navigate('/login')
      localStorage.removeItem('token')
      setToken('')
      data.success && setIsLoggedin(false)
      data.success && setUserData(false)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="flex items-center justify-between py-<5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/green" className="flex flex-col items-center gap-1">
          <p>GREEN HOUSE</p>
          <hr className="w-2/4 border-none h[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/Irrigation">
          <p>IRRIGATION</p>
          <hr className="w-2/4 border-none h[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <img onClick={()=>token?null:navigate('/login')} className="w-5 cursor-pointer" src={assets.profile_icon} alt="Profile Icon" />
          
          {token &&
          <div className="hidden group-hover:block absolute right-0 pt-4 z-10">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-md">
              <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p> 
              <p onClick={()=>navigate('/profile')} className="cursor-pointer hover:text-black">Profile</p> 
            </div>
          </div>
          }
        </div>

        <img onClick={() => setVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden" alt="" />
      </div>

      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0" }`}>
        <div className="flex flex-col text-gray-600">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/green">GREEN HOUSE</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/irrigation">IRRIGATION</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
