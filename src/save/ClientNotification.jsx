import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firbase/Firebase";
import { useNavigate } from "react-router-dom";

export default function ClientNotification() {
  const [activeTab, setActiveTab] = useState("All");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const navigate = useNavigate();

  const tabs = ["All", "Applications", "Payments", "Reminders"];

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "notifications"),
      where("clientUid", "==", user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));

        // Sort in memory by timestamp descending
        list.sort((a, b) => {
          const timeA = a.timestamp?.toDate
            ? a.timestamp.toDate().getTime()
            : new Date(a.timestamp || 0).getTime();
          const timeB = b.timestamp?.toDate
            ? b.timestamp.toDate().getTime()
            : new Date(b.timestamp || 0).getTime();
          return timeB - timeA;
        });

        setNotifications(list);
        setLoading(false);
      },
      (err) => {
        console.error("Error listening to notifications:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [auth]);

  const timeAgo = (date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 0) return "Just now";
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  const getMappedNotif = (n) => {
    const title = n.title || "Notification";
    const body = n.body || "";
    const lowerTitle = title.toLowerCase();
    const lowerBody = body.toLowerCase();

    let icon = "🔔";
    let iconBg = "#F4F0FF";
    let tabGroup = "Reminders"; // default group

    if (
      n.type === "hire_request" ||
      n.type === "job_proposal" ||
      lowerTitle.includes("applied") ||
      lowerBody.includes("applied") ||
      lowerTitle.includes("proposal") ||
      lowerBody.includes("proposal") ||
      lowerTitle.includes("application") ||
      lowerBody.includes("application")
    ) {
      icon = "💼";
      iconBg = "#F4F0FF";
      tabGroup = "Applications";
    } else if (
      n.type === "payment" ||
      lowerTitle.includes("payment") ||
      lowerBody.includes("payment") ||
      lowerTitle.includes("released") ||
      lowerBody.includes("released") ||
      lowerTitle.includes("milestone") ||
      lowerBody.includes("milestone") ||
      lowerBody.includes("₹")
    ) {
      icon = "💰";
      iconBg = "#E8F1FF";
      tabGroup = "Payments";
    } else if (
      n.type === "draft" ||
      lowerTitle.includes("draft") ||
      lowerBody.includes("draft") ||
      lowerTitle.includes("incomplete") ||
      lowerBody.includes("incomplete") ||
      lowerTitle.includes("brief") ||
      lowerBody.includes("brief")
    ) {
      icon = "📝";
      iconBg = "#FFF8E5";
      tabGroup = "Reminders";
    } else if (
      n.type === "create_post" ||
      lowerTitle.includes("post") ||
      lowerBody.includes("post") ||
      lowerTitle.includes("live") ||
      lowerBody.includes("live") ||
      lowerTitle.includes("published") ||
      lowerBody.includes("published")
    ) {
      icon = "🎯";
      iconBg = "#FFF3EB";
      tabGroup = "Reminders";
    } else if (
      n.type === "reminder" ||
      lowerTitle.includes("reminder") ||
      lowerBody.includes("reminder")
    ) {
      icon = "⏰";
      iconBg = "#FFF8E5";
      tabGroup = "Reminders";
    }

    let timeStr = "Just now";
    if (n.timestamp) {
      const date = n.timestamp.toDate
        ? n.timestamp.toDate()
        : new Date(n.timestamp);
      timeStr = timeAgo(date);
    }

    return {
      ...n,
      icon,
      iconBg,
      tabGroup,
      timeStr,
      unread: !n.read,
    };
  };

  const handleMarkAllRead = async () => {
    const unreadList = notifications.filter((n) => !n.read);
    try {
      await Promise.all(
        unreadList.map((n) =>
          updateDoc(doc(db, "notifications", n.id), { read: true })
        )
      );
    } catch (err) {
      console.error("Error marking all read:", err);
    }
  };

  const handleNotificationClick = async (n) => {
    try {
      if (!n.read) {
        await updateDoc(doc(db, "notifications", n.id), { read: true });
      }
    } catch (err) {
      console.error("Error marking notification read:", err);
    }

    if (n.freelancerId && n.jobId) {
      navigate(
        `/client-dashbroad2/clientnotificationdetails/${n.freelancerId}/${n.jobId}`
      );
    } else if (n.jobId) {
      navigate(`/client-dashbroad2/my-hires/${n.jobId}`);
    }
  };

  const handleDeleteNotif = async (e, id) => {
    e.stopPropagation(); // Prevent click from triggering navigation
    try {
      await deleteDoc(doc(db, "notifications", id));
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  const mappedNotifications = notifications.map(getMappedNotif);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = mappedNotifications.filter((n) => {
    if (activeTab === "All") return true;
    return n.tabGroup === activeTab;
  });

  return (
    <div
      style={{
        background: "#FDFBFF",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Sora:wght@600;700&display=swap"
        rel="stylesheet"
      />

      {/* Main Container */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          background: "#FFFFFF",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 2px 20px rgba(0,0,0,0.02)",
          border: "1px solid #EBE5F2",
        }}
      >
        {/* Header Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "32px",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#1A1433",
                margin: "0 0 8px 0",
              }}
            >
              Notifications
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "#8A8599",
                margin: 0,
                fontWeight: 500,
              }}
            >
              {unreadCount} unread · Updated just now
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={handleMarkAllRead}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: "1px solid #EBE5F2",
                background: "white",
                fontSize: "13px",
                fontWeight: 700,
                color: "#1A1433",
                cursor: "pointer",
              }}
            >
              Mark all read
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
          {tabs.map((tab) => {
            const count =
              tab === "All"
                ? mappedNotifications.length
                : mappedNotifications.filter((n) => n.tabGroup === tab).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "8px 24px",
                  borderRadius: "24px",
                  border: activeTab === tab ? "1px solid #EBE5F2" : "none",
                  background: activeTab === tab ? "#FFFFFF" : "transparent",
                  color: activeTab === tab ? "#1A1433" : "#8A8599",
                  fontSize: "14px",
                  fontWeight: activeTab === tab ? 700 : 600,
                  cursor: "pointer",
                  boxShadow:
                    activeTab === tab ? "0 2px 8px rgba(0,0,0,0.04)" : "none",
                }}
              >
                {tab} ({count})
              </button>
            );
          })}
        </div>

        {/* Notifications List */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {loading && (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                color: "#8A8599",
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              Loading notifications...
            </div>
          )}

          {!loading && filteredNotifications.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 40px",
                color: "#8A8599",
                background: "#FAF9FC",
                borderRadius: "16px",
                border: "1px dashed #EBE5F2",
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              🎉 You're all caught up! No notifications here.
            </div>
          )}

          {!loading &&
            filteredNotifications.map((n, index) => (
              <div
                key={n.id}
                onClick={() => handleNotificationClick(n)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  padding: "24px 0",
                  borderBottom:
                    index !== filteredNotifications.length - 1
                      ? "1px solid #F4F0FF"
                      : "none",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                {/* Icon Container */}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: n.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    marginRight: "20px",
                    flexShrink: 0,
                  }}
                >
                  {n.icon}
                </div>

                {/* Text Content */}
                <div style={{ flex: 1, paddingRight: "40px", paddingTop: "2px" }}>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#1A1433",
                      margin: "0 0 6px 0",
                      fontFamily: "'Sora', sans-serif",
                    }}
                  >
                    {n.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#8A8599",
                      margin: "0 0 8px 0",
                      lineHeight: "1.5",
                      fontWeight: 500,
                    }}
                  >
                    {n.body}
                  </p>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#C4C1D4",
                      fontWeight: 600,
                    }}
                  >
                    {n.timeStr}
                  </span>
                </div>

                {/* Actions: Unread & Delete */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    alignSelf: "center",
                  }}
                >
                  {n.unread && (
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#8A5CFF",
                        flexShrink: 0,
                      }}
                    />
                  )}

                  <button
                    onClick={(e) => handleDeleteNotif(e, n.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#C4C1D4",
                      fontSize: "15px",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "color 0.2s, background 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = "#EF4444";
                      e.currentTarget.style.background = "#FEF2F2";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = "#C4C1D4";
                      e.currentTarget.style.background = "none";
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}