
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

import editicon from "../../assets/editicon.png";
import ProfileHeader from "../../components/ProfileHeader";
import { db } from "../../firbase/Firebase";
import { color } from "framer-motion";

/* ======================================================
   COMPANY PROFILE SUMMARY
====================================================== */

export default function ProfileSummary() {
  const navigate = useNavigate();


  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    title: "",
   businessInfo: "",
    skills: [],
    tools: [],
    profileImage: "",
    location: "",

  });

  console.log(profileData)
  /* ---------------- SIDEBAR ---------------- */
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebar-collapsed") === "true"
  );

  useEffect(() => {
    const handleToggle = (e) => setCollapsed(e.detail);
    window.addEventListener("sidebar-toggle", handleToggle);
    return () => window.removeEventListener("sidebar-toggle", handleToggle);
  }, []);

  /* ---------------- MOBILE ---------------- */
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ---------------- PROFILE DATA ---------------- */
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) setData(snap.data());
      setLoading(false);
    };
    fetchProfile();
  }, []);

  /* ---------------- JOBS DATA ---------------- */
  const auth = getAuth();
  const user = auth.currentUser;

  const [tab, setTab] = useState("Works");
  const [worksJobs, setWorksJobs] = useState([]);
  const [jobs24, setJobs24] = useState([]);

  useEffect(() => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);

    // fetch user profile once
    getDoc(userRef).then((snap) => {
      if (snap.exists()) {
        setProfileData((prev) => ({ ...prev, ...snap.data() }));
      }
    });

    // portfolio realtime
    const q = query(
      collection(db, "users", user.uid, "portfolio"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setPortfolio(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, [user, db]);


  useEffect(() => {
    if (!user) return;

    const q1 = query(
      collection(db, "jobs"),
      where("userId", "==", user.uid)
    );
    const q2 = query(
      collection(db, "jobs_24h"),
      where("userId", "==", user.uid)
    );

    const unsub1 = onSnapshot(q1, (snap) =>
      setWorksJobs(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );

    const unsub2 = onSnapshot(q2, (snap) =>
      setJobs24(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );

    return () => {
      unsub1();
      unsub2();
    };
  }, [user]);

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (!data) return <div style={{ padding: 20 }}>No profile found.</div>;

  const jobsList = tab === "Works" ? worksJobs : jobs24;


  const handleOpenJobDetail = (job) => {
    navigate(`/client-dashbroad2/job-full/${job.id}`, {
      state: { jobData: job }, // optional, still can pass data via state
    });
  };

  const handleOpenJobDetail24 = (job) => {
    navigate(`/client-dashbroad2/job-full24/${job.id}`, {
      state: { jobData: job },
    });
  };

  return (
    <div
      style={{
        marginLeft: isMobile ? 0 : collapsed ? "-110px" : "-1px",
        transition: "margin-left 0.25s ease",
        marginTop: collapsed ? "10px" : "10px",
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          fontFamily: "Rubik",
          // background: "#fafafa",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: "70%", marginTop: "20px" }}>
          {/* ================= HEADER ================= */}
          <ProfileHeader profile={data} onEditProfile={() => navigate("/client-dashbroad2/companyprofileedit")} />

          {/* ================= CONTENT ================= */}
          <div style={{ padding: isMobile ? "0 16px" : "0 24px", marginTop: "24px" }}>
            <Card title="About">
              <div style={{ lineHeight: "1.6" }}>
                {data?.businessInfo || "No details provided."}
              </div>
            </Card>

            <Card title="Company Information">
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase" }}>Industry</div>
                  <div style={{ marginTop: 6, fontWeight: 500, color: "#1F2937", fontSize: 16 }}>{data?.industry || data?.Company_name || "N/A"}</div>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase" }}>Company Size</div>
                  <div style={{ marginTop: 6, fontWeight: 500, color: "#1F2937", fontSize: 16 }}>{profileData?.team_size || data?.team_size || "N/A"} members</div>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase" }}>Email Address</div>
                  <div style={{ marginTop: 6, fontWeight: 500, color: "#1F2937", fontSize: 16 }}>{data?.email || "N/A"}</div>
                </div>
              </div>
            </Card>

            {/* ================= JOBS ================= */}
            <div style={{ marginTop: 40 }}>
              <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 6px",
  }}
>
  <h2
    style={{
      color: "#000",
      fontSize: "20px",
      fontWeight: 600,
      margin: 0,
    }}
  >
    Posted Jobs
  </h2>

  <span
    style={{
      fontSize: "14px",
      color: "#7E7E7E",
      cursor: "pointer",
      fontWeight: 500,
    }}
    onClick={() => navigate("/client-dashbroad2/AddJobScreen")}
  >
    View All
  </span>
</div>


              <div style={styles.toggleGroup}>
                <div
                  style={{
                    ...styles.toggleButton,
                    background: tab === "Works" ? "#6C3EEB" : "transparent",
                    color: tab === "Works" ? "#fff" : "#4B5563",
                    boxShadow: tab === "Works" ? "0 2px 8px rgba(108, 62, 235, 0.3)" : "none",
                  }}
                  onClick={() => setTab("Works")}
                >
                  Works
                </div>
                <div
                  style={{
                    ...styles.toggleButton,
                    background: tab === "24" ? "#6C3EEB" : "transparent",
                    color: tab === "24" ? "#fff" : "#4B5563",
                    boxShadow: tab === "24" ? "0 2px 8px rgba(108, 62, 235, 0.3)" : "none",
                  }}
                  onClick={() => setTab("24")}
                >
                  24 Hours
                </div>
              </div>

              <div style={styles.cardsWrap}>
                {jobsList.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    type={tab}
                    profileData={profileData}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE ================= */

function Card({ title, children }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        padding: 24,
        border: "1px solid #E5E7EB",
        marginBottom: 20,
      }}
    >
      {title && <h3 style={{ fontSize: 18, fontWeight: 600, color: "#111", marginBottom: 16, marginTop: 0 }}>{title}</h3>}
      <div style={{ color: "#4B5563", fontSize: 15 }}>{children}</div>
    </div>
  );
}

function JobCard({ job, type, profileData }) {
  const navigate = useNavigate();

  const getAvatarColor = (name) => {
    const colors = [
      "#8A5CFF", // Purple
      "#3E84F8", // Blue
      "#FF5A79", // Pink
      "#F88A3E", // Orange
      "#15975A", // Green
      "#B88E00", // Yellow
    ];
    return colors[(name || "").length % colors.length];
  };

  const projectTitle = job?.title || "Project";
  const avatarColor = getAvatarColor(projectTitle);
  const handlePause = async (e) => {
    e.stopPropagation();

    const collectionName = type === "Works" ? "jobs" : "jobs_24h";
    const ref = doc(db, collectionName, job.id);

    await updateDoc(ref, {
      status: job.status === "paused" ? "active" : "paused",
    });
  };

  /* ---------- EDIT ---------- */
  const handleEdit = (e) => {
    e.stopPropagation();

    navigate("/client-dashbroad2/clientedit24jobs", {
      state: { jobId: job.id, jobData: job },
    });
  };




  

  return (
    <div
      onClick={() =>
        navigate(
          type === "Works"
            ? `/client-dashbroad2/job-full/${job.id}`
            : `/client-dashbroad2/job-full24/${job.id}`
        )
      }
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: 20,
        padding: 24,
        cursor: "pointer",
        background: "#fff",
        transition: "box-shadow 0.2s, border-color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
        e.currentTarget.style.borderColor = "#D1D5DB";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "#E5E7EB";
      }}
    >
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{...styles.avatarBox, background: avatarColor}}>
          {projectTitle.charAt(0).toUpperCase()}
        </div>
        <div>
          <div style={styles.jobTitle}>{job?.title}</div>
          <div style={{ display: "flex", marginTop: 6 }}>
            {job?.skills?.slice(0, 2).map((s, i) => (
              <div key={i} style={styles.skillChip}>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", marginTop: 24, justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ color: "#9CA3AF", fontWeight: 600, fontSize: 12, textTransform: "uppercase" }}>Budget</span>
          <span style={{ color: "#6C3EEB", fontWeight: 700, fontSize: 16 }}>₹{job?.budget_from || job?.budget}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ color: "#9CA3AF", fontWeight: 600, fontSize: 12, textTransform: "uppercase" }}>Timeline</span>
          <span style={{ color: "#111", fontWeight: 600, fontSize: 14 }}>{job?.timeline || "24 hours"}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ color: "#9CA3AF", fontWeight: 600, fontSize: 12, textTransform: "uppercase" }}>Location</span>
          <span style={{ color: "#111", fontWeight: 600, fontSize: 14 }}>Remote</span>
        </div>
      </div>
      <div style={styles.buttonRow}>
        <button style={styles.secondaryBtn} onClick={handlePause}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
        >
          {job.status === "paused" ? "Resume Service" : "Pause Service"}
        </button>

        <button style={styles.primaryBtn} onClick={handleEdit}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Edit Service
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  avatarBox: {
    width: 42,
    height: 42,
    borderRadius: "20%",
    background:
      "linear-gradient(130deg, #51A2FF, #9B42FF 60%, #AD46FF)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    color: "#fff",
  },
  jobTitle: { fontWeight: 600, fontSize: 18, color: "#111" },
  skillChip: {
    background: "#F3F4F6",
    color: "#4B5563",
    padding: "6px 12px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 500,
    marginRight: 8,
  },
  toggleGroup: {
    display: "flex",
    gap: 8,
    background: "#F3F4F6",
    padding: 6,
    borderRadius: 20,
    width: "fit-content",
    marginBottom: 24,
  },
  toggleButton: {
    padding: "8px 20px",
    borderRadius: 14,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
    transition: "all 0.2s ease",
  },
  cardsWrap: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(280px, 1fr))",
    gap: 16,
  },
  buttonRow: {
    display: "flex",
    gap: 12,
    marginTop: 24,
  },
  secondaryBtn: {
    flex: 1,
    height: 42,
    borderRadius: 999,
    border: "1px solid #E5E7EB",
    background: "#fff",
    color: "#4B5563",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 14,
    transition: "background 0.2s",
  },
  primaryBtn: {
    flex: 1,
    height: 42,
    borderRadius: 999,
    background: "#6C3EEB",
    color: "#fff",
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 14,
    transition: "opacity 0.2s",
  },
};