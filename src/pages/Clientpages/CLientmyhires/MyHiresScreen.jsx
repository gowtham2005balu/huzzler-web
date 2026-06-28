import React, { useState, useEffect } from "react";
import { Search, ArrowLeft, X, Check } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref as dbRef, set as dbSet, update as dbUpdate } from "firebase/database";
import { db, rtdb } from "../../../firbase/Firebase";
import { v4 as uuidv4 } from "uuid";

export default function MyHiresScreen() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const auth = getAuth();
  
  const [activeTab, setActiveTab] = useState("all");
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  
  const [jobData, setJobData] = useState(null);
  const [requests, setRequests] = useState([]);
  const [freelancerProfiles, setFreelancerProfiles] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) return;
      try {
        let jDoc = await getDoc(doc(db, "jobs", jobId));
        if (!jDoc.exists()) {
          jDoc = await getDoc(doc(db, "jobs_24h", jobId));
        }
        if (!jDoc.exists()) {
          jDoc = await getDoc(doc(db, "pausedJobs", jobId));
        }
        if (jDoc.exists()) {
          setJobData(jDoc.data());
        }
      } catch (err) {
        console.error("Error fetching job details:", err);
      }
    };
    fetchJob();
  }, [jobId]);

  const fetchFreelancerProfile = async (freelancerId) => {
    if (!freelancerId || freelancerProfiles[freelancerId]) return;
    try {
      let profileDoc = await getDoc(doc(db, "users", freelancerId));
      if (!profileDoc.exists()) {
        profileDoc = await getDoc(doc(db, "freelancers", freelancerId));
      }
      if (profileDoc.exists()) {
        setFreelancerProfiles((prev) => ({
          ...prev,
          [freelancerId]: profileDoc.data(),
        }));
      }
    } catch (err) {
      console.error("Error fetching freelancer profile:", err);
    }
  };

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        let q;
        if (jobId) {
           q = query(
             collection(db, "notifications"),
             where("clientUid", "==", user.uid),
             where("type", "==", "hire_request"),
             where("jobId", "==", jobId),
             orderBy("timestamp", "desc")
           );
        } else {
           q = query(
             collection(db, "notifications"),
             where("clientUid", "==", user.uid),
             where("type", "==", "hire_request"),
             orderBy("timestamp", "desc")
           );
        }

        const unsub = onSnapshot(q, (snap) => {
          const allData = snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }));

          // Only keep requests where the FREELANCER sent the request to the client.
          // Exclude notifications where requestedBy === clientUid (those are client-initiated hires).
          const data = allData.filter((item) => {
            // If requestedBy field exists, use it to determine sender
            if (item.requestedBy) {
              return item.requestedBy !== user.uid; // freelancer sent it
            }
            // Fallback: if freelancerId is set and differs from clientUid, it's a freelancer request
            return item.freelancerId && item.freelancerId !== user.uid;
          });

          setRequests(data);
          data.forEach((item) => {
            if (item.freelancerId) {
              fetchFreelancerProfile(item.freelancerId);
            }
          });
        });

        return () => unsub();
      }
    });

    return () => unsubscribeAuth();
  }, [jobId]);

  const applicants = requests.map((req, index) => {
    const profile = freelancerProfiles[req.freelancerId] || {};
    const service = req.service || {};
    
    let nameStr = typeof req.freelancerName === 'string' ? req.freelancerName : (profile.first_name ? profile.first_name + " " + (profile.last_name||"") : "Freelancer");
    if (!nameStr || nameStr.trim() === "") nameStr = "Unknown";
    
    const initials = nameStr.split(" ").map(w => w[0]).filter(Boolean).join("").toUpperCase().slice(0, 2);
    const colors = ["#8B5CF6", "#10B981", "#F59E0B", "#EF4444"];
    const color = colors[index % colors.length];
    
    const roleStr = profile.professional_title || profile.role || service.category || "Freelancer";
    const budgetFrom = service.budget_from || service.from || profile.budget_from || 0;
    const rate = budgetFrom ? `₹${Number(budgetFrom).toLocaleString("en-IN")}/day` : "—";
    const rating  = profile.rating || profile.averageRating || null;
    const reviews = profile.reviewsCount  || profile.reviews_count  || 0;
    const projects = profile.completedProjects || profile.projectsCount || profile.completed_projects || 0;
    const exp = profile.experience || profile.yearsOfExperience || "";
    
    // Skills: prefer service skills, then profile skills — no hardcoded fallbacks
    const skillsList = Array.isArray(service.skills) && service.skills.length > 0
      ? service.skills
      : Array.isArray(profile.skills) && profile.skills.length > 0
        ? profile.skills
        : [];

    // Cover note from the notification or profile — no hardcoded fallback
    const coverNote = req.coverNote || req.body || profile.bio || profile.about || "";

    const profileUrl = profile.profile_image || profile.profileImage || profile.profileUrl || profile.photoURL || req.profileUrl || null;
    
    return {
      id: req.id,
      freelancerId: req.freelancerId,
      name: nameStr,
      initials,
      profileUrl,
      color,
      role: roleStr,
      rate,
      rating,
      reviews,
      projects,
      exp,
      skills: skillsList,
      coverNote,
      status: req.status || "sent",
      _originalReq: req,
    };
  });

  const handleAcceptApplicant = async (app) => {
    if (!app) return;
    const currentClient = auth.currentUser;
    if (!currentClient) {
      alert("Please log in first.");
      return;
    }

    const defaultMsg = `Hi, I have accepted your application for the job "${jobTitle}". Let's chat!`;
    const messageText = window.prompt("Enter a message to send to the freelancer:", defaultMsg);
    if (messageText === null) return; // Client cancelled

    try {
      // 1. Update the notification status in Firestore
      await updateDoc(doc(db, "notifications", app.id), {
        status: "accepted",
        read: true,
      });

      // 2. Add to accepted_jobs collection
      await addDoc(collection(db, "accepted_jobs"), {
        jobId: jobId || app._originalReq?.jobId || "",
        freelancerId: app.freelancerId,
        freelancerName: app.name,
        freelancerImage: app.profileUrl || "",
        acceptedAt: serverTimestamp(),
        status: "accepted",
      });

      // 3. Add to freelancer_notifications collection
      await addDoc(collection(db, "freelancer_notifications"), {
        freelancerId: app.freelancerId,
        freelancerName: app.name,
        freelancerAvatar: app.profileUrl || "",
        jobId: jobId || app._originalReq?.jobId || "",
        jobTitle: jobTitle,
        status: "accepted",
        createdAt: serverTimestamp(),
        isRead: false,
      });

      // 4. Fetch current client's profile from Firestore to get accurate name/avatar for RTDB chat metadata
      let clientName = currentClient.displayName || "Client";
      let clientImage = currentClient.photoURL || "https://i.ibb.co/sqsJwP0/user.png";
      try {
        const clientDoc = await getDoc(doc(db, "users", currentClient.uid));
        if (clientDoc.exists()) {
          const clientData = clientDoc.data();
          if (clientData.name) {
            clientName = clientData.name;
          } else if (clientData.first_name) {
            clientName = `${clientData.first_name} ${clientData.last_name || ""}`.trim();
          }
          clientImage = clientData.profileImage || clientData.profileUrl || clientImage;
        }
      } catch (profileErr) {
        console.error("Error fetching client profile details for chat:", profileErr);
      }

      // 5. Generate chat ID and message ID
      const chatId = currentClient.uid < app.freelancerId 
        ? `${currentClient.uid}_${app.freelancerId}` 
        : `${app.freelancerId}_${currentClient.uid}`;
      const msgId = uuidv4();
      const now = Date.now();

      // 6. Write welcome message to RTDB
      await dbSet(dbRef(rtdb, `chats/${chatId}/messages/${msgId}`), {
        id: msgId,
        senderId: currentClient.uid,
        receiverId: app.freelancerId,
        type: "text",
        text: messageText,
        timestamp: now,
        status: "sent",
        reactions: {},
      });

      // 7. Update RTDB chat metadata for both client and freelancer
      await dbUpdate(dbRef(rtdb, `userChats/${currentClient.uid}/${chatId}`), {
        withUid: app.freelancerId,
        otherName: app.name,
        otherImage: app.profileUrl || "",
        lastMessage: messageText,
        lastMessageTime: now,
      });

      await dbUpdate(dbRef(rtdb, `userChats/${app.freelancerId}/${chatId}`), {
        withUid: currentClient.uid,
        otherName: clientName,
        otherImage: clientImage,
        lastMessage: messageText,
        lastMessageTime: now,
      });

      alert("Applicant Accepted successfully!");
    } catch (error) {
      console.error("Error accepting applicant:", error);
      alert("Failed to accept applicant: " + error.message);
    }
  };

  const handleDeclineApplicant = async (app) => {
    if (!app) return;
    const currentClient = auth.currentUser;
    if (!currentClient) {
      alert("Please log in first.");
      return;
    }

    const confirmed = window.confirm(`Are you sure you want to decline ${app.name}'s application?`);
    if (!confirmed) return;

    try {
      // 1. Update the notification status in Firestore to declined
      await updateDoc(doc(db, "notifications", app.id), {
        status: "declined",
        read: true,
      });

      // 2. Add to freelancer_notifications collection
      await addDoc(collection(db, "freelancer_notifications"), {
        freelancerId: app.freelancerId,
        freelancerName: app.name,
        freelancerAvatar: app.profileUrl || "",
        jobId: jobId || app._originalReq?.jobId || "",
        jobTitle: jobTitle,
        status: "declined",
        createdAt: serverTimestamp(),
        isRead: false,
      });

      // 3. Fetch current client's profile from Firestore to get accurate name/avatar for RTDB chat metadata
      let clientName = currentClient.displayName || "Client";
      let clientImage = currentClient.photoURL || "https://i.ibb.co/sqsJwP0/user.png";
      try {
        const clientDoc = await getDoc(doc(db, "users", currentClient.uid));
        if (clientDoc.exists()) {
          const clientData = clientDoc.data();
          if (clientData.name) {
            clientName = clientData.name;
          } else if (clientData.first_name) {
            clientName = `${clientData.first_name} ${clientData.last_name || ""}`.trim();
          }
          clientImage = clientData.profileImage || clientData.profileUrl || clientImage;
        }
      } catch (profileErr) {
        console.error("Error fetching client profile details for chat:", profileErr);
      }

      // 4. Generate chat ID and message ID
      const chatId = currentClient.uid < app.freelancerId 
        ? `${currentClient.uid}_${app.freelancerId}` 
        : `${app.freelancerId}_${currentClient.uid}`;
      const msgId = uuidv4();
      const now = Date.now();
      const messageText = `Hi, thank you for your interest in the job "${jobTitle}". Unfortunately, we have decided to proceed with other applicants.`;

      // 5. Write decline message to RTDB
      await dbSet(dbRef(rtdb, `chats/${chatId}/messages/${msgId}`), {
        id: msgId,
        senderId: currentClient.uid,
        receiverId: app.freelancerId,
        type: "text",
        text: messageText,
        timestamp: now,
        status: "sent",
        reactions: {},
      });

      // 6. Update RTDB chat metadata for both client and freelancer
      await dbUpdate(dbRef(rtdb, `userChats/${currentClient.uid}/${chatId}`), {
        withUid: app.freelancerId,
        otherName: app.name,
        otherImage: app.profileUrl || "",
        lastMessage: messageText,
        lastMessageTime: now,
      });

      await dbUpdate(dbRef(rtdb, `userChats/${app.freelancerId}/${chatId}`), {
        withUid: currentClient.uid,
        otherName: clientName,
        otherImage: clientImage,
        lastMessage: messageText,
        lastMessageTime: now,
      });

      alert("Applicant Declined successfully.");
    } catch (error) {
      console.error("Error declining applicant:", error);
      alert("Failed to decline applicant: " + error.message);
    }
  };

  const allCount = applicants.length;
  const shortlistedCount = applicants.filter(a => a.status === "accepted").length;
  const declinedCount = applicants.filter(a => a.status === "declined").length;

  const tabFilteredApplicants = applicants.filter(app => {
    if (activeTab === "shortlisted") {
      return app.status === "accepted";
    }
    if (activeTab === "declined") {
      return app.status === "declined";
    }
    return true;
  });

  const filteredApplicants = tabFilteredApplicants.filter(app => {
     if (search && !app.name.toLowerCase().includes(search.toLowerCase())) return false;
     return true;
  });

  useEffect(() => {
    if (filteredApplicants.length > 0) {
      const exists = filteredApplicants.some(a => a.id === selectedApplicantId);
      if (!exists) {
        setSelectedApplicantId(filteredApplicants[0].id);
      }
    } else {
      setSelectedApplicantId(null);
    }
  }, [filteredApplicants, selectedApplicantId]);

  const selectedApplicant = filteredApplicants.find(a => a.id === selectedApplicantId) || filteredApplicants[0];

  const jobTitle = jobData?.title || "Untitled Job";
  const jobSubCategory = jobData?.sub_category || jobData?.category || "General Project";

  return (
    <div className="applicants-container">
      <div className="app-top-nav">
        <div className="nav-search-bar">
          <Search size={16} color="#9CA3AF" />
          <input 
            type="text" 
            placeholder="Search freelancers, jobs, services..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="nav-right">
           <button className="btn-ai-assistant">✨ AI Assistant</button>
        </div>
      </div>

      <div className="app-content-wrapper">
        <div className="app-header-row">
          <div>
            <h1 className="app-page-title">Applicants ({filteredApplicants.length})</h1>
            <p className="app-page-subtitle">{jobTitle} - {jobSubCategory}</p>
          </div>
          <button className="btn-back" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        <div className="app-search-applicants">
          <Search size={16} color="#9CA3AF" />
          <input 
            type="text" 
            placeholder="Search applicants..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="app-tabs">
          <button className={`app-tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All ({allCount})</button>
          <button className={`app-tab ${activeTab === 'shortlisted' ? 'active' : ''}`} onClick={() => setActiveTab('shortlisted')}>Shortlisted ({shortlistedCount})</button>
          <button className={`app-tab ${activeTab === 'declined' ? 'active' : ''}`} onClick={() => setActiveTab('declined')}>Declined ({declinedCount})</button>
        </div>

        <div className="app-two-column-layout">
          
          <div className="app-left-column">
            {filteredApplicants.map((app) => (
              <div 
                key={app.id} 
                className={`app-list-card ${selectedApplicantId === app.id ? 'selected' : ''}`}
                onClick={() => setSelectedApplicantId(app.id)}
              >
                <div className="app-list-card-left">
                  {app.profileUrl ? (
                    <img src={app.profileUrl} alt={app.name} className="app-avatar-img" />
                  ) : (
                    <div className="app-avatar-circle" style={{ background: app.color }}>
                      {app.initials}
                    </div>
                  )}
                  <div className="app-list-info">
                    <h3 className="app-list-name">{app.name}</h3>
                    <p className="app-list-meta">{app.role} · {app.rate} · ⭐ {app.rating}</p>
                    <div className="app-list-skills">
                      {app.skills.slice(0, 2).map((skill, idx) => {
                        const colors = ["skill-pink", "skill-blue"];
                        return <span key={idx} className={`small-badge ${colors[idx % 2]}`}>{skill}</span>;
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="app-list-actions">
                  {app.status === "accepted" ? (
                    <span className="badge-accepted-status">Accepted</span>
                  ) : app.status === "declined" ? (
                    <span className="badge-declined-status">Declined</span>
                  ) : (
                    <>
                      <button className="btn-accept" onClick={(e) => { e.stopPropagation(); handleAcceptApplicant(app); }}>
                        <Check size={14} /> Accept
                      </button>
                      <button className="btn-decline" onClick={(e) => { e.stopPropagation(); handleDeclineApplicant(app); }}>
                        <X size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
            {filteredApplicants.length === 0 && (
              <div style={{ padding: '20px', color: '#6B7280', background: 'white', borderRadius: '12px', textAlign: 'center', border: '1px solid #E5E7EB' }}>
                No applicants found for this project yet.
              </div>
            )}
          </div>

          <div className="app-right-column">
            {selectedApplicant ? (
              <div className="app-details-card">
                <div className="app-details-header">
                  {selectedApplicant.profileUrl ? (
                    <img src={selectedApplicant.profileUrl} alt={selectedApplicant.name} className="app-large-avatar-img" />
                  ) : (
                    <div className="app-large-avatar" style={{ background: selectedApplicant.color }}>
                      {selectedApplicant.initials}
                    </div>
                  )}
                  <h2 className="app-details-name">{selectedApplicant.name}</h2>
                  <p className="app-details-role">{selectedApplicant.role} · Freelancer</p>
                  
                  <div className="app-details-rating-row">
                    <span className="rating-badge">⭐ {selectedApplicant.rating} ({selectedApplicant.reviews} reviews)</span>
                    <span className="top-rated-badge">Top Rated</span>
                  </div>
                  
                  <div className="app-stats-row">
                    <div className="app-stat-item">
                      <div className="stat-value">{selectedApplicant.projects}</div>
                      <div className="stat-label">Projects</div>
                    </div>
                    <div className="app-stat-item">
                      <div className="stat-value">{selectedApplicant.rate.split('/')[0]}</div>
                      <div className="stat-label">Per Day</div>
                    </div>
                    <div className="app-stat-item">
                      <div className="stat-value">{selectedApplicant.exp}</div>
                      <div className="stat-label">Exp.</div>
                    </div>
                  </div>
                </div>

                <div className="app-section-divider"></div>

                <div className="app-details-section">
                  <h4 className="app-section-title">SKILLS</h4>
                  <div className="app-skills-wrap">
                    {selectedApplicant.skills.map((skill, idx) => {
                      const colors = ["skill-pink", "skill-blue", "skill-green", "skill-orange", "skill-purple"];
                      return <span key={idx} className={`large-badge ${colors[idx % colors.length]}`}>{skill}</span>;
                    })}
                  </div>
                </div>

                <div className="app-section-divider"></div>

                <div className="app-details-section">
                  <h4 className="app-section-title">COVER NOTE</h4>
                  <p className="app-cover-note">{selectedApplicant.coverNote}</p>
                </div>

                <div className="app-section-divider"></div>

                <div className="app-details-section">
                  <h4 className="app-section-title">PORTFOLIO</h4>
                  <div className="app-portfolio-btns">
                    <button className="btn-portfolio">App Design</button>
                    <button className="btn-portfolio">Dashboard UI</button>
                  </div>
                </div>

                <div className="app-bottom-actions">
                  {selectedApplicant.status === "accepted" ? (
                    <span className="badge-accepted-status" style={{ textAlign: "center", width: "100%", padding: "12px", borderRadius: "8px" }}>Hired / Accepted</span>
                  ) : selectedApplicant.status === "declined" ? (
                    <span className="badge-declined-status" style={{ textAlign: "center", width: "100%", padding: "12px", borderRadius: "8px" }}>Declined</span>
                  ) : (
                    <>
                      <button className="btn-bottom-decline" onClick={() => handleDeclineApplicant(selectedApplicant)}>Decline</button>
                      <button className="btn-bottom-hire" onClick={() => handleAcceptApplicant(selectedApplicant)}>Hire →</button>
                    </>
                  )}
                </div>

              </div>
            ) : null}
          </div>
        </div>
      </div>

      <style>{`
        .applicants-container {
          background: #FAFAFA;
          min-height: 100vh;
          width: 100%;
          font-family: 'DM Sans', sans-serif;
        }

        .app-top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 32px;
          background: white;
          border-bottom: 1px solid #F3F4F6;
        }
        .nav-search-bar {
          display: flex;
          align-items: center;
          background: #F9FAFB;
          border: 1px solid #F3F4F6;
          padding: 10px 16px;
          border-radius: 8px;
          width: 400px;
        }
        .nav-search-bar input {
          border: none;
          background: transparent;
          outline: none;
          margin-left: 10px;
          width: 100%;
          font-size: 13px;
          color: #111827;
        }
        .btn-ai-assistant {
          background: #7C3AED;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
        }

        .app-content-wrapper {
          padding: 32px;
          max-width: 1300px;
          margin: 0 auto;
        }

        .app-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }
        .app-page-title {
          font-size: 24px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 6px 0;
        }
        .app-page-subtitle {
          font-size: 13px;
          color: #6B7280;
          margin: 0;
        }
        .btn-back {
          display: flex;
          align-items: center;
          gap: 6px;
          background: white;
          border: 1px solid #E5E7EB;
          padding: 8px 16px;
          border-radius: 20px;
          color: #374151;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-back:hover {
          background: #F9FAFB;
        }

        .app-search-applicants {
          display: flex;
          align-items: center;
          background: white;
          border: 1px solid #E5E7EB;
          padding: 12px 16px;
          border-radius: 12px;
          margin-bottom: 20px;
        }
        .app-search-applicants input {
          border: none;
          outline: none;
          margin-left: 10px;
          width: 100%;
          font-size: 14px;
          color: #111827;
        }
        
        .app-tabs {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }
        .app-tab {
          padding: 8px 16px;
          border: 1px solid #E5E7EB;
          background: white;
          border-radius: 20px;
          font-size: 13px;
          color: #6B7280;
          font-weight: 600;
          cursor: pointer;
        }
        .app-tab.active {
          border-color: #111827;
          color: #111827;
          background: #F9FAFB;
        }

        .app-two-column-layout {
          display: flex;
          gap: 24px;
          align-items: flex-start;
        }
        
        .app-left-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .app-list-card {
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .app-list-card:hover {
          border-color: #D1D5DB;
        }
        .app-list-card.selected {
          border-color: #3B82F6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }

        .app-list-card-left {
          display: flex;
          gap: 16px;
        }
        .app-avatar-circle, .app-avatar-img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 16px;
          flex-shrink: 0;
          object-fit: cover;
        }
        .app-list-info {
          display: flex;
          flex-direction: column;
        }
        .app-list-name {
          font-size: 15px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 4px 0;
        }
        .app-list-meta {
          font-size: 12px;
          color: #6B7280;
          margin: 0 0 8px 0;
        }
        .app-list-skills {
          display: flex;
          gap: 6px;
        }
        .small-badge {
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 12px;
          font-weight: 500;
        }
        .skill-pink { background: #FDF2F8; color: #DB2777; }
        .skill-blue { background: #EFF6FF; color: #2563EB; }
        .skill-green { background: #ECFDF5; color: #059669; }
        .skill-orange { background: #FFF7ED; color: #EA580C; }
        .skill-purple { background: #F5F3FF; color: #7C3AED; }

        .app-list-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-accept {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #F3F4F6;
          color: #7C3AED;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-accept:hover {
          background: #E5E7EB;
        }
        .btn-decline {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #FEF2F2;
          color: #EF4444;
          border: none;
          cursor: pointer;
        }
        .btn-decline:hover {
          background: #FEE2E2;
        }

        .app-right-column {
          width: 500px;
          flex-shrink: 0;
        }
        .app-details-card {
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 16px;
          padding: 32px;
        }
        .app-details-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 24px;
        }
        .app-large-avatar, .app-large-avatar-img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 16px;
          object-fit: cover;
        }
        .app-details-name {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 6px 0;
        }
        .app-details-role {
          font-size: 14px;
          color: #6B7280;
          margin: 0 0 12px 0;
        }
        .app-details-rating-row {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }
        .rating-badge {
          background: #FEF9C3;
          color: #A16207;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }
        .top-rated-badge {
          background: #D1FAE5;
          color: #065F46;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }
        .app-stats-row {
          display: flex;
          justify-content: center;
          gap: 40px;
          width: 100%;
        }
        .app-stat-item {
          text-align: center;
        }
        .stat-value {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 4px;
        }
        .stat-label {
          font-size: 12px;
          color: #6B7280;
        }

        .app-section-divider {
          height: 1px;
          background: #F3F4F6;
          margin: 24px 0;
        }

        .app-details-section {
          margin-bottom: 24px;
        }
        .app-section-title {
          font-size: 11px;
          color: #9CA3AF;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin: 0 0 12px 0;
        }
        .app-skills-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .large-badge {
          font-size: 12px;
          padding: 6px 12px;
          border-radius: 16px;
          font-weight: 600;
        }
        .app-cover-note {
          font-size: 13px;
          color: #6B7280;
          line-height: 1.6;
          margin: 0;
        }
        
        .app-portfolio-btns {
          display: flex;
          gap: 12px;
        }
        .btn-portfolio {
          flex: 1;
          background: #F5F3FF;
          color: #7C3AED;
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .app-bottom-actions {
          display: flex;
          gap: 12px;
          margin-top: 32px;
        }
        .btn-bottom-decline {
          flex: 1;
          background: white;
          color: #7C3AED;
          border: 1px solid #7C3AED;
          border-radius: 8px;
          padding: 14px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-bottom-hire {
          flex: 1;
          background: #7C3AED;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 14px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
        
        .badge-accepted-status {
          background: #ECFDF5;
          color: #059669;
          font-size: 12px;
          padding: 6px 12px;
          border-radius: 12px;
          font-weight: 600;
          display: inline-block;
        }
        .badge-declined-status {
          background: #FEF2F2;
          color: #EF4444;
          font-size: 12px;
          padding: 6px 12px;
          border-radius: 12px;
          font-weight: 600;
          display: inline-block;
        }
        @media (max-width: 1100px) {
          .app-two-column-layout {
            flex-direction: column;
          }
          .app-right-column {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}