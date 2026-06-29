
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// assets
import arrow from "../../assets/icons/arrow.png";
import backarrow from "../../assets/icons/backarrow.png";
import profilePlaceholder from "../../assets/profile.png";
import notification from "../../assets/kk.png";
import saved from "../../assets/save2.png";
import jobposted from "../../assets/jobposted.png";
import hiring from "../../assets/hiring.png";
import paused2 from "../../assets/paused2.png";
import invitefriends from "../../assets/invitefriends.png";
import settings from "../../assets/settings.png";
import helpcenter from "../../assets/helpcenter.png";
import editIcon from "../../assets/edit.png";
import Logout from "../../assets/icons/logout.png";
import blocked from "../../assets/blocked.png";

import { deleteUser } from "firebase/auth";
import { deleteDoc } from "firebase/firestore";
import { deleteObject } from "firebase/storage";
import { User, Bookmark, Briefcase, Users, UserPlus, Ban, Settings, HelpCircle, FileText, Shield, LogOut } from "lucide-react";




export default function ClientProfileMenuScreen() {
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [isUploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  
  /* MOBILE FLAG */
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* SIDEBAR COLLAPSE */
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebar-collapsed") === "true"
  );

  useEffect(() => {
    const handleToggle = (e) => setCollapsed(e.detail);
    window.addEventListener("sidebar-toggle", handleToggle);
    return () => window.removeEventListener("sidebar-toggle", handleToggle);
  }, []);

  /* AUTH */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) return navigate("/firelogin");
      const snap = await getDoc(doc(db, "users", currentUser.uid));
      if (snap.exists()) {
        setUser(snap.data());
        setProfileImage(snap.data().profileImage || "");
      }
    });
    return () => unsub();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const uid = auth.currentUser.uid;
      const imgRef = ref(storage, `users/${uid}/profile.jpg`);
      await uploadBytes(imgRef, file);
      const url = await getDownloadURL(imgRef);
      await updateDoc(doc(db, "users", uid), { profileImage: url });
      setProfileImage(url);
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    if (!window.confirm("Logout?")) return;
    await signOut(auth);

    localStorage.clear();
    setMobileOpen(false);

    navigate("/firelogin", { replace: true });
  };



  const handleDeleteAccount = async () => {


     const user = auth.currentUser;
       if (!user) return showToast("User not logged in");
   
       const confirmDelete = window.confirm(
         "This will permanently delete your account. This action cannot be undone.\n\nDo you want to continue?"
       );
       if (!confirmDelete) return;
   
       try {
         setLoading(true);
   
         // 🔐 Re-authentication (required by Firebase)
         const isPasswordUser = user.providerData.some(
           (p) => p.providerId === "password"
         );
   
         if (isPasswordUser) {
           const pwd = window.prompt("Enter your password to confirm deletion:");
           if (!pwd) {
             setLoading(false);
             return;
           }
   
           const credential = EmailAuthProvider.credential(user.email, pwd);
           await reauthenticateWithCredential(user, credential);
         }
   
         // 🗑️ Delete user document from Firestore
         await deleteDoc(doc(db, "users", user.uid));
   
         // 🗑️ Delete Firebase Auth account
         await user.delete();
   
         showToast("Account deleted successfully");
   
         // 🚀 Redirect
         navigate("/firelogin", { replace: true });
   
       } catch (error) {
         console.error(error);
   
         if (error.code === "auth/requires-recent-login") {
           showToast("Please log in again and try deleting your account.");
         } else {
           showToast("Failed to delete account");
         }
       } finally {
         setLoading(false);
       }
  };


  if (!user) return null;

  const fullName =
    `${user.first_name || user.firstName || ""} ${user.last_name || user.lastName || ""}`.trim() || "Client User";

  return (
    <div
      className="freelance-wrapper"
      style={{
        width: "100%",
        boxSizing: "border-box"
      }}
    >
      <div style={styles.page}>
        {/* HEADER */}
        <div style={{ ...styles.titleWrap, flexWrap: "wrap" }}>
          {/* <div
            style={{
              ...styles.backBtn,
              marginLeft: isMobile ? "0px" : collapsed ? "-100px" : "10px",
            }}
            onClick={() => navigate(-1)}
          >
            <img src={backarrow} width={20} />
          </div> */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              onClick={() => navigate(-1)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 14,
                border: "0.8px solid #E0E0E0",
                backgroundColor: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
                flexShrink: 0,
              }}
            >
              <img
                src={backarrow}
                alt="back"
                style={{ width: 16, height: 16 }}
              />
            </div>
            <div style={{ marginLeft: 12 }}>
              <h1 style={styles.title}>Profile</h1>
              <p style={styles.subtitle}>
                Manage your account and preferences.
              </p>
            </div>
          </div>


        </div>

        <div
          style={{
            ...styles.profileCard,
            flexDirection: isMobile ? "column" : "row",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <div style={{ position: "relative" }}>
            <img
              src={profileImage || profilePlaceholder}
              style={styles.avatar}
            />
            <label style={styles.editBtn}>
              <img src={editIcon} width={40} />
              <input hidden type="file" onChange={handleImageUpload} />
            </label>
            {isUploading && <div style={styles.uploadOverlay} />}
          </div>

          <div style={{ marginTop: isMobile ? 12 : 0 }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>{fullName}</div>
            <div style={{ color: "#6b7280", marginTop: 4 }}>
              {user.email}
            </div>
          </div>
        </div>

        {/* MY ACCOUNT */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>MY ACCOUNT</h3>
          <MenuItem title="Profile Summary" icon={User} onClick={() => navigate("/client-dashbroad2/companyprofileview")} />
          <MenuItem title="Saved" icon={Bookmark} onClick={() => navigate("/client-dashbroad2/Clientsaved")} />
          <MenuItem title="Job Posted" icon={Briefcase} onClick={() => navigate("/client-dashbroad2/PostJob")} />
          <MenuItem title="Hiring" icon={Users} onClick={() => navigate("/client-dashbroad2/my-hires")} />
          {/* <MenuItem title="Paused Service" icon={paused2} onClick={() => navigate("/client-dashbroad2/clientpausedjobs")} /> */}
          <MenuItem title="Blocked" icon={Ban} onClick={() => navigate("/client-dashbroad2/clientBlock")} />
        </div>

        {/* SUPPORT */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>SUPPORT</h3>
          {/* <MenuItem title="Notifications" icon={notification} onClick={() => navigate("")} /> */}
          <MenuItem title="Account Settings" icon={Settings} onClick={() => navigate("/client-dashbroad2/companyprofileview")} />
          <MenuItem title="Help Center" icon={HelpCircle} onClick={() => navigate("/client-dashbroad2/helpcenter")} />
          <MenuItem title="Terms of Service" icon={FileText} onClick={() => window.open("https://deva689.github.io/huzzler-privacy-policy/terms.html", "_blank")} />
          <MenuItem title="Privacy Policy" icon={Shield} onClick={() => window.open("https://deva689.github.io/huzzler-privacy-policy/", "_blank")} />
        </div>

        {/* LOGOUT + DELETE */}
        <div style={styles.section}>
          <MenuItem title="Sign out" icon={LogOut} onClick={handleLogout} customStyle={{ color: "#EF4444" }} />
          <MenuItem title="Delete Account" icon={Ban} onClick={handleDeleteAccount} customStyle={{ color: "#EF4444" }} />
        </div>
      </div>
    </div>
  );
}

function MenuItem({ title, icon: Icon, onClick, customStyle }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 14px",
        cursor: "pointer",
        borderRadius: 10,
        color: customStyle?.color || "#4B5563",
        fontWeight: customStyle?.color === "#EF4444" ? 600 : 500,
        transition: "all 0.2s ease",
        fontSize: 15,
        ...(customStyle || {}),
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#F9FAFB";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {typeof Icon === "string" ? (
          <img src={Icon} width={20} alt="" />
        ) : (
          Icon && <Icon size={20} color={customStyle?.color || "#6B7280"} />
        )}
        <span>{title}</span>
      </div>
      <span style={{ color: "#9CA3AF", fontSize: 18, lineHeight: 1 }}>›</span>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "24px 20px",
    background: "#F7F7F9",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Rubik', system-ui",
  },
  titleWrap: {
    width: "100%",
    maxWidth: 1160,
    display: "flex",
    alignItems: "center",
    marginBottom: 24,
  },
  title: { fontSize: 26, margin: 0, fontWeight: 700, color: "#111" },
  subtitle: { marginTop: 4, fontSize: 14, color: "#6b7280" },
  profileCard: {
    width: "100%",
    maxWidth: 1160,
    background: "#fff",
    borderRadius: 16,
    padding: 24,
    display: "flex",
    alignItems: "center",
    gap: 20,
    border: "1px solid #E5E7EB",
    marginBottom: 24,
    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    objectFit: "cover",
  },
  editBtn: {
    position: "absolute",
    right: -2,
    bottom: -2,
    cursor: "pointer",
  },
  uploadOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    borderRadius: "50%",
  },
  section: {
    width: "100%",
    maxWidth: 1160,
    background: "#fff",
    borderRadius: 16,
    padding: "20px",
    border: "1px solid #E5E7EB",
    marginBottom: 24,
    boxShadow: "none",
  },
  sectionTitle: { fontSize: 12, color: "#9CA3AF", fontWeight: 700, letterSpacing: 0.5, marginTop: 0, marginBottom: 12 },
};