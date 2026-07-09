import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import useFavoritesStore from "../../store/favoritesStore";

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites, isLoading, fetchFavorites, removeFavorite } = useFavoritesStore();

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div
      className="min-h-screen pt-[46px]"
      style={{ background: "#09090E", fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="max-w-4xl mx-auto px-8 py-16">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-4 text-[9px] tracking-[0.25em]">
            <button
              onClick={() => navigate("/account")}
              className="transition-colors hover:text-white/70"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              ACCOUNT
            </button>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>›</span>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>FAVOURITES</span>
          </div>

          <p
            className="text-[9px] tracking-[0.45em] uppercase mb-3 font-bold"
            style={{ color: "#C8A96E" }}
          >
            Saved Items
          </p>
          <h1
            className="text-3xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            My Favourites
          </h1>
          <div
            className="mt-6 h-px"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />
        </motion.div>

        {/* ── Loading ── */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div
                  className="animate-pulse mb-3"
                  style={{ aspectRatio: "3/4", background: "rgba(255,255,255,0.05)" }}
                />
                <div
                  className="h-3 w-3/4 animate-pulse mb-2"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                />
              </div>
            ))}
          </div>
        ) : favorites.length === 0 ? (
          // ── Empty State ──
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <Heart
              size={40}
              strokeWidth={1}
              color="rgba(255,255,255,0.1)"
              className="mb-5"
            />
            <p
              className="text-white font-bold text-lg mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              No saved items yet
            </p>
            <p
              className="text-xs mb-8 tracking-wide"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Heart any product to save it here for later
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/classics")}
                className="px-6 py-3 text-xs font-bold tracking-[0.25em] uppercase transition-all hover:opacity-90"
                style={{ background: "#C8A96E", color: "#1A1814" }}
              >
                Shop Classics
              </button>
              <button
                onClick={() => navigate("/everyday")}
                className="px-6 py-3 text-xs font-bold tracking-[0.25em] uppercase transition-all hover:bg-white/5"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Shop Everyday
              </button>
            </div>
          </motion.div>
        ) : (
          // ── Favorites Grid ──
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            <AnimatePresence>
              {favorites.map((product, i) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative group cursor-pointer"
                >
                  {/* Image */}
                  <div
                    className="relative overflow-hidden mb-3"
                    style={{ aspectRatio: "3/4", background: "#111118" }}
                    onClick={() => navigate(`/products/${product.slug}`)}
                  >
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-3 left-3">
                        <span
                          className="text-[7px] tracking-[0.2em] px-2 py-0.5 font-bold uppercase"
                          style={{ background: "#C8A96E", color: "#1A1814" }}
                        >
                          {product.badge}
                        </span>
                      </div>
                    )}

                    {/* Remove button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFavorite(product._id);
                      }}
                      className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all hover:text-red-400"
                      style={{
                        background: "rgba(9,9,14,0.8)",
                        backdropFilter: "blur(8px)",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      <Trash2 size={11} />
                    </button>

                    {/* Heart icon */}
                    <div
                      className="absolute bottom-3 right-3"
                    >
                      <Heart
                        size={12}
                        fill="#C8A96E"
                        color="#C8A96E"
                      />
                    </div>
                  </div>

                  {/* Product info */}
                  <div onClick={() => navigate(`/products/${product.slug}`)}>
                    <h3
                      className="text-xs font-semibold text-white mb-1 truncate"
                      style={{ letterSpacing: "0.05em" }}
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm font-bold text-white"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        ${product.price?.toLocaleString()}
                      </span>
                      <span
                        className="text-[9px]"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        CAD
                      </span>
                    </div>
                    {product.isCustomizable && (
                      <p
                        className="text-[8px] tracking-wider mt-1"
                        style={{ color: "#C8A96E" }}
                      >
                        Customizable
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;