import React, { useEffect, useMemo, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import message from "../assets/message.png";
import notification from "../assets/notification.png";
import backarrow from "../assets/backarrow.png";
import searchIcon from "../assets/search.png";
import clock from "../assets/clock.png";
import impression from "../assets/Impression.png";
import arrow from "../assets/arrow.png";
import { FiBell, FiPlus, FiUser, FiBookmark, FiCode, FiLayout, FiCalendar, FiFolder, FiSettings, FiLogOut } from "react-icons/fi";
import { Search, Sparkles, Bell, ChevronLeft } from "lucide-react";
import Searchjob from "../assets/Searchjob.png";
import SecondarySidebar from "./SecondarySidebar";
import TopNavbar from "../components/TopNavbar";
import ProfileHeader from "../components/ProfileHeader";

export default function ApplicationStatusScreen() {
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to log out?")) return;
    try {
      await auth.signOut();
      navigate("/firelogin");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const handleSidebarClick = (tabId) => {
    switch (tabId) {
      case "Profile Summary":
        navigate("/freelance-dashboard/accountfreelancer", { state: { activeTab: "Profile Summary" } });
        break;
      case "Saved":
        navigate("/freelance-dashboard/sidebarsaved");
        break;
      case "My Services":
        navigate("/freelance-dashboard/accountfreelancer", { state: { activeTab: "My Services" } });
        break;
      case "My Works":
        navigate("/freelance-dashboard/freelancermyworks");
        break;
      case "Paused Services":
        navigate("/freelance-dashboard/accountfreelancer", { state: { activeTab: "Paused Services" } });
        break;
      case "Application Status":
        navigate("/freelance-dashboard/applicationstatus");
        break;
      case "Notifications":
        navigate("/freelance-dashboard/notifications");
        break;
      case "Account Settings":
        navigate("/freelance-dashboard/settings");
        break;
      case "Sign Out":
        handleLogout();
        break;
      default:
        break;
    }
  };

  const [selectedTab, setSelectedTab] = useState("Applied");
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [handledNotifs, setHandledNotifs] = useState({});
  const [generalNotifications, setGeneralNotifications] = useState([]);
  const [acceptedNotifications, setAcceptedNotifications] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebar-collapsed") === "true"
  );

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const CONTENT_WIDTH = isMobile ? "96%" : "calc(100% - 64px)";
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const notifications = useMemo(() => {
    const filteredGeneral = generalNotifications.filter(
      (n) => handledNotifs[n.id] !== "declined"
    );
    const combined = [...filteredGeneral, ...acceptedNotifications];
    return combined.sort((a, b) => {
      const timeA = a.timestamp?.seconds || 0;
      const timeB = b.timestamp?.seconds || 0;
      return timeB - timeA;
    });
  }, [generalNotifications, acceptedNotifications, handledNotifs]);

  const notifCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "notifications"),
      where("freelancerId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setGeneralNotifications(items);
    });

    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "accepted_jobs"),
      where("freelancerId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      const items = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        type: "application_accepted",
      }));
      setAcceptedNotifications(items);
    });

    return unsubscribe;
  }, [user]);

  const handleNotificationClick = async (notif) => {
    try {
      if (!notif.read && notif.type !== "application_accepted") {
        await updateDoc(doc(db, "notifications", notif.id), { read: true });
      }

      setNotifOpen(false);

      if (notif.type === "application_accepted") {
        navigate(`/freelance-dashboard/job-full/${notif.jobId}`);
      } else if (notif.type === "message") {
        navigate("/freelance-dashboard/freelancermessages", {
          state: { otherUid: notif.clientUid },
        });
      }
    } catch (err) {
      console.error("Notification error", err);
    }
  };

  const acceptNotif = async (item) => {
    try {
      await updateDoc(doc(db, "notifications", item.id), {
        read: true,
        status: "accepted",
      });

      setHandledNotifs((prev) => ({ ...prev, [item.id]: "accepted" }));

      setNotifOpen(false);

      navigate("/freelance-dashboard/freelancermessages", {
        state: { otherUid: item.clientUid || item.clientId },
      });
    } catch (err) {
      console.error("Accept error", err);
    }
  };

  const declineNotif = async (item) => {
    try {
      await updateDoc(doc(db, "notifications", item.id), {
        read: true,
        status: "declined",
      });

      setHandledNotifs((prev) => ({ ...prev, [item.id]: "declined" }));
    } catch (err) {
      console.error("Decline error", err);
    }
  };

  useEffect(() => {
    function handleToggle(e) {
      setCollapsed(e.detail);
    }
    window.addEventListener("sidebar-toggle", handleToggle);
    return () => window.removeEventListener("sidebar-toggle", handleToggle);
  }, []);

  const viewDetails = (job) => {
    navigate(`/freelance-dashboard/jobdetailsscreen/${job.id}`);
  };

  const startChat = (job) => {
    navigate("/chat", {
      state: {
        currentUid: user.uid,
        otherUid: job.clientId,
        otherName: job.clientName || "Client",
        otherImage: job.clientImage || "",
        initialMessage: "Hello! I have accepted your project. Let's begin!",
      },
    });
  };

  const fetchUserProfile = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) setProfile(snap.data());
    } catch (e) {
      console.log("Profile fetch error:", e);
    }
  };

  const fetchClientDetails = async (clientId) => {
    try {
      const snap = await getDoc(doc(db, "users", clientId));
      return snap.exists() ? snap.data() : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (!user) return;

    fetchUserProfile(user.uid);
    setLoading(true);

    const showAccepted = selectedTab === "Accepted";
    const notifRef = collection(db, "notifications");

    const qNotif = query(
      notifRef,
      where("freelancerId", "==", user.uid),
      where("read", "==", showAccepted)
    );

    const unsubNotif = onSnapshot(qNotif, async (notifSnap) => {
      const jobIds = [...new Set(notifSnap.docs.map((d) => d.data().jobId))];
      if (jobIds.length === 0) {
        setJobs([]);
        setLoading(false);
        return;
      }

      const jobCollection = activeTab === 0 ? "jobs" : "jobs_24h";

      const unsubJobs = onSnapshot(collection(db, jobCollection), async (jobsSnap) => {
        const clientCache = {};
        const list = [];

        for (const d of jobsSnap.docs) {
          if (!jobIds.includes(d.id)) continue;

          const job = { id: d.id, ...d.data() };
          const notif = notifSnap.docs.find((n) => n.data().jobId === d.id)?.data();

          if (notif) {
            job.clientId = notif.clientUid;

            if (!clientCache[notif.clientUid]) {
              clientCache[notif.clientUid] = await fetchClientDetails(notif.clientUid);
            }

            const client = clientCache[notif.clientUid];
            job.clientName = client?.Company_name || client?.first_name || "Client";
            job.clientImage =
              client?.profileImage ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
          }

          list.push(job);
        }

        setJobs(list);
        setLoading(false);
      });

      return () => unsubJobs();
    });

    return () => unsubNotif();
  }, [selectedTab, activeTab, user, db]);

  const filteredJobs = jobs.filter((j) =>
    (j.title || "").toLowerCase().includes(search)
  );

  if (!user) return <div style={{ padding: 20 }}>Please log in</div>;

  const containerStyle = {
    minHeight: "100vh",
    width: "100%",
    paddingBottom: 120,
    background: "#F7F7F9",
    overflowX: "hidden",
    paddingTop: 0,
    fontFamily: "'Inter', 'DM Sans', sans-serif",
  };

  let computedInitials = "U";
  if (profile) {
    const rawName = profile.name || profile.fullName || "";
    if (rawName) {
      const parts = rawName.trim().split(" ");
      if (parts.length >= 2) {
        computedInitials = (parts[0][0] + parts[1][0]).toUpperCase();
      } else {
        computedInitials = rawName.substring(0, 2).toUpperCase();
      }
    } else {
      let firstInit = profile.first_name?.[0] || profile.firstName?.[0] || "";
      let lastInit = profile.last_name?.[0] || profile.lastName?.[0] || "";
      if (firstInit || lastInit) {
        computedInitials = `${firstInit}${lastInit}`.toUpperCase();
      } else if (user?.email) {
        computedInitials = user.email.substring(0, 2).toUpperCase();
      }
    }
  }

  return (
    <div style={containerStyle}>
      {/* TOP HEADER */}
      <TopNavbar
        search={search}
        setSearch={setSearch}
        profileImage={profile?.profileImage}
        initials={computedInitials}
        onBack={() => navigate(-1)}
        isMobile={isMobile}
      />

      {/* MAIN CONTENT */}
      <div
        style={{
          padding: isMobile ? "20px" : "32px 40px",
          boxSizing: "border-box",
          width: "100%",
          maxWidth: 1380,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 24
        }}
      >
        <ProfileHeader 
          profile={profile} 
          projectCount={jobs.length} 
        />
        
        {/* TWO COLUMN LAYOUT: SECONDARY SIDEBAR + CONTENT */}
        <div style={{ display: "flex", gap: 24, flexDirection: isMobile ? "column" : "row", alignItems: "flex-start", marginTop: 32 }}>

          {/* SECONDARY SIDEBAR */}
          <SecondarySidebar
            activeTab="Application Status"
            onTabClick={handleSidebarClick}
          />

          {/* APPLICATION STATUS SECTION */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Toggles */}
            <div style={{ 
              display: "flex", 
              width: "100%", 
              maxWidth: 710, 
              height: 56, 
              borderRadius: 16, 
              background: "#fff", 
              border: "1px solid #E5E7EB", 
              padding: 4,
              marginBottom: 24 
            }}>
              <button
                onClick={() => setSelectedTab("Applied")}
                style={{
                  flex: 1,
                  borderRadius: 12,
                  border: selectedTab === "Applied" ? "1px solid #E5E7EB" : "none",
                  background: selectedTab === "Applied" ? "#fff" : "transparent",
                  color: selectedTab === "Applied" ? "#111" : "#6B7280",
                  fontWeight: 600,
                  fontSize: 18,
                  cursor: "pointer",
                  boxShadow: selectedTab === "Applied" ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
                  transition: "all 0.2s"
                }}
              >
                Applied
              </button>
              <button
                onClick={() => setSelectedTab("Accepted")}
                style={{
                  flex: 1,
                  borderRadius: 12,
                  border: "none",
                  background: selectedTab === "Accepted" ? "#8B5CF6" : "transparent",
                  color: selectedTab === "Accepted" ? "#fff" : "#6B7280",
                  fontWeight: 600,
                  fontSize: 18,
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                Accepted
              </button>
            </div>

            {/* Sub-filters */}
            <div style={{ display: "flex", gap: 16, marginBottom: 24, alignItems: "center" }}>
              {[
                { label: "Work", index: 0 },
                { label: "24 Hour", index: 1 },
                { label: "Saved", index: 2 }
              ].map((tab) => (
                <div
                  key={tab.label}
                  onClick={() => setActiveTab(tab.index)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: 999,
                    cursor: "pointer",
                    background: activeTab === tab.index ? "#8B5CF6" : "transparent",
                    color: activeTab === tab.index ? "#fff" : "#9CA3AF",
                    fontWeight: 600,
                    fontSize: 12,
                    transition: "all 0.2s"
                  }}
                >
                  {tab.label}
                </div>
              ))}
            </div>

            {/* Categories */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32, alignItems: "center" }}>
              {[
                { label: "All", active: true },
                { label: "UI Design", active: false },
                { label: "Branding", active: false },
                { label: "Mobile Apps", active: false },
                { label: "SaaS", active: false },
                { label: "Web Design", active: false }
              ].map((cat) => (
                <div
                  key={cat.label}
                  style={{
                    padding: "6px 16px",
                    borderRadius: 999,
                    cursor: "pointer",
                    background: cat.active ? "#3B82F6" : "transparent",
                    color: cat.active ? "#fff" : "#6B7280",
                    fontWeight: 600,
                    fontSize: 13,
                    transition: "all 0.2s"
                  }}
                >
                  {cat.label}
                </div>
              ))}
            </div>

            {/* Jobs Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: 24
            }}>
              {filteredJobs.length > 0 ? filteredJobs.map((job, idx) => (
                <ApplicationJobCard 
                  key={job.id || idx} 
                  job={job} 
                  selectedTab={selectedTab} 
                  onViewDetails={() => viewDetails(job)} 
                  onStartChat={() => startChat(job)} 
                />
              )) : (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#9CA3AF" }}>No jobs found</div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ---------------------------
// APPLICATION JOB CARD COMPONENT
// ---------------------------
function ApplicationJobCard({ job, selectedTab, onViewDetails, onStartChat }) {
  const isAccepted = selectedTab === "Accepted";
  
  const companyInitials = (job.clientName || "Company").substring(0, 2).toUpperCase();
  const colors = ["#8B5CF6", "#10B981", "#F59E0B", "#EC4899", "#3B82F6"];
  const color = colors[(job.clientName?.length || 0) % colors.length];

  return (
    <div
      onClick={onViewDetails}
      style={{
        background: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: 16,
        padding: 24,
        cursor: "pointer",
        transition: "all 0.2s ease",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Header: Logo, Company Name, Bookmark */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16 }}>
            {companyInitials}
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>{job.clientName || "Creativo Studio"}</div>
            <div style={{ fontSize: 12, color: "#6B7280" }}>{job.clientIndustry || "Design Agency"}</div>
          </div>
        </div>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", color: "#6B7280" }}>
          <FiBookmark size={16} />
        </div>
      </div>

      {/* Job Title and Description */}
      <div>
        <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px 0", color: "#111" }}>
          {job.title || "Senior Product Designer"}
        </h3>
        <p style={{ fontSize: 13, color: "#4B5563", margin: 0, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {job.des || job.description || "Join our creative team to build next-gen digital products with a focus on mobile-first design and user research."}
        </p>
      </div>

      {/* Budget & Timeline */}
      <div style={{ display: "flex", gap: 32 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Budget</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#8B5CF6" }}>₹{job.budget || "1000"} - ₹{job.maxBudget || "5000"}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Timeline</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{job.timeline || "2-3 Weeks"}</div>
        </div>
      </div>

      {/* Skills */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {(job.Skills || job.skills || ["Figma", "Prototyping", "UX", "Design Systems"]).slice(0, 4).map((s, idx) => {
           const tagColors = [
             { bg: "#FDF2F8", color: "#EC4899" },
             { bg: "#EFF6FF", color: "#3B82F6" },
             { bg: "#F3E8FF", color: "#8B5CF6" },
             { bg: "#ECFDF5", color: "#10B981" }
           ];
           const tc = tagColors[idx % tagColors.length];
           return (
            <span key={idx} style={{ background: tc.bg, color: tc.color, padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 600 }}>
              {s}
            </span>
          )
        })}
      </div>

      {/* Footer: Remote, Time, Action Button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ background: "#EFF6FF", color: "#3B82F6", padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 600 }}>
            Remote
          </span>
          <span style={{ fontSize: 12, color: "#9CA3AF" }}>
            {job.created_at?.seconds ? "1h ago" : "5m ago"}
          </span>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isAccepted) onStartChat();
          }}
          style={{
            padding: "8px 24px",
            borderRadius: 999,
            border: "none",
            background: "#8B5CF6",
            color: "#fff",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          {selectedTab === "Accepted" ? "Accepted" : "View Details"}
        </button>
      </div>
    </div>
  );
}
