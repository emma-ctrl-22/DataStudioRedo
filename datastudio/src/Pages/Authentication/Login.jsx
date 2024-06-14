import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LogoImage from "../../assets/LogoImage.svg";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/bg3.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);
    if (email === "") {
      toast("Please enter your email!", {
        icon: "👏",
      });
    } else if (password === "") {
      toast("Please enter your password!", {
        icon: "🤦‍♂️",
      });
    } else {
      // onSuccess(); // Define this function if needed
      toast.success("Login successful!");
      // Redirect to the dashboard
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-blue-400 bg-center p-4 sm:p-0 "
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-gray-300 rounded-lg p-6 sm:p-8 w-full max-w-md mx-auto shadow-lg"
      >
        <img
          src={LogoImage}
          alt="Logo"
          className="w-full max-w-xs mx-auto mb-4"
        />
        <h1 className="text-center text-black-700 text-xl font-semibold mb-4">
          Sign in to your account
        </h1>
        <div className="flex flex-col mb-2">
          <input
            id="email"
            type="text"
            placeholder="example@gmail.com"
            className="flex-1 bg-transparent text-black outline-none items-center border border-gray-400 rounded-md p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center border border-gray-400 rounded-md p-2">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="flex-1 bg-transparent outline-none font-sans text-stone-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <VisibilityOff
                className="text-gray-500 h-5 w-5 ml-2 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <Visibility
                className="text-gray-500 h-5 w-5 ml-2 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
          <button
            type="submit"
            className="flex justify-center mt-8 bg-gradient-to-r from-purple-700 to-purple-900 p-3 rounded-md text-white font-semibold hover:from-purple-500 hover:to-purple-700 transition duration-200 ease-in-out"
          >
            Sign in
          </button>
        </div>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Login;
