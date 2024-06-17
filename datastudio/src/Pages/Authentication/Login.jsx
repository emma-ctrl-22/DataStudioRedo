import { useState, useContext } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LogoImage from "../../assets/LogoImage.svg";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import bgImage from "../../assets/bg3.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const { Login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email === "") {
      toast.error("Please enter your email!");
      return;
    }

    if (password === "") {
      toast.error("Please enter your password!");
      return;
    }

    try {
      const status = await Login(email, password);

      if (status === 200) {
        // Redirect based on role
        const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (storedUserInfo) {
          if (storedUserInfo.role === "admin") {
            navigate("/admin/dashboard");
          } else if (storedUserInfo.role === "engineer") {
            navigate("/engineer/report-history");
          } else if (storedUserInfo.role === "client") {
            navigate("/client/create-request");
          }
        }
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-blue-400 bg-center p-4 sm:p-0"
      style={{ backgroundImage: `url(${bgImage})` }}
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
