import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouse({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-hidden select-none"
      style={{ background: "#09090E" }}
      onMouseMove={handleMouseMove}
    >
      {/* ── Classics — top half ── */}
      <motion.div
        className="relative w-full overflow-hidden cursor-pointer"
        style={{ height: "50vh" }}
        onMouseEnter={() => setHovered("classics")}
        onMouseLeave={() => setHovered(null)}
        onClick={() => navigate("/classics")}
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
          animate={{ opacity: hovered === "classics" ? 0.45 : 0.7 }}
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
          className="absolute top-7 left-9 z-10 tracking-[0.35em] text-white/40 text-[10px] uppercase"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
        >
          Classics Collection
        </span>

        {/* Top right label */}
        <span
          className="absolute top-7 right-9 z-10 tracking-[0.25em] text-white/40 text-[10px] uppercase"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
        >
          Made to Measure
        </span>

        {/* Explore — shows on hover */}
        <motion.div
          className="absolute bottom-8 left-9 z-10"
          animate={{
            opacity: hovered === "classics" ? 1 : 0,
            y: hovered === "classics" ? 0 : 6,
          }}
          transition={{ duration: 0.3 }}
        >
          <span
            className="text-[10px] tracking-[0.4em] text-white/70 uppercase flex items-center gap-2"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
          >
            Explore Collection
            <span className="inline-block">→</span>
          </span>
        </motion.div>
      </motion.div>

      {/* ── Center OTTOBELLI wordmark ── */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <motion.div
          className="text-center"
          style={{
            transform: `perspective(800px) rotateX(${mouse.y * -4}deg) rotateY(${mouse.x * 4}deg)`,
            transition: "transform 0.15s ease-out",
          }}
        >
          <h1
            className="text-white tracking-[0.45em] font-bold leading-none"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(28px, 4.5vw, 64px)",
            }}
          >
            OTTOBELLI
          </h1>
          <p
            className="text-white/40 tracking-[0.55em] mt-3 text-[9px]"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
          >
            YOUR STYLE. PERFECTED.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-12 bg-white/20" />
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="h-px w-12 bg-white/20" />
          </div>
        </motion.div>
      </div>

      {/* ── Hairline divider ── */}
      <div
        className="absolute left-0 right-0 z-10"
        style={{
          top: "50vh",
          height: "1px",
          background: "rgba(255,255,255,0.08)",
        }}
      />

      {/* ── Everyday Wear — bottom half ── */}
      <motion.div
        className="relative w-full overflow-hidden cursor-pointer"
        style={{ height: "50vh" }}
        onMouseEnter={() => setHovered("everyday")}
        onMouseLeave={() => setHovered(null)}
        onClick={() => navigate("/everyday")}
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
          animate={{ opacity: hovered === "everyday" ? 0.45 : 0.72 }}
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
          className="absolute bottom-7 left-9 z-10 tracking-[0.35em] text-white/40 text-[10px] uppercase"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
        >
          Everyday Wear
        </span>

        {/* Bottom right label */}
        <span
          className="absolute bottom-7 right-9 z-10 tracking-[0.25em] text-white/40 text-[10px] uppercase"
          style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
        >
          Off The Rack
        </span>

        {/* Explore — shows on hover */}
        <motion.div
          className="absolute top-8 right-9 z-10"
          animate={{
            opacity: hovered === "everyday" ? 1 : 0,
            y: hovered === "everyday" ? 0 : -6,
          }}
          transition={{ duration: 0.3 }}
        >
          <span
            className="text-[10px] tracking-[0.4em] text-white/70 uppercase flex items-center gap-2"
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