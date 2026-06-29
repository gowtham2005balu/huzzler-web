import React, { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useNavigate } from "react-router-dom";

import backarrow from "../../assets/backarrow.png";
import edit from "../../assets/edit.png";

const isMobile = () => window.matchMedia("(max-width: 768px)").matches;


const globalFont = {
  fontFamily: "Rubik, sans-serif",
};


const styles = {
  screen: {
    width: "100%",
    minHeight: "100vh",
    overflowX: "hidden",
    overflowY: "auto",
    ...globalFont,
  },
  formCard: {
    width: isMobile() ? "92%" : "60%",
    maxWidth: "800px",
    margin: "40px auto",
    background: "#fff",
    padding: isMobile() ? "24px 16px" : "32px 40px",
    borderRadius: 24,
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    border: "1px solid #E5E7EB",
  },
  inputBlock: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    display: "block",
    fontWeight: 600,
    color: "#4B5563",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 16px",
    borderRadius: 12,
    background: "#F9FAFB",
    border: "1px solid #E5E7EB",
    fontSize: 15,
    outline: "none",
  },
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid #E5E7EB",
    height: 120,
    fontSize: 15,
    background: "#F9FAFB",
    outline: "none",
    resize: "vertical",
  },
  actionRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 30,
    gap: 12,
    paddingTop: 20,
    borderTop: "1px solid #E5E7EB",
  },
  cancelBtn: {
    padding: "12px 24px",
    borderRadius: 999,
    background: "#fff",
    border: "1px solid #E5E7EB",
    color: "#4B5563",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
  },
  saveBtn: {
    padding: "12px 32px",
    borderRadius: 999,
    background: "#6C3EEB",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
  },
};

export default function CompanyProfileEdit() {
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const navigate = useNavigate();


  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebar-collapsed") === "true"
  );


  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);


  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [Company_name, setCompany_name] = useState("");
  const [industry, setIndustry] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");


  useEffect(() => {
    const fn = (e) => setCollapsed(e.detail);
    window.addEventListener("sidebar-toggle", fn);
    return () => window.removeEventListener("sidebar-toggle", fn);
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setIsLoading(false);
        return;
      }

      setUser(u);

      try {
        const snap = await getDoc(doc(db, "users", u.uid));
        if (snap.exists()) {
          const d = snap.data();
          setCompany_name(d.Company_name || "");
          setIndustry(d.category || "");
          setSize(d.team_size || "");
          setDescription(d.businessInfo || "");
          setEmail(d.email || u.email || "");
          setLocation(d.location || "");
          setProfileImageUrl(d.profileImage || "");

        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsub();
  }, []);

  /* SAVE */
  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);

    try {
      await updateDoc(doc(db, "users", user.uid), {
        Company_name: Company_name,
        category: industry,
        team_size: size,
        businessInfo: description,
        email,
        location,
        profileImage: profileImageUrl,
        updated_at: serverTimestamp(),
      });

      navigate(-1); // back to view page
    } catch (e) {
      console.error("Save failed", e);
    } finally {
      setIsSaving(false);
    }
  };

  /* LOADING SCREEN */
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        Loading profile…
      </div>
    );
  }

  /* UI */
  return (
    <div
      style={{
        marginLeft: isMobile() ? 0 : collapsed ? "-110px" : "-1px",
        transition: "margin-left 0.25s ease",
        marginTop: collapsed ? "10px" : "10px",
      }}
    >
      <div style={styles.screen}>
        <div style={styles.formCard}>
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: "#111", margin: 0 }}>Edit Company Profile</h1>
            <p style={{ fontSize: 15, color: "#6B7280", margin: "6px 0 0 0" }}>Update your company details and information.</p>
          </div>
          <Input label="Company Name" value={Company_name} onChange={setCompany_name} />
          <Input label="Industry" value={industry} onChange={setIndustry} />
          <Input label="Company Size" value={size} onChange={setSize} />
          <Input label="Location" value={location} onChange={setLocation} />
          <Input label="Email" value={email} onChange={setEmail} />
          <Input label="About Company" value={description} onChange={setDescription} multiline />


          <div style={styles.actionRow}>
            <button style={styles.cancelBtn} onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button
              style={styles.saveBtn}
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   INPUT COMPONENT
------------------------------------------------------------ */
function Input({ label, value, onChange, multiline }) {
  return (
    <div style={styles.inputBlock}>
      <label style={styles.label}>{label}</label>
      {multiline ? (
        <textarea
          style={styles.textarea}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          style={styles.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}