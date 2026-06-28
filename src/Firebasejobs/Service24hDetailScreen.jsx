// Service24hDetailScreen.jsx
// Fully ported from servicefullDetailScreen.dart — feature-for-feature parity
// UI design kept exactly as original web version


import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  doc,
  collection,
  getDoc,
  query,
  where,
  getDocs,
  onSnapshot,
  updateDoc,
  addDoc,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db, auth } from "../firbase/Firebase"; // adjust path as needed
import { ArrowLeft, Bookmark, BookmarkCheck, Share2, User, Clock } from "lucide-react";
import FreelancerFullDetailScreen from "../pages/FreelancerFullDetailScreen.jsx"; // for navigation

// ─── Chip Gradients ────────────────────────────────────────────────────────────
const CHIP_GRADIENTS = [
  ["#FFD6C9", "#FFD6C9"], ["#D7F5FF", "#D7F5FF"], ["#EAD9FF", "#EAD9FF"],
  ["#D9FFE3", "#D9FFE3"], ["#E3F0FF", "#E3F0FF"], ["#FFD9E0", "#FFD9E0"],
  ["#FFF3C4", "#FFF3C4"], ["#E8F5E9", "#E8F5E9"], ["#F3E5F5", "#F3E5F5"],
  ["#E1F5FE", "#E1F5FE"], ["#FFEBEE", "#FFEBEE"], ["#F1F8E9", "#F1F8E9"],
  ["#E0F2F1", "#E0F2F1"], ["#FFFDE7", "#FFFDE7"],
];

function getChipGradient(label) {
  const idx = Math.abs(label.split("").reduce((a, c) => a + c.charCodeAt(0), 0)) % CHIP_GRADIENTS.length;
  return CHIP_GRADIENTS[idx];
}

function TagChip({ label }) {
  const [c1, c2] = getChipGradient(label);
  return (
    <span style={{
      padding: "8px 16px",
      borderRadius: 30,
      background: `linear-gradient(135deg, ${c1}, ${c2})`,
      fontSize: 13,
      fontWeight: 500,
      color: "#1A1A1A",
      fontFamily: "Rubik, sans-serif",
      display: "inline-block",
    }}>{label}</span>
  );
}

// ─── Time Ago helper ───────────────────────────────────────────────────────────
function timeAgo(date) {
  if (!date) return "";
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  const days = Math.floor(diff / 86400);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

// ─── Format amount ─────────────────────────────────────────────────────────────
function formatAmount(value) {
  const n = Number(value);
  if (isNaN(n)) return String(value);
  if (n >= 1000000) return `${(n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return String(n);
}

// ─── Snackbar ──────────────────────────────────────────────────────────────────
function Snackbar({ message, color, onDone }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [message]);
  if (!message) return null;
  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
      background: color || "#333", color: "#fff", padding: "12px 24px",
      borderRadius: 10, fontFamily: "Rubik, sans-serif", zIndex: 9999, fontSize: 14,
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    }}>{message}</div>
  );
}

// ─── Loading Spinner ───────────────────────────────────────────────────────────
function Spinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{
        width: 40, height: 40, border: "3px solid #7C3CFF",
        borderTopColor: "transparent", borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ServiceFullDetailScreen({ jobId: propJobId }) {
  const navigate = useNavigate();
  const params = useParams();
  const jobId = propJobId || params.id;

  const currentUser = auth.currentUser;
  const currentUid = currentUser?.uid;

  // Service data
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // User data (poster)
  const [userData, setUserData] = useState(null);
  const [servicePostedCount, setServicePostedCount] = useState(0);

  // Save state
  const [isSaved, setIsSaved] = useState(false);
  const [savingInProgress, setSavingInProgress] = useState(false);

  // Snackbar
  const [snack, setSnack] = useState({ msg: "", color: "#333" });
  const showSnack = (msg, color = "#333") => setSnack({ msg, color });

  // ── Fetch service from both collections ────────────────────────────────────
  useEffect(() => {
    if (!jobId) return;
    setLoading(true);

    let unsubServices, unsubService24h;
    let hasData = false;

    // Listen to "services" collection
    unsubServices = onSnapshot(doc(db, "services", jobId), snap => {
      if (snap.exists()) {
        hasData = true;
        setServiceData({ id: snap.id, ...snap.data(), _collection: "services" });
        setLoading(false);
      }
    });

    // Listen to "service_24h" collection
    unsubService24h = onSnapshot(doc(db, "service_24h", jobId), snap => {
      if (snap.exists() && !hasData) {
        hasData = true;
        setServiceData({ id: snap.id, ...snap.data(), _collection: "service_24h" });
        setLoading(false);
      }
    });

    // If neither found after a delay
    const timer = setTimeout(() => {
      if (!hasData) {
        setNotFound(true);
        setLoading(false);
      }
    }, 4000);

    return () => {
      unsubServices && unsubServices();
      unsubService24h && unsubService24h();
      clearTimeout(timer);
    };
  }, [jobId]);

  // ── Fetch user's saved jobs ────────────────────────────────────────────────
  useEffect(() => {
    if (!currentUid) return;
    const unsub = onSnapshot(doc(db, "users", currentUid), snap => {
      const data = snap.data() || {};
      const saved = data.savedJobs || [];
      setIsSaved(saved.includes(jobId));
    });
    return unsub;
  }, [currentUid, jobId]);

  // ── Fetch poster's user data ───────────────────────────────────────────────
  useEffect(() => {
    if (!serviceData?.userId) return;
    const fetchUser = async () => {
      const snap = await getDoc(doc(db, "users", serviceData.userId));
      if (snap.exists()) setUserData({ id: snap.id, ...snap.data() });
    };
    fetchUser();
  }, [serviceData?.userId]);

  // ── Fetch service posted count ─────────────────────────────────────────────
  useEffect(() => {
    if (!serviceData?.userId) return;
    const countServices = async () => {
      const [s1, s2] = await Promise.all([
        getDocs(query(collection(db, "services"), where("userId", "==", serviceData.userId))),
        getDocs(query(collection(db, "service_24h"), where("userId", "==", serviceData.userId))),
      ]);
      setServicePostedCount(s1.size + s2.size);
    };
    countServices();
  }, [serviceData?.userId]);

  // ── Toggle save ────────────────────────────────────────────────────────────
  const toggleSave = async () => {
    if (!currentUid || savingInProgress) return;
    setSavingInProgress(true);
    try {
      const userRef = doc(db, "users", currentUid);
      if (isSaved) {
        await updateDoc(userRef, { savedJobs: arrayRemove(jobId) });
      } else {
        await updateDoc(userRef, { savedJobs: arrayUnion(jobId) });
      }
    } catch (e) {
      showSnack("Failed to update saved status", "red");
    }
    setSavingInProgress(false);
  };

  if (loading) return <Spinner />;
  if (notFound || !serviceData) return <div style={{ textAlign: "center", marginTop: 50 }}>Service not found.</div>;

  const {
    title = "",
    description = "",
    deliveryDuration = "24 Hours",
    skills = [],
    tools = [],
    impressions = 0,
    createdAt,
    userId = "",
    location: serviceLocation = "Remote",
    budget_from,
    budget_to,
    image,
    faqs = []
  } = serviceData;

  const budgetFrom = Number(budget_from) || 0;
  const budgetTo = Number(budget_to) || 0;
  const createdDate = createdAt?.toDate ? createdAt.toDate() : createdAt ? new Date(createdAt) : null;
  const timeText = timeAgo(createdDate);

  return (
    <div style={{ background: "#fff", paddingBottom: 80, fontFamily: "Rubik, sans-serif" }}>
      <div style={{ background: "#FDFD96", padding: 25, borderRadius: "0 0 30px 30px", position: "relative" }}>
        <button
          onClick={() => navigate(-1)}
          style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <ArrowLeft size={22} color="#000" />
        </button>
        <h2 style={{ textAlign: "center", margin: 0 }}>Explore jobs</h2>
      </div>

      <div style={{ marginTop: 20, padding: 16 }}>
        <h3 style={{ cursor: "pointer", margin: "0 0 8px 0" }}>Works</h3>
        <hr style={{ border: "none", borderTop: "1px solid #eee", margin: 0 }} />

        {image && (
          <img src={image} alt="job" style={{ width: "100%", borderRadius: 10, marginTop: 12 }} />
        )}

        <h2 style={{ marginTop: 15, fontSize: "22px", fontWeight: 700 }}>{title}</h2>
        <p style={{ color: "#6B7280", fontSize: "14px" }}>
          👁 {impressions} views • ⏱ {createdDate ? timeAgo(createdDate) : ""}
        </p>
        <p style={{ marginTop: 10, fontSize: "15px", lineHeight: "1.6", color: "#333" }}>{description}</p>

        <h3 style={{ marginTop: 20, fontSize: "18px", fontWeight: 600 }}>Skills & Tools</h3>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
          {skills.map((s, i) => (
            <span key={i} style={{ padding: "6px 14px", border: "1px solid #ccc", borderRadius: 20, fontSize: "13px" }}>{s}</span>
          ))}
          {tools.map((t, i) => (
            <span key={i} style={{ padding: "6px 14px", border: "1px solid #ccc", borderRadius: 20, fontSize: "13px" }}>{t}</span>
          ))}
          {skills.length === 0 && tools.length === 0 && (
            <span style={{ fontSize: "14px", color: "#999" }}>No skills listed</span>
          )}
        </div>

        {/* FAQ SECTION */}
        {faqs && faqs.length > 0 && (
          <div style={{ marginTop: 25 }}>
            <h3 style={{ fontSize: "18px", fontWeight: 600 }}>FAQ</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
              {faqs.map((faq, index) => (
                <div key={index} style={{ background: "#FDFD96", padding: "12px 16px", borderRadius: "12px", border: "1px solid #FFE066" }}>
                  <div style={{ fontWeight: 600, fontSize: "14px" }}>Q: {faq.question}</div>
                  <div style={{ fontSize: "13px", color: "#4B5563", marginTop: "4px" }}>A: {faq.answer}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 30, padding: 20, background: "#FFFFF1", border: "2px solid #FFE066", borderRadius: 20 }}>
          <h2>₹{budgetFrom.toLocaleString()} - ₹{budgetTo.toLocaleString()}</h2>
          <p style={{ margin: "4px 0 12px 0", color: "#4B5563" }}>Delivery in {deliveryDuration}</p>

          <div style={{ display: "flex", gap: 20, marginTop: 10 }}>
            <button
              onClick={() => navigate(`/freelancer/${userId}`)}
              style={{ padding: "10px 20px", borderRadius: 30, background: "#FFEB3B", border: 0, fontWeight: "600", cursor: "pointer" }}
            >
              Get In Touch
            </button>

            <button
              onClick={toggleSave}
              style={{ padding: "10px 20px", borderRadius: 30, border: `2px solid ${isSaved ? "red" : "gray"}`, background: "#fff", fontWeight: "600", cursor: "pointer" }}
            >
              {isSaved ? "❤️ Saved" : "🤍 Save"}
            </button>
          </div>
        </div>
      </div>
      <Snackbar message={snack.msg} color={snack.color} onDone={() => setSnack({ msg: "", color: "#333" })} />
    </div>
  );
}

// ─── Info Column ───────────────────────────────────────────────────────────────
function InfoColumn({ label, value, valueColor = "#1A1A1A" }) {
  return (
    <div>
      <div style={{ fontSize: 15, color: "#555", marginBottom: 8, fontFamily: "Rubik, sans-serif" }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 500, color: valueColor, fontFamily: "Rubik, sans-serif" }}>{value}</div>
    </div>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────
const iconBtn = {
  background: "none", border: "none", cursor: "pointer", padding: 4,
  display: "flex", alignItems: "center", justifyContent: "center",
};