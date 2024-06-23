import { useState, useContext } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LogoImage from "../../assets/datastudio2.png";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";


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
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-0" style={{ backgroundColor: "#0f172a" }}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-800 rounded-lg p-6 sm:p-8 w-full max-w-md mx-auto shadow-lg"
      >
        <img
          src={LogoImage}
          alt="Logo"
          className="w-12 h-12 mx-auto mb-4"
        />
        <h1 className="text-center text-white text-2xl font-semibold mb-4">
          Sign in to your account
        </h1>
        <div className="flex flex-col mb-2">
          <label htmlFor="email" className="text-white mb-1">Email address</label>
          <input
            id="email"
            type="text"
            placeholder="Email address"
            className="flex-1 bg-gray-700 text-white outline-none items-center border border-gray-600 rounded-md p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password" className="text-white mb-1">Password</label>
          <div className="flex items-center border border-gray-600 rounded-md p-2 bg-gray-700">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="flex-1 bg-transparent outline-none text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <VisibilityOff
                className="text-gray-400 h-5 w-5 ml-2 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <Visibility
                className="text-gray-400 h-5 w-5 ml-2 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
          
        </div>
        <button
          type="submit"
          className="bg-blue-600 p-3 rounded-md text-white font-semibold hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          Sign in
        </button>
        
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Login;
