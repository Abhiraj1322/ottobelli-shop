import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    
    // Assuming your authStore register function takes name, email, password
    await register({ name, email, password });
    
    const { isLoggedIn } = useAuthStore.getState();
    if (isLoggedIn) navigate("/");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "#09090E", fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Background subtle gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(200,169,110,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full mx-4"
        style={{ maxWidth: "400px" }}
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <button
            onClick={() => navigate("/")}
            className="text-white tracking-[0.45em] font-bold"
            style={{ fontSize: "20px" }}
          >
            OTTOBELLI
          </button>
          <p
            className="text-white/30 tracking-[0.5em] mt-2"
            style={{ fontSize: "9px" }}
          >
            YOUR STYLE. PERFECTED.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-10 bg-white/10" />
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <div className="h-px w-10 bg-white/10" />
          </div>
        </div>

        {/* Form box */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "2px",
            padding: "40px",
          }}
        >
          {/* Title */}
          <div className="mb-8">
            <p
              className="text-[9px] tracking-[0.4em] uppercase mb-2"
              style={{ color: "#C8A96E", fontWeight: 600 }}
            >
              Join Us
            </p>
            <h1
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Create your account
            </h1>
          </div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 px-4 py-3"
              style={{
                background: "rgba(255,80,80,0.08)",
                border: "1px solid rgba(255,80,80,0.2)",
              }}
            >
              <p className="text-[10px] tracking-wider text-red-400">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Full Name */}
            <div>
              <label
                className="block text-[9px] tracking-[0.3em] uppercase mb-2 font-bold"
                style={{ color: "#9A9080" }}
              >
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 text-xs outline-none transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#F5F0E8",
                  letterSpacing: "0.05em",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(200,169,110,0.5)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                }
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-[9px] tracking-[0.3em] uppercase mb-2 font-bold"
                style={{ color: "#9A9080" }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 text-xs outline-none transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#F5F0E8",
                  letterSpacing: "0.05em",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(200,169,110,0.5)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                }
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-[9px] tracking-[0.3em] uppercase mb-2 font-bold"
                style={{ color: "#9A9080" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 text-xs outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#F5F0E8",
                    letterSpacing: "0.1em",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(200,169,110,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] tracking-wider transition-colors"
                  style={{ color: "#9A9080" }}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Terms Notice (Optional but fits luxury theme well) */}
            <p className="text-[9px] tracking-wide leading-relaxed text-center" style={{ color: "#9A9080" }}>
              By creating an account, you agree to our terms of service and privacy policy.
            </p>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 text-xs font-bold tracking-[0.3em] uppercase transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                style={{ background: "#C8A96E", color: "#1A1814" }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-3 h-3 border border-[#1A1814] border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
            <span className="text-[9px] tracking-widest" style={{ color: "#9A9080" }}>OR</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          </div>

          {/* Login link */}
          <p className="text-center text-[10px] tracking-wider" style={{ color: "#9A9080" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold transition-colors hover:text-white/80"
              style={{ color: "#C8A96E" }}
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Footer links */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={() => navigate("/")}
            className="text-[9px] tracking-wider transition-colors hover:text-white/50"
            style={{ color: "#9A9080" }}
          >
            Return to Store
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;