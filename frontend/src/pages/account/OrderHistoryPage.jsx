import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Package, ChevronRight, ShoppingBag } from "lucide-react";
import api from "../../api/axios";

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/api/orders");
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Status color
  const getStatusColor = (status) => {
    switch (status) {
      case "processing": return "#C8A96E";
      case "in_production": return "#60a5fa";
      case "shipped": return "#34d399";
      case "delivered": return "#4ade80";
      case "cancelled": return "#f87171";
      default: return "rgba(255,255,255,0.4)";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "processing": return "Processing";
      case "in_production": return "In Production";
      case "shipped": return "Shipped";
      case "delivered": return "Delivered";
      case "cancelled": return "Cancelled";
      default: return status;
    }
  };

  return (
    <div
      className="min-h-screen pt-[46px]"
      style={{ background: "#09090E", fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="max-w-2xl mx-auto px-8 py-16">

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
            <span style={{ color: "rgba(255,255,255,0.7)" }}>ORDER HISTORY</span>
          </div>

          <p
            className="text-[9px] tracking-[0.45em] uppercase mb-3 font-bold"
            style={{ color: "#C8A96E" }}
          >
            Purchase History
          </p>
          <h1
            className="text-3xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your Orders
          </h1>
          <div
            className="mt-6 h-px"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />
        </motion.div>

        {/* ── Loading ── */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-28 animate-pulse"
                style={{ background: "rgba(255,255,255,0.03)" }}
              />
            ))}
          </div>
        ) : orders.length === 0 ? (
          // ── Empty State ──
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <ShoppingBag
              size={40}
              strokeWidth={1}
              color="rgba(255,255,255,0.1)"
              className="mb-5"
            />
            <p
              className="text-white font-bold text-lg mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              No orders yet
            </p>
            <p
              className="text-xs mb-8 tracking-wide"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Your order history will appear here
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
          // ── Order List ──
          <div className="space-y-4">
            {orders.map((order, i) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="p-6"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Order header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <Package size={13} style={{ color: "#C8A96E" }} />
                      <p
                        className="text-[9px] tracking-[0.2em] uppercase font-bold"
                        style={{ color: "#C8A96E" }}
                      >
                        Order #{order._id.slice(-6).toUpperCase()}
                      </p>
                    </div>
                    <p
                      className="text-[9px] tracking-wider"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {new Date(order.createdAt).toLocaleDateString("en-CA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Status badge */}
                  <span
                    className="text-[8px] tracking-[0.2em] px-2.5 py-1 font-bold uppercase"
                    style={{
                      background: `${getStatusColor(order.orderStatus)}18`,
                      border: `1px solid ${getStatusColor(order.orderStatus)}40`,
                      color: getStatusColor(order.orderStatus),
                    }}
                  >
                    {getStatusLabel(order.orderStatus)}
                  </span>
                </div>

                {/* Order items */}
                <div className="space-y-2 mb-4">
                  {order.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div
                        className="w-10 h-12 flex-shrink-0"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      />
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-white">
                          {item.productId?.name || "Product"}
                        </p>
                        <p
                          className="text-[9px] tracking-wider"
                          style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                          Profile: {item.profileId?.displayName || "—"} · Qty: {item.quantity}
                        </p>
                      </div>
                      <p
                        className="text-xs font-bold text-white flex-shrink-0"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order footer */}
                <div
                  className="flex items-center justify-between pt-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div>
                    <p
                      className="text-[9px] tracking-wider mb-0.5"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      Payment: {order.paymentStatus}
                    </p>
                    <p
                      className="text-[9px] tracking-wider"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {order.items.length} {order.items.length === 1 ? "item" : "items"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-[9px] tracking-wider mb-0.5"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      Total
                    </p>
                    <p
                      className="text-lg font-bold text-white"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      ${order.total.toLocaleString()}
                      <span
                        className="text-[9px] ml-1 font-normal"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        CAD
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;