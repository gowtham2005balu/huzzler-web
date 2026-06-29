



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { db } from "../firbase/Firebase";
import CreatableSelect from "react-select/creatable";

const tagColors = [
  { bg: "#EFF6FF", text: "#3B82F6" }, // Blue
  { bg: "#ECFDF5", text: "#10B981" }, // Green
  { bg: "#FEF2F2", text: "#EF4444" }, // Red
  { bg: "#F5F3FF", text: "#8B5CF6" }, // Purple
  { bg: "#FFF7ED", text: "#F97316" }, // Orange
  { bg: "#F0FDF4", text: "#16A34A" }, // Emerald
];

const getColorForLabel = (label) => {
  if (!label) return tagColors[0];
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    hash = label.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % tagColors.length;
  return tagColors[index];
};

const skillOptions = [
  "UI Design", "UX Design", "Figma", "Website Development", "Mobile Apps (iOS & Android)",
  "SEO", "Logo Design", "Graphic Design", "Writing & Translation", "Video Editing",
  "Illustration", "Pattern Design", "Website Design", "App Design", "UX Research",
  "Prototyping", "Wireframing", "Product Design", "Brand Style Guides", "Presentation Design",
  "Social Media Design", "Web Programming", "E-Commerce Development", "Game Development",
  "WordPress", "Shopify", "React Development", "Node.js", "Python Development",
  "API Integration", "Data Analysis", "Digital Marketing", "Content Writing", "Copywriting",
].map(e => ({ label: e, value: e }));

const toolOptions = [
  "Figma", "Adobe XD", "Sketch", "Webflow", "Framer", "InVision", "ProtoPie",
  "Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign", "Canva", "CorelDRAW",
  "Notion", "Miro", "Balsamiq", "Axure RP", "Lucidchart",
  "Blender", "ZBrush", "Unity", "Unreal Engine", "AutoCAD", "SketchUp",
  "React", "Vue.js", "Angular", "Next.js", "TailwindCSS", "Bootstrap",
  "Node.js", "Express", "Django", "Flask", "Spring Boot", "Laravel",
  "MongoDB", "PostgreSQL", "MySQL", "Firebase", "AWS", "Google Cloud",
  "Docker", "Kubernetes", "Git", "GitHub", "GitLab", "Jira", "Trello",
  "VS Code", "WebStorm", "Android Studio", "Xcode",
].map(e => ({ label: e, value: e }));

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#F8F9FA",
    borderRadius: "12px",
    border: "none",
    padding: "6px 12px",
    boxShadow: "none",
    minHeight: "50px",
    "&:hover": {
      border: "none",
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "12px",
    zIndex: 9999,
  }),
  menuPortal: base => ({ ...base, zIndex: 9999 }),
  multiValue: (provided, state) => {
    const colorInfo = getColorForLabel(state.data.label);
    return {
      ...provided,
      backgroundColor: colorInfo.bg,
      borderRadius: "8px",
      padding: "2px",
    };
  },
  multiValueLabel: (provided, state) => {
    const colorInfo = getColorForLabel(state.data.label);
    return {
      ...provided,
      color: colorInfo.text,
      fontWeight: 600,
    };
  },
  multiValueRemove: (provided, state) => {
    const colorInfo = getColorForLabel(state.data.label);
    return {
      ...provided,
      color: colorInfo.text,
      ":hover": {
        backgroundColor: colorInfo.text,
        color: "#fff",
      },
    };
  },
  placeholder: (provided) => ({
    ...provided,
    color: "#6b7280",
  }),
};

export default function AddService() {
  const navigate = useNavigate();

  const isValidHttpsUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === "https:";
    } catch (err) {
      return false;
    }
  };

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    deliveryDays: "",
    skills: "",
    tools: "",
    requirements: "",
  });

  const [sampleUrl, setSampleUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [error, setError] = useState("");
  
  // UI-only states to match Figma design
  const [serviceType, setServiceType] = useState("Work");
  const [selectedPricingTier, setSelectedPricingTier] = useState("Standard");
  const [maxPrice, setMaxPrice] = useState("");
  const [deliverables, setDeliverables] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  // FAQ state
  const [faqs, setFaqs] = useState([]);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [faqForm, setFaqForm] = useState({ question: "", answer: "" });
  const [editingFaqIndex, setEditingFaqIndex] = useState(-1);
  const [expandedFaqs, setExpandedFaqs] = useState([]);

  // 🧩 Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🧩 Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) {
      alert("Please log in to save a service.");
      return;
    }

    const serviceData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      budget_from: Number(formData.price),
      budget_to: Number(maxPrice),
      category: formData.category,
      skills: selectedSkills.map((s) => s.value),
      tools: selectedTools.map((t) => t.value),
      sampleProjectUrl: sampleUrl,
      clientRequirements: formData.requirements.trim(),
      deliverables: deliverables.trim(),
      faqs: faqs,
      userId: user.uid,
      userEmail: user.email || "freelancer@example.com",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    let collectionName = "services";

    if (serviceType === "24 hours") {
      serviceData.is24Hour = true;
      serviceData.timeline = "24 Hours";
      collectionName = "service_24h";
    } else {
      serviceData.deliveryDuration = formData.deliveryDays || null;
    }

    try {
      // Save to main collection
      const mainRef = doc(collection(db, collectionName));
      await setDoc(mainRef, serviceData);
      
      // Save to user subcollection
      const userRef = doc(
        collection(db, "users", user.uid, collectionName),
        mainRef.id
      );
      await setDoc(userRef, serviceData);

      setShowSuccessPopup(true);
      setTimeout(() => {
        navigate("/freelance-dashboard/myjobs");
      }, 2500);
    } catch (err) {
      console.error("Save service error:", err);
      alert("Failed to save service. Check console.");
    }
  };

  return (
    <div className="add-service-wrapper">
      <style>{`
        .add-service-wrapper {
          padding: 40px;
          background: #FAFAFA;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }
        .add-service-container {
          max-width: 1464px;
          margin: 0;
          width: 100%;
        }
        .form-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .add-service-header {
          margin-bottom: 32px;
        }
        .add-service-title {
          font-size: 24px;
          font-weight: 700;
          color: #1A1730;
          margin: 0 0 6px 0;
          letter-spacing: -0.5px;
        }
        .add-service-subtitle {
          font-size: 14px;
          color: #9B97B8;
          margin: 0;
        }
        .add-service-layout {
          display: flex;
          gap: 40px;
          align-items: flex-start;
          flex-wrap: wrap;
        }
        .add-service-form {
          flex: 2;
          display: flex;
          flex-direction: column;
          gap: 24px;
          min-width: 300px;
          max-width: 962px;
        }
        @media (max-width: 1100px) {
          .add-service-form {
            min-width: 100%;
          }
        }
        /* Responsive layout */
        @media (max-width: 768px) {
          .add-service-layout {
            flex-direction: column;
          }
          .add-service-sidebar {
            width: 100%;
          }
        }
        
        /* Success Popup */
        .success-popup-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        }
        .success-popup-box {
          background: #fff;
          padding: 40px;
          border-radius: 16px;
          text-align: center;
          max-width: 400px;
          width: 90%;
          box-shadow: 0px 10px 40px rgba(0,0,0,0.1);
          animation: slideUp 0.3s ease;
        }
        .success-icon-wrapper {
          width: 64px;
          height: 64px;
          background: #E8F8F0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px auto;
        }
        .success-popup-title {
          font-size: 22px;
          font-weight: 700;
          color: #1A1730;
          margin-bottom: 8px;
        }
        .success-popup-text {
          font-size: 14px;
          color: #6B7280;
          margin-bottom: 24px;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        /* Toggle Switch */
        .add-service-toggle-bg {
          background: #F4F4F5;
          border-radius: 12px;
          padding: 6px;
          display: flex;
        }
        .add-service-toggle-btn {
          flex: 1;
          padding: 12px;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .add-service-toggle-btn.active {
          background: #FFFFFF;
          box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
          color: #6C4DFF;
        }
        .add-service-toggle-btn.inactive {
          color: #9CA3AF;
          font-weight: 500;
        }
        
        /* Form Inputs */
        .add-service-label {
          font-size: 13px;
          font-weight: 600;
          color: #1A1730;
          margin-bottom: 8px;
          display: block;
        }
        .add-service-label-sub {
          color: #9CA3AF;
          font-weight: 400;
        }
        .add-service-input, .add-service-select {
          width: 100%;
          background: #F8F9FA;
          border: none;
          border-radius: 12px;
          height: 65px;
          padding: 0 20px;
          box-sizing: border-box;
          font-size: 14px;
          color: #1A1730;
          outline: none;
          font-family: inherit;
          transition: all 0.2s;
        }
        .add-service-input::placeholder, .add-service-textarea::placeholder, .add-service-select:invalid {
          color: #9CA3AF;
        }
        .add-service-input:focus, .add-service-textarea:focus, .add-service-select:focus {
          background: #FFFFFF;
          box-shadow: 0 0 0 2px #E0D4FF;
        }
        .add-service-textarea {
          width: 100%;
          background: #F8F9FA;
          border: none;
          border-radius: 12px;
          padding: 20px;
          box-sizing: border-box;
          font-size: 14px;
          color: #1A1730;
          outline: none;
          min-height: 140px;
          resize: vertical;
          font-family: inherit;
          transition: all 0.2s;
        }
        .add-service-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .add-service-section-title {
          font-size: 16px;
          font-weight: 700;
          color: #1A1730;
          margin: 16px 0 8px 0;
        }
        
        /* Tags */
        .tag-row {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }
        .skill-tag {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .skill-tag span { font-size: 10px; cursor: pointer; }
        .tag-ui { background: #EEF2FF; color: #6366F1; }
        .tag-figma { background: #ECFDF5; color: #10B981; }
        .tag-proto { background: #FDF2F8; color: #EC4899; }
        
        /* FAQ Section */
        .faq-box {
          background: #F8F9FA;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #9CA3AF;
          font-size: 14px;
          font-weight: 500;
          border: 1px dashed #E5E7EB;
          cursor: pointer;
          margin-top: 8px;
        }
        .faq-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
        }
        .faq-add-btn {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 600;
          color: #4B5563;
          cursor: pointer;
        }
        
        /* Publish Button */
        .add-service-publish-btn {
          width: 100%;
          background: linear-gradient(100.36deg, #6C4DFF 0%, #8B6DFF 100%);
          border-radius: 12px;
          padding: 16px;
          color: #FFFFFF;
          font-size: 15px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
        }
        
        /* Sidebar styling */
        .ai-sidebar {
          flex: 1;
          max-width: 456px;
          min-width: 300px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          padding-top: 0;
        }
        @media (max-width: 1100px) {
          .ai-sidebar {
            max-width: 100%;
            padding-top: 0;
          }
        }
        .ai-card {
          background: #FFFFFF;
          box-shadow: 0px 8px 40px rgba(108, 77, 255, 0.16);
          border-radius: 22px;
          padding: 30.4px;
          display: flex;
          flex-direction: column;
          gap: 15.2px;
          position: relative;
          overflow: hidden;
        }
        .ai-card-title {
          font-size: 16px;
          font-weight: 700;
          color: #6C4DFF;
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0;
        }
        .ai-card-status {
          font-size: 12px;
          color: #10B981;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ai-card-status::before {
          content: '';
          width: 6px;
          height: 6px;
          background: #10B981;
          border-radius: 50%;
        }
        .ai-tags {
          display: flex;
          gap: 8px;
        }
        .ai-tag {
          font-size: 11px;
          font-weight: 600;
          padding: 6px 10px;
          border-radius: 20px;
        }
        .ai-tag-blue { background: #EFF6FF; color: #3B82F6; }
        .ai-tag-green { background: #ECFDF5; color: #10B981; }
        .ai-tag-red { background: #FEF2F2; color: #EF4444; }
        .ai-desc {
          font-size: 14px;
          color: #4B5563;
          line-height: 1.6;
          margin: 0;
        }
        .ai-input {
          width: 100%;
          background: #F8F9FA;
          border: 1px solid #F3F4F6;
          border-radius: 12px;
          padding: 14px 16px;
          font-size: 14px;
          outline: none;
        }
        .ai-btn {
          width: 100%;
          background: linear-gradient(100.36deg, #6C4DFF 0%, #8B6DFF 100%);
          border-radius: 12px;
          padding: 14px;
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }
        
        .ai-pricing-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .ai-pricing-title {
          font-size: 16px;
          font-weight: 700;
          color: #1A1730;
          margin: 0;
        }
        .ai-price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #F3F4F6;
        }
        .ai-price-name {
          font-size: 14px;
          font-weight: 600;
          color: #1A1730;
        }
        .ai-price-sub {
          font-size: 12px;
          color: #9CA3AF;
          margin-top: 4px;
        }
        .ai-price-val {
          font-size: 14px;
          font-weight: 700;
          color: #1A1730;
        }
        .ai-price-row.highlight {
          background: #F4F0FF;
          border-radius: 12px;
          border-bottom: none;
        }
        .ai-price-row.highlight .ai-price-name, .ai-price-row.highlight .ai-price-val {
          color: #6C4DFF;
        }

        /* FAQ Modal & List Styles */
        .faq-item-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 20px;
        }
        .faq-banner {
          background: #ECFDF5;
          border: 1px solid #D1FAE5;
          border-radius: 8px;
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #10B981;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 20px;
        }
        .faq-banner-close {
          cursor: pointer;
          color: #10B981;
          font-size: 18px;
        }
        .faq-item-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .faq-item-number {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #F4F0FF;
          color: #6C4DFF;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
        }
        .faq-item-content {
          flex: 1;
        }
        .faq-item-q {
          font-weight: 700;
          color: #1A1730;
          font-size: 15px;
          margin: 0 0 4px 0;
        }
        .faq-item-a {
          color: #6B7280;
          font-size: 14px;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .faq-item-actions {
          display: flex;
          gap: 16px;
          align-items: center;
          color: #9CA3AF;
        }
        .faq-item-actions svg {
          cursor: pointer;
        }
        .faq-item-actions svg.delete {
          color: #EF4444;
        }
        .faq-modal-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
        }
        .faq-modal-box {
          background: #fff;
          border-radius: 16px;
          width: 600px;
          max-width: 90%;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .faq-modal-header {
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .faq-modal-title {
          font-size: 20px;
          font-weight: 700;
          color: #1A1730;
          margin: 0 0 8px 0;
        }
        .faq-modal-sub {
          font-size: 14px;
          color: #6B7280;
          margin: 0;
        }
        .faq-modal-close {
          cursor: pointer;
          color: #9CA3AF;
        }
        .faq-modal-body {
          padding: 0 24px 24px 24px;
        }
        .faq-modal-field {
          margin-bottom: 20px;
        }
        .faq-modal-label {
          font-size: 14px;
          font-weight: 600;
          color: #1A1730;
          margin-bottom: 8px;
          display: flex;
        }
        .faq-modal-label span {
          color: #EF4444;
          margin-left: 4px;
        }
        .faq-modal-input-wrap {
          position: relative;
        }
        .faq-modal-input {
          width: 100%;
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 14px;
          font-size: 14px;
          outline: none;
          box-sizing: border-box;
          font-family: inherit;
        }
        .faq-modal-textarea {
          width: 100%;
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 14px;
          font-size: 14px;
          outline: none;
          min-height: 120px;
          resize: vertical;
          box-sizing: border-box;
          font-family: inherit;
        }
        .faq-modal-input:focus, .faq-modal-textarea:focus {
          border-color: #6C4DFF;
        }
        .faq-char-count {
          position: absolute;
          bottom: 12px;
          right: 14px;
          font-size: 12px;
          color: #9CA3AF;
        }
        .faq-modal-footer {
          padding: 24px;
          border-top: 1px solid #F3F4F6;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
        .faq-btn-cancel {
          padding: 12px 24px;
          border: 1px solid #E5E7EB;
          background: #FFF;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          color: #4B5563;
          cursor: pointer;
        }
        .faq-btn-add {
          padding: 12px 24px;
          border: none;
          background: #4F46E5;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          color: #FFF;
          cursor: pointer;
        }
        .faq-success-modal {
          background: #fff;
          border-radius: 16px;
          width: 400px;
          max-width: 90%;
          padding: 32px 24px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .faq-success-icon {
          width: 64px;
          height: 64px;
          background: #D1FAE5;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto 24px auto;
        }
        .faq-success-title {
          font-size: 20px;
          font-weight: 700;
          color: #1A1730;
          margin: 0 0 8px 0;
        }
        .faq-success-sub {
          font-size: 14px;
          color: #6B7280;
          margin: 0 0 32px 0;
        }
        .faq-success-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        .faq-btn-done {
          padding: 12px 32px;
          border: none;
          background: #4F46E5;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          color: #FFF;
          cursor: pointer;
          flex: 1;
        }
        .faq-btn-another {
          padding: 12px 32px;
          border: 1px solid #E5E7EB;
          background: #FFF;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          color: #4B5563;
          cursor: pointer;
          flex: 1;
        }
      `}</style>

      <div className="add-service-container">
        <div className="add-service-header">
          <h1 className="add-service-title">Create New Service</h1>
          <p className="add-service-subtitle">Launch your service and let clients find you.</p>
        </div>

        <div className="add-service-layout">
          <form onSubmit={handleSubmit} className="add-service-form">
          
          {/* SERVICE TYPE TOGGLE */}
          <div className="add-service-toggle-bg">
            <div 
              className={`add-service-toggle-btn ${serviceType === "Work" ? "active" : "inactive"}`}
              onClick={() => setServiceType("Work")}
            >Work</div>
            <div 
              className={`add-service-toggle-btn ${serviceType === "24 hours" ? "active" : "inactive"}`}
              onClick={() => setServiceType("24 hours")}
            >24 hours</div>
          </div>

          {/* BASIC INFO */}
          <div className="form-card">
            <div>
              <label className="add-service-label">Service Title</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="add-service-input" 
                placeholder="e.g. Logo Design That Pops and Defines Your Brand" 
              />
            </div>
            
            <div>
              <label className="add-service-label">Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="add-service-textarea" 
                placeholder="Describe your service and showcase your uniqueness" 
              />
            </div>
            
            <div className="add-service-grid-2">
              <div>
                <label className="add-service-label">Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="add-service-select"
                >
                  <option value="">Select Category</option>
                  <option value="Graphics & Design">Graphics & Design</option>
                  <option value="Programming & Tech">Programming & Tech</option>
                  <option value="Writing & Translation">Writing & Translation</option>
                  <option value="Video & Animation">Video & Animation</option>
                  <option value="Music & Audio">Music & Audio</option>
                  <option value="AI Services">AI Services</option>
                  <option value="Data">Data</option>
                  <option value="Business">Business</option>
                  <option value="Finance">Finance</option>
                  <option value="Photography">Photography</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Personal Growth & Hobbies">Personal Growth & Hobbies</option>
                  <option value="Advertising & Media Buying">Advertising & Media Buying</option>
                  <option value="Education & E-Learning Services">Education & E-Learning Services</option>
                  <option value="Health & Wellness Services">Health & Wellness Services</option>
                  <option value="Real Estate & Property Services">Real Estate & Property Services</option>
                  <option value="Customer Support & Experience (CX)">Customer Support & Experience (CX)</option>
                  <option value="T-Shirts & Merchandise">T-Shirts & Merchandise</option>
                  <option value="Packaging & Label Design">Packaging & Label Design</option>
                  <option value="Book & Editorial Design">Book & Editorial Design</option>
                  <option value="Album & Podcast Art">Album & Podcast Art</option>
                </select>
              </div>
              <div>
                <label className="add-service-label">Delivery Days</label>
                <input 
                  type="number" 
                  name="deliveryDays"
                  value={formData.deliveryDays}
                  onChange={handleChange}
                  className="add-service-input" 
                  placeholder="In days" 
                />
              </div>
            </div>
          </div>

          {/* PRICING */}
          <div className="form-card">
            <h3 className="add-service-section-title" style={{ margin: 0 }}>Pricing</h3>
            <div className="add-service-grid-2">
              <div>
                <label className="add-service-label">Minimum Price (₹)</label>
                <input 
                  type="number" 
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="add-service-input" 
                  placeholder="Min" 
                />
              </div>
              <div>
                <label className="add-service-label">Maximum Price (₹)</label>
                <input 
                  type="number" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="add-service-input" 
                  placeholder="Max" 
                />
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="form-card">
            <div>
              <label className="add-service-label">Skills <span className="add-service-label-sub">(Add at least 3)</span></label>
              <CreatableSelect
                isMulti
                value={selectedSkills}
                onChange={setSelectedSkills}
                options={skillOptions}
                styles={customSelectStyles}
                placeholder="Select or type a skill..."
                menuPortalTarget={document.body}
                menuPosition="fixed"
              />
            </div>
            
            <div>
              <label className="add-service-label">Tools <span className="add-service-label-sub">(Add at least 3)</span></label>
              <CreatableSelect
                isMulti
                value={selectedTools}
                onChange={setSelectedTools}
                options={toolOptions}
                styles={customSelectStyles}
                placeholder="Select or type a tool..."
                menuPortalTarget={document.body}
                menuPosition="fixed"
              />
            </div>
            
            <div>
              <label className="add-service-label">Sample Projects (URL)</label>
              <input 
                type="url" 
                className="add-service-input"
                placeholder="https://dribbble.com/your-project" 
                value={sampleUrl}
                onChange={(e) => {
                  const value = e.target.value;
                  setSampleUrl(value);
                  if (!value) setUrlError("");
                  else if (!isValidHttpsUrl(value)) setUrlError("Please enter a valid HTTPS URL");
                  else setUrlError("");
                }}
              />
              {urlError && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{urlError}</p>}
            </div>
            
            <div>
              <label className="add-service-label">Deliverables</label>
              <input 
                type="text" 
                value={deliverables}
                onChange={(e) => setDeliverables(e.target.value)}
                className="add-service-input" 
                placeholder="Add Deliverables" 
              />
            </div>
            
            <div>
              <label className="add-service-label">Client Requirements <span className="add-service-label-sub">[Optional]</span></label>
              <textarea 
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                className="add-service-textarea" 
                placeholder="What do you need from your client to get started" 
                style={{ minHeight: '100px' }}
              />
            </div>
          </div>

          {/* FAQ */}
          <div className="form-card">
            <div className="faq-header" style={{ marginTop: 0 }}>
              <div>
                <h3 className="add-service-section-title" style={{ margin: 0 }}>FAQ</h3>
                {faqs.length > 0 && <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#6B7280' }}>Manage common questions and answers for your clients.</p>}
              </div>
              <button type="button" className="faq-add-btn" onClick={() => setShowFaqModal(true)}>+ Add Question</button>
            </div>
            
            {faqs.length === 0 ? (
              <div className="faq-box" style={{ marginTop: 0 }} onClick={() => setShowFaqModal(true)}>
                Add common questions clients ask about your service
              </div>
            ) : (
              <div className="faq-item-list">

                <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>Total Questions: <span style={{ color: '#4F46E5', fontWeight: 600 }}>{faqs.length}</span></div>
                {faqs.map((faq, index) => (
                  <div key={index} className="faq-item-card">
                    <div className="faq-item-number">{index + 1}</div>
                    <div className="faq-item-content">
                      <p className="faq-item-q">{faq.question}</p>
                      <p className="faq-item-a" style={{ WebkitLineClamp: expandedFaqs.includes(index) ? 'unset' : 1 }}>{faq.answer}</p>
                    </div>
                    <div className="faq-item-actions">
                      <svg onClick={() => {
                        setFaqForm({ question: faq.question, answer: faq.answer });
                        setEditingFaqIndex(index);
                        setShowFaqModal(true);
                      }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      <svg className="delete" onClick={() => {
                        const newFaqs = [...faqs];
                        newFaqs.splice(index, 1);
                        setFaqs(newFaqs);
                      }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      <svg 
                        onClick={() => {
                          setExpandedFaqs(prev => 
                            prev.includes(index) 
                              ? prev.filter(i => i !== index)
                              : [...prev, index]
                          );
                        }}
                        style={{ transform: expandedFaqs.includes(index) ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                        width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      ><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                  </div>
                ))}

              </div>
            )}
          </div>

          {/* ACTIONS */}
          <button type="submit" className="add-service-publish-btn">
            ✓ Publish Service
          </button>

        </form>

        {/* RIGHT SIDEBAR - AI ASSISTANT */}
        <div className="ai-sidebar">
          <div className="ai-card">
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', background: '#E0D4FF', borderRadius: '50%', filter: 'blur(40px)', opacity: 0.6, zIndex: 0 }}></div>
            
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '15.2px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <h3 className="ai-card-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#6C4DFF"/>
                  </svg>
                  AI Assistant
                </h3>
                <div className="ai-card-status" style={{ paddingLeft: '28px' }}>Online & ready</div>
              </div>
              
              <div className="ai-tags" style={{ marginTop: '16px', marginBottom: '16px' }}>
                <span className="ai-tag ai-tag-blue">⚡ Auto-fill fields</span>
                <span className="ai-tag ai-tag-green">$ Smart pricing</span>
                <span className="ai-tag ai-tag-red">✍ Write description</span>
              </div>
              
              <p className="ai-desc" style={{ marginBottom: '20px' }}>
                Hi! Tell me what <strong>service you want to offer</strong> and I'll generate a compelling title, description, skills, and suggest the perfect pricing — in seconds.
              </p>
              
              <input type="text" className="ai-input" placeholder="e.g. UI/UX Design for mobile apps" style={{ marginBottom: '16px' }} />
              
              <button className="ai-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFFFFF"/>
                </svg>
                Generate Service Details
              </button>
              
              <p style={{ fontSize: '10px', color: '#9CA3AF', textAlign: 'center', marginTop: '12px', marginBottom: '0' }}>
                AI may suggest edits — always review before publishing
              </p>
            </div>
          </div>

          <div className="ai-pricing-card">
            <h3 className="ai-pricing-title">AI Pricing Suggestions</h3>
            
            <div 
              className={`ai-price-row ${selectedPricingTier === "Starter" ? "highlight" : ""}`}
              onClick={() => {
                setSelectedPricingTier("Starter");
                setFormData({...formData, price: "800"});
                setMaxPrice("1200");
              }}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <div className="ai-price-name">Starter</div>
                <div className="ai-price-sub">Basic deliverables</div>
              </div>
              <div className="ai-price-val">₹800–1,200</div>
            </div>

            <div 
              className={`ai-price-row ${selectedPricingTier === "Standard" ? "highlight" : ""}`}
              onClick={() => {
                setSelectedPricingTier("Standard");
                setFormData({...formData, price: "1500"});
                setMaxPrice("2500");
              }}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <div className="ai-price-name">Standard ✦ Popular</div>
                <div className="ai-price-sub">Full scope delivery</div>
              </div>
              <div className="ai-price-val">₹1,500–2,500</div>
            </div>

            <div 
              className={`ai-price-row ${selectedPricingTier === "Premium" ? "highlight" : ""}`}
              onClick={() => {
                setSelectedPricingTier("Premium");
                setFormData({...formData, price: "3000"});
                setMaxPrice("5000");
              }}
              style={{ borderBottom: 'none', cursor: 'pointer' }}
            >
              <div>
                <div className="ai-price-name">Premium</div>
                <div className="ai-price-sub">All-inclusive</div>
              </div>
              <div className="ai-price-val">₹3,000–5,000</div>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="success-popup-overlay">
          <div className="success-popup-box">
            <div className="success-icon-wrapper">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="#30B47A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="success-popup-title">Service Published!</h3>
            <p className="success-popup-text">Your service is now live on the client dashboard. Redirecting you to your services...</p>
          </div>
        </div>
      )}

      {/* FAQ Add Modal */}
      {showFaqModal && (
        <div className="faq-modal-overlay">
          <div className="faq-modal-box">
            <div className="faq-modal-header">
              <div>
                <h3 className="faq-modal-title">{editingFaqIndex >= 0 ? "Edit FAQ" : "Add FAQ"}</h3>
                <p className="faq-modal-sub">{editingFaqIndex >= 0 ? "Edit your question and answer." : "Add a common question and its answer to help your clients."}</p>
              </div>
              <svg onClick={() => { setShowFaqModal(false); setEditingFaqIndex(-1); setFaqForm({ question: "", answer: "" }); }} className="faq-modal-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
            <div className="faq-modal-body">
              <div className="faq-modal-field">
                <label className="faq-modal-label">Write a question <span>*</span></label>
                <div className="faq-modal-input-wrap">
                  <input type="text" className="faq-modal-input" style={{ paddingRight: "50px" }} placeholder="e.g. What services do you offer?" value={faqForm.question} onChange={(e) => setFaqForm({...faqForm, question: e.target.value.substring(0, 150)})} />
                  <div className="faq-char-count" style={{ top: '50%', transform: 'translateY(-50%)', bottom: 'auto' }}>{faqForm.question.length}/150</div>
                </div>
              </div>
              <div className="faq-modal-field" style={{ marginBottom: 0 }}>
                <label className="faq-modal-label">Write your answer <span>*</span></label>
                <div className="faq-modal-input-wrap">
                  <textarea className="faq-modal-textarea" placeholder="e.g. We offer a range of services including..." value={faqForm.answer} onChange={(e) => setFaqForm({...faqForm, answer: e.target.value.substring(0, 1000)})}></textarea>
                  <div className="faq-char-count" style={{ bottom: '16px' }}>{faqForm.answer.length}/1000</div>
                </div>
              </div>
            </div>
            <div className="faq-modal-footer">
              <button className="faq-btn-cancel" onClick={() => { setShowFaqModal(false); setEditingFaqIndex(-1); setFaqForm({ question: "", answer: "" }); }}>Cancel</button>
              <button className="faq-btn-add" onClick={() => {
                if(faqForm.question.trim() && faqForm.answer.trim()) {
                  if (editingFaqIndex >= 0) {
                    const newFaqs = [...faqs];
                    newFaqs[editingFaqIndex] = { question: faqForm.question.trim(), answer: faqForm.answer.trim() };
                    setFaqs(newFaqs);
                  } else {
                    setFaqs([...faqs, { question: faqForm.question.trim(), answer: faqForm.answer.trim() }]);
                  }
                  setFaqForm({ question: "", answer: "" });
                  setEditingFaqIndex(-1);
                  setShowFaqModal(false);

                } else {
                  alert("Please enter both a question and an answer.");
                }
              }}>{editingFaqIndex >= 0 ? "Save Changes" : "Add Question"}</button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
