import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const { setUser } = useContext(CartContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || (isSignUp && (!name || !gender || !contact))) {
      Swal.fire({
        icon: "warning",
        title: "Missing Details",
        text: "Please fill in all details",
        confirmButtonColor: "#14b8a6"
      });
      return;
    }

    if (isSignUp) {
      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: `Account created successfully for ${name}! You can now login.`,
        confirmButtonColor: "#14b8a6"
      });
      setIsSignUp(false);
      return;
    }

    const isAdmin = email === "admin@seafood.com";
    setUser({ email, role: isAdmin ? "admin" : "user", name: name || email.split('@')[0] });
    
    Swal.fire({
      icon: "success",
      title: isAdmin ? "Admin Login Successful" : "Login Successful",
      timer: 1500,
      showConfirmButton: false
    });
    
    navigate(isAdmin ? "/admin" : "/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-teal-500 overflow-hidden relative">
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-150px] right-[-50px] w-96 h-96 bg-teal-300 opacity-20 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md p-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl justify-center font-extrabold text-white tracking-widest drop-shadow-md uppercase">
            {isSignUp ? "Create Account" : "WELCOME"}
          </h2>
          <p className="text-blue-100 text-sm mt-2 font-medium">
            {isSignUp ? "Join the Seafood Supply Network" : "Continue to Seafood Supply Network"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="relative hover:scale-[1.02] transition-transform">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-blue-200 outline-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-teal-400 focus:bg-white/10 transition-all shadow-inner"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <div className="relative hover:scale-[1.02] transition-transform flex-1">
                  <select
                    className="w-full bg-white/5 border border-white/10 text-blue-200 outline-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-teal-400 focus:bg-white/10 transition-all shadow-inner appearance-none"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="" disabled className="text-gray-400 bg-blue-900">Select Gender</option>
                    <option value="Male" className="bg-blue-900 text-white">Male</option>
                    <option value="Female" className="bg-blue-900 text-white">Female</option>
                    <option value="Other" className="bg-blue-900 text-white">Other</option>
                  </select>
                </div>
                <div className="relative hover:scale-[1.02] transition-transform flex-1">
                  <input
                    type="tel"
                    placeholder="Contact No."
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-blue-200 outline-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-teal-400 focus:bg-white/10 transition-all shadow-inner"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="relative hover:scale-[1.02] transition-transform">
            <input
              type="email"
              placeholder="Email address"
              autoComplete={isSignUp ? "off" : "email"}
              className="w-full bg-white/5 border border-white/10 text-white placeholder-blue-200 outline-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-teal-400 focus:bg-white/10 transition-all shadow-inner"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative hover:scale-[1.02] transition-transform">
            <input
              type="password"
              placeholder="Password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              className="w-full bg-white/5 border border-white/10 text-white placeholder-blue-200 outline-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-teal-400 focus:bg-white/10 transition-all shadow-inner"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full relative overflow-hidden group bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold tracking-wide rounded-xl px-5 py-4 shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:-translate-y-1">
            <span className="relative z-10">{isSignUp ? "SIGN UP NOW" : "LOGIN SECURELY"}</span>
            <div className="absolute top-0 left-[-100%] w-full h-full bg-white/20 skew-x-12 transition-all duration-500 ease-in-out group-hover:left-[100%]"></div>
          </button>
        </form>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <span className="border-b border-white/20 w-1/4"></span>
            <span className="text-xs text-center text-blue-200 uppercase font-bold tracking-wider">Or {isSignUp ? "sign up" : "login"} with</span>
            <span className="border-b border-white/20 w-1/4"></span>
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={() => Swal.fire({title: "Redirecting to Google Login...", icon: "info", timer: 1500, showConfirmButton: false})} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl py-3 flex justify-center transition-all hover:-translate-y-1 shadow-sm group">
              <span className="font-bold text-sm tracking-wide group-hover:text-red-400 transition-colors">Google</span>
            </button>
            <button type="button" onClick={() => Swal.fire({title: "Redirecting to Yahoo Login...", icon: "info", timer: 1500, showConfirmButton: false})} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl py-3 flex justify-center transition-all hover:-translate-y-1 shadow-sm group">
              <span className="font-bold text-sm tracking-wide group-hover:text-purple-400 transition-colors">Yahoo!</span>
            </button>
            <button type="button" onClick={() => Swal.fire({title: "Redirecting to Outlook Login...", icon: "info", timer: 1500, showConfirmButton: false})} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl py-3 flex justify-center transition-all hover:-translate-y-1 shadow-sm group">
              <span className="font-bold text-sm tracking-wide group-hover:text-blue-400 transition-colors">Outlook</span>
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-blue-100/70 text-sm">
          {isSignUp ? (
            <>Already have an account? <span onClick={() => setIsSignUp(false)} className="text-teal-300 font-bold cursor-pointer hover:underline transition-all">Login</span></>
          ) : (
            <>Don't have an account? <span onClick={() => setIsSignUp(true)} className="text-teal-300 font-bold cursor-pointer hover:underline transition-all">Sign Up</span></>
          )}
        </p>
      </div>
    </div>
  );
}

export default Login;