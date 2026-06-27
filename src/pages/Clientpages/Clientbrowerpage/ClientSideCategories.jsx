import React, { useEffect, useMemo, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  runTransaction,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../../firbase/Firebase";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MessageSquare,
  Bell,
  Search,
  Filter,
  ArrowUpDown,
  Bookmark,
} from "lucide-react";

/* =========================
   MAIN COMPONENT
========================= */
export default function ExploreClientJobScreen({ initialTab = "Work" }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  /* ---------------- STATE ---------------- */
  const [selectedTab, setSelectedTab] = useState(initialTab); // "Work", "24 Hours", "Saved"
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const [services, setServices] = useState([]);
  const [services24, setServices24] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [users, setUsers] = useState({});

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    if (!user) return; 

    const unsub1 = onSnapshot(collection(db, "services"), (snap) => {
      setServices(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    const unsub2 = onSnapshot(collection(db, "service_24h"), (snap) => {
      setServices24(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    const unsubUser = onSnapshot(doc(db, "users", user.uid), (snap) => {
      setSavedJobs(snap.data()?.savedJobs || []);
    });

    const unsubUsers = onSnapshot(collection(db, "users"), (snap) => {
      const usersMap = {};
      snap.docs.forEach(doc => {
        usersMap[doc.id] = doc.data();
      });
      setUsers(usersMap);
    });

    return () => {
      unsub1();
      unsub2();
      unsubUser();
      unsubUsers();
    };
  }, [user]);

  /* ---------------- HELPERS ---------------- */
  const incrementViewOnce = async (collectionName, jobId) => {
    if (!user) return;
    const ref = doc(db, collectionName, jobId);
    await runTransaction(db, async (tx) => {
      const snap = await tx.get(ref);
      if (!snap.exists()) return;
      const viewedBy = snap.data().viewedBy || [];
      if (viewedBy.includes(user.uid)) return;
      tx.update(ref, {
        views: increment(1),
        viewedBy: arrayUnion(user.uid),
      });
    });
  };

  const toggleSave = async (jobId) => {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    if (savedJobs.includes(jobId)) {
      await updateDoc(ref, { savedJobs: arrayRemove(jobId) });
    } else {
      await updateDoc(ref, { savedJobs: arrayUnion(jobId) });
    }
  };

  /* ---------------- FILTER LOGIC ---------------- */
  const applyFilters = (list) => {
    return list.filter((job) => {
      const title = (job.title || "").toLowerCase();
      const category = (job.category || "").toLowerCase();
      const sub = (job.subCategory || "").toLowerCase();
      const skills = job.skills || [];

      if (
        search &&
        !(
          title.includes(search) ||
          category.includes(search) ||
          sub.includes(search) ||
          skills.some((s) => s.toLowerCase().includes(search))
        )
      )
        return false;

      return true;
    });
  };

  const sortJobs = (list) => {
    if (sort === "Newest") {
      return [...list].sort(
        (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
      );
    }
    if (sort === "Oldest") {
      return [...list].sort(
        (a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0)
      );
    }
    return list;
  };

  /* ---------------- FILTERED DATA ---------------- */
  const freelancerJobs = useMemo(
    () => sortJobs(applyFilters(services)),
    [services, search, sort]
  );

  const jobs24 = useMemo(
    () => sortJobs(applyFilters(services24)),
    [services24, search, sort]
  );

  const saved = useMemo(
    () =>
      [...services, ...services24].filter((j) =>
        savedJobs.includes(j.id)
      ),
    [services, services24, savedJobs]
  );

  const currentList = selectedTab === "Work" ? freelancerJobs : selectedTab === "24 Hours" ? jobs24 : saved;

  /* =========================
     UI
  ========================= */
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FFFFFF", paddingBottom: 40, fontFamily: "'Inter', sans-serif", width: "100%" }}>
      
      {/* HEADER SECTION */}
      <div style={{ backgroundColor: "#FFFFFF", padding: "20px 24px", position: "sticky", top: 0, zIndex: 10 }}>
        
        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button 
              onClick={() => navigate(-1)} 
              style={{ background: "#F5F5F5", border: "none", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <ArrowLeft size={20} color="#333" />
            </button>
            <h1 style={{ fontSize: 26, fontWeight: 500, margin: 0, color: "#1A1A1A" }}>Explore Freelancer</h1>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <MessageSquare size={24} color="#666" style={{ cursor: "pointer" }} />
            <Bell size={24} color="#666" style={{ cursor: "pointer" }} />
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ display: "flex", alignItems: "center", backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 12, padding: "12px 20px", marginBottom: 24, boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
          <Search size={20} color="#9CA3AF" />
          <input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            style={{ flex: 1, border: "none", outline: "none", background: "transparent", marginLeft: 12, fontSize: 16, color: "#374151" }}
          />
        </div>

        {/* Tabs Container */}
        <div style={{ display: "flex", backgroundColor: "#FFFFFF", borderRadius: 30, padding: 6, border: "1px solid #E5E7EB", width: "fit-content", gap: 4, boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
          {["Work", "24 Hours", "Saved"].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTab(t)}
              style={{
                padding: "10px 32px",
                borderRadius: 24,
                border: "none",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                backgroundColor: selectedTab === t ? "#8B5CF6" : "transparent",
                color: selectedTab === t ? "#FFFFFF" : "#4B5563",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div style={{ padding: "0 24px", marginTop: 12 }}>
        
        {/* Controls: Filter & Sort */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 24, marginBottom: 20 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "none", color: "#1F2937", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            <Filter size={18} color="#8B5CF6" /> Filter
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "none", color: "#1F2937", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            <ArrowUpDown size={18} color="#9CA3AF" /> Sort
          </button>
        </div>

        {/* Jobs List */}
        <div>
          <h2 style={{ color: "#6C3EEB", fontSize: 22, fontWeight: 600, marginBottom: 16 }}>Jobs</h2>
          
          {currentList.length === 0 ? (
            <div style={{ color: "#9CA3AF", fontSize: 16, fontWeight: 500, marginTop: 10 }}>No jobs found</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
              {currentList.map((job) => {
                const freelancer = users[job.uid || job.userId || job.freelancerId] || {};
                const name = freelancer.first_name || freelancer.firstName || freelancer.name || "Freelancer";
                const initial = name.charAt(0).toUpperCase();

                return (
                  <JobCard
                    key={job.id}
                    job={job}
                    freelancer={freelancer}
                    initial={initial}
                    onOpen={() => {
                      if (selectedTab === "24 Hours" || job.deliveryDuration === "24 Hours") {
                        incrementViewOnce("service_24h", job.id);
                        navigate(`/service24/${job.id}`);
                      } else {
                        incrementViewOnce("services", job.id);
                        navigate(`/service/${job.id}`);
                      }
                    }}
                    saved={savedJobs.includes(job.id)}
                    onSave={() => toggleSave(job.id)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================
   SMALL COMPONENTS
========================= */

function JobCard({ job, freelancer, initial, onOpen, saved, onSave }) {
  return (
    <div
      onClick={onOpen}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 24,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        border: "1px solid #F3F4F6",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.05)";
      }}
    >
      {/* User Info & Save */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: freelancer.profileImage ? "#E5E7EB" : "#6C3EEB", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", color: "white", fontWeight: "bold", fontSize: 18 }}>
            {freelancer.profileImage ? (
              <img src={freelancer.profileImage} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : initial}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: "#1F2937", fontSize: 16 }}>
              {freelancer.first_name || freelancer.firstName || freelancer.name || "Freelancer"} {freelancer.last_name || freelancer.lastName || ""}
            </div>
            <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{freelancer.role || "Pro Freelancer"}</div>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave();
          }}
          style={{ background: "transparent", border: "none", cursor: "pointer", padding: 6, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Bookmark size={22} color={saved ? "#8B5CF6" : "#9CA3AF"} fill={saved ? "#8B5CF6" : "none"} />
        </button>
      </div>

      {/* Job Info */}
      <h3 style={{ margin: "4px 0 0 0", fontSize: 18, fontWeight: 600, color: "#111827", lineHeight: 1.4 }}>{job.title}</h3>
      
      {/* Skills */}
      {job.skills && job.skills.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {job.skills.slice(0, 3).map((s, i) => (
            <div key={i} style={{ backgroundColor: "#F3F4F6", padding: "6px 12px", borderRadius: 16, fontSize: 13, color: "#4B5563", fontWeight: 500 }}>
              {s}
            </div>
          ))}
          {job.skills.length > 3 && (
            <div style={{ backgroundColor: "#F3F4F6", padding: "6px 10px", borderRadius: 16, fontSize: 13, color: "#4B5563", fontWeight: 500 }}>
              +{job.skills.length - 3}
            </div>
          )}
        </div>
      )}

      {/* Footer Details */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 8, paddingTop: 16, borderTop: "1px solid #F3F4F6" }}>
        <div style={{ fontSize: 14, color: "#6B7280", fontWeight: 500 }}>
          Views: <strong style={{ color: "#374151" }}>{job.views || 0}</strong>
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#1F2937" }}>
          ₹{job.budget_from} - ₹{job.budget_to}
        </div>
      </div>
    </div>
  );
}
