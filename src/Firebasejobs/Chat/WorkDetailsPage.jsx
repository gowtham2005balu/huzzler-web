import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  increment,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firbase/Firebase";
import { ArrowLeft, Share2, MapPin, Clock, Users, Wallet, Briefcase, Link as LinkIcon, CheckCircle } from "lucide-react";

export default function WorkDetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const job = state?.job;

  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const [isApplied, setIsApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const jobId = job?.id;

  // 🚨 Handle refresh / no data
  useEffect(() => {
    if (!job) {
      alert("No job data");
      navigate(-1);
    }
  }, [job, navigate]);

  // 🔍 Check applied
  useEffect(() => {
    const checkApplied = async () => {
      if (!jobId || !userId) return;
      const snap = await getDoc(doc(db, "jobs_24h", jobId));
      const applicants = snap.data()?.applicants || [];
      const already = applicants.some((a) => a.freelancerId === userId);
      setIsApplied(already);
    };
    checkApplied();
  }, [jobId, userId]);

  // 🚀 Apply Job
  const applyJob = async () => {
    if (isApplied) return;
    if (!userId) return alert("Login required");

    setIsApplying(true);
    try {
      const userSnap = await getDoc(doc(db, "users", userId));
      const userData = userSnap.data() || {};

      const freelancerName = `${userData.firstName || ""} ${userData.lastName || ""}`.trim() || "Freelancer";
      const freelancerImage = userData.profileImage || "";

      const jobSnap = await getDoc(doc(db, "jobs_24h", jobId));
      const jobData = jobSnap.data();

      if (!jobData) {
        setIsApplying(false);
        return alert("Job not found");
      }

      const clientUid = jobData.userId;

      await updateDoc(doc(db, "jobs_24h", jobId), {
        applicants: arrayUnion({
          freelancerId: userId,
          name: freelancerName,
          profileImage: freelancerImage,
          appliedAt: new Date(),
        }),
        applicants_count: increment(1),
      });

      await addDoc(collection(db, "notifications"), {
        title: jobData.title,
        body: `${freelancerName} applied for your project.`,
        freelancerId: userId,
        jobId,
        clientUid,
        timestamp: serverTimestamp(),
        read: false,
      });

      setIsApplied(true);
      alert("Application sent successfully! ✅");
    } catch (e) {
      console.error(e);
      alert("Error applying. Please try again.");
    } finally {
      setIsApplying(false);
    }
  };

  const shareApp = () => {
    navigator.clipboard.writeText("https://play.google.com/store/apps/details?id=com.huzzler.app");
    alert("Link copied to clipboard!");
  };

  if (!job) return null;

  return (
    <div className="work-details-wrapper">
      {/* Navbar */}
      <div className="wd-navbar">
        <button className="wd-icon-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} color="#1F2937" />
        </button>
        <h2 className="wd-nav-title">Project Details</h2>
        <button className="wd-icon-btn" onClick={shareApp}>
          <Share2 size={20} color="#1F2937" />
        </button>
      </div>

      <div className="wd-main-content">
        {/* Hero Card */}
        <div className="wd-hero-card">
          <div className="wd-hero-header">
            <div className="wd-category-badge">{job.category || "Project"}</div>
            <div className="wd-status-badge">Active</div>
          </div>
          
          <h1 className="wd-job-title">{job.title || "Untitled Project"}</h1>
          
          <div className="wd-hero-stats">
            <div className="wd-stat-item">
              <Wallet size={18} color="#7C3CFF" />
              <div className="wd-stat-text">
                <span className="wd-stat-label">Budget</span>
                <span className="wd-stat-val">₹{job.budget_from || 0} - ₹{job.budget_to || 0}</span>
              </div>
            </div>
            <div className="wd-divider"></div>
            <div className="wd-stat-item">
              <Clock size={18} color="#7C3CFF" />
              <div className="wd-stat-text">
                <span className="wd-stat-label">Timeline</span>
                <span className="wd-stat-val">{job.timeline || "Flexible"}</span>
              </div>
            </div>
            <div className="wd-divider"></div>
            <div className="wd-stat-item">
              <MapPin size={18} color="#7C3CFF" />
              <div className="wd-stat-text">
                <span className="wd-stat-label">Location</span>
                <span className="wd-stat-val">{job.location || "Remote"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="wd-sections-container">
          
          <div className="wd-section">
            <h3 className="wd-section-title">
              <Briefcase size={20} /> Project Overview
            </h3>
            <p className="wd-section-body">{job.description || "No description provided for this project."}</p>
          </div>

          <div className="wd-section">
            <h3 className="wd-section-title">
              <CheckCircle size={20} /> Skills Required
            </h3>
            {job.skills && job.skills.length > 0 ? (
              <div className="wd-skills-grid">
                {job.skills.map((skill, i) => (
                  <span key={i} className="wd-skill-chip">{skill}</span>
                ))}
              </div>
            ) : (
              <p className="wd-section-body wd-empty">No specific skills mentioned.</p>
            )}
          </div>

          {(job.employmentType || job.clientRequirements) && (
            <div className="wd-two-col-grid">
              {job.employmentType && (
                <div className="wd-section">
                  <h3 className="wd-section-title">Employment Type</h3>
                  <div className="wd-info-box">{job.employmentType}</div>
                </div>
              )}
              {job.clientRequirements && (
                <div className="wd-section">
                  <h3 className="wd-section-title">Requirements</h3>
                  <div className="wd-info-box">{job.clientRequirements}</div>
                </div>
              )}
            </div>
          )}

          {job.sampleProjectUrl && (
            <div className="wd-section">
              <h3 className="wd-section-title">
                <LinkIcon size={20} /> Reference Link
              </h3>
              <a href={job.sampleProjectUrl} target="_blank" rel="noreferrer" className="wd-link-card">
                <div className="wd-link-icon">🔗</div>
                <div className="wd-link-text">{job.sampleProjectUrl}</div>
                <ArrowLeft size={16} className="wd-link-arrow" style={{ transform: "rotate(135deg)" }} />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="wd-bottom-bar">
        <div className="wd-applicants-count">
          <Users size={18} color="#6B7280" />
          <span><b>{job.applicants_count || 0}</b> Applicants</span>
        </div>
        <button 
          className={`wd-apply-btn ${isApplied ? 'applied' : ''} ${isApplying ? 'loading' : ''}`}
          onClick={applyJob} 
          disabled={isApplied || isApplying}
        >
          {isApplying ? "Applying..." : isApplied ? "Application Submitted ✅" : "Apply for Project"}
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .work-details-wrapper {
          min-height: 100vh;
          background: linear-gradient(145deg, #F8F5FF 0%, #FFFFFF 100%);
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #111827;
          display: flex;
          flex-direction: column;
          padding-bottom: 100px; /* space for bottom bar */
        }

        /* Navbar */
        .wd-navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 50;
          border-bottom: 1px solid rgba(229, 231, 235, 0.5);
        }
        .wd-icon-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: #F3F4F6;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .wd-icon-btn:hover {
          background: #E5E7EB;
          transform: scale(1.05);
        }
        .wd-nav-title {
          font-size: 18px;
          font-weight: 700;
          margin: 0;
          color: #111827;
        }

        /* Main Content */
        .wd-main-content {
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
          padding: 24px;
          animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Hero Card */
        .wd-hero-card {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 10px 40px rgba(124, 60, 255, 0.05);
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
        }
        .wd-hero-card::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(124,60,255,0.1) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
          z-index: 0;
        }
        .wd-hero-header {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }
        .wd-category-badge {
          background: #7C3CFF;
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .wd-status-badge {
          background: #D1FAE5;
          color: #059669;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }
        .wd-job-title {
          font-size: 32px;
          font-weight: 800;
          line-height: 1.2;
          margin: 0 0 24px 0;
          color: #111827;
          position: relative;
          z-index: 1;
        }

        /* Stats Row */
        .wd-hero-stats {
          display: flex;
          align-items: center;
          gap: 24px;
          background: white;
          padding: 16px 24px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
          position: relative;
          z-index: 1;
          flex-wrap: wrap;
        }
        .wd-stat-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .wd-divider {
          width: 1px;
          height: 32px;
          background: #E5E7EB;
        }
        .wd-stat-text {
          display: flex;
          flex-direction: column;
        }
        .wd-stat-label {
          font-size: 12px;
          color: #6B7280;
          font-weight: 500;
          margin-bottom: 2px;
        }
        .wd-stat-val {
          font-size: 15px;
          font-weight: 700;
          color: #111827;
        }

        /* Sections */
        .wd-sections-container {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .wd-section {
          background: transparent;
        }
        .wd-section-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 16px 0;
        }
        .wd-section-title svg {
          color: #7C3CFF;
        }
        .wd-section-body {
          font-size: 16px;
          line-height: 1.6;
          color: #4B5563;
          margin: 0;
        }
        .wd-empty {
          font-style: italic;
          color: #9CA3AF;
        }

        /* Skills */
        .wd-skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .wd-skill-chip {
          background: #F5F3FF;
          color: #7C3CFF;
          padding: 8px 16px;
          border-radius: 24px;
          font-size: 14px;
          font-weight: 600;
          border: 1px solid #EDE9FE;
          transition: all 0.2s ease;
        }
        .wd-skill-chip:hover {
          background: #7C3CFF;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(124, 60, 255, 0.2);
        }

        /* Two Column Layout */
        .wd-two-col-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .wd-info-box {
          background: white;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #F3F4F6;
          font-size: 15px;
          font-weight: 500;
          color: #374151;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        /* Link Card */
        .wd-link-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: white;
          padding: 16px 20px;
          border-radius: 16px;
          text-decoration: none;
          border: 1px solid #F3F4F6;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
          transition: all 0.3s ease;
        }
        .wd-link-card:hover {
          border-color: #7C3CFF;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(124, 60, 255, 0.1);
        }
        .wd-link-icon {
          width: 40px;
          height: 40px;
          background: #F5F3FF;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        .wd-link-text {
          flex: 1;
          color: #111827;
          font-weight: 600;
          font-size: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .wd-link-arrow {
          color: #9CA3AF;
        }

        /* Bottom Action Bar */
        .wd-bottom-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(229, 231, 235, 0.5);
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 100;
          box-shadow: 0 -10px 40px rgba(0,0,0,0.03);
        }
        
        .wd-applicants-count {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          color: #4B5563;
        }
        .wd-applicants-count b {
          color: #111827;
          font-size: 16px;
        }

        .wd-apply-btn {
          background: linear-gradient(135deg, #7C3CFF 0%, #5B21B6 100%);
          color: white;
          border: none;
          padding: 14px 32px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(124, 60, 255, 0.3);
        }
        .wd-apply-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(124, 60, 255, 0.4);
        }
        .wd-apply-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .wd-apply-btn.applied {
          background: #10B981;
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
          cursor: default;
        }
        .wd-apply-btn.loading {
          opacity: 0.8;
          cursor: wait;
        }

        /* Animations */
        @keyframes slideUpFade {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 640px) {
          .wd-hero-stats {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .wd-divider {
            width: 100%;
            height: 1px;
          }
          .wd-two-col-grid {
            grid-template-columns: 1fr;
          }
          .wd-bottom-bar {
            flex-direction: column;
            gap: 16px;
          }
          .wd-apply-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}