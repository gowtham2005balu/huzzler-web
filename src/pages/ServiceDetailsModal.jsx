// ServiceDetailsModal.jsx — Premium service detail page (freelancer profile style)
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  doc, collection, getDoc, query, where,
  getDocs, onSnapshot, updateDoc, addDoc,
  arrayUnion, arrayRemove, serverTimestamp,
  setDoc as fsSetDoc,
} from "firebase/firestore";
import { ref, set, update } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { db, auth, rtdb } from "../firbase/Firebase";
import { ArrowLeft, Bookmark, BookmarkCheck, MessageCircle, Share2, ExternalLink, Star } from "lucide-react";

// ─── Helpers ───────────────────────────────────────────────────────────────────
function formatAmount(value) {
  const n = Number(value);
  if (isNaN(n) || n === 0) return null;
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n.toLocaleString("en-IN")}`;
}

function timeAgo(date) {
  if (!date) return "";
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  const d = Math.floor(diff / 86400);
  return `${d} day${d > 1 ? "s" : ""} ago`;
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

// ─── Hire Confirmation Modal ───────────────────────────────────────────────────
function HireModal({ open, onClose, onConfirm, posterName, serviceTitle, loading }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 36, maxWidth: 440, width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.18)", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ fontSize: 32, textAlign: "center", marginBottom: 12 }}>🤝</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1A1433", textAlign: "center", margin: "0 0 8px 0" }}>Confirm Hire Request</h2>
        <p style={{ fontSize: 14, color: "#6B6B8A", textAlign: "center", lineHeight: 1.6, margin: "0 0 28px 0" }}>
          You're about to send a hire request to <strong>{posterName}</strong> for <strong>"{serviceTitle}"</strong>. They'll be notified and can accept or decline.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "12px", borderRadius: 10, border: "1.5px solid #EBE5F2", background: "white", color: "#1A1433", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading} style={{ flex: 1, padding: "12px", borderRadius: 10, border: "none", background: "linear-gradient(90deg,#6C3EEB,#9A5CFF)", color: "white", fontWeight: 700, fontSize: 14, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Sending..." : "Send Hire Request →"}
          </button>
        </div>
      </div>
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

  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [userData, setUserData] = useState(null);
  const [serviceCount, setServiceCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [hireState, setHireState] = useState(null); // null | "sent" | "accepted"
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [hireLoading, setHireLoading] = useState(false);
  const [toast, setToast] = useState({ msg: "", color: "#333" });
  const showToast = (msg, color = "#222") => setToast({ msg, color });

  // ── Fetch service ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!jobId) return;
    setLoading(true);
    let hasData = false;
    let unsubA, unsubB;

    unsubA = onSnapshot(doc(db, "services", jobId), snap => {
      if (snap.exists()) {
        hasData = true;
        setServiceData({ id: snap.id, ...snap.data(), _collection: "services" });
        setLoading(false);
      }
    });
    unsubB = onSnapshot(doc(db, "service_24h", jobId), snap => {
      if (snap.exists() && !hasData) {
        hasData = true;
        setServiceData({ id: snap.id, ...snap.data(), _collection: "service_24h" });
        setLoading(false);
      }
    });
    const t = setTimeout(() => { if (!hasData) { setNotFound(true); setLoading(false); } }, 4000);
    return () => { unsubA?.(); unsubB?.(); clearTimeout(t); };
  }, [jobId]);

  // ── Saved status ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!currentUid) return;
    const unsub = onSnapshot(doc(db, "users", currentUid), snap => {
      setIsSaved((snap.data()?.savedJobs || []).includes(jobId));
    });
    return unsub;
  }, [currentUid, jobId]);

  // ── Poster user data ───────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      let uid = serviceData?.userId || serviceData?.uid || serviceData?.freelancerId;
      
      // If no UID is present but userEmail is, try to find the user by email
      if (!uid && serviceData?.userEmail) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", serviceData.userEmail));
        const snap = await getDocs(q);
        if (!snap.empty) {
          uid = snap.docs[0].id;
        }
      }

      if (!uid) return;

      const snap = await getDoc(doc(db, "users", uid));
      if (snap.exists()) setUserData({ id: snap.id, ...snap.data() });
      const [s1, s2] = await Promise.all([
        getDocs(query(collection(db, "services"), where("userId", "==", uid))),
        getDocs(query(collection(db, "service_24h"), where("userId", "==", uid))),
      ]);
      setServiceCount(s1.size + s2.size);
    })();
  }, [serviceData?.userId, serviceData?.uid, serviceData?.freelancerId, serviceData?.userEmail]);

  // ── Existing hire request state ────────────────────────────────────────────
  useEffect(() => {
    if (!currentUid || !serviceData) return;
    const freelancerId = serviceData.userId || serviceData.uid || serviceData.freelancerId || "";
    if (!freelancerId) return;
    const q = query(
      collection(db, "collaboration_requests"),
      where("clientId", "==", currentUid),
      where("freelancerId", "==", freelancerId)
    );
    const unsub = onSnapshot(q, snap => {
      if (snap.empty) { setHireState(null); return; }
      const match = snap.docs.find(d => d.data().jobId === jobId) || snap.docs[0];
      setHireState(match.data().status || "sent");
    });
    return unsub;
  }, [currentUid, serviceData, jobId]);

  // ── Toggle save ────────────────────────────────────────────────────────────
  const toggleSave = async () => {
    if (!currentUid) return;
    try {
      const ref = doc(db, "users", currentUid);
      if (isSaved) await updateDoc(ref, { savedJobs: arrayRemove(jobId) });
      else await updateDoc(ref, { savedJobs: arrayUnion(jobId) });
    } catch { showToast("Failed to update", "red"); }
  };

  // ── Hire function ──────────────────────────────────────────────────────────
  const handleConfirmHire = async () => {
    if (!currentUid || !serviceData) return;
    setHireLoading(true);

    const freelancerId = serviceData.userId || serviceData.uid || serviceData.freelancerId || "";
    const posterFirst = userData?.first_name || userData?.firstName || "";
    const posterLast = userData?.last_name || userData?.lastName || "";
    const freelancerName = `${posterFirst} ${posterLast}`.trim() || "Freelancer";

    const clientSnap = await getDoc(doc(db, "users", currentUid));
    const clientData = clientSnap.data() || {};
    const clientName = `${clientData.first_name || clientData.firstName || ""} ${clientData.last_name || clientData.lastName || ""}`.trim() || "Client";
    const clientImage = clientData.profile_image || clientData.profileImage || clientData.photoURL || "";

    const is24Hour = serviceData.is24Hour || serviceData._collection === "service_24h";
    const jobType = is24Hour ? "services_24h" : "services";

    // Chat ID must match ChatPage's sorted-UID format
    const chatId = currentUid < freelancerId
      ? `${currentUid}_${freelancerId}`
      : `${freelancerId}_${currentUid}`;

    // Build the jobData payload the chat renders as a hire card
    const jobData = {
      id: jobId,
      title: serviceData.title || "",
      category: serviceData.category || "",
      subCategory: serviceData.subCategory || "",
      budget_from: serviceData.budget_from || 0,
      budget_to: serviceData.budget_to || 0,
      timeline: serviceData.timeline || serviceData.deliveryDuration || "",
      skills: serviceData.skills || [],
      tools: serviceData.tools || [],
      description: serviceData.description || "",
      is24h: is24Hour,
      source: jobType,
    };

    const serviceSnapshot = {
      id: jobId,
      title: jobData.title,
      category: jobData.category,
      budget_from: jobData.budget_from,
      budget_to: jobData.budget_to,
      skills: jobData.skills,
      description: jobData.description,
      paused: serviceData.isPaused || false,
      source: jobType,
    };

    const requestData = {
      requestStatus: "pending",
      requestedAt: Date.now(),
      requestedBy: currentUid,
      clientName,
      freelancerId,
      freelancerName,
      jobId,
      service: serviceSnapshot,
    };

    try {
      // 1. Write to RTDB real-time request paths
      if (rtdb) {
        await set(ref(rtdb, `requestChats/${freelancerId}/${chatId}`), requestData);
        await set(ref(rtdb, `clientSentRequests/${currentUid}/${chatId}`), requestData);
      }

      // 2. Write collaboration_request doc in Firestore
      const reqRef = await addDoc(collection(db, "collaboration_requests"), {
        clientId: currentUid,
        freelancerId,
        freelancerName,
        jobId,
        jobType,
        title: serviceSnapshot.title,
        description: serviceSnapshot.description,
        status: "sent",
        createdAt: serverTimestamp(),
      });

      // 3. Notification for freelancer (Firestore)
      await addDoc(collection(db, "notifications"), {
        type: "hire_request",
        status: "sent",
        read: false,
        timestamp: serverTimestamp(),
        title: serviceSnapshot.title,
        body: `${clientName} sent a hire request for "${serviceSnapshot.title}"`,
        clientUid: currentUid,
        clientName,
        freelancerId,
        freelancerName,
        requestedBy: currentUid,   // ← client initiated this hire (NOT a freelancer apply)
        serviceId: reqRef.id,
        jobId,
        jobType,
        jobTitle: serviceSnapshot.title,
        category: serviceSnapshot.category,
      });

      // 4. In-app bell notification
      await addDoc(collection(db, "freelancer_notifications"), {
        freelancerId,
        type: "hire_request",
        title: `${clientName} wants to hire you`,
        message: `${clientName} wants to hire you for "${serviceSnapshot.title}"`,
        jobTitle: serviceSnapshot.title,
        serviceTitle: serviceSnapshot.title,
        clientId: currentUid,
        clientName,
        jobId,
        read: false,
        isRead: false,
        createdAt: serverTimestamp(),
      });

      // ── 5. Send hire card into RTDB chat ────────────────────────────────
      if (rtdb) {
        const msgId = uuidv4();
        const now = Date.now();

        // Write the job-card message — ChatPage reads type:"job" and renders the purple hire card
        await set(ref(rtdb, `chats/${chatId}/messages/${msgId}`), {
          id: msgId,
          senderId: currentUid,
          receiverId: freelancerId,
          type: "job",
          jobData,
          timestamp: now,
          status: "sent",
          reactions: {},
        });

        // Update userChats for both sides so the conversation appears in their lists
        const lastMsgMeta = JSON.stringify({ jobId, messageId: msgId, title: jobData.title });
        await update(ref(rtdb, `userChats/${currentUid}/${chatId}`), {
          withUid: freelancerId,
          otherName: freelancerName,
          otherImage: userData?.profile_image || userData?.profileImage || "",
          lastMessage: `[Job] ${lastMsgMeta}`,
          lastMessageTime: now,
        });
        await update(ref(rtdb, `userChats/${freelancerId}/${chatId}`), {
          withUid: currentUid,
          otherName: clientName,
          otherImage: clientImage,
          lastMessage: `[Job] ${lastMsgMeta}`,
          lastMessageTime: now,
        });

        // Write to myWorks so ChatPage tracks accept/decline state
        await fsSetDoc(doc(db, "myWorks", uuidv4()), {
          jobId,
          jobData,
          status: "sent",
          senderId: currentUid,
          receiverId: freelancerId,
          chatId,
          messageId: msgId,
          sentAt: now,
        });
      }

      setHireState("sent");
      setHireModalOpen(false);
      showToast("Hire request sent! 🎉", "#15975A");
    } catch (err) {
      console.error("Hire error:", err);
      showToast("Failed to send request", "red");
    }
    setHireLoading(false);
  };

  // ── Message ────────────────────────────────────────────────────────────────
  const handleMessage = () => {
    if (!currentUid || !serviceData) return;
    // Prefer userData.id if we fetched it, otherwise fallback
    const freelancerId = userData?.id || serviceData.userId || serviceData.uid || serviceData.freelancerId || "";
    if (!freelancerId) {
      showToast("Cannot message: User ID not found.", "red");
      return;
    }
    const posterFirst = userData?.first_name || userData?.firstName || "";
    const posterLast = userData?.last_name || userData?.lastName || "";
    const posterName = `${posterFirst} ${posterLast}`.trim() || "Freelancer";
    navigate("/client-dashbroad2/messages", {
      state: { startChatWith: freelancerId },
    });
  };

  // ── Share ──────────────────────────────────────────────────────────────────
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) navigator.share({ title: serviceData?.title, url });
    else { await navigator.clipboard.writeText(url); showToast("Link copied!", "#0070B8"); }
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  if (loading) return <Spinner />;
  if (notFound || !serviceData) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>❌</div>
      <div style={{ fontSize: 16, color: "#555" }}>Service not found</div>
      <button onClick={() => navigate(-1)} style={{ marginTop: 20, background: "#6C3EEB", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontWeight: 600 }}>
        Go Back
      </button>
    </div>
  );

  // ── Derived values ─────────────────────────────────────────────────────────
  const {
    title = "", category = "", description = "", clientRequirements = "",
    timeline = "", deliveryDuration = "", skills = [], tools = [],
    budget_from, budget_to, is24Hour = false, sampleProjectUrl = "",
    faqs = [], createdAt, impressions = 0, location: svcLocation = "",
  } = serviceData;

  const timelineDisplay = timeline || deliveryDuration || "";
  const budgetFromFmt = formatAmount(budget_from);
  const budgetToFmt = formatAmount(budget_to);
  const budgetDisplay = budgetFromFmt && budgetToFmt
    ? `${budgetFromFmt} – ${budgetToFmt}`
    : budgetFromFmt || budgetToFmt || "Negotiable";

  const createdDate = createdAt?.toDate ? createdAt.toDate() : createdAt ? new Date(createdAt) : null;
  const postedAgo = timeAgo(createdDate);
  const is24HourSvc = is24Hour || serviceData._collection === "service_24h";

  // Poster
  const posterFirst = userData?.first_name || userData?.firstName || "";
  const posterLast = userData?.last_name || userData?.lastName || "";
  const posterName = `${posterFirst} ${posterLast}`.trim() || userData?.displayName || "Freelancer";
  const posterTitle = userData?.professional_title || userData?.title || "Freelancer";
  const posterImage = userData?.profile_image || userData?.profileImage || userData?.photoURL || "";
  const posterRating = userData?.rating || userData?.averageRating || null;
  const completedProj = userData?.completedProjects ?? userData?.completed_projects ?? 0;
  const experience = userData?.experience || userData?.yearsOfExperience || "";
  const onTimeRate = userData?.onTimeRate || userData?.on_time_rate || "";
  const isTopRated = userData?.isTopRated || userData?.top_rated || false;
  const posterInitials = posterName.split(" ").map(w => w[0]).filter(Boolean).join("").toUpperCase().slice(0, 2) || "FL";

  // Portfolio & reviews from user data
  const portfolioItems = Array.isArray(userData?.portfolio) ? userData.portfolio : [];
  const PORTFOLIO_COLORS = [
    { bg: "#EDE9FF", text: "#6C3EEB", icon: "🛒" },
    { bg: "#E3EEFF", text: "#2D6EF6", icon: "📊" },
    { bg: "#E6F9F0", text: "#0F8A50", icon: "✈️" },
    { bg: "#FFFADF", text: "#9A7A00", icon: "💰" },
  ];
  const reviewItems = Array.isArray(userData?.reviews) ? userData.reviews : [];

  const AVATAR_COLORS = ["#7C3AED", "#2563EB", "#DB2777", "#EA580C", "#059669"];
  const avatarColor = AVATAR_COLORS[posterName.length % AVATAR_COLORS.length];

  return (
    <div style={{ background: "#F7F7FB", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .sdm-hire-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .sdm-msg-btn:hover  { background: #F4F0FF !important; }
        .sdm-back-btn:hover { background: #F0F0F0 !important; }
        .sdm-save-btn:hover { background: #EEE9FF !important; }
        .sdm-card { transition: box-shadow 0.2s; }
        .sdm-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07) !important; }
      `}</style>

      {/* ── TOP BAR ──────────────────────────────────────────────────────── */}
      <div style={{ background: "white", borderBottom: "1px solid #EBEBF0", padding: "14px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
        <button className="sdm-back-btn" onClick={() => navigate(-1)} style={{ display: "flex", alignItems: "center", gap: 8, background: "#F5F5F8", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", color: "#1A1433", fontWeight: 600, fontSize: 14, transition: "background 0.2s" }}>
          <ArrowLeft size={16} /> Back
        </button>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="sdm-save-btn" onClick={toggleSave} style={{ display: "flex", alignItems: "center", gap: 6, background: isSaved ? "#F4F0FF" : "#F5F5F8", border: isSaved ? "1.5px solid #C4B5FD" : "1px solid #E0E0E8", borderRadius: 8, padding: "8px 16px", cursor: "pointer", color: isSaved ? "#6C3EEB" : "#444", fontWeight: 600, fontSize: 14, transition: "all 0.2s" }}>
            {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            {isSaved ? "Saved" : "Save"}
          </button>
          <button onClick={handleShare} style={{ display: "flex", alignItems: "center", gap: 6, background: "#F5F5F8", border: "1px solid #E0E0E8", borderRadius: 8, padding: "8px 16px", cursor: "pointer", color: "#444", fontWeight: 600, fontSize: 14 }}>
            <Share2 size={16} /> Share
          </button>
        </div>
      </div>

      {/* ── BODY GRID ─────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "32px 20px", display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }}>

        {/* ═══════════════ LEFT COLUMN ═══════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Profile hero card */}
          <div className="sdm-card" style={{ background: "white", borderRadius: 18, border: "1px solid #EBEBF0", padding: "36px 32px 28px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", textAlign: "center" }}>
            {/* Avatar */}
            {posterImage ? (
              <img src={posterImage} alt={posterName} style={{ width: 88, height: 88, borderRadius: "50%", objectFit: "cover", marginBottom: 14, border: "3px solid #EDE9FF" }} />
            ) : (
              <div style={{ width: 88, height: 88, borderRadius: "50%", background: avatarColor, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 700, margin: "0 auto 14px auto" }}>
                {posterInitials}
              </div>
            )}

            {/* Name + title */}
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1A1433", margin: "0 0 4px 0" }}>{posterName}</h1>
            <div style={{ fontSize: 14, color: "#6B6B8A", marginBottom: 14 }}>{posterTitle}</div>

            {/* Badges */}
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
              {posterRating && (
                <span style={{ background: "#FFFADF", color: "#9A7A00", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                  <Star size={11} fill="#9A7A00" /> {Number(posterRating).toFixed(1)}
                </span>
              )}
              {isTopRated && (
                <span style={{ background: "#E6F9F0", color: "#0F8A50", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>Top Rated</span>
              )}
              {is24HourSvc && (
                <span style={{ background: "#FFF0F0", color: "#D93030", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>⚡ 24hr</span>
              )}
              <span style={{ background: "#E8F1FF", color: "#2D6EF6", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>Available</span>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", justifyContent: "center", gap: 0, borderTop: "1px solid #F0F0F5", paddingTop: 20 }}>
              {[
                { label: "Projects", value: completedProj || serviceCount },
                { label: "Per Day", value: budgetFromFmt || budgetToFmt || "—" },
                { label: "Exp.", value: experience || "—" },
                { label: "On Time", value: onTimeRate || "—" },
              ].filter(s => s.value && s.value !== "—" || s.label === "Projects").map((stat, i, arr) => (
                <div key={i} style={{ flex: 1, textAlign: "center", borderRight: i < arr.length - 1 ? "1px solid #F0F0F5" : "none", padding: "0 12px" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#1A1433" }}>{stat.value}</div>
                  <div style={{ fontSize: 11, color: "#8A8599", marginTop: 3, fontWeight: 500 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Service info (title, category, budget) if different from poster */}
          {title && (
            <div className="sdm-card" style={{ background: "white", borderRadius: 18, border: "1px solid #EBEBF0", padding: "24px 28px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                <span style={{ background: "#EDE9FF", color: "#6C3EEB", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{category || "Service"}</span>
                {postedAgo && <span style={{ background: "#F4F4F8", color: "#8A8599", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>🕐 {postedAgo}</span>}
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1A1433", margin: "0 0 8px 0" }}>{title}</h2>
              {sampleProjectUrl && (
                <a href={sampleProjectUrl} target="_blank" rel="noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "#6C3EEB", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
                  <ExternalLink size={13} /> View Sample Project
                </a>
              )}
            </div>
          )}

          {/* About */}
          {(description || clientRequirements) && (
            <div className="sdm-card" style={{ background: "white", borderRadius: 18, border: "1px solid #EBEBF0", padding: "24px 28px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#8A8599", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>About</div>
              {description && <p style={{ fontSize: 14, color: "#444", lineHeight: 1.7, margin: "0 0 12px 0" }}>{description}</p>}
              {clientRequirements && (
                <>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#8A8599", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, marginTop: 16 }}>Requirements</div>
                  <p style={{ fontSize: 14, color: "#444", lineHeight: 1.7, margin: 0 }}>{clientRequirements}</p>
                </>
              )}
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
          {portfolioItems.length > 0 && (
            <div className="sdm-card" style={{ background: "white", borderRadius: 18, border: "1px solid #EBEBF0", padding: "24px 28px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#8A8599", letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>Portfolio</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                {portfolioItems.map((item, i) => {
                  const p = typeof item === "string"
                    ? { title: item, ...PORTFOLIO_COLORS[i % PORTFOLIO_COLORS.length] }
                    : { ...PORTFOLIO_COLORS[i % PORTFOLIO_COLORS.length], ...item };
                  return (
                    <div key={i} style={{ background: p.bg || p.color || "#F0F0FF", borderRadius: 12, padding: "28px 20px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: p.text || p.textColor || "#444", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "transform 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    >
                      {p.icon && <span>{p.icon}</span>} {p.title}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* FAQs */}
          {faqs.length > 0 && (
            <div className="sdm-card" style={{ background: "white", borderRadius: 18, border: "1px solid #EBEBF0", padding: "24px 28px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#8A8599", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>FAQs</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {faqs.map((faq, i) => (
                  <div key={i} style={{ borderLeft: "3px solid #6C3EEB", paddingLeft: 16 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1433", marginBottom: 6 }}>{faq.question}</div>
                    <div style={{ fontSize: 13, color: "#6B6B8A", lineHeight: 1.6 }}>{faq.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Reviews */}
          {reviewItems.length > 0 && (
            <div className="sdm-card" style={{ background: "white", borderRadius: 18, border: "1px solid #EBEBF0", padding: "24px 28px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#8A8599", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>Recent Reviews</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {reviewItems.map((rev, i) => {
                  const rName = rev.reviewerName || "Client";
                  const rInit = rName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
                  const rColor = AVATAR_COLORS[i % AVATAR_COLORS.length];
                  return (
                    <div key={i} style={{ padding: "16px 0", borderBottom: i < reviewItems.length - 1 ? "1px solid #F0F0F5" : "none" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <div style={{ width: 34, height: 34, borderRadius: "50%", background: rColor, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                            {rInit}
                          </div>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1433" }}>{rName}</div>
                            {rev.project && <div style={{ fontSize: 12, color: "#8A8599" }}>{rev.project}</div>}
                          </div>
                        </div>
                        <div style={{ color: "#F5A623", fontSize: 14, letterSpacing: 2 }}>
                          {"★".repeat(Math.min(rev.rating || 5, 5))}
                        </div>
                      </div>
                      <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>{rev.review || rev.text}</div>
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
                {budgetFromFmt || budgetToFmt || "Negotiable"}
              </div>
              {timelineDisplay && <div style={{ fontSize: 13, color: "#8A8599", marginTop: 4 }}>per {timelineDisplay.toLowerCase().includes("day") ? "day" : "project"}</div>}
            </div>

            {/* Hire CTA */}
            {hireState === null && (
              <button
                className="sdm-hire-btn"
                onClick={() => setHireModalOpen(true)}
                style={{ width: "100%", background: "linear-gradient(90deg,#6C3EEB,#9A5CFF)", color: "white", border: "none", padding: "13px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s" }}
              >
                Hire {posterFirst || "Freelancer"} →
              </button>
            )}
            {hireState === "sent" && (
              <button disabled style={{ width: "100%", background: "#E8E8F0", color: "#888", border: "none", padding: "13px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "not-allowed", marginBottom: 10 }}>
                ✓ Request Sent
              </button>
            )}
            {hireState === "accepted" && (
              <button
                className="sdm-hire-btn"
                onClick={handleMessage}
                style={{ width: "100%", background: "linear-gradient(90deg,#15975A,#0DBD6D)", color: "white", border: "none", padding: "13px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 10, transition: "all 0.2s" }}
              >
                💬 Start Chat
              </button>
            )}

            {/* Message button */}
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
                { icon: "⚡", text: "Responds within 2 hours" },
                is24HourSvc && { icon: "🏎️", text: "Delivers in 24 hours" },
                svcLocation && { icon: "📍", text: svcLocation },
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

      {/* ── Hire modal ────────────────────────────────────────────────────── */}
      <HireModal
        open={hireModalOpen}
        onClose={() => setHireModalOpen(false)}
        onConfirm={handleConfirmHire}
        posterName={posterName}
        serviceTitle={title}
        loading={hireLoading}
      />

      <Toast message={toast.msg} color={toast.color} onDone={() => setToast({ msg: "", color: "#333" })} />
    </div>
  );
}