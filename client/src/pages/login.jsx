import React, { useState } from "react";
import GoogleLogo from "../assets/Google.svg";
import AppleLogo from "../assets/Apple.svg";
import MicrosoftLogo from "../assets/Microsoft.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../hooks/userhook";
import { showError, showSuccess } from "../utils/toast";
import Dotspinloader from "../utils/loaders/dotspinloader";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
          showSuccess("login successful!");
      navigate("/");
    } else {
      showError("Invalid email or password");
    }
  };

  const handleSocialSignup = (provider) => {
    console.log(`Sign up with ${provider}`);
  };

  return (
    <div
  className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url('https://tse4.mm.bing.net/th/id/OIP.1UFXtGRf4PNc5G08O7vCrAHaDt?r=0&w=1920&h=960&rs=1&pid=ImgDetMain&o=7&rm=3')`,
  }}
>
  <div className="bg-white/20 backdrop-blur-md text-white rounded-xl shadow-lg w-full max-w-md sm:max-w-lg p-6 sm:p-10 border border-white/30">
        {/* Logo & Branding */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-purple-500 to-blue-500 flex items-center justify-center shadow-md">
            <span className="text-white text-2xl font-bold">😊</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            MoodSync
          </h1>
          <p className="text-sm text-white/70">Track. Understand. Grow.</p>
        </div>

        {/* Form */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">Welcome Back</h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-white/20 text-white border border-white/40 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white"
          />
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-white/20 text-white border border-white/40 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-700 to-blue-500 text-white font-semibold py-2 rounded-md hover:from-blue-500 hover:to-purple-700 transition"
            disabled={loading}
          >
            {loading ? <Dotspinloader/>: "Login"}
          </button>
        </form>

        {/* Social */}
        <div className="my-6 text-center text-sm text-gray-300">or login with</div>
        <div className="flex justify-center gap-4">
          {[["Google", GoogleLogo], ["Apple", AppleLogo], ["Microsoft", MicrosoftLogo]].map(
            ([name, logo]) => (
              <button
                key={name}
                onClick={() => handleSocialSignup(name)}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-white hover:opacity-90 transition shadow-lg"
              >
                <img src={logo} alt={name} className="h-5 w-5" />
              </button>
            )
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-300 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-300 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
