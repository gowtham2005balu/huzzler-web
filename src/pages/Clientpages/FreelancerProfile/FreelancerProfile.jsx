// FreelancerProfile.jsx — Premium Freelancer Profile page for clients
// Supports full database fetch, direct hiring with custom brief modal, direct messaging, and profile sharing.

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc, getDoc, collection, getDocs, addDoc, updateDoc,
  serverTimestamp, arrayUnion, arrayRemove
} from "firebase/firestore";
import { ref, set, update } from "firebase/database";
import { db, auth, rtdb } from "../../../firbase/Firebase";
import { ArrowLeft, Bookmark, BookmarkCheck, MessageCircle, Share2, ExternalLink, Star } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

// ─── Helpers ───────────────────────────────────────────────────────────────────
function formatAmount(value) {
  const n = Number(value);
  if (isNaN(n) || n === 0) return null;
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)     return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n.toLocaleString("en-IN")}`;
}

const SKILL_THEMES = [
  { bg: "#F0EAFF", text: "#7A3FFF" },
  { bg: "#E3EEFF", text: "#2D6EF6" },
  { bg: "#FFECEF", text: "#E03060" },
  { bg: "#FFF1E6", text: "#D6630A" },
  { bg: "#E6F9F0", text: "#0F8A50" },
  { bg: "#FFFADF", text: "#9A7A00" },
  { bg: "#E8F5FE", text: "#0070B8" },
];
const getSkillTheme = (s) => SKILL_THEMES[(s.charCodeAt(0) + s.length) % SKILL_THEMES.length];

// ─── Spinner ───────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ width: 40, height: 40, border: "3px solid #7A3FFF", borderTopColor: "transparent", borderRadius: "50%", animation: "sdm-spin 0.8s linear infinite" }} />
      <style>{`@keyframes sdm-spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ─── Snackbar ──────────────────────────────────────────────────────────────────
function Toast({ message, color, onDone }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [message]);
  if (!message) return null;
  return (
    <div style={{
      position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)",
      background: color || "#222", color: "#fff", padding: "13px 28px",
      borderRadius: 12, zIndex: 9999, fontSize: 14, fontWeight: 600,
      boxShadow: "0 8px 30px rgba(0,0,0,0.18)", fontFamily: "'Inter', sans-serif",
    }}>{message}</div>
  );
}

// ─── Direct Hire Brief Modal ───────────────────────────────────────────────────
function HireBriefModal({ open, onClose, onConfirm, freelancerName, loading }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc]   = useState("");

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;
    onConfirm(title.trim(), desc.trim());
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 32, maxWidth: 480, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.18)", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ fontSize: 32, textAlign: "center", marginBottom: 12 }}>💼</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1A1433", textAlign: "center", margin: "0 0 6px 0" }}>Hire {freelancerName}</h2>
        <p style={{ fontSize: 13, color: "#6B6B8A", textAlign: "center", lineHeight: 1.5, margin: "0 0 24px 0" }}>
          Provide the details of your project brief. We'll send it directly to their chat as a project card.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#1A1433", textTransform: "uppercase", marginBottom: 6 }}>Project Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Redesign Mobile App UI/UX"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: 10, border: "1.5px solid #EBE5F2", fontSize: 14, outline: "none", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#1A1433", textTransform: "uppercase", marginBottom: 6 }}>Description / Brief</label>
            <textarea
              required
              rows={4}
              placeholder="Describe what needs to be done, requirements, goals..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: 10, border: "1.5px solid #EBE5F2", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box", lineHeight: 1.5 }}
            />
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: "12px", borderRadius: 10, border: "1.5px solid #EBE5F2", background: "white", color: "#1A1433", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              Cancel
            </button>
            <button type="submit" disabled={loading} style={{ flex: 1, padding: "12px", borderRadius: 10, border: "none", background: "linear-gradient(90deg,#6C3EEB,#9A5CFF)", color: "white", fontWeight: 700, fontSize: 14, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Sending..." : "Send Request →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function FreelancerProfile() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const currentUid = auth.currentUser?.uid;

  const [freelancer, setFreelancer]   = useState(null);
  const [portfolio, setPortfolio]     = useState([]);
  const [reviews, setReviews]         = useState([]);
  const [loading, setLoading]         = useState(true);
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [hireLoading, setHireLoading] = useState(false);
  const [toast, setToast]             = useState({ msg: "", color: "#333" });

  const showToast = (msg, color = "#222") => setToast({ msg, color });

  // ── Fetch freelancer profile, portfolio & reviews ──────────────────────────
  useEffect(() => {
    async function fetchAllData() {
      try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFreelancer(docSnap.data());
          // Merge embedded array data with subcollection data
          const fData = docSnap.data();
          const embeddedPort = Array.isArray(fData.portfolio) ? fData.portfolio : (Array.isArray(fData.Portfolio) ? fData.Portfolio : []);
          const embeddedRev = Array.isArray(fData.reviews) ? fData.reviews : (Array.isArray(fData.Reviews) ? fData.Reviews : []);

          // Fetch portfolio subcollection
          const portSnap = await getDocs(collection(db, "users", id, "portfolio"));
          const fetchedPortfolio = portSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          setPortfolio([...embeddedPort, ...fetchedPortfolio]);

          // Fetch reviews subcollection
          const revSnap = await getDocs(collection(db, "users", id, "reviews"));
          const fetchedReviews = revSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          setReviews([...embeddedRev, ...fetchedReviews]);
        } else {
          showToast("Freelancer profile not found", "red");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchAllData();
  }, [id]);

  if (loading) return <Spinner />;
  if (!freelancer) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>❌</div>
        <div style={{ fontSize: 16, color: "#555" }}>Freelancer not found</div>
        <button onClick={() => navigate(-1)} style={{ marginTop: 20, background: "#6C3EEB", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontWeight: 600 }}>
          Go Back
        </button>
      </div>
    );
  }

  // ── Derived values ─────────────────────────────────────────────────────────
  const posterFirst  = freelancer.first_name || freelancer.firstName || "";
  const posterLast   = freelancer.last_name  || freelancer.lastName  || "";
  const name         = `${posterFirst} ${posterLast}`.trim() || freelancer.displayName || freelancer.name || "Freelancer";
  const role         = freelancer.professional_title || freelancer.role || freelancer.title || "Freelancer";
  const rating       = freelancer.rating || freelancer.averageRating || null;
  const completedProj = freelancer.completedProjects ?? freelancer.completed_projects ?? 0;
  const experience   = freelancer.experience || freelancer.yearsOfExperience || "";
  const onTimeRate   = freelancer.onTimeRate || freelancer.on_time_rate || "";
  const isTopRated   = freelancer.isTopRated || freelancer.top_rated || false;
  const rawRate      = freelancer.rate || freelancer.budget || freelancer.budget_from || 900;
  const rateDisplay  = formatAmount(rawRate) || "Negotiable";
  const about        = freelancer.about || freelancer.description || freelancer.bio || "No description provided.";
  const skills       = Array.isArray(freelancer.skills) ? freelancer.skills : [];
  const tools        = Array.isArray(freelancer.tools) ? freelancer.tools : [];
  const avatarImage  = freelancer.profile_image || freelancer.profileImage || freelancer.photoURL || "";
  const initials     = name.split(" ").map(w => w[0]).filter(Boolean).join("").toUpperCase().slice(0, 2) || "FL";
  const responseTime = freelancer.responseTime || freelancer.response_time || "";

  const AVATAR_COLORS = ["#7C3AED", "#2563EB", "#DB2777", "#EA580C", "#059669"];
  const avatarColor = AVATAR_COLORS[name.length % AVATAR_COLORS.length];

  // ── Message function ────────────────────────────────────────────────────────
  const handleMessage = () => {
    if (!currentUid) return;
    navigate("/chat", {
      state: {
        currentUid,
        otherUid:   id,
        otherName:  name,
        otherImage: avatarImage,
      },
    });
  };

  // ── Direct Hire Request function ─────────────────────────────────────────────
  const handleConfirmHire = async (title, desc) => {
    if (!currentUid) return;
    setHireLoading(true);

    const clientSnap  = await getDoc(doc(db, "users", currentUid));
    const clientData  = clientSnap.data() || {};
    const clientName  = `${clientData.first_name || clientData.firstName || ""} ${clientData.last_name || clientData.lastName || ""}`.trim() || "Client";
    const clientImage = clientData.profile_image || clientData.profileImage || clientData.photoURL || "";

    const jobId  = uuidv4();
    const chatId = currentUid < id ? `${currentUid}_${id}` : `${id}_${currentUid}`;

    const jobData = {
      id:          jobId,
      title,
      description: desc,
      budget_from: rawRate,
      budget_to:   rawRate,
      category:    role,
      skills:      skills.slice(0, 3),
      timeline:    "Project brief",
      is24h:       false,
      source:      "services",
    };

    const requestData = {
      requestStatus: "pending",
      requestedAt:   Date.now(),
      requestedBy:   currentUid,
      clientName,
      freelancerId:  id,
      freelancerName: name,
      jobId,
      service: {
        id:          jobId,
        title,
        description: desc,
        budget_from: rawRate,
        budget_to:   rawRate,
        skills:      skills.slice(0, 3),
        paused:      false,
        source:      "services",
      },
    };

    try {
      // 1. RTDB real-time channels
      if (rtdb) {
        await set(ref(rtdb, `requestChats/${id}/${chatId}`),          requestData);
        await set(ref(rtdb, `clientSentRequests/${currentUid}/${chatId}`), requestData);
      }

      // 2. Firestore collaboration_requests
      const reqRef = await addDoc(collection(db, "collaboration_requests"), {
        clientId:       currentUid,
        freelancerId:   id,
        freelancerName: name,
        jobId,
        jobType:        "services",
        title,
        description:    desc,
        status:         "sent",
        createdAt:      serverTimestamp(),
      });

      // 3. Notifications feed
      await addDoc(collection(db, "notifications"), {
        type:           "hire_request",
        status:         "sent",
        read:           false,
        timestamp:      serverTimestamp(),
        title,
        body:           `${clientName} sent hire request for "${title}"`,
        clientUid:      currentUid,
        clientName,
        freelancerId:   id,
        freelancerName: name,
        requestedBy:    currentUid,
        serviceId:      reqRef.id,
        jobId,
        jobType:        "services",
        jobTitle:       title,
        category:       role,
      });

      // 4. In-app bell notification
      await addDoc(collection(db, "freelancer_notifications"), {
        freelancerId: id,
        type:         "hire_request",
        title:        `${clientName} wants to hire you`,
        message:      `${clientName} wants to hire you for "${title}"`,
        jobTitle:     title,
        serviceTitle: title,
        clientId:     currentUid,
        clientName,
        jobId,
        read:         false,
        isRead:       false,
        createdAt:    serverTimestamp(),
      });

      // 5. Send purple job card to chat messages channel
      if (rtdb) {
        const msgId = uuidv4();
        const now   = Date.now();

        await set(ref(rtdb, `chats/${chatId}/messages/${msgId}`), {
          id:         msgId,
          senderId:   currentUid,
          receiverId: id,
          type:       "job",
          jobData,
          timestamp:  now,
          status:     "sent",
          reactions:  {},
        });

        // Update lastMessage metadata for chat rooms
        const lastMsgMeta = JSON.stringify({ jobId, messageId: msgId, title });
        await update(ref(rtdb, `userChats/${currentUid}/${chatId}`), {
          withUid:         id,
          otherName:       name,
          otherImage:      avatarImage,
          lastMessage:     `[Job] ${lastMsgMeta}`,
          lastMessageTime: now,
        });
        await update(ref(rtdb, `userChats/${id}/${chatId}`), {
          withUid:         currentUid,
          otherName:       clientName,
          otherImage:      clientImage,
          lastMessage:     `[Job] ${lastMsgMeta}`,
          lastMessageTime: now,
        });

        // Track state via myWorks
        await set(ref(rtdb, `myWorks/${msgId}`), {
          jobId,
          jobData,
          status:     "sent",
          senderId:   currentUid,
          receiverId: id,
          chatId,
          messageId:  msgId,
          sentAt:     now,
        });
      }

      setHireModalOpen(false);
      showToast("Hire request sent! 🎉", "#15975A");
    } catch (err) {
      console.error("Direct hire error:", err);
      showToast("Failed to send request", "red");
    }
    setHireLoading(false);
  };

  // ── Share Profile function ──────────────────────────────────────────────────
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: name, url });
    } else {
      await navigator.clipboard.writeText(url);
      showToast("Link copied!", "#0070B8");
    }
  };

  return (
    <div style={{ background: "#F7F7FB", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .sdm-hire-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .sdm-msg-btn:hover  { background: #F4F0FF !important; }
        .sdm-back-btn:hover { background: #F0F0F0 !important; }
        .sdm-card { transition: box-shadow 0.2s; }
        .sdm-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07) !important; }
      `}</style>

      {/* ── TOP BAR ──────────────────────────────────────────────────────── */}
      <div style={{ background: "white", borderBottom: "1px solid #EBEBF0", padding: "14px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
        <button className="sdm-back-btn" onClick={() => navigate(-1)} style={{ display: "flex", alignItems: "center", gap: 8, background: "#F5F5F8", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", color: "#1A1433", fontWeight: 600, fontSize: 14, transition: "background 0.2s" }}>
          <ArrowLeft size={16} /> Back
        </button>
        <button onClick={handleShare} style={{ display: "flex", alignItems: "center", gap: 6, background: "#F5F5F8", border: "1px solid #E0E0E8", borderRadius: 8, padding: "8px 16px", cursor: "pointer", color: "#444", fontWeight: 600, fontSize: 14 }}>
          <Share2 size={16} /> Share Profile
        </button>
      </div>

      {/* ── BODY GRID ─────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1552, margin: "0 auto", padding: "32px 20px", display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }}>

        {/* ═══════════════ LEFT COLUMN ═══════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Profile Hero Card */}
          <div className="sdm-card" style={{ background: "white", borderRadius: 18, border: "1px solid #EBEBF0", padding: "36px 32px 28px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", textAlign: "center" }}>
            {avatarImage ? (
              <img src={avatarImage} alt={name} style={{ width: 88, height: 88, borderRadius: "50%", objectFit: "cover", marginBottom: 14, border: "3px solid #EDE9FF" }} />
            ) : (
              <div style={{ width: 88, height: 88, borderRadius: "50%", background: avatarColor, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 700, margin: "0 auto 14px auto" }}>
                {initials}
              </div>
            )}

            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1A1433", margin: "0 0 4px 0" }}>{name}</h1>
            <div style={{ fontSize: 14, color: "#6B6B8A", marginBottom: 14 }}>{role}</div>

            {/* Badges */}
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
              {rating && (
                <span style={{ background: "#FFFADF", color: "#9A7A00", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                  <Star size={11} fill="#9A7A00" /> {Number(rating).toFixed(1)}
                </span>
              )}
              {isTopRated && (
                <span style={{ background: "#E6F9F0", color: "#0F8A50", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>Top Rated</span>
              )}
              <span style={{ background: "#E8F1FF", color: "#2D6EF6", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>Available</span>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", justifyContent: "center", gap: 0, borderTop: "1px solid #F0F0F5", paddingTop: 20 }}>
              {[
                { label: "Projects", value: completedProj || 0 },
                { label: "Per Day", value: rateDisplay },
                { label: "Exp.", value: experience || "—" },
                { label: "On Time", value: onTimeRate || "—" },
              ].filter(s => s.value && s.value !== "—").map((stat, i, arr) => (
                <div key={i} style={{ flex: 1, textAlign: "center", borderRight: i < arr.length - 1 ? "1px solid #F0F0F5" : "none", padding: "0 12px" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#1A1433" }}>{stat.value}</div>
                  <div style={{ fontSize: 11, color: "#8A8599", marginTop: 3, fontWeight: 500 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* About */}
          {about && (
            <div className="sdm-card" style={{ background: "white", borderRadius: 18, border: "1px solid #EBEBF0", padding: "24px 28px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#8A8599", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>About</div>
              <p style={{ fontSize: 14, color: "#444", lineHeight: 1.7, margin: 0 }}>{about}</p>
            </div>
          )}

          {/* Skills & Tools */}
          {(skills.length > 0 || tools.length > 0) && (
            <div className="sdm-card" style={{ background: "white", borderRadius: 18, border: "1px solid #EBEBF0", padding: "24px 28px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#8A8599", letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>Skills &amp; Tools</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[...skills, ...tools].map((s, i) => {
                  const th = getSkillTheme(s);
                  return (
                    <span key={i} style={{ background: th.bg, color: th.text, padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500 }}>{s}</span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Portfolio */}
          {portfolio.length > 0 && (
            <div className="sdm-card" style={{ background: "white", borderRadius: 18, border: "1px solid #EBEBF0", padding: "24px 28px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#8A8599", letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>Portfolio</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                {portfolio.map((item, i) => {
                  const PORTFOLIO_COLORS = [
                    { bg: "#EDE9FF", text: "#6C3EEB", icon: "🛒" },
                    { bg: "#E3EEFF", text: "#2D6EF6", icon: "📊" },
                    { bg: "#E6F9F0", text: "#0F8A50", icon: "✈️" },
                    { bg: "#FFFADF", text: "#9A7A00", icon: "💰" },
                  ];
                  const p = typeof item === "string"
                    ? { title: item, ...PORTFOLIO_COLORS[i % PORTFOLIO_COLORS.length] }
                    : { ...PORTFOLIO_COLORS[i % PORTFOLIO_COLORS.length], ...item };
                  return (
                    <div key={i} style={{ background: p.bg || p.color || "#F0F0FF", borderRadius: 12, padding: "28px 20px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: p.text || p.textColor || "#444", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "transform 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    >
                      {p.icon && <span>{p.icon}</span>} {p.title || p.projectName || p.name || p.project_title || p.portfolio_ProjectTitle || "Portfolio Item"}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recent Reviews */}
          {reviews.length > 0 && (
            <div className="sdm-card" style={{ background: "white", borderRadius: 18, border: "1px solid #EBEBF0", padding: "24px 28px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#8A8599", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>Recent Reviews</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {reviews.map((rev, i) => {
                  const rName = rev.clientName || rev.reviewerName || "Client";
                  const rInit = rName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
                  const rColor = AVATAR_COLORS[i % AVATAR_COLORS.length];
                  return (
                    <div key={i} style={{ padding: "16px 0", borderBottom: i < reviews.length - 1 ? "1px solid #F0F0F5" : "none" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <div style={{ width: 34, height: 34, borderRadius: "50%", background: rColor, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                            {rInit}
                          </div>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1433" }}>{rName}</div>
                            {rev.projectTitle && <div style={{ fontSize: 12, color: "#8A8599" }}>{rev.projectTitle}</div>}
                          </div>
                        </div>
                        <div style={{ color: "#F5A623", fontSize: 14, letterSpacing: 2 }}>
                          {"★".repeat(Math.min(rev.rating || 5, 5))}
                        </div>
                      </div>
                      <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>{rev.feedback || rev.comment || "Great work!"}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* ═══════════════ RIGHT COLUMN (sticky) ═══════════════ */}
        <div style={{ position: "sticky", top: 76, display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Hire card */}
          <div className="sdm-card" style={{ background: "white", borderRadius: 18, border: "1px solid #EBEBF0", padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            {/* Price */}
            <div style={{ textAlign: "center", marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #F0F0F5" }}>
              <div style={{ fontSize: 34, fontWeight: 700, color: "#1A1433", fontFamily: "'Inter', sans-serif" }}>
                {rateDisplay}
              </div>
              <div style={{ fontSize: 13, color: "#8A8599", marginTop: 4 }}>per day</div>
            </div>

            {/* Hire Button */}
            <button
              className="sdm-hire-btn"
              onClick={() => setHireModalOpen(true)}
              style={{ width: "100%", background: "linear-gradient(90deg,#6C3EEB,#9A5CFF)", color: "white", border: "none", padding: "13px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s" }}
            >
              Hire {name.split(" ")[0]} →
            </button>

            {/* Message Button */}
            <button
              className="sdm-msg-btn"
              onClick={handleMessage}
              style={{ width: "100%", background: "white", color: "#6C3EEB", border: "1.5px solid #C4B5FD", padding: "12px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "background 0.2s" }}
            >
              <MessageCircle size={16} /> Message
            </button>

            {/* Info list */}
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                responseTime && { icon: "⚡", text: `Responds within ${responseTime}` },
                { icon: "🌍", text: "Open to remote work" },
                completedProj > 0 && { icon: "✅", text: `${completedProj} successful projects` },
              ].filter(Boolean).map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 13, color: "#555", padding: "6px 0", borderBottom: "1px solid #F7F7FA" }}>
                  <span>{item.icon}</span> {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Share Profile card */}
          <div className="sdm-card" style={{ background: "white", borderRadius: 18, border: "1px solid #EBEBF0", padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1433", marginBottom: 14 }}>Share Profile</div>
            <button onClick={handleShare} style={{ width: "100%", background: "#F7F7FB", color: "#1A1433", border: "1px solid #EBEBF0", padding: "11px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
              🔗 Copy profile link
            </button>
            <button onClick={() => { window.location.href = `mailto:?subject=Check out this freelancer&body=${window.location.href}`; }}
              style={{ width: "100%", background: "#F7F7FB", color: "#1A1433", border: "1px solid #EBEBF0", padding: "11px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              ✉️ Send via email
            </button>
          </div>

        </div>
      </div>

      {/* ── Hire Modal ────────────────────────────────────────────────────── */}
      <HireBriefModal
        open={hireModalOpen}
        onClose={() => setHireModalOpen(false)}
        onConfirm={handleConfirmHire}
        freelancerName={name}
        loading={hireLoading}
      />

      <Toast message={toast.msg} color={toast.color} onDone={() => setToast({ msg: "", color: "#333" })} />
    </div>
  );
}
