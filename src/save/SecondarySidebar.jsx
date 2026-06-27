import React from 'react';
import { 
  FiUser, 
  FiBookmark,
  FiCode,
  FiLayout,
  FiCalendar,
  FiFolder,
  FiBell, 
  FiSettings, 
  FiLogOut 
} from "react-icons/fi";

/**
 * SecondarySidebar Component
 * Matches the exact Figma design provided for the secondary navigation menu.
 * 
 * Usage:
 * <SecondarySidebar activeTab="My Services" onTabClick={(tab) => console.log(tab)} />
 */
export default function SecondarySidebar({ activeTab = "My Services", onTabClick }) {
  const menuItems = [
    { id: "Profile Summary", icon: FiUser, label: "Profile Summary" },
    { id: "Saved", icon: FiBookmark, label: "Saved" },
    { id: "My Services", icon: FiCode, label: "My Services" },
    { id: "My Works", icon: FiLayout, label: "My Works" },
    { id: "Paused Services", icon: FiCalendar, label: "Paused Services" },
    { id: "Application Status", icon: FiFolder, label: "Application Status" },
    { divider: true, id: "div1" },
    { id: "Notifications", icon: FiBell, label: "Notifications" },
    { id: "Account Settings", icon: FiSettings, label: "Account Settings" },
    { id: "Sign Out", icon: FiLogOut, label: "Sign Out", danger: true }
  ];

  return (
    <div style={{ 
      width: 240, 
      flexShrink: 0,
      background: "#fff", 
      border: "1px solid #E5E7EB", 
      borderRadius: 12, 
      padding: "24px 16px",
      boxShadow: "none",
      display: "flex", 
      flexDirection: "column", 
      gap: 4 
    }}>
      {menuItems.map((item, index) => {
        if (item.divider) {
          return <div key={`divider-${index}`} style={{ borderTop: "1px solid #E5E7EB", margin: "12px 4px" }} />;
        }

        const isActive = activeTab === item.id;
        const isDanger = item.danger;
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            onClick={() => onTabClick && onTabClick(item.id)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "9px 12px",
              cursor: "pointer",
              borderRadius: 10,
              background: isActive ? "rgba(237, 233, 255, 1)" : "transparent",
              color: isDanger ? "#EF4444" : isActive ? "#8B5CF6" : "#4B5563",
              fontWeight: isActive || isDanger ? 600 : 500,
              transition: "all 0.2s ease",
              fontSize: 15,
            }}
            onMouseEnter={(e) => {
              if (!isActive && !isDanger) { e.currentTarget.style.background = "#F9FAFB"; }
            }}
            onMouseLeave={(e) => {
              if (!isActive && !isDanger) { e.currentTarget.style.background = "transparent"; }
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Icon size={20} color={isDanger ? "#EF4444" : isActive ? "#8B5CF6" : "#6B7280"} />
              <span>{item.label}</span>
            </div>
            {isActive && <span style={{ color: "#8B5CF6", fontWeight: 700, fontSize: 18, lineHeight: 1 }}>›</span>}
          </div>
        );
      })}
    </div>
  );
}
