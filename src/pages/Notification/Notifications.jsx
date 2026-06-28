// Notifications.jsx — Freelancer notifications screen (DB-driven)
// Fetches from `freelancer_notifications` where freelancerId == currentUser.uid
// Shows hire requests from clients, application updates, messages, etc.

import React, { useState, useEffect } from "react";
import { Search, MessageSquare, Star, Briefcase, Bell, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  collection, query, where, orderBy, onSnapshot,
  updateDoc, doc, getDoc, serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firbase/Firebase";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function timeAgo(ts) {
  if (!ts) return "";
  const date = ts?.toDate ? ts.toDate() : new Date(ts);
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60)    return "just now";
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  const d = Math.floor(diff / 86400);
  return `${d} day${d > 1 ? "s" : ""} ago`;
}

const AVATAR_COLORS = ["#7C3AED", "#2563EB", "#DB2777", "#EA580C", "#059669"];
const getColor = (str = "") => AVATAR_COLORS[str.length % AVATAR_COLORS.length];
const getInitials = (name = "") =>
  name.split(" ").map((w) => w[0]).filter(Boolean).join("").toUpperCase().slice(0, 2) || "?";

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ tab }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "80px 24px", gap: 16,
    }}>
      <div style={{ fontSize: 52 }}>
        {tab === "Hiring" ? "📬" : tab === "Messages" ? "💬" : "🔔"}
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#1A1433" }}>
        No {tab === "All" ? "" : tab + " "}notifications yet
      </div>
      <div style={{ fontSize: 13, color: "#8A8599", textAlign: "center", maxWidth: 300 }}>
        When clients send hire requests or updates, they'll appear here.
      </div>
    </div>
  );
}

// ─── Notification Card ─────────────────────────────────────────────────────────
function NotifCard({ n, onMarkRead, onViewJob, onChat }) {
  const initials = getInitials(n.clientName || n.senderName || "");
  const color    = getColor(n.clientName || n.senderName || "");
  const isUnread = !n.read && !n.isRead;

  const isHire    = n.type === "hire_request";
  const isMessage = n.type === "message" || n.type === "chat";
  const isAI      = n.type === "ai" || n.type === "ai_match";

  const title = n.title ||
    (isHire    ? `${n.clientName || "A client"} wants to hire you`  :
     isMessage ? `New message from ${n.clientName || "someone"}` :
     n.type);

  const body = n.message || n.body ||
    (isHire    ? `For "${n.jobTitle || n.serviceTitle || "your service"}"` : "");

  return (
    <div
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "white", border: `1px solid ${isUnread ? "#C4B5FD" : "#E5E7EB"}`,
        borderLeft: isUnread ? "4px solid #7C4EF5" : "4px solid transparent",
        borderRadius: 14, padding: "18px 20px", gap: 16,
        boxShadow: isUnread ? "0 2px 12px rgba(124,62,255,0.06)" : "none",
        transition: "box-shadow 0.2s",
        cursor: "pointer",
      }}
      onClick={() => { if (isUnread) onMarkRead(n.id); }}
    >
      {/* Left side */}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", flex: 1, minWidth: 0 }}>
        {/* Avatar / Icon */}
        {isAI ? (
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#F5F3FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Star size={20} color="#7C4EF5" />
          </div>
        ) : isMessage ? (
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <MessageSquare size={18} color="#D97706" />
          </div>
        ) : (
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "white", fontWeight: 700, fontSize: 15 }}>
            {initials}
          </div>
        )}

        {/* Text */}
        <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", fontFamily: "'DM Sans', sans-serif" }}>
            {title}
            {isUnread && (
              <span style={{ marginLeft: 8, display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#7C4EF5", verticalAlign: "middle" }} />
            )}
          </div>
          {body && (
            <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>{body}</div>
          )}
          {/* Hire: show service/job name */}
          {isHire && (n.jobTitle || n.serviceTitle) && (
            <div style={{ fontSize: 12, color: "#8B5CF6", fontWeight: 600, marginTop: 2 }}>
              📋 {n.jobTitle || n.serviceTitle}
            </div>
          )}
          <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{timeAgo(n.createdAt || n.timestamp)}</div>
        </div>
      </div>

      {/* Right: action buttons */}
      <div style={{ display: "flex", gap: 8, flexShrink: 0, flexDirection: "column", alignItems: "flex-end" }}>
        {isHire && (
          <button
            onClick={(e) => { e.stopPropagation(); onViewJob(n); }}
            style={{
              background: "#7C4EF5", color: "white", border: "none",
              padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600,
              cursor: "pointer", whiteSpace: "nowrap",
            }}
          >
            View Request
          </button>
        )}
        {isMessage && (
          <button
            onClick={(e) => { e.stopPropagation(); onChat(n); }}
            style={{
              background: "white", color: "#4B5563", border: "1px solid #E5E7EB",
              padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}
          >
            Reply
          </button>
        )}
        {!isHire && !isMessage && (
          <span style={{ fontSize: 11, color: "#9CA3AF" }}>{timeAgo(n.createdAt || n.timestamp)}</span>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Notifications() {
  const navigate = useNavigate();
  const auth     = getAuth();

  const [activeTab,     setActiveTab]     = useState("All");
  const [notifications, setNotifications] = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [search,        setSearch]        = useState("");

  const tabs = ["All", "Hiring", "Messages", "System"];

  // ── Fetch from freelancer_notifications ─────────────────────────────────────
  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((user) => {
      if (!user) { setLoading(false); return; }

      const q = query(
        collection(db, "freelancer_notifications"),
        where("freelancerId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const unsub = onSnapshot(q, (snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setNotifications(data);
        setLoading(false);
      }, (err) => {
        console.error("Notifications fetch error:", err);
        setLoading(false);
      });

      return () => unsub();
    });
    return () => unsubAuth();
  }, []);

  // ── Mark read ────────────────────────────────────────────────────────────────
  const handleMarkRead = async (id) => {
    try {
      await updateDoc(doc(db, "freelancer_notifications", id), { read: true, isRead: true });
    } catch (e) {
      console.error("Mark read error:", e);
    }
  };

  // ── View hire request → navigate to chat with job card context ────────────
  const handleViewJob = async (n) => {
    const currentUid = auth.currentUser?.uid;
    if (!n.clientId || !currentUid) return;

    // Try to get client name
    let clientName = n.clientName || "Client";
    try {
      const snap = await getDoc(doc(db, "users", n.clientId));
      if (snap.exists()) {
        const d = snap.data();
        clientName = `${d.first_name || d.firstName || ""} ${d.last_name || d.lastName || ""}`.trim() || clientName;
      }
    } catch {}

    // Mark as read
    await handleMarkRead(n.id);

    // Navigate to chat with client
    navigate("/chat", {
      state: {
        currentUid,
        otherUid:   n.clientId,
        otherName:  clientName,
      },
    });
  };

  const handleChat = (n) => {
    const currentUid = auth.currentUser?.uid;
    if (!currentUid) return;
    navigate("/chat", {
      state: {
        currentUid,
        otherUid:  n.clientId || n.senderId,
        otherName: n.clientName || n.senderName || "Client",
      },
    });
  };

  // ── Tab filter ───────────────────────────────────────────────────────────────
  const filtered = notifications.filter((n) => {
    const matchesSearch =
      !search ||
      (n.message || n.body || n.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (n.clientName || n.jobTitle || "").toLowerCase().includes(search.toLowerCase());

    const matchesTab =
      activeTab === "All" ? true :
      activeTab === "Hiring"   ? n.type === "hire_request" || n.type === "application_accepted" || n.type === "application_declined" :
      activeTab === "Messages" ? n.type === "message" || n.type === "chat" :
      activeTab === "System"   ? n.type === "system" || n.type === "ai" || n.type === "ai_match" :
      true;

    return matchesSearch && matchesTab;
  });

  const unreadCount = notifications.filter((n) => !n.read && !n.isRead).length;

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#FAFAFA", fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column" }}>

      {/* ── Top Search Bar ──────────────────────────────────────────────────── */}
      <div style={{ height: 70, borderBottom: "1px solid #F3F4F6", display: "flex", alignItems: "center", padding: "0 32px", background: "white", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", background: "#F9FAFB", borderRadius: 8, padding: "0 16px", height: 40, width: 400, border: "1px solid #F3F4F6" }}>
          <Search size={16} color="#9CA3AF" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: "none", background: "transparent", outline: "none", marginLeft: 8, width: "100%", fontSize: 13, color: "#111827" }}
          />
        </div>
        {unreadCount > 0 && (
          <span style={{ background: "#7C4EF5", color: "white", borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>
            {unreadCount} new
          </span>
        )}
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div style={{ padding: "32px", flex: 1, maxWidth: 860 }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: "0 0 4px 0", fontFamily: "'Sora', sans-serif" }}>
            Notifications
          </h1>
          <p style={{ fontSize: 13, color: "#9CA3AF", margin: 0 }}>
            Stay updated on hire requests, messages and project updates.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "inline-flex", background: "#F9FAFB", borderRadius: 8, padding: 4, gap: 4, marginBottom: 28 }}>
          {tabs.map((tab) => {
            const count = tab === "All" ? notifications.length
              : tab === "Hiring" ? notifications.filter((n) => n.type === "hire_request" || n.type === "application_accepted" || n.type === "application_declined").length
              : tab === "Messages" ? notifications.filter((n) => n.type === "message" || n.type === "chat").length
              : notifications.filter((n) => n.type === "system" || n.type === "ai" || n.type === "ai_match").length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "8px 18px", fontSize: 13, fontWeight: activeTab === tab ? 700 : 500,
                  color: activeTab === tab ? "#7C4EF5" : "#6B7280",
                  background: activeTab === tab ? "white" : "transparent",
                  border: "none", borderRadius: 6, cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: activeTab === tab ? "0 1px 3px rgba(0,0,0,0.05)" : "none",
                }}
              >
                {tab} {count > 0 && <span style={{ marginLeft: 4, background: activeTab === tab ? "#EDE9FF" : "#F0F0F5", color: activeTab === tab ? "#7C4EF5" : "#888", borderRadius: 10, padding: "1px 6px", fontSize: 11 }}>{count}</span>}
              </button>
            );
          })}
        </div>

        {/* List */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: 60 }}>
            <div style={{ width: 36, height: 36, border: "3px solid #7C4EF5", borderTopColor: "transparent", borderRadius: "50%", animation: "notif-spin 0.8s linear infinite" }} />
            <style>{`@keyframes notif-spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState tab={activeTab} />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map((n) => (
              <NotifCard
                key={n.id}
                n={n}
                onMarkRead={handleMarkRead}
                onViewJob={handleViewJob}
                onChat={handleChat}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
