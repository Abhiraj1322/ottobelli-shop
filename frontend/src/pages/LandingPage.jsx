import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    // Only track parallax mouse movement on desktop screens
    if (window.innerWidth < 768) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouse({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-hidden select-none flex flex-col md:block"
      style={{ background: "#09090E" }}
      onMouseMove={handleMouseMove}
    >
      {/* ── Classics — top half ── */}
      <motion.div
        className="relative w-full h-1/2 md:h-[50vh] overflow-hidden cursor-pointer flex-1"
        onMouseEnter={() => setHovered("classics")}
        onMouseLeave={() => setHovered(null)}
        onClick={() => navigate("/classics")}
        // Adds tactile feedback instantly on mobile touch press
        whileTap={{ scale: 0.99 }}
      >
        {/* Background image */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered === "classics" ? 1.04 : 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&h=960&fit=crop&auto=format)",
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
          }}
        />

        {/* Dark overlay */}
        <motion.div
          className="absolute inset-0 bg-[#09090E]"
          animate={{ 
            opacity: window.innerWidth < 768 ? 0.6 : (hovered === "classics" ? 0.45 : 0.7) 
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(9,9,14,0.6) 100%)",
          }}
        />

        {/* Top left label */}
        <span
          className="absolute top-5 left-6 md:top-7 md:left-9 z-10 tracking-[0.25em] md:tracking-[0.35em] text-white/40 text-[9px] md:text-[10px] uppercase"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
        >
          Classics Collection
        </span>

        {/* Top right label */}
        <span
          className="absolute top-5 right-6 md:top-7 md:right-9 z-10 tracking-[0.15em] md:tracking-[0.25em] text-white/40 text-[9px] md:text-[10px] uppercase hidden sm:inline"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
        >
          Made to Measure
        </span>

        {/* Explore — always visible on mobile, reveals on hover on desktop */}
        <motion.div
          className="absolute bottom-6 left-6 md:bottom-8 md:left-9 z-10"
          initial={false}
          animate={window.innerWidth < 768 ? { opacity: 1, y: 0 } : {
            opacity: hovered === "classics" ? 1 : 0,
            y: hovered === "classics" ? 0 : 6,
          }}
          transition={{ duration: 0.3 }}
        >
          <span
            className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-white/70 uppercase flex items-center gap-2"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
          >
            Explore Collection
            <span className="inline-block">→</span>
          </span>
        </motion.div>
      </motion.div>

      {/* ── Center OTTOBELLI wordmark ── */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-4">
        <motion.div
          className="text-center bg-[#09090E]/40 backdrop-blur-[2px] md:backdrop-blur-none p-4 rounded md:p-0"
          style={{
            transform: `perspective(800px) rotateX(${mouse.y * -4}deg) rotateY(${mouse.x * 4}deg)`,
            transition: "transform 0.15s ease-out",
          }}
        >
          <h1
            className="text-white tracking-[0.35em] md:tracking-[0.45em] font-bold leading-none"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(24px, 6vw, 64px)",
            }}
          >
            OTTOBELLI
          </h1>
          <p
            className="text-white/40 tracking-[0.45em] md:tracking-[0.55em] mt-2 md:mt-3 text-[8px] md:text-[9px]"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
          >
            YOUR STYLE. PERFECTED.
          </p>
          <div className="flex items-center justify-center gap-2 md:gap-3 mt-3 md:mt-4">
            <div className="h-px w-8 md:w-12 bg-white/20" />
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="h-px w-8 md:w-12 bg-white/20" />
          </div>
        </motion.div>
      </div>

      {/* ── Hairline divider ── */}
      <div
        className="absolute left-0 right-0 z-10 hidden md:block"
        style={{
          top: "50vh",
          height: "1px",
          background: "rgba(255,255,255,0.08)",
        }}
      />

      {/* ── Everyday Wear — bottom half ── */}
      <motion.div
        className="relative w-full h-1/2 md:h-[50vh] overflow-hidden cursor-pointer flex-1"
        onMouseEnter={() => setHovered("everyday")}
        onMouseLeave={() => setHovered(null)}
        onClick={() => navigate("/everyday")}
        // Adds tactile feedback instantly on mobile touch press
        whileTap={{ scale: 0.99 }}
      >
        {/* Background image */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered === "everyday" ? 1.04 : 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1920&h=960&fit=crop&auto=format)",
            backgroundSize: "cover",
            backgroundPosition: "center 60%",
          }}
        />

        {/* Dark overlay */}
        <motion.div
          className="absolute inset-0 bg-[#09090E]"
          animate={{ 
            opacity: window.innerWidth < 768 ? 0.6 : (hovered === "everyday" ? 0.45 : 0.72) 
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(9,9,14,0.6) 100%)",
          }}
        />

        {/* Bottom left label */}
        <span
          className="absolute bottom-5 left-6 md:bottom-7 md:left-9 z-10 tracking-[0.25em] md:tracking-[0.35em] text-white/40 text-[9px] md:text-[10px] uppercase"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
        >
          Everyday Wear
        </span>

        {/* Bottom right label */}
        <span
          className="absolute bottom-5 right-6 md:bottom-7 md:right-9 z-10 tracking-[0.15em] md:tracking-[0.25em] text-white/40 text-[9px] md:text-[10px] uppercase hidden sm:inline"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
        >
          Off The Rack
        </span>

        {/* Explore — always visible on mobile, reveals on hover on desktop */}
        <motion.div
          className="absolute top-6 right-6 md:top-8 md:right-9 z-10"
          initial={false}
          animate={window.innerWidth < 768 ? { opacity: 1, y: 0 } : {
            opacity: hovered === "everyday" ? 1 : 0,
            y: hovered === "everyday" ? 0 : -6,
          }}
          transition={{ duration: 0.3 }}
        >
          <span
            className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-white/70 uppercase flex items-center gap-2"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
          >
            Explore Collection
            <span className="inline-block">→</span>
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;