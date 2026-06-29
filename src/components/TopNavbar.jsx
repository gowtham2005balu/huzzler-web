import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Sparkles } from "lucide-react";
import backarrow from "../assets/arrow.png";

export default function TopNavbar({ 
  search = "", 
  setSearch, 
  profileImage, 
  initials = "GG", 
  onBack, 
  isMobile = false 
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: isMobile ? "16px 20px" : "16px 40px",
        background: "#fff",
        borderBottom: "1px solid #E5E7EB",
        boxSizing: "border-box",
        width: "100%",
        height: "73px"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1, maxWidth: 600 }}>
        
        <div style={{ position: "relative", width: "100%", height: "40px" }}>
          <Search style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} size={16} />
          <input
            type="text"
            placeholder="Search freelancers, jobs, services..."
            value={search}
            onChange={(e) => setSearch && setSearch(e.target.value)}
            style={{
              width: "100%",
              height: "100%",
              padding: "0 16px 0 42px",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              background: "#FAFAFA",
              fontSize: "14px",
              color: "#1F2937",
              outline: "none",
              boxSizing: "border-box"
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {!isMobile && (
          <button
            style={{
              background: "#6C4DFF",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <Sparkles size={14} /> AI Assistant
          </button>
        )}

        <div
          onClick={() => navigate("/freelance-dashboard/notifications")}
          style={{
            position: "relative",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#F3F4F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#4B5563"
          }}
        >
          <Bell size={18} />
          <span
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "6px",
              height: "6px",
              background: "#EF4444",
              borderRadius: "50%"
            }}
          />
        </div>

        <div
          onClick={() => {
            if (window.location.pathname === "/freelance-dashboard/accountfreelancer") {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigate("/freelance-dashboard/accountfreelancer");
            }
          }}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#6C3EEB",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "14px",
            overflow: "hidden",
            cursor: "pointer"
          }}
        >
          {profileImage ? (
            <img src={profileImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            initials
          )}
        </div>
      </div>
    </header>
  );
}
