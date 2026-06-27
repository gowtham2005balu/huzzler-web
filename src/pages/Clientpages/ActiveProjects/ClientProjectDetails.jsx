import React, { useState, useEffect } from "react";
import { ChevronRight, Check, AlertTriangle, MessageSquare, Download, FileText } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firbase/Firebase";

export default function ClientProjectDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  
  const [isActive, setIsActive] = useState(true);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [jobData, setJobData] = useState(null);
  const [freelancerData, setFreelancerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        let jDoc = await getDoc(doc(db, "jobs", jobId));
        if (!jDoc.exists()) {
          jDoc = await getDoc(doc(db, "jobs_24h", jobId));
        }
        if (!jDoc.exists()) {
          jDoc = await getDoc(doc(db, "pausedJobs", jobId));
        }
        
        if (jDoc.exists()) {
          const data = jDoc.data();
          setJobData(data);
          
          const freelancerId = data.hiredFreelancerId || data.freelancerId;
          if (freelancerId) {
            let fDoc = await getDoc(doc(db, "users", freelancerId));
            if (!fDoc.exists()) {
              fDoc = await getDoc(doc(db, "freelancers", freelancerId));
            }
            if (fDoc.exists()) {
              setFreelancerData(fDoc.data());
            }
          }
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading project details...</div>;
  }

  if (!jobData) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Project not found.</div>;
  }

  const title = jobData.title || "Untitled Project";
  const subCategory = jobData.sub_category || jobData.category || "General Project";
  const createdAt = jobData.created_at?.seconds ? new Date(jobData.created_at.seconds * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Unknown Date";
  
  const budgetFrom = jobData.budget_from || 0;
  const budgetTo = jobData.budget_to || 0;
  const budgetStr = budgetFrom === budgetTo && budgetFrom > 0 ? `₹${budgetFrom}` : (budgetFrom > 0 || budgetTo > 0 ? `₹${budgetFrom}–₹${budgetTo}` : "Negotiable");
  
  const timeline = jobData.timeline || (jobData.is24h ? "24 Hours" : "Flexible");
  const location = jobData.location || "Remote";
  const skills = jobData.skills && jobData.skills.length > 0 ? jobData.skills : ["UI Design", "Figma", "UX Research"];
  const description = jobData.description || "No description provided.";
  
  const fName = freelancerData ? (freelancerData.first_name + " " + (freelancerData.last_name || "")) : "James Andrew";
  const fInitials = freelancerData ? (freelancerData.first_name?.[0] + (freelancerData.last_name?.[0] || "")) : "JA";
  const fRole = freelancerData?.role || "UI/UX Designer";
  const fRating = freelancerData?.rating || "4.8";
  const fProjects = freelancerData?.projectsCount || "28";

  return (
    <div className="project-details-container">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <span className="breadcrumb-link" onClick={() => navigate(-1)}>Active Projects</span>
        <ChevronRight size={14} className="breadcrumb-separator" />
        <span className="breadcrumb-current">Mobile App Redesign</span>
      </div>

      <div className="project-details-layout">
        
        {/* LEFT COLUMN */}
        <div className="left-column">
          
          {/* Header Card */}
          <div className="card">
            <div className="card-header-flex">
              <div>
                <h1 className="project-title">{title}</h1>
                <p className="project-subtitle">{subCategory} - Started {createdAt}</p>
              </div>
              <div className="status-toggle-wrapper">
                <span className="status-dot"></span>
                <span className="status-text">Active</span>
                <div 
                  className={`toggle-switch ${isActive ? 'active' : ''}`}
                  onClick={() => setIsActive(!isActive)}
                >
                  <div className="toggle-circle"></div>
                </div>
              </div>
            </div>
            
            <div className="card-divider"></div>
            
            <div className="metrics-row">
              <div className="metric-col">
                <div className="metric-label">BUDGET</div>
                <div className="metric-value text-purple">{budgetStr}</div>
              </div>
              <div className="metric-col">
                <div className="metric-label">TIMELINE</div>
                <div className="metric-value">{timeline}</div>
              </div>
              <div className="metric-col">
                <div className="metric-label">LOCATION</div>
                <div className="metric-value">{location}</div>
              </div>
            </div>
          </div>

          {/* Skills Required */}
          <div className="card">
            <h3 className="section-title">Skills Required</h3>
            <div className="skills-row">
              {skills.map((skill, index) => {
                const colors = ["skill-pink", "skill-purple", "skill-blue", "skill-green", "skill-orange"];
                const colorClass = colors[index % colors.length];
                return (
                  <span key={index} className={`skill-badge ${colorClass}`}>{skill}</span>
                );
              })}
            </div>
          </div>

          {/* Job Description */}
          <div className="card">
            <h3 className="section-title">Job Description</h3>
            <p className="description-text">
              {description}
            </p>
          </div>

          {/* Assigned Freelancer */}
          <div className="card">
            <h3 className="section-title">Assigned Freelancer</h3>
            
            <div className="freelancer-row">
              <div className="freelancer-info-left">
                {freelancerData?.profileUrl ? (
                  <img src={freelancerData.profileUrl} alt={fName} className="freelancer-avatar-img" />
                ) : (
                  <div className="freelancer-avatar">{fInitials}</div>
                )}
                <div>
                  <h4 className="freelancer-name">{fName}</h4>
                  <p className="freelancer-meta">⭐ {fRating} · {fRole} · {fProjects} projects completed</p>
                </div>
              </div>
              <div className="freelancer-actions-right">
                <button className="btn-chat">
                  <MessageSquare size={14} /> Chat
                </button>
                <button className="btn-view-profile">View Profile</button>
              </div>
            </div>

            <div className="card-divider" style={{ margin: "20px 0" }}></div>

            <div className="action-buttons-row">
              <button className="btn-raise-issue">
                <AlertTriangle size={16} color="#F59E0B" /> Raise Issue
              </button>
              <button className="btn-mark-complete" onClick={() => setShowCompleteModal(true)}>
                <Check size={16} /> Mark as Complete
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="right-column">
          
          {/* Project Progress */}
          <div className="card">
            <h3 className="sidebar-section-title">PROJECT PROGRESS</h3>
            <div className="progress-header">
              <span className="progress-label">Overall Completion</span>
              <span className="progress-percent">72%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: "72%" }}></div>
            </div>
            <p className="progress-estimated">Estimated: 3 days remaining</p>
          </div>

          {/* Milestones */}
          <div className="card">
            <h3 className="sidebar-section-title">MILESTONES</h3>
            <div className="milestone-list">
              <div className="milestone-item completed">
                <div className="milestone-icon"><Check size={12} strokeWidth={3} /></div>
                <div className="milestone-text">Wireframes submitted</div>
                <div className="milestone-date">Jan 17</div>
              </div>
              <div className="milestone-item completed">
                <div className="milestone-icon"><Check size={12} strokeWidth={3} /></div>
                <div className="milestone-text">Design system</div>
                <div className="milestone-date">Jan 19</div>
              </div>
              <div className="milestone-item completed">
                <div className="milestone-icon"><Check size={12} strokeWidth={3} /></div>
                <div className="milestone-text">10 screens complete</div>
                <div className="milestone-date">Jan 21</div>
              </div>
              <div className="milestone-item pending">
                <div className="milestone-icon-empty"></div>
                <div className="milestone-text">Final prototype</div>
                <div className="milestone-date">Jan 24</div>
              </div>
              <div className="milestone-item pending">
                <div className="milestone-icon-empty"></div>
                <div className="milestone-text">Handoff files</div>
                <div className="milestone-date">Jan 25</div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="card">
            <h3 className="sidebar-section-title">PAYMENT</h3>
            <div className="payment-row">
              <span className="payment-label">Total Budget</span>
              <span className="payment-value">₹7,000</span>
            </div>
            <div className="payment-row">
              <span className="payment-label">Released</span>
              <span className="payment-value text-green">₹0</span>
            </div>
            <div className="payment-divider"></div>
            <div className="payment-row">
              <span className="payment-label">On Completion</span>
              <span className="payment-value text-purple">₹7,000</span>
            </div>
          </div>

          {/* Deliverables */}
          <div className="card">
            <h3 className="sidebar-section-title">DELIVERABLES</h3>
            <div className="deliverable-item">
              <div className="deliverable-icon-box">
                <FileText size={18} color="#6B7280" />
              </div>
              <div className="deliverable-info">
                <h4 className="deliverable-name">Wireframes_v1.fig</h4>
                <p className="deliverable-meta">2.4 MB · Jan 17</p>
              </div>
              <button className="btn-download">
                <Download size={14} color="#7C4EF5" />
              </button>
            </div>
            <div className="deliverable-item" style={{ marginTop: "12px" }}>
              <div className="deliverable-icon-box">
                <FileText size={18} color="#6B7280" />
              </div>
              <div className="deliverable-info">
                <h4 className="deliverable-name">DesignSystem.fig</h4>
                <p className="deliverable-meta">8.1 MB · Jan 19</p>
              </div>
              <button className="btn-download">
                <Download size={14} color="#7C4EF5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Sora:wght@400;600;700&display=swap');

        .project-details-container {
          background: #F8F9FA;
          min-height: 100vh;
          padding: 24px 32px;
          font-family: 'DM Sans', sans-serif;
          color: #111827;
        }

        .breadcrumbs {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          margin-bottom: 24px;
        }
        .breadcrumb-link {
          color: #9CA3AF;
          cursor: pointer;
        }
        .breadcrumb-link:hover {
          color: #6B7280;
        }
        .breadcrumb-separator {
          color: #D1D5DB;
        }
        .breadcrumb-current {
          color: #111827;
          font-weight: 600;
        }

        .project-details-layout {
          display: flex;
          gap: 24px;
          max-width: 1336px;
          margin: 0 auto;
        }

        .left-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .right-column {
          width: 360px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .card {
          background: white;
          border-radius: 16px;
          border: 1px solid #EEEDF3;
          padding: 24px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.02);
        }

        /* Header Card */
        .card-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .project-title {
          font-family: 'Sora', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #1A1433;
          margin: 0 0 4px 0;
        }
        .project-subtitle {
          font-size: 13px;
          color: #8C84A8;
          margin: 0;
        }

        .status-toggle-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #F3FAFC;
          border: 1px solid #E8F5E9;
          padding: 6px 12px;
          border-radius: 20px;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          background: #10B981;
          border-radius: 50%;
        }
        .status-text {
          font-size: 12px;
          font-weight: 700;
          color: #10B981;
        }
        
        .toggle-switch {
          width: 40px;
          height: 20px;
          background: #E5E7EB;
          border-radius: 12px;
          position: relative;
          cursor: pointer;
          transition: background 0.3s;
          margin-left: 4px;
        }
        .toggle-switch.active {
          background: #7C4EF5;
        }
        .toggle-circle {
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: transform 0.3s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .toggle-switch.active .toggle-circle {
          transform: translateX(20px);
        }

        .card-divider {
          height: 1px;
          background: #F3F4F6;
          margin: 20px 0;
        }

        .metrics-row {
          display: flex;
          gap: 24px;
        }
        .metric-col {
          flex: 1;
        }
        .metric-label {
          font-size: 11px;
          color: #9CA3AF;
          font-weight: 600;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
          text-transform: uppercase;
        }
        .metric-value {
          font-size: 15px;
          font-weight: 700;
          color: #1A1433;
          font-family: 'Sora', sans-serif;
        }
        .text-purple { color: #7C4EF5 !important; }

        /* Skills */
        .section-title {
          font-size: 15px;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          margin: 0 0 16px 0;
          color: #1A1433;
        }
        .skills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .skill-badge {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        .skill-pink { background: #FDE8EF; color: #E11D48; }
        .skill-purple { background: #F3E8FF; color: #7C4EF5; }
        .skill-blue { background: #DBEAFE; color: #2563EB; }
        .skill-green { background: #D1FAE5; color: #059669; }
        .skill-orange { background: #FFEDD5; color: #EA580C; }

        /* Description */
        .description-text {
          font-size: 13px;
          color: #4B5563;
          line-height: 1.6;
          margin: 0;
        }

        /* Freelancer */
        .freelancer-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .freelancer-info-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .freelancer-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #7C4EF5;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
        }
        .freelancer-name {
          font-size: 15px;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          margin: 0 0 4px 0;
        }
        .freelancer-meta {
          font-size: 12px;
          color: #6B7280;
          margin: 0;
        }
        .freelancer-actions-right {
          display: flex;
          gap: 10px;
        }
        .btn-chat {
          background: #FEF3C7;
          color: #92400E;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .btn-view-profile {
          background: white;
          color: #374151;
          border: 1px solid #D1D5DB;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .action-buttons-row {
          display: flex;
          gap: 16px;
        }
        .btn-raise-issue {
          flex: 1;
          background: white;
          color: #374151;
          border: 1px solid #D1D5DB;
          padding: 12px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: 0.2s;
        }
        .btn-raise-issue:hover { background: #F9FAFB; }
        
        .btn-mark-complete {
          flex: 2;
          background: #7C4EF5;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: 0.2s;
        }
        .btn-mark-complete:hover { background: #6A3EE0; }

        /* RIGHT SIDEBAR */
        .sidebar-section-title {
          font-size: 11px;
          font-weight: 700;
          color: #9CA3AF;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin: 0 0 16px 0;
        }
        
        /* Progress */
        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .progress-label {
          font-size: 13px;
          font-weight: 600;
          color: #111827;
        }
        .progress-percent {
          font-size: 13px;
          font-weight: 700;
          color: #7C4EF5;
        }
        .progress-bar-bg {
          width: 100%;
          height: 6px;
          background: #F3E8FF;
          border-radius: 4px;
          margin-bottom: 12px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background: #7C4EF5;
          border-radius: 4px;
        }
        .progress-estimated {
          font-size: 11px;
          color: #9CA3AF;
          margin: 0;
        }

        /* Milestones */
        .milestone-list {
          display: flex;
          flex-direction: column;
        }
        .milestone-item {
          display: flex;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #F3F4F6;
        }
        .milestone-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .milestone-item:first-child {
          padding-top: 0;
        }
        .milestone-icon {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #10B981;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
        }
        .milestone-icon-empty {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid #E5E7EB;
          margin-right: 12px;
          box-sizing: border-box;
        }
        .milestone-text {
          flex: 1;
          font-size: 13px;
          font-weight: 500;
        }
        .completed .milestone-text {
          text-decoration: line-through;
          color: #9CA3AF;
        }
        .pending .milestone-text {
          color: #374151;
        }
        .milestone-date {
          font-size: 11px;
          color: #9CA3AF;
        }

        /* Payment */
        .payment-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .payment-row:last-child { margin-bottom: 0; }
        .payment-label {
          font-size: 13px;
          color: #6B7280;
        }
        .payment-value {
          font-size: 14px;
          font-weight: 700;
          color: #111827;
        }
        .text-green { color: #10B981; }
        .payment-divider {
          height: 1px;
          background: #F3F4F6;
          margin: 12px 0;
        }

        /* Deliverables */
        .deliverable-item {
          display: flex;
          align-items: center;
          background: #F9FAFB;
          border: 1px dashed #E5E7EB;
          padding: 12px;
          border-radius: 12px;
        }
        .deliverable-icon-box {
          width: 36px;
          height: 36px;
          background: white;
          border: 1px solid #F3F4F6;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
        }
        .deliverable-info {
          flex: 1;
        }
        .deliverable-name {
          font-size: 13px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 2px 0;
        }
        .deliverable-meta {
          font-size: 11px;
          color: #9CA3AF;
          margin: 0;
        }
        .btn-download {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }

        .freelancer-avatar-img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          object-fit: cover;
        }

        @media (max-width: 1024px) {
          .project-details-layout {
            flex-direction: column;
          }
          .right-column {
            width: 100%;
          }
        }
        /* --- Modal Styles --- */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }
        .modal-card {
          background: white;
          width: 90%;
          max-width: 440px;
          border-radius: 20px;
          padding: 40px 30px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-icon-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #F4FCE3;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          position: relative;
        }
        .modal-icon-inner {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #D9F99D;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-title {
          font-size: 22px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 12px 0;
        }
        .modal-subtitle {
          font-size: 13px;
          color: #6B7280;
          line-height: 1.5;
          margin: 0 0 24px 0;
        }
        .modal-details-box {
          background: #F9FAFB;
          border: 1px solid #F3F4F6;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
        }
        .modal-detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 13px;
        }
        .modal-detail-row:last-child {
          margin-bottom: 0;
        }
        .modal-detail-label {
          color: #9CA3AF;
        }
        .modal-detail-value {
          color: #111827;
          font-weight: 600;
        }
        .modal-detail-value.purple {
          color: #7C3AED;
        }
        .modal-btn-primary {
          width: 100%;
          background: #7C3AED;
          color: white;
          border: none;
          border-radius: 10px;
          padding: 14px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s;
        }
        .modal-btn-primary:hover {
          background: #6D28D9;
        }
        .modal-btn-secondary {
          width: 100%;
          background: white;
          color: #7C3AED;
          border: 1px solid #7C3AED;
          border-radius: 10px;
          padding: 14px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .modal-btn-secondary:hover {
          background: #F5F3FF;
        }
      `}</style>
      
      {/* Complete Modal */}
      {showCompleteModal && (
        <div className="modal-overlay" onClick={() => setShowCompleteModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon-wrapper">
              <div className="modal-icon-inner">
                <Check size={28} strokeWidth={3} color="#111827" />
              </div>
            </div>
            
            <h2 className="modal-title">Mark as Complete?</h2>
            <p className="modal-subtitle">
              Confirm that all deliverables have been received and you're satisfied with the work. The payment will be released to the freelancer.
            </p>
            
            <div className="modal-details-box">
              <div className="modal-detail-row">
                <span className="modal-detail-label">Project</span>
                <span className="modal-detail-value">{title}</span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-detail-label">Freelancer</span>
                <span className="modal-detail-value">{fName}</span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-detail-label">Payment to Release</span>
                <span className="modal-detail-value purple">{budgetStr}</span>
              </div>
            </div>
            
            <button 
              className="modal-btn-primary"
              onClick={() => {
                alert("Payment released & Job Marked as Complete!");
                setShowCompleteModal(false);
              }}
            >
              <Check size={16} /> Yes, Mark as Complete
            </button>
            <button 
              className="modal-btn-secondary"
              onClick={() => setShowCompleteModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
