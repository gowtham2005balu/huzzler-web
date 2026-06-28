
// JobfullDetailScreen.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  collection,
  addDoc,
  onSnapshot,
  setDoc,
  query,
  where,
  limit,
  orderBy
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firbase/Firebase";
import { 
  Target, FileText, CheckCircle, Package, Sparkles, 
  Smartphone, Monitor, Palette, MousePointerClick, Folder, Layout, Zap, Star,
  Bookmark, Share2, MessageSquare, Rocket, Lightbulb
} from "lucide-react";

import { FiX, FiBookmark } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import share from "../assets/share.png";

const rubikFontStyle = { fontFamily: "'Rubik', sans-serif" };

export default function JobFullDetailJobScreen() {
  const { id: jobId, source } = useParams();
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsub();
  }, [auth]);

  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────────
  const [job, setJob] = useState(null);
  const [similarProjects, setSimilarProjects] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  const [applicationStatus, setApplicationStatus] = useState("none");
  const [acceptedAt, setAcceptedAt] = useState(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );


  const [screeningAnswers, setScreeningAnswers] = useState({});
  const [screeningError, setScreeningError] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);

  const [client, setClient] = useState(null);

  // ── Resize listener ────────────────────────────────────
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── Fetch single job detail (jobs first, then jobs_24h) ──
  useEffect(() => {
    if (!jobId) return;
    let unsub24h = null;

    const unsubJobs = onSnapshot(doc(db, "jobs", jobId), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setJob({
          id: snap.id,
          ...data,
          source: "jobs",
          screening_questions: data.screening_questions || [],
        });
        if (unsub24h) unsub24h();
      } else {
        unsub24h = onSnapshot(doc(db, "jobs_24h", jobId), (snap24) => {
          if (snap24.exists()) {
            const data24 = snap24.data();
            setJob({
              id: snap24.id,
              ...data24,
              source: "jobs_24h",
              screening_questions: data24.screening_questions || [],
            });
          } else {
            setJob(null);
          }
        });
      }
    });

    return () => {
      unsubJobs();
      if (unsub24h) unsub24h();
    };
  }, [jobId]);

  // ── Fetch Client Data ──────────────────────────────────
  useEffect(() => {
    if (!job?.userId) return;
    const unsub = onSnapshot(doc(db, "users", job.userId), (snap) => {
      if (snap.exists()) {
        setClient(snap.data());
      }
    });
    return () => unsub();
  }, [job?.userId]);

  // ── Fetch similarProjects (jobs collection) ──────────────
  useEffect(() => {
    if (!job?.category) return;
    const q = query(
      collection(db, "jobs"),
      where("category", "==", job.category),
      limit(4) // fetch 4 to ensure we have 3 after filtering out current job
    );
    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          ...data,
          source: "jobs",
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : null,
        };
      });
      const filtered = items.filter(j => j.id !== jobId).slice(0, 3);
      setSimilarProjects(filtered);
    });
    return () => unsub();
  }, [job?.category, jobId]);

  // ── Notifications ──────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(collection(db, "notifications"), (snap) => {
      const items = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((n) => n.clientUid === user.uid);
      setNotifications(items);
    });
    return unsub;
  }, [user]);

  // ── User favorites ─────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const unsub = onSnapshot(userRef, (snap) => {
      if (!snap.exists()) {
        setIsFavorite(false);
        setSavedJobs([]);
        return;
      }
      const favorites = snap.data().favoriteJobs || [];
      setIsFavorite(favorites.includes(jobId));
      setSavedJobs(favorites);
    });
    return () => unsub();
  }, [user, jobId]);

  // ── Application status ─────────────────────────────────
  useEffect(() => {
    if (!job || !user) return;
    if (job.freelancerId === user.uid && job.status === "accepted") {
      setApplicationStatus("accepted");
      setAcceptedAt(job.acceptedAt);
      return;
    }
    const hasApplied = (job.applicants || []).some(
      (a) => a.freelancerId === user.uid
    );
    setApplicationStatus(hasApplied ? "applied" : "none");
  }, [job, user]);


  // ── Handlers ───────────────────────────────────────────
  async function handleSave(e) {
    e?.stopPropagation();
    if (!user) {
      alert("Login required!");
      return;
    }
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, { favoriteJobs: [jobId] });
        return;
      }
      const favorites = userSnap.data().favoriteJobs || [];
      const alreadySaved = favorites.includes(jobId);
      await updateDoc(userRef, {
        favoriteJobs: alreadySaved ? arrayRemove(jobId) : arrayUnion(jobId),
      });
    } catch (error) {
      console.error("Save error:", error);
      alert("Something went wrong");
    }
  }

  async function handleApply(applyJobId, answersArray) {
    if (!user) return alert("Please login to apply");
    try {
      const userId = user.uid;
      const freelancerSnap = await getDoc(doc(db, "users", userId));
      const freelancer = freelancerSnap.data() || {};
      const freelancerName =
        `${freelancer.first_name || ""} ${freelancer.last_name || ""}`.trim();
      const freelancerImage = freelancer.profileImage || "";

      const jobRef = doc(db, job?.source || "jobs", applyJobId);
      const jobSnap = await getDoc(jobRef);
      const jobData = jobSnap.data() || {};

      if ((jobData.applicants || []).some((a) => a.freelancerId === userId)) {
        return alert("Already applied!");
      }

      await updateDoc(jobRef, {
        applicants: arrayUnion({
          freelancerId: userId,
          name: freelancerName,
          profileImage: freelancerImage,
          appliedAt: new Date().toISOString(),
          additional_info: "",
          screening_answers: answersArray,
        }),
        applicants_count: increment(1),
      });

      await addDoc(collection(db, "notifications"), {
        title: jobData.title,
        body: `${freelancerName} applied for ${jobData.title}`,
        freelancerName,
        freelancerImage,
        freelancerId: userId,
        jobTitle: jobData.title,
        jobId: applyJobId,
        clientUid: jobData.userId,
        timestamp: new Date(),
        serviceId: applyJobId,
        read: false,
      });

      alert("Applied successfully!");
    } catch (e) {
      console.error(e);
      alert("Error applying.");
    }
  }

  async function handleDeleteRequest() {
    if (!user) return alert("Please login first");
    if (applicationStatus === "none") return;

    if (!window.confirm("Are you sure you want to delete your application request?")) return;

    try {
      const jobRef = doc(db, job?.source || "jobs", job?.id);
      const jobSnap = await getDoc(jobRef);
      if (!jobSnap.exists()) return;

      const jobData = jobSnap.data();
      const currentApplicants = jobData.applicants || [];
      const newApplicants = currentApplicants.filter(a => a.freelancerId !== user.uid);

      if (currentApplicants.length === newApplicants.length) {
        return; // User wasn't in the list
      }

      await updateDoc(jobRef, {
        applicants: newApplicants,
        applicants_count: increment(-1),
      });

      alert("Application request deleted successfully");
    } catch (e) {
      console.error("Error deleting request:", e);
      alert("Error deleting application request.");
    }
  }

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: job?.title || "Project Details",
          text: `Check out this job: ${job?.title}`,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share canceled or failed", err);
        alert("Share couldn't complete");
      }
    } else {
      try {
        const tempInput = document.createElement("input");
        document.body.appendChild(tempInput);
        tempInput.value = shareUrl;
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Copy fallback failed", err);
        alert("Unable to copy link");
      }
    }
  };

  if (!job)
    return (
      <div style={{ textAlign: "center", marginTop: 80 }}>Loading...</div>
    );

  // ── JOB CARD ───────────────────────────────────────────
  const JobCard = ({ j }) => (
    <div
      onClick={() =>
        navigate(`/freelance-dashboard/job/${j.source}/${j.id}`)
      }
      style={{
        background: "#fff",
        border: "1px solid #eee",
        borderRadius: 14,
        padding: "16px 18px",
        marginBottom: 12,
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.2s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>
            {j.title}
          </div>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>
            {j.category}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 10,
            }}
          >
            {j.skills?.slice(0, 3).map((s, i) => (
              <span
                key={i}
                style={{
                  background: "rgba(255,240,133,0.7)",
                  padding: "3px 10px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                {s}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#555" }}>
            <span>
              ₹{j.budget_from} - ₹{j.budget_to}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <FaUsers size={12} /> {j.applicants_count || 0}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <MdAccessTime size={12} />
              {j.createdAt ? j.createdAt.toLocaleDateString() : "Recently"}
            </span>
          </div>
        </div>
        {j.is24h && (
          <span
            style={{
              background: "#FF6B35",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: 6,
              whiteSpace: "nowrap",
            }}
          >
            ⚡ 24h
          </span>
        )}
      </div>
    </div>
  );

  // ── RENDER ─────────────────────────────────────────────
  return (
    <div style={{ ...rubikFontStyle, display: "flex", justifyContent: "center", padding: isMobile ? "20px 10px" : "40px 40px 100px", background: "#FDFDFD", minHeight: "100vh", boxSizing: "border-box", marginTop: isMobile ? 60 : 0 }}>
      {/* Search Header Area */}

      <div style={{ width: "100%", maxWidth: 1300, display: "flex", gap: 24, flexDirection: isMobile ? "column" : "row" }}>

        {/* Left Column */}
        <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Header Card */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #EAEAEA", padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div onClick={() => navigate(-1)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#8A8A8A", fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
                <span>&larr;</span> Back to Browse
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={handleSave} style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid #EAEAEA", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: isFavorite ? "#6C3EEB" : "#8A8A8A" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={isFavorite ? "#6C3EEB" : "none"} stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleShare(); }} style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid #EAEAEA", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <FiX size={16} color="#8A8A8A" onClick={(e) => { e.stopPropagation(); navigate(-1); }} />
                </button>
                <button style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid #EAEAEA", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A8A8A" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                </button>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
              <div style={{ width: 56, height: 56, borderRadius: 12, background: "#6C3EEB", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700 }}>
                {(() => {
                  const fName = client?.first_name || client?.firstName || client?.name || client?.displayName || "";
                  const lName = client?.last_name || client?.lastName || "";
                  const fullName = fName ? `${fName} ${lName}`.trim() : "";
                  const compName = client?.Company_name || client?.companyName || job.company_name || job.company || job.companyName || job.clientName || fullName;
                  
                  const initialSource = compName || job.title || "JB";
                  return initialSource.substring(0, 2).toUpperCase();
                })()}
              </div>
              <div>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1A1A1A", margin: "0 0 4px 0", fontFamily: "'Sora', sans-serif" }}>
                  {job.title || "Project Detail"}
                </h1>
                <div style={{ fontSize: 14, color: "#8A8A8A", fontFamily: "'DM Sans', sans-serif" }}>
                  {(() => {
                    const fName = client?.first_name || client?.firstName || client?.name || client?.displayName || "";
                    const lName = client?.last_name || client?.lastName || "";
                    const fullName = fName ? `${fName} ${lName}`.trim() : "";
                    const compName = client?.Company_name || client?.companyName || job.company_name || job.company || job.companyName || job.clientName || fullName;
                    return compName ? `${compName} • ` : "";
                  })()}
                  {job.category || "General"}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 0", borderTop: "1px solid #F0F0F0", borderBottom: "1px solid #F0F0F0", flexWrap: "wrap", gap: 20, fontFamily: "'DM Sans', sans-serif" }}>
              <div>
                <div style={{ fontSize: 10, color: "#A3A3A3", textTransform: "uppercase", fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>Budget</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#6C3EEB" }}>₹{job.budget_from || 1000}–₹{job.budget_to || 8000}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: "#A3A3A3", textTransform: "uppercase", fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>Timeline</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1A1A1A" }}>{job.timeline || "2-3 weeks"}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: "#A3A3A3", textTransform: "uppercase", fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>Location</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1A1A1A" }}>{job.location || "Remote"}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: "#A3A3A3", textTransform: "uppercase", fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>Applicants</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1A1A1A" }}>{job.applicants_count || 10} Applied</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: "#A3A3A3", textTransform: "uppercase", fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>Posted</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1A1A1A" }}>{job.createdAt ? "Recently" : "6 days ago"}</div>
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "#FFFBF0", color: "#B8860B", borderRadius: 20, fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
                <Zap size={14} color="#B8860B" /> Immediate Start
              </span>
            </div>
          </div>

          {/* Skills Required */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #EAEAEA", padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px 0", color: "#1A1A1A", display: "flex", alignItems: "center", gap: 8, fontFamily: "'Sora', sans-serif" }}><Target size={18} color="#FF4500" /> Skills Required</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {(job.skills?.length > 0 ? job.skills : ["UI Design", "Web Design", "UX", "Figma", "Visual Design", "Interactive Design", "Adobe XD", "Prototyping", "Design Systems", "Mobile UI", "Wireframing", "User Research"]).map((s, i) => {
                const colors = [
                  { bg: "#FFF0F4", color: "#FF6E91" },
                  { bg: "#EAF4FF", color: "#3D8BDD" },
                  { bg: "#F0EFFF", color: "#8378FF" },
                  { bg: "#E8F8F0", color: "#34C77B" },
                  { bg: "#FFF4E5", color: "#FF9F43" }
                ];
                const c = colors[i % colors.length];
                return (
                  <span key={i} style={{ background: c.bg, color: c.color, padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
                    {s}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Project Description */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #EAEAEA", padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px 0", color: "#1A1A1A", display: "flex", alignItems: "center", gap: 8, fontFamily: "'Sora', sans-serif" }}><FileText size={18} color="#6C3EEB" /> Project Description</h3>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, margin: 0, whiteSpace: "pre-line", fontFamily: "'DM Sans', sans-serif" }}>
              {job.description || "We are seeking an experienced UI/UX designer to create modern and intuitive mobile app designs for our startup platform. The project involves designing a complete mobile and web application with approximately 15-20 screens, including onboarding, dashboard, messaging, and analytics interfaces.\n\nThe ideal candidate should have experience creating scalable design systems, user-centered experiences, and responsive layouts optimized for both Android and iOS platforms."}
            </p>
          </div>

          {/* Project Requirements */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #EAEAEA", padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px 0", color: "#1A1A1A", display: "flex", alignItems: "center", gap: 8, fontFamily: "'Sora', sans-serif" }}><CheckCircle size={18} color="#32CD32" /> Project Requirements</h3>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px 32px" }}>
              {[
                "Modern and clean design aesthetic",
                "Mobile-first design approach",
                "Interactive prototypes in Figma",
                "Design system & reusable component library",
                "Responsive web layouts",
                "Strong UX research understanding",
                "User flow and wireframing expertise",
                "Experience with SaaS dashboard design",
                "Ability to collaborate with developers",
                "Fast iteration and communication"
              ].map((req, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6C3EEB", marginTop: 6, flexShrink: 0 }}></div>
                  <span style={{ fontSize: 14, color: "#666", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4 }}>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #EAEAEA", padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px 0", color: "#1A1A1A", display: "flex", alignItems: "center", gap: 8, fontFamily: "'Sora', sans-serif" }}><Package size={18} color="#FF9F43" /> Deliverables</h3>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
              {[
                { title: "Mobile App UI Screens", desc: "15-20 high-fidelity screens", icon: <Smartphone size={20} color="#6C3EEB" />, color: "#6C3EEB" },
                { title: "Responsive Web Dashboard", desc: "Full desktop layout", icon: <Monitor size={20} color="#6C3EEB" />, color: "#6C3EEB" },
                { title: "Design System Library", desc: "Reusable Figma components", icon: <Palette size={20} color="#6C3EEB" />, color: "#6C3EEB" },
                { title: "Interactive Prototype", desc: "Linked Figma prototype", icon: <MousePointerClick size={20} color="#6C3EEB" />, color: "#6C3EEB" },
                { title: "Developer Handoff Assets", desc: "Annotated specs & exports", icon: <Folder size={20} color="#6C3EEB" />, color: "#6C3EEB" },
                { title: "Export-ready UI Kit", desc: "SVG / PNG / Figma", icon: <Layout size={20} color="#6C3EEB" />, color: "#6C3EEB" }
              ].map((del, i) => (
                <div key={i} style={{ background: "#FDFDFD", border: "1px solid #F0F0F0", borderRadius: 12, padding: "16px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: "#F5F2FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, border: `1px solid ${del.color}30` }}>
                    {del.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A", fontFamily: "'Sora', sans-serif", marginBottom: 4 }}>{del.title}</div>
                    <div style={{ fontSize: 12, color: "#A3A3A3", fontFamily: "'DM Sans', sans-serif" }}>{del.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Similar Projects */}
          {similarProjects.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#1A1A1A", display: "flex", alignItems: "center", gap: 8, fontFamily: "'Sora', sans-serif" }}><Sparkles size={20} color="#F59E0B" /> Similar Projects</h3>
                <span onClick={() => navigate("/freelance-dashboard/browse-projects")} style={{ color: "#6C3EEB", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>View all &rarr;</span>
              </div>

              {similarProjects.map((similar, i) => {
                const colors = ["#FF4B4B", "#00B4D8", "#2E8B57", "#6C3EEB", "#FF9F43"];
                const color = colors[i % colors.length];
                const initials = similar.company_name?.substring(0, 2).toUpperCase() || similar.title?.substring(0, 2).toUpperCase() || "SP";
                return (
                  <div key={similar.id} style={{ background: "white", borderRadius: 16, border: "1px solid #EAEAEA", padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700 }}>
                        {initials}
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: "#A3A3A3", marginBottom: 2, fontFamily: "'DM Sans', sans-serif" }}>{similar.company_name || similar.category || "General"}</div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "#1A1A1A", marginBottom: 6, fontFamily: "'Sora', sans-serif" }}>{similar.title || "Untitled Project"}</div>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {(similar.skills || []).slice(0, 3).map(s => (
                            <span key={s} style={{ background: "#F5F2FF", color: "#6C3EEB", padding: "2px 8px", borderRadius: 12, fontSize: 10, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#6C3EEB", fontFamily: "'Sora', sans-serif" }}>₹{similar.budget_from || 0} - ₹{similar.budget_to || 0}</div>
                      <button
                        onClick={() => {
                          if (similar.source === "jobs_24h") {
                            navigate(`/freelance-dashboard/job-24/${similar.id}`);
                          } else {
                            navigate(`/freelance-dashboard/job-full/${similar.id}`);
                          }
                        }}
                        style={{ background: "#6C3EEB", color: "white", padding: "6px 20px", borderRadius: 20, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Right Column (Sidebar) */}
        <div style={{ width: isMobile ? "100%" : 350, flexShrink: 0, display: "flex", flexDirection: "column", gap: 24, position: isMobile ? "relative" : "sticky", top: isMobile ? "auto" : 100, height: "max-content" }}>

          {/* Action Card */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #EAEAEA", padding: 24 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#6C3EEB", marginBottom: 8, display: "flex", alignItems: "baseline", gap: 4, fontFamily: "'Sora', sans-serif" }}>
              ₹{job.budget_from || 1000}–{job.budget_to || 8000} <span style={{ fontSize: 12, color: "#A3A3A3", fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>/ project</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "#8A8A8A", marginBottom: 24, flexWrap: "wrap", fontFamily: "'DM Sans', sans-serif" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>👥 {job.applicants_count || 10} Applicants</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>⏱️ 6 days ago</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>⚡ Immediate</span>
            </div>

            {/* Screening Questions UI INLINE (if any) */}
            {(() => {
              const displayQuestions = job.screening_questions?.length > 0 ? job.screening_questions : [
                { question: "Have you completed the following level of education Bachelor's Degree ?" },
                { question: "Are you genuinely interested in UI/UX or just exploring?" },
                { question: "Any additional information (optional)" },
                { question: "Price Range" }
              ];

              return (
                <>
                  {showQuestions && applicationStatus === "none" && (
                    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ background: "#FFFFFF", border: "2px solid rgba(124, 60, 255, 1)", borderRadius: 12, padding: 24, width: "90%", maxWidth: 500, maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                          <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, fontFamily: "'Sora', sans-serif", color: "#1A1433" }}>Application Questions</h3>
                          <button onClick={() => setShowQuestions(false)} style={{ background: "transparent", border: "none", fontSize: 24, cursor: "pointer", color: "#8A8A8A" }}>&times;</button>
                        </div>

                        {displayQuestions.map((q, i) => {
                          const selected = screeningAnswers[i] || "";
                          const showError = screeningError && !selected;
                          let title = "Screening Question";
                          if (i === 1) title = "Interest & Suitability Check";
                          if (i >= 2) title = "Additional Information";
                          if (i === 3) title = "Price Range";

                          const isDropdown = i < 2; // First two questions are dropdowns, rest are text inputs

                          return (
                            <div key={i} style={{ marginBottom: 16 }}>
                              <p style={{ fontWeight: 600, fontSize: 14, fontFamily: "'DM Sans', sans-serif", margin: "0 0 8px 0", color: "#1A1433" }}>
                                {title}<span style={{ color: "rgba(124, 60, 255, 1)" }}>*</span>
                              </p>
                              {isDropdown ? (
                                <div style={{ position: "relative" }}>
                                  <select
                                    value={selected}
                                    onChange={(e) => setScreeningAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                                    style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: showError ? "1px solid red" : "1px solid #E0E0E0", background: "white", appearance: "none", fontSize: 14, color: selected ? "#111" : "#8A8A8A", cursor: "pointer", outline: "none", fontFamily: "'DM Sans', sans-serif" }}
                                  >
                                    <option value="" disabled hidden>{q.question}</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                  </select>
                                  <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "rgba(124, 60, 255, 1)", fontSize: 12 }}>▼</span>
                                </div>
                              ) : (
                                <input
                                  type="text"
                                  placeholder={q.question}
                                  value={selected}
                                  onChange={(e) => setScreeningAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                                  style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: showError ? "1px solid red" : "1px solid #E0E0E0", background: "white", fontSize: 14, color: "#111", outline: "none", fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }}
                                />
                              )}
                            </div>
                          );
                        })}

                        <button
                          onClick={() => {
                            const questions = displayQuestions;
                            const allAnswered = questions.every((_, i) => screeningAnswers[i]);
                            if (!allAnswered) {
                              setScreeningError(true);
                              return;
                            }
                            const answersArray = questions.map((q, i) => ({
                              question: q.question,
                              answer: screeningAnswers[i],
                            }));
                            handleApply(job.id, answersArray);
                            setShowQuestions(false);
                          }}
                          style={{ width: "100%", padding: 14, background: "rgba(124, 60, 255, 1)", color: "white", borderRadius: 24, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 24, fontFamily: "'DM Sans', sans-serif" }}
                        >
                          Submit Application
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      if (applicationStatus !== "none") return;
                      setShowQuestions(true);
                    }}
                    style={{ width: "100%", padding: 14, background: applicationStatus === "none" ? "linear-gradient(90deg,#8D5CFA,#6C3EEB)" : (applicationStatus === "accepted" ? "#34C77B" : "#A3A3A3"), color: "white", borderRadius: 24, border: "none", fontSize: 14, fontWeight: 700, cursor: applicationStatus === "none" ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <Rocket size={16} /> {applicationStatus === "accepted" ? "Accepted 🎉" : applicationStatus === "applied" ? "Application Sent" : "Apply Now"}
                  </button>
                </>
              );
            })()}
            {applicationStatus !== "none" && (
              <button
                onClick={handleDeleteRequest}
                style={{ width: "100%", padding: 14, background: "white", color: "#6C3EEB", borderRadius: 24, border: "1px solid #6C3EEB", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}
              >
                Delete Request
              </button>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div onClick={handleSave} style={{ background: "#FDFDFD", border: "1px solid #F0F0F0", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }}>
                <Bookmark size={16} color={isFavorite ? "#6C3EEB" : "#8A8A8A"} /> Save Project
              </div>
              <div onClick={handleShare} style={{ background: "#FDFDFD", border: "1px solid #F0F0F0", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }}>
                <Share2 size={16} color="#8A8A8A" /> Share Project
              </div>
              <div onClick={() => navigate("/freelance-dashboard/messages", { state: { startChatWith: job.userId } })} style={{ background: "#FDFDFD", border: "1px solid #F0F0F0", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }}>
                <MessageSquare size={16} color="#8A8A8A" /> Contact Client
              </div>
            </div>
          </div>

          {/* About the Client Component Render */}
          {job.userId && <AboutClient clientId={job.userId} />}

          {/* AI Assistant Card */}
          <div style={{ background: "linear-gradient(135deg, #8352FF 0%, #6324FF 100%)", borderRadius: 16, padding: 24, color: "white", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: -20, top: -20, width: 100, height: 100, background: "rgba(255,255,255,0.1)", borderRadius: "50%" }}></div>
            <div style={{ fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontFamily: "'Sora', sans-serif" }}><Sparkles size={18} color="#FFD700" /> AI Assistant</div>
            <div style={{ fontSize: 12, opacity: 0.9, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>Let Huzzler AI help you win this project</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ background: "rgba(255,255,255,0.15)", padding: "12px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                <FileText size={14} /> Write Proposal
              </div>
              <div style={{ background: "rgba(255,255,255,0.15)", padding: "12px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                <Folder size={14} /> Upload Portfolio
              </div>
              <div style={{ background: "rgba(255,255,255,0.15)", padding: "12px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                <Lightbulb size={14} /> Proposal Tips
              </div>
              <div style={{ background: "rgba(255,255,255,0.15)", padding: "12px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                <Rocket size={14} /> Start Project
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// ✅ About Client Component
// ──────────────────────────────────────────────────────────
function AboutClient({ clientId }) {
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (!clientId) return;
    getDoc(doc(db, "users", clientId)).then((snap) => {
      if (snap.exists()) {
        setClient(snap.data());
      }
    });
  }, [clientId]);

  if (!client) return null;

  const fName = client.first_name || client.firstName || client.name || client.displayName || "";
  const lName = client.last_name || client.lastName || "";
  const fullName = fName ? `${fName} ${lName}`.trim() : "";
  const compName = client.Company_name || client.companyName || "";
  
  const displayTitle = compName || fullName || "Client";
  const initials = displayTitle.substring(0, 2).toUpperCase();

  return (
    <div style={{ background: "white", borderRadius: 16, border: "1px solid #EAEAEA", padding: 24 }}>
      <div style={{ fontSize: 11, color: "#A3A3A3", textTransform: "uppercase", fontWeight: 700, letterSpacing: 1, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>About the Client</div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "#6C3EEB", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>
          {initials}
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#1A1A1A", fontFamily: "'Sora', sans-serif" }}>{displayTitle}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
        <div style={{ background: "#FDFDFD", border: "1px solid #F0F0F0", padding: 12, borderRadius: 8, textAlign: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#6C3EEB", marginBottom: 4, fontFamily: "'Sora', sans-serif" }}>
            {client.rating > 0 ? client.rating : "4.8"} <Star size={12} color="#F59E0B" fill="#F59E0B" style={{ display: 'inline-block', verticalAlign: 'middle', marginTop: '-2px' }} />
          </div>
          <div style={{ fontSize: 10, color: "#A3A3A3", fontFamily: "'DM Sans', sans-serif" }}>Client Rating</div>
        </div>
        <div style={{ background: "#FDFDFD", border: "1px solid #F0F0F0", padding: 12, borderRadius: 8, textAlign: "center" }}>
          <ClientJobCount clientId={clientId} />
          <div style={{ fontSize: 10, color: "#A3A3A3", fontFamily: "'DM Sans', sans-serif" }}>Projects Done</div>
        </div>
        <div style={{ background: "#FDFDFD", border: "1px solid #F0F0F0", padding: 12, borderRadius: 8, textAlign: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A", marginBottom: 4, fontFamily: "'Sora', sans-serif" }}>2022</div>
          <div style={{ fontSize: 10, color: "#A3A3A3", fontFamily: "'DM Sans', sans-serif" }}>Member Since</div>
        </div>
      </div>

      <p style={{ fontSize: 12, color: "#8A8A8A", lineHeight: 1.5, margin: "0 0 24px 0", fontFamily: "'DM Sans', sans-serif" }}>
        {client.bio || client.description || "We are a forward-thinking company working with passionate freelancers globally to build amazing products."}
      </p>

      <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A", marginBottom: 16, fontFamily: "'Sora', sans-serif" }}>More Projects</div>

      {/* More Projects Cards (Mocked) */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ border: "1px solid #EAEAEA", borderRadius: 12, padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#8378FF", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>CS</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }}>Creativo Studio</div>
              <div style={{ fontSize: 11, color: "#A3A3A3", fontFamily: "'DM Sans', sans-serif" }}>Design Agency</div>
            </div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A", marginBottom: 6, fontFamily: "'Sora', sans-serif" }}>Senior Product Designer</div>
          <div style={{ fontSize: 12, color: "#8A8A8A", marginBottom: 12, lineHeight: 1.4, fontFamily: "'DM Sans', sans-serif" }}>Join our creative team to build next-gen digital products with a...</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
            <span style={{ background: "#FFF0F4", color: "#FF6E91", padding: "2px 8px", borderRadius: 12, fontSize: 10, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Figma</span>
            <span style={{ background: "#E8F8F0", color: "#34C77B", padding: "2px 8px", borderRadius: 12, fontSize: 10, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Prototyping</span>
            <span style={{ background: "#F0EFFF", color: "#8378FF", padding: "2px 8px", borderRadius: 12, fontSize: 10, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>UX</span>
          </div>
          <div style={{ textAlign: "right", fontSize: 11, color: "#A3A3A3", fontFamily: "'DM Sans', sans-serif" }}>2d ago</div>
        </div>

        <div style={{ border: "1px solid #EAEAEA", borderRadius: 12, padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#8378FF", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>CS</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }}>AI Thumbnail Designer</div>
              <div style={{ fontSize: 11, color: "#A3A3A3", fontFamily: "'DM Sans', sans-serif" }}>Design Agency</div>
            </div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A", marginBottom: 6, fontFamily: "'Sora', sans-serif" }}>Senior Product Designer</div>
          <div style={{ fontSize: 12, color: "#8A8A8A", marginBottom: 12, lineHeight: 1.4, fontFamily: "'DM Sans', sans-serif" }}>Join our creative team to build next-gen digital products with a...</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
            <span style={{ background: "#FFF0F4", color: "#FF6E91", padding: "2px 8px", borderRadius: 12, fontSize: 10, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Figma</span>
            <span style={{ background: "#E8F8F0", color: "#34C77B", padding: "2px 8px", borderRadius: 12, fontSize: 10, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Prototyping</span>
            <span style={{ background: "#F0EFFF", color: "#8378FF", padding: "2px 8px", borderRadius: 12, fontSize: 10, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>UX</span>
          </div>
          <div style={{ textAlign: "right", fontSize: 11, color: "#A3A3A3", fontFamily: "'DM Sans', sans-serif" }}>3d ago</div>
          <button style={{ width: "100%", padding: 10, marginTop: 12, background: "#6C3EEB", color: "white", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Apply Now</button>
          <button style={{ width: "100%", padding: 10, marginTop: 8, background: "#F5F2FF", color: "#6C3EEB", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>View More</button>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// ✅ Client Job Count Component
// ──────────────────────────────────────────────────────────
function ClientJobCount({ clientId }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "jobs"), (snap) => {
      const total = snap.docs.filter(
        (d) => d.data().userId === clientId
      ).length;
      setCount(total);
    });

    return () => unsub();
  }, [clientId]);

  return (
    <div style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A", marginBottom: 4, fontFamily: "'Sora', sans-serif" }}>
      {count}
    </div>
  );
}