// // EditService24h.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../firbase/Firebase";
// import Select from "react-select";

// export default function EditService24h() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const jobId = location?.state?.jobId || null;
//   const jobData = location?.state?.jobData || null;

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [skills, setSkills] = useState([]);
//   const [tools, setTools] = useState([]);
//   const [notes, setNotes] = useState("");
//   const [budget, setBudget] = useState("");
//   const [category, setCategory] = useState(null);

//   const [saving, setSaving] = useState(false);

//   // Options
//   const categoryOptions = [
//     "Graphics & Design",
//     "Programming & Tech",
//     "Digital Marketing",
//     "Writing & Translation",
//     "Video & Animation",
//     "Music & Audio",
//     "AI Services",
//     "Data",
//     "Business",
//     "Finance",
//     "Photography",
//     "Lifestyle",
//     "Consulting",
//   ].map(e => ({ label: e, value: e }));

//   const skillOptions = jobData?.skills?.map(s => ({ label: s, value: s })) || [];
//   const toolOptions = jobData?.tools?.map(t => ({ label: t, value: t })) || [];

//   // Prefill
//   useEffect(() => {
//     if (jobData) {
//       setTitle(jobData.title || "");
//       setDescription(jobData.description || "");
//       setSkills((jobData.skills || []).map(s => ({ label: s, value: s })));
//       setTools((jobData.tools || []).map(t => ({ label: t, value: t })));
//       setNotes(jobData.notes || "");
//       setBudget(jobData.budget || "");
//       setCategory(
//         jobData.category ? { label: jobData.category, value: jobData.category } : null
//       );
//     }
//   }, [jobData]);

//   // Save
//   const handleSave = async () => {
//     if (!jobId) return alert("Invalid job ID");

//     if (!title.trim()) return alert("Title required");
//     if (!description.trim()) return alert("Description required");
//     if (!category) return alert("Category required");

//     setSaving(true);

//     try {
//       await updateDoc(doc(db, "service_24h", jobId), {
//         title: title.trim(),
//         description: description.trim(),
//         category: category.value,
//         skills: skills.map(s => s.value),
//         tools: tools.map(t => t.value),
//         notes,
//         budget,
//         updatedAt: new Date(),
//       });

//       alert("24 Hour Service updated!");
//       navigate(-1);
//     } catch (error) {
//       console.error("Error updating 24h service:", error);
//       alert("Update failed: " + error.message);
//     }

//     setSaving(false);
//   };

//   return (
//     <div style={styles.wrapper}>
//       <h2>Edit 24-Hour Service</h2>

//       <label style={styles.label}>Title</label>
//       <input
//         style={styles.input}
//         value={title}
//         onChange={e => setTitle(e.target.value)}
//       />

//       <label style={styles.label}>Description</label>
//       <textarea
//         style={styles.textarea}
//         value={description}
//         onChange={e => setDescription(e.target.value)}
//       />

//       <label style={styles.label}>Category</label>
//       <Select
//         value={category}
//         onChange={setCategory}
//         options={categoryOptions}
//       />

//       <label style={styles.label}>Skills</label>
//       <Select
//         isMulti
//         options={skillOptions}
//         value={skills}
//         onChange={setSkills}
//       />

//       <label style={styles.label}>Tools</label>
//       <Select
//         isMulti
//         options={toolOptions}
//         value={tools}
//         onChange={setTools}
//       />

//       <label style={styles.label}>Budget</label>
//       <input
//         style={styles.input}
//         value={budget}
//         onChange={e => setBudget(e.target.value)}
//       />

//       <label style={styles.label}>Notes</label>
//       <textarea
//         style={styles.textarea}
//         value={notes}
//         onChange={e => setNotes(e.target.value)}
//       />

//       <div style={styles.btnRow}>
//         <button style={styles.cancelBtn} onClick={() => navigate(-1)}>
//           Cancel
//         </button>

//         <button style={styles.saveBtn} onClick={handleSave} disabled={saving}>
//           {saving ? "Saving..." : "Save Changes"}
//         </button>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   wrapper: {
//     maxWidth: "700px",
//     margin: "0 auto",
//     padding: "20px",
//   },
//   label: {
//     fontWeight: "bold",
//     marginTop: "15px",
//   },
//   input: {
//     width: "100%",
//     padding: "8px",
//     marginTop: "5px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//   },
//   textarea: {
//     width: "100%",
//     minHeight: "140px",
//     padding: "8px",
//     marginTop: "5px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//   },
//   btnRow: {
//     marginTop: "20px",
//     display: "flex",
//     justifyContent: "space-between",
//   },
//   cancelBtn: {
//     padding: "10px 18px",
//     background: "gray",
//     color: "white",
//     borderRadius: "5px",
//     border: "none",
//     cursor: "pointer",
//   },
//   saveBtn: {
//     padding: "10px 18px",
//     background: "#007bff",
//     color: "white",
//     borderRadius: "5px",
//     border: "none",
//     cursor: "pointer",
//   },
// };


// // EditService24h.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../firbase/Firebase";
// import Select from "react-select";

// export default function EditService24h() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const jobId = location?.state?.jobId || null;
//   const jobData = location?.state?.jobData || null;

//   // ⭐ 1️⃣ SIDEBAR COLLAPSED STATE
//   const [collapsed, setCollapsed] = useState(
//     localStorage.getItem("sidebar-collapsed") === "true"
//   );

//   // ⭐ 2️⃣ LISTEN FOR SIDEBAR TOGGLE EVENT
//   useEffect(() => {
//     function handleToggle(e) {
//       setCollapsed(e.detail);
//     }
//     window.addEventListener("sidebar-toggle", handleToggle);
//     return () => window.removeEventListener("sidebar-toggle", handleToggle);
//   }, []);

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [skills, setSkills] = useState([]);
//   const [tools, setTools] = useState([]);
//   const [notes, setNotes] = useState("");
//   const [budget, setBudget] = useState("");
//   const [category, setCategory] = useState(null);

//   const [saving, setSaving] = useState(false);

//   // Options
//   const categoryOptions = [
//     "Graphics & Design",
//     "Programming & Tech",
//     "Digital Marketing",
//     "Writing & Translation",
//     "Video & Animation",
//     "Music & Audio",
//     "AI Services",
//     "Data",
//     "Business",
//     "Finance",
//     "Photography",
//     "Lifestyle",
//     "Consulting",
//   ].map((e) => ({ label: e, value: e }));

//   const skillOptions =
//     jobData?.skills?.map((s) => ({ label: s, value: s })) || [];
//   const toolOptions =
//     jobData?.tools?.map((t) => ({ label: t, value: t })) || [];

//   useEffect(() => {
//     if (jobData) {
//       setTitle(jobData.title || "");
//       setDescription(jobData.description || "");
//       setSkills((jobData.skills || []).map((s) => ({ label: s, value: s })));
//       setTools((jobData.tools || []).map((t) => ({ label: t, value: t })));
//       setNotes(jobData.notes || "");
//       setBudget(jobData.budget || "");
//       setCategory(
//         jobData.category
//           ? { label: jobData.category, value: jobData.category }
//           : null
//       );
//     }
//   }, [jobData]);

//   const handleSave = async () => {
//     if (!jobId) return alert("Invalid job ID");

//     if (!title.trim()) return alert("Title required");
//     if (!description.trim()) return alert("Description required");
//     if (!category) return alert("Category required");

//     setSaving(true);

//     try {
//       await updateDoc(doc(db, "service_24h", jobId), {
//         title: title.trim(),
//         description: description.trim(),
//         category: category.value,
//         skills: skills.map((s) => s.value),
//         tools: tools.map((t) => t.value),
//         notes,
//         budget,
//         updatedAt: new Date(),
//       });

//       alert("24 Hour Service updated!");
//       navigate(-1);
//     } catch (error) {
//       console.error("Error updating 24h service:", error);
//       alert("Update failed: " + error.message);
//     }

//     setSaving(false);
//   };

//   // ⭐ 3️⃣ WRAP WHOLE UI IN MARGIN-LEFT SIDEBAR ANIMATION
//   return (
//     <div
//       className="freelance-wrapper"
//       style={{
//         marginLeft: collapsed ? "-110px" : "50px",
//         transition: "margin-left 0.25s ease",
//       }}
//     >
//       <div style={styles.wrapper}>
//         <h2>Edit 24-Hour Service</h2>

//         <label style={styles.label}>Title</label>
//         <input
//           style={styles.input}
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <label style={styles.label}>Description</label>
//         <textarea
//           style={styles.textarea}
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <label style={styles.label}>Category</label>
//         <Select value={category} onChange={setCategory} options={categoryOptions} />

//         <label style={styles.label}>Skills</label>
//         <Select isMulti options={skillOptions} value={skills} onChange={setSkills} />

//         <label style={styles.label}>Tools</label>
//         <Select isMulti options={toolOptions} value={tools} onChange={setTools} />

//         <label style={styles.label}>Budget</label>
//         <input
//           style={styles.input}
//           value={budget}
//           onChange={(e) => setBudget(e.target.value)}
//         />

//         <label style={styles.label}>Notes</label>
//         <textarea
//           style={styles.textarea}
//           value={notes}
//           onChange={(e) => setNotes(e.target.value)}
//         />

//         <div style={styles.btnRow}>
//           <button style={styles.cancelBtn} onClick={() => navigate(-1)}>
//             Cancel
//           </button>

//           <button style={styles.saveBtn} onClick={handleSave} disabled={saving}>
//             {saving ? "Saving..." : "Save Changes"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // -------------------------------------
// // STYLES — unchanged
// // -------------------------------------

// const styles = {
//   wrapper: {
//     maxWidth: "700px",
//     margin: "0 auto",
//     padding: "20px",
//   },
//   label: {
//     fontWeight: "bold",
//     marginTop: "15px",
//   },
//   input: {
//     width: "100%",
//     padding: "8px",
//     marginTop: "5px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//   },
//   textarea: {
//     width: "100%",
//     minHeight: "140px",
//     padding: "8px",
//     marginTop: "5px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//   },
//   btnRow: {
//     marginTop: "20px",
//     display: "flex",
//     justifyContent: "space-between",
//   },
//   cancelBtn: {
//     padding: "10px 18px",
//     background: "gray",
//     color: "white",
//     borderRadius: "5px",
//     border: "none",
//     cursor: "pointer",
//   },
//   saveBtn: {
//     padding: "10px 18px",
//     background: "#007bff",
//     color: "white",
//     borderRadius: "5px",
//     border: "none",
//     cursor: "pointer",
//   },
// };




// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../firbase/Firebase";
// import Select from "react-select";
// import { useParams } from "react-router-dom";
// import { getDoc } from "firebase/firestore";




// export default function EditService24h() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { id } = useParams();

//   const jobId = location?.state?.jobId || null;
//   const jobData = location?.state?.jobData || null;

//   // ⭐ 1️⃣ SIDEBAR COLLAPSED STATE
//   const [collapsed, setCollapsed] = useState(
//     localStorage.getItem("sidebar-collapsed") === "true"
//   );

//   // ⭐ 2️⃣ LISTEN FOR SIDEBAR TOGGLE EVENT
//   useEffect(() => {
//     function handleToggle(e) {
//       setCollapsed(e.detail);
//     }
//     window.addEventListener("sidebar-toggle", handleToggle);
//     return () => window.removeEventListener("sidebar-toggle", handleToggle);
//   }, []);




//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [skills, setSkills] = useState([]);
//   const [tools, setTools] = useState([]);
//   const [notes, setNotes] = useState("");
//   const [budgetFrom, setBudgetFrom] = useState("");
//   const [budgetTo, setBudgetTo] = useState("");

//   const [category, setCategory] = useState(null);

//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     if (jobData || !id) return;

//     const fetchService = async () => {
//       const snap = await getDoc(doc(db, "service_24h", id));

//       if (snap.exists()) {
//         const data = snap.data();

//         setTitle(data.title || "");
//         setDescription(data.description || "");
//         setSkills((data.skills || []).map(s => ({ label: s, value: s })));
//         setTools((data.tools || []).map(t => ({ label: t, value: t })));
//         setNotes(data.clientRequirements || "");

//         setBudgetFrom(data.budget_from || "");
//         setBudgetTo(data.budget_to || "");

//         setCategory(
//           data.category
//             ? { label: data.category, value: data.category }
//             : null
//         );
//       }
//     };

//     fetchService();
//   }, [id, jobData]);




//   // Options
//   const categoryOptions = [
//     "Graphics & Design",
//     "Programming & Tech",
//     "Digital Marketing",
//     "Writing & Translation",
//     "Video & Animation",
//     "Music & Audio",
//     "AI Services",
//     "Data",
//     "Business",
//     "Finance",
//     "Photography",
//     "Lifestyle",
//     "Consulting",
//   ].map((e) => ({ label: e, value: e }));

//   const skillOptions =
//     jobData?.skills?.map((s) => ({ label: s, value: s })) || [];
//   const toolOptions =
//     jobData?.tools?.map((t) => ({ label: t, value: t })) || [];

//   useEffect(() => {
//     if (jobData) {
//       setTitle(jobData.title || "");
//       setDescription(jobData.description || "");
//       setSkills((jobData.skills || []).map((s) => ({ label: s, value: s })));
//       setTools((jobData.tools || []).map((t) => ({ label: t, value: t })));
//       setNotes(jobData.notes || "");
//       setBudget(jobData.budget || "");
//       setCategory(
//         jobData.category
//           ? { label: jobData.category, value: jobData.category }
//           : null
//       );
//     }
//   }, [jobData]);

//   const handleSave = async () => {
//     if (!id) return alert("Invalid service ID");

//     if (!title.trim()) return alert("Title required");
//     if (!description.trim()) return alert("Description required");
//     if (!category) return alert("Category required");

//     setSaving(true);

//     try {
//       await updateDoc(doc(db, "service_24h", id), {
//         title: title.trim(),
//         description: description.trim(),
//         category: category.value,
//         skills: skills.map(s => s.value),
//         tools: tools.map(t => t.value),
//         clientRequirements: notes,
//         budget_from: Number(budgetFrom),
//         budget_to: Number(budgetTo),
//         updatedAt: new Date(),
//       });

//       alert("24 Hour Service updated!");
//       navigate(-1);
//     } catch (error) {
//       console.error("Update failed:", error);
//       alert(error.message);
//     }

//     setSaving(false);
//   };

//   // ⭐ 3️⃣ WRAP WHOLE UI IN MARGIN-LEFT SIDEBAR ANIMATION
//   return (
//     <div
//       className="freelance-wrapper"
//       style={{
//         marginLeft: collapsed ? "-110px" : "50px",
//         transition: "margin-left 0.25s ease",
//       }}
//     >
//       <div style={styles.wrapper}>
//         <h2>Edit 24-Hour Service</h2>

//         <label style={styles.label}>Title</label>
//         <input
//           style={styles.input}
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <label style={styles.label}>Description</label>
//         <textarea
//           style={styles.textarea}
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <label style={styles.label}>Category</label>
//         <Select value={category} onChange={setCategory} options={categoryOptions} />

//         <label style={styles.label}>Skills</label>
//         <Select isMulti options={skillOptions} value={skills} onChange={setSkills} />

//         <label style={styles.label}>Tools</label>
//         <Select isMulti options={toolOptions} value={tools} onChange={setTools} />

//         <label style={styles.label}>Budget From</label>
//         <input
//           type="number"
//           style={styles.input}
//           value={budgetFrom}
//           onChange={(e) => setBudgetFrom(e.target.value)}
//         />

//         <label style={styles.label}>Budget To</label>
//         <input
//           type="number"
//           style={styles.input}
//           value={budgetTo}
//           onChange={(e) => setBudgetTo(e.target.value)}
//         />


//         <label style={styles.label}>Notes</label>
//         <textarea
//           style={styles.textarea}
//           value={notes}
//           onChange={(e) => setNotes(e.target.value)}
//         />

//         <div style={styles.btnRow}>
//           <button style={styles.cancelBtn} onClick={() => navigate(-1)}>
//             Cancel
//           </button>

//           <button style={styles.saveBtn} onClick={handleSave} disabled={saving}>
//             {saving ? "Saving..." : "Save Changes"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // -------------------------------------
// // STYLES — unchanged
// // -------------------------------------

// const styles = {
//   wrapper: {
//     maxWidth: "700px",
//     margin: "0 auto",
//     padding: "20px",
//   },
//   label: {
//     fontWeight: "bold",
//     marginTop: "15px",
//   },
//   input: {
//     width: "100%",
//     padding: "8px",
//     marginTop: "5px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//   },
//   textarea: {
//     width: "100%",
//     minHeight: "140px",
//     padding: "8px",
//     marginTop: "5px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//   },
//   btnRow: {
//     marginTop: "20px",
//     display: "flex",
//     justifyContent: "space-between",
//   },
//   cancelBtn: {
//     padding: "10px 18px",
//     background: "gray",
//     color: "white",
//     borderRadius: "5px",
//     border: "none",
//     cursor: "pointer",
//   },
//   saveBtn: {
//     padding: "10px 18px",
//     background: "#007bff",
//     color: "white",
//     borderRadius: "5px",
//     border: "none",
//     cursor: "pointer",
//   },
// };




import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firbase/Firebase";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { getDoc } from "firebase/firestore";
import backarrow from "../assets/backarrow.png";

// --------------------------------------------------
// INLINE CSS (same as FreelanceAddservice)
// --------------------------------------------------
if (
    typeof document !== "undefined" &&
    !document.getElementById("add-service-style")
) {
    const style = document.createElement("style");
    style.id = "add-service-style";
    style.innerHTML = `
  :root {
    --as-page-bg: #FAFAFA;
  }
  
  body {
    font-family: 'DM Sans', sans-serif !important;
  }

  .add-service-wrapper {
    padding: 40px;
    background: #FAFAFA;
    min-height: 100vh;
  }
  .add-service-container {
    max-width: 1464px;
    margin: 0 auto;
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
    display: flex;
    align-items: center;
    gap: 12px;
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
  .add-service-publish-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  `;
    document.head.appendChild(style);
}




const SKILL_FAQ_SUGGESTIONS = {
    "UI Design": [
        { question: "What deliverables do I get with UI Design?", answer: "You will receive the Figma source file, along with exported PNG/SVG assets and an interactive prototype link." },
        { question: "Do you design mobile apps, web interfaces, or both?", answer: "I can design for both iOS/Android mobile apps and responsive web interfaces." }
    ],
    "UX Design": [
        { question: "What deliverables do I get with UX Design?", answer: "You will receive user persona reports, wireframes, user flow diagrams, and interactive prototypes built in Figma." },
        { question: "Do you conduct user testing?", answer: "Yes, I perform usability testing and user research interviews to validate and refine the UX solutions." }
    ],
    "Figma": [
        { question: "Do you use Figma components and auto-layout?", answer: "Yes, all my designs are built using responsive auto-layout, nested components, and a clean style guide/design system." }
    ],
    "Website Development": [
        { question: "Will the website be responsive on mobile and tablet devices?", answer: "Yes, the website will be fully responsive and optimized for mobile, tablet, and desktop screens." },
        { question: "Which technologies do you use for website development?", answer: "I typically build websites using React, HTML/CSS, and TailwindCSS for the frontend, combined with clean backend integrations." }
    ],
    "Mobile Apps (iOS & Android)": [
        { question: "Do you develop native or cross-platform mobile apps?", answer: "I specialize in cross-platform mobile app development using React Native or Flutter, ensuring high performance on both iOS and Android." }
    ],
    "SEO": [
        { question: "What is included in your SEO service?", answer: "My SEO service includes on-page optimization, meta tags, keyword research, site speed advice, and search console setup." }
    ],
    "Logo Design": [
        { question: "What file formats will I receive for the logo?", answer: "You will receive high-resolution vector files (AI, EPS, PDF, SVG) along with transparent background formats (PNG)." }
    ],
    "Graphic Design": [
        { question: "Do you provide source files for the graphic designs?", answer: "Yes, I always provide the original layered source files (PSD or AI) for your future editing needs." }
    ],
    "Writing & Translation": [
        { question: "Do you proofread and translate manually?", answer: "Yes, all translation and writing is done manually to ensure correct context, tone, and cultural accuracy." }
    ],
    "Video Editing": [
        { question: "What software do you use for video editing?", answer: "I edit videos professionally using Adobe Premiere Pro and DaVinci Resolve." }
    ]
};

const GENERAL_FAQ_SUGGESTIONS = [
    { question: "What is your standard turnaround time?", answer: "Turnaround time depends on the complexity of the project, but I usually deliver the initial draft within 3-5 business days." },
    { question: "Do you offer revisions?", answer: "Yes, I offer up to 3 rounds of revisions to ensure you are completely satisfied with the final delivery." },
    { question: "Can we sign an NDA?", answer: "Yes, I am happy to sign a Non-Disclosure Agreement (NDA) before starting work to protect your intellectual property." }
];

const generateFaqsFromSkills = (skillsArray) => {
    const generated = [];
    const addedQuestions = new Set();

    skillsArray.forEach(skill => {
        const skillLower = skill.toLowerCase();
        Object.keys(SKILL_FAQ_SUGGESTIONS).forEach(key => {
            if (skillLower.includes(key.toLowerCase()) || key.toLowerCase().includes(skillLower)) {
                SKILL_FAQ_SUGGESTIONS[key].forEach(faq => {
                    if (!addedQuestions.has(faq.question)) {
                        generated.push({ ...faq });
                        addedQuestions.add(faq.question);
                    }
                });
            }
        });
    });

    if (generated.length === 0) {
        GENERAL_FAQ_SUGGESTIONS.forEach(faq => {
            generated.push({ ...faq });
        });
    }

    return generated;
};

export default function EditService24h() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const jobId = location?.state?.jobId || null;
    const jobData = location?.state?.jobData || null;

    // ⭐ 1️⃣ SIDEBAR COLLAPSED STATE
    const [collapsed, setCollapsed] = useState(
        localStorage.getItem("sidebar-collapsed") === "true"
    );

    // ⭐ 2️⃣ LISTEN FOR SIDEBAR TOGGLE EVENT
    useEffect(() => {
        function handleToggle(e) {
            setCollapsed(e.detail);
        }
        window.addEventListener("sidebar-toggle", handleToggle);
        return () => window.removeEventListener("sidebar-toggle", handleToggle);
    }, []);

    // ⭐ RESPONSIVE FLAG
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const resize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [notes, setNotes] = useState("");
    const [budgetFrom, setBudgetFrom] = useState("");
    const [budgetTo, setBudgetTo] = useState("");

    const [category, setCategory] = useState(null);
    const [skills, setSkills] = useState([]);
    const [tools, setTools] = useState([]);

    const [faqs, setFaqs] = useState([]);
    const [faqQuestion, setFaqQuestion] = useState("");
    const [faqAnswer, setFaqAnswer] = useState("");
    const [isAddingFaq, setIsAddingFaq] = useState(false);
    const [editingFaqIndex, setEditingFaqIndex] = useState(-1);

    const categoryOptions = [
        "Graphics & Design",
        "Programming & Tech",
        "Digital Marketing",
        "Writing & Translation",
        "Video & Animation",
        "Music & Audio",
        "AI Services",
        "Data",
        "Business",
        "Finance",
        "Photography",
        "Lifestyle",
        "Consulting",
    ].map(e => ({ label: e, value: e }));

    const skillOptions = [
        "Logo Design",
        "Brand Style Guides",
        "Business Cards & Stationery",
        "Illustration",
        "Pattern Design",
        "Website Design",
        "App Design",
        "UX Design",
        "Game Art",
        "NFTs & Collectibles",
        "Industrial & Product Design",
        "Architecture & Interior Design",
        "Landscape Design",
        "Fashion Design",
        "Jewelry Design",
        "Presentation Design",
        "Infographic Design",
        "Vector Tracing",
        "Car Wraps",
        "Image Editing",
        "Photoshop Editing",
        "T-Shirts & Merchandise",
        "Packaging Design",
        "Book Design",
        "Album Cover Design",
        "Podcast Cover Art",
        "Menu Design",
        "Invitation Design",
        "Brochure Design",
        "Poster Design",
        "Signage Design",
        "Flyer Design",
        "Social Media Design",
        "Print Design",

        // Programming & Tech
        "Website Development",
        "Website Builders & CMS",
        "Web Programming",
        "E-Commerce Development",
        "Game Development",
        "Mobile Apps (iOS & Android)",
        "Desktop Applications",
        "Chatbots",
        "QA & Review",
        "User Testing",
        "Support & IT",
        "Data Analysis & Reports",
        "Convert Files",
        "Databases",
        "Cybersecurity & Data Protection",
        "Cloud Computing",
        "DevOps",
        "AI Development",
        "Machine Learning Models",
        "Blockchain & NFTs",
        "Scripts & Automation",
        "Software Customization",

        // Digital Marketing
        "Social Media Marketing",
        "SEO",
        "Content Marketing",
        "Video Marketing",
        "Email Marketing",
        "SEM (Search Engine Marketing)",
        "Influencer Marketing",
        "Local SEO",
        "Affiliate Marketing",
        "Mobile Marketing & Advertising",
        "Display Advertising",
        "E-Commerce Marketing",
        "Text Message Marketing",
        "Crowdfunding",
        "Web Analytics",
        "Domain Research",
        "Music Promotion",
        "Book & eBook Marketing",
        "Podcast Marketing",
        "Community Management",
        "Marketing Consulting",

        // Writing & Translation
        "Articles & Blog Posts",
        "Proofreading & Editing",
        "Translation",
        "Website Content",
        "Technical Writing",
        "Copywriting",
        "Brand Voice & Tone",
        "Resume Writing",
        "Cover Letters",
        "LinkedIn Profiles",
        "Press Releases",
        "Product Descriptions",
        "Case Studies",
        "White Papers",
        "Scriptwriting",
        "Speechwriting",
        "Creative Writing",
        "Book Editing",
        "Beta Reading",
        "Grant Writing",
        "UX Writing",
        "Email Copy",
        "Business Names & Slogans",
        "Transcription",
        "Legal Writing",

        // Video & Animation
        "Whiteboard & Animated Explainers",
        "Video Editing",
        "Short Video Ads",
        "Logo Animation",
        "Character Animation",
        "2D/3D Animation",
        "Intros & Outros",
        "Lyric & Music Videos",
        "Visual Effects",
        "Spokesperson Videos",
        "App & Website Previews",
        "Product Photography & Demos",
        "Subtitles & Captions",
        "Live Action Explainers",
        "Unboxing Videos",
        "Slideshow Videos",
        "Animation for Kids",
        "Trailers & Teasers",

        // Music & Audio
        "Voice Over",
        "Mixing & Mastering",
        "Producers & Composers",
        "Singers & Vocalists",
        "Session Musicians",
        "Songwriters",
        "Audiobook Production",
        "Sound Design",
        "Audio Editing",
        "Jingles & Intros",
        "Podcast Editing",
        "Music Transcription",
        "Dialogue Editing",
        "DJ Drops & Tags",

        // AI Services (sample)
        "AI Artists",
        "AI Applications",
        "AI Video Generators",
        "AI Music Generation",
        "AI Chatbot Development",
        "AI Website Builders",
        "Custom GPT & LLMs",
        "AI Training Data Preparation",
        "Text-to-Speech / Voice Cloning",
        "Prompt Engineering",

        // Data (sample)
        "Data Entry",
        "Data Mining & Scraping",
        "Database Design",
        "Data Visualization",
        "Dashboards",
        "Excel / Google Sheets",
        "Statistical Analysis",
        "Data Engineering",
        "Data Cleaning",

        // Business / Finance / Consulting / Lifestyle (sample)
        "Business Plans",
        "Market Research",
        "Branding Services",
        "Financial Consulting",
        "Career Counseling",
        "Project Management",
        "Supply Chain Management",
        "HR Consulting",
        "E-Commerce Management",
        "Business Consulting",
        "Presentations",
        "Virtual Assistant",
        "Accounting & Bookkeeping",
        "Financial Forecasting",
        "Financial Modeling",
        "Tax Consulting",
        "Crypto & NFT Consulting",
        "Business Valuation",
        "Pitch Decks",
        "Product Photography",
        "Real Estate Photography",
        "Portraits",
        "Image Retouching",
        "Food Photography",
        "Drone Photography",
        "Lifestyle Photography",
        "AI Image Enhancement",
        "Gaming",
        "Astrology & Psychics",
        "Online Tutoring",
        "Arts & Crafts",
        "Fitness Lessons",
        "Nutrition",
        "Relationship Advice",
        "Personal Styling",
        "Cooking Lessons",
        "Life Coaching",
        "Travel Advice",
        "Wellness & Meditation",
        "Language Lessons",
        "Management Consulting",
        "Business Strategy",
        "HR & Leadership",
        "Financial Advisory",
        "Technology Consulting",
        "Cybersecurity Consulting",
        "Productivity Coaching",
        "Study Skills",
        "Language Learning",
        "Public Speaking",
        "Career Mentoring",
        "Mindfulness & Meditation",
    ].map(e => ({ label: e, value: e }));

    const toolOptions = [
        "Adobe Illustrator",
        "CorelDRAW",
        "Affinity Designer",
        "Canva",
        "Figma",
        "Gravit Designer",
        "Inkscape",
        "Adobe InDesign",
        "Notion",
        "Milanote",
        "Frontify",
        "VistaCreate",
        "Procreate",
        "Clip Studio Paint",
        "Corel Painter",
        "Krita",
        "Repper",
        "Patterninja",
        "Adobe XD",
        "Sketch",
        "Webflow",
        "Framer",
        "InVision Studio",
        "ProtoPie",
        "Marvel",
        "Miro",
        "Balsamiq",
        "Axure RP",
        "Lucidchart",
        "Adobe Photoshop",
        "Blender",
        "ZBrush",
        "Substance Painter",
        "Unity",
        "Unreal Engine",
        "NFT Art Generator",
        "SolidWorks",
        "Autodesk Fusion 360",
        "Rhino 3D",
        "KeyShot",
        "AutoCAD",
        "SketchUp",
        "Revit",
        "Lumion",
        "3ds Max",
        "CLO 3D",
        "Marvelous Designer",
        "TUKAcad",
        "RhinoGold",
        "MatrixGold",
        "PowerPoint",
        "Google Slides",
        "Prezi",
        "Keynote",
        "Piktochart",
        "Visme",
        "Venngage",
        "Vector Magic",
        "FlexiSIGN",
        "SAi Sign Design Software",
        "Easysign Studio",
        "Adobe Express",
        "Crello",
        "Buffer Pablo",
        "QuarkXPress",

        // Dev tools
        "Visual Studio Code",
        "Sublime Text",
        "Atom",
        "Git",
        "GitHub",
        "GitLab",
        "Node.js",
        "React",
        "Angular",
        "Vue.js",
        "HTML",
        "CSS",
        "JavaScript",
        "Bootstrap",
        "Tailwind CSS",
        "WordPress",
        "Elementor",
        "Divi",
        "Wix",
        "Squarespace",
        "Shopify",
        "Joomla",
        "Drupal",
        "IntelliJ IDEA",
        "PyCharm",
        "PHPStorm",
        "Django",
        "Flask",
        "Laravel",
        "ASP.NET Core",
        "Express.js",
        "WooCommerce",
        "Magento",
        "BigCommerce",
        "OpenCart",
        "PrestaShop",
        "Stripe",
        "PayPal",
        "Godot",
        "C#",
        "C++",
        "Android Studio",
        "Xcode",
        "Flutter",
        "React Native",
        "Kotlin",
        "Java",
        "Swift",
        "SwiftUI",
        "Firebase",
        "Expo",
        "Electron.js",
        "PyQt",
        "Tkinter",
        ".NET",
        "WPF",
        "JavaFX",
        "C++ with Qt",

        // Testing / QA
        "Selenium",
        "Postman",
        "JMeter",
        "Cypress",
        "TestRail",
        "Bugzilla",
        "Jira",
        "Appium",
        "Hotjar",
        "Maze",
        "UserTesting.com",
        "Lookback",
        "Zendesk",
        "Freshdesk",
        "Jira Service Management",
        "ServiceNow",
        "TeamViewer",
        "AnyDesk",
        "Microsoft Intune",

        // Data / ML
        "Python",
        "Pandas",
        "NumPy",
        "Matplotlib",
        "R Studio",
        "Power BI",
        "Tableau",
        "Excel",
        "Google Sheets",
        "SQL",
        "Jupyter Notebook",
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "SQLite",
        "Firebase Firestore",
        "Redis",
        "Microsoft SQL Server",
        "TensorFlow",
        "PyTorch",
        "OpenAI API",
        "Hugging Face Transformers",
        "LangChain",
        "Google Vertex AI",
        "Azure AI Studio",
        "Scikit-learn",
        "XGBoost",
        "LightGBM",

        // Cloud / DevOps
        "AWS",
        "Microsoft Azure",
        "Google Cloud Platform",
        "DigitalOcean",
        "Heroku",
        "IBM Cloud",
        "Docker",
        "Kubernetes",
        "Jenkins",
        "GitHub Actions",
        "GitLab CI/CD",
        "Terraform",
        "Ansible",
        "Prometheus",
        "Grafana",

        // Automation / Scraping
        "Python Automation Scripts",
        "PowerShell",
        "Bash",
        "AutoHotkey",
        "Puppeteer",
        "Playwright",
        "Zapier",
        "Make",

        // AI / Content / Tools
        "ChatGPT",
        "Jasper",
        "SurferSEO",
        "Grammarly",
        "Hemingway Editor",
        "ProWritingAid",
        "LanguageTool",
        "QuillBot",
        "DeepL Translator",
        "Vyond",
        "Animaker",
        "Adobe After Effects",
        "Adobe Premiere Pro",
        "Final Cut Pro",
        "DaVinci Resolve",
        "CapCut",
        "Filmora",
        "Vegas Pro",
        "Audacity",
        "Adobe Audition",
        "GarageBand",
        "FL Studio",
        "Ableton Live",
        "Cubase",
        "Studio One",
        "Spotify for Artists",
        "SoundCloud",
        "DALL·E",
        "MidJourney",
        "Stable Diffusion",
        "Adobe Firefly",
        "Leonardo AI",
        "Runway ML",
        "Descript",
        "ElevenLabs",
        "Trello",
        "Asana",
        "ClickUp",
        "Slack",
        "Zoom",
        "Teams",
        "Xero",
        "Tally",
        "Notion",
    ].map(e => ({ label: e, value: e }));



    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (jobData || !id) return;

        const fetchService = async () => {
            const snap = await getDoc(doc(db, "service_24h", id));

            if (snap.exists()) {
                const data = snap.data();

                setTitle(data.title || "");
                setDescription(data.description || "");
                setSkills((data.skills || []).map(s => ({ label: s, value: s })));
                setTools((data.tools || []).map(t => ({ label: t, value: t })));
                setNotes(data.clientRequirements || "");

                setBudgetFrom(data.budget_from || "");
                setBudgetTo(data.budget_to || "");

                setCategory(
                    data.category
                        ? { label: data.category, value: data.category }
                        : null
                );

                setCategory(
                    data.category ? { label: data.category, value: data.category } : null
                );

                setSkills((data.skills || []).map(s => ({ label: s, value: s })));
                setTools((data.tools || []).map(t => ({ label: t, value: t })));
                setFaqs(Array.isArray(data.faqs) ? data.faqs : []);

            }
        };


        fetchService();
    }, [id, jobData]);



    useEffect(() => {
        if (jobData) {
            setTitle(jobData.title || "");
            setDescription(jobData.description || "");
            setSkills((jobData.skills || []).map((s) => ({ label: s, value: s })));
            setTools((jobData.tools || []).map((t) => ({ label: t, value: t })));
            setNotes(jobData.notes || "");
            setBudget(jobData.budget || "");
            setCategory(
                jobData.category
                    ? { label: jobData.category, value: jobData.category }
                    : null
            );
            setFaqs(Array.isArray(jobData.faqs) ? jobData.faqs : []);
        }
    }, [jobData]);

    const handleSave = async () => {
        if (!id) return alert("Invalid service ID");

        if (!title.trim()) return alert("Title required");
        if (!description.trim()) return alert("Description required");
        if (!category) return alert("Category required");

        setSaving(true);

        try {
            await updateDoc(doc(db, "service_24h", id), {
                title: title.trim(),
                description: description.trim(),
                category: category.value,
                skills: skills.map(s => s.value),
                tools: tools.map(t => t.value),
                clientRequirements: notes,
                budget_from: Number(budgetFrom),
                budget_to: Number(budgetTo),
                updatedAt: new Date(),
                faqs: faqs,
            });

            alert("24 Hour Service updated!");
            navigate(-1);
        } catch (error) {
            console.error("Update failed:", error);
            alert(error.message);
        }

        setSaving(false);
    };

    const customSelectStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: "#F8F9FA",
            borderRadius: "12px",
            border: "none",
            padding: "6px 12px",
            boxShadow: "none",
            minHeight: "65px",
            "&:hover": {
                border: "none",
            },
        }),

        menu: (provided) => ({
            ...provided,
            borderRadius: "12px",
            overflow: "hidden",
            zIndex: 9999,
        }),

        multiValue: (provided) => ({
            ...provided,
            backgroundColor: "#7c6c9c20",
            borderRadius: "8px",
        }),

        multiValueLabel: (provided) => ({
            ...provided,
            color: "#000",
            fontWeight: 500,
        }),

        multiValueRemove: (provided) => ({
            ...provided,
            color: "#2a292b",
            ":hover": {
                backgroundColor: "#2f2e2f",
                color: "#fff",
            },
        }),

        placeholder: (provided) => ({
            ...provided,
            color: "#6b7280",
        }),
    };

    return (
        <div className="add-service-wrapper" style={{ marginLeft: collapsed ? "-110px" : "10px", transition: "margin-left 0.25s ease" }}>
            <div className="add-service-container" style={{ maxWidth: "1000px" }}>
                <div className="add-service-header">
                    <h1 className="add-service-title">
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
                            }}
                        >
                            <img src={backarrow} alt="Back" style={{ width: 16, height: 18, objectFit: "contain" }} />
                        </div>
                        Edit 24-Hour Service
                    </h1>
                    <p className="add-service-subtitle">Update your express 24-hour service details.</p>
                </div>

                <div className="add-service-layout">
                    <div className="add-service-form" style={{ maxWidth: "100%", flex: 1 }}>

                        {/* BASIC INFO */}
                        <div className="form-card">
                            <div>
                                <label className="add-service-label">Service Title</label>
                                <input
                                    type="text"
                                    className="add-service-input"
                                    placeholder="e.g. Logo Design That Pops and Defines Your Brand"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="add-service-label">Description</label>
                                <textarea
                                    className="add-service-textarea"
                                    placeholder="Describe your service and showcase your uniqueness"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="add-service-grid-2" style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
                                <div style={{ gridColumn: isMobile ? "span 1" : "span 2" }}>
                                    <label className="add-service-label">Category</label>
                                    <Select
                                        value={category}
                                        onChange={setCategory}
                                        options={categoryOptions}
                                        styles={customSelectStyles}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* PRICING */}
                        <div className="form-card">
                            <h3 className="add-service-section-title" style={{ margin: 0 }}>Pricing</h3>
                            <div className="add-service-grid-2" style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
                                <div>
                                    <label className="add-service-label">Minimum Price (₹)</label>
                                    <input
                                        type="number"
                                        className="add-service-input"
                                        placeholder="Min"
                                        value={budgetFrom}
                                        onChange={(e) => setBudgetFrom(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="add-service-label">Maximum Price (₹)</label>
                                    <input
                                        type="number"
                                        className="add-service-input"
                                        placeholder="Max"
                                        value={budgetTo}
                                        onChange={(e) => setBudgetTo(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* SKILLS & TOOLS */}
                        <div className="form-card">
                            <div>
                                <label className="add-service-label">Skills</label>
                                <Select
                                    isMulti
                                    options={skillOptions}
                                    value={skills}
                                    onChange={setSkills}
                                    styles={customSelectStyles}
                                />
                            </div>
                            <div>
                                <label className="add-service-label">Tools</label>
                                <Select
                                    isMulti
                                    options={toolOptions}
                                    value={tools}
                                    onChange={setTools}
                                    styles={customSelectStyles}
                                />
                            </div>
                        </div>

                        {/* REQUIREMENTS */}
                        <div className="form-card">
                            <div>
                                <label className="add-service-label">Freelancer Requirements <span className="add-service-label-sub">(Optional)</span></label>
                                <textarea
                                    className="add-service-textarea"
                                    placeholder="What do you need from your client to get started"
                                    style={{ minHeight: '100px' }}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* FAQ */}
                        <div className="form-card">
                            <div className="faq-header" style={{ marginTop: 0, display: "flex", gap: "10px", alignItems: "center" }}>
                                <h3 className="add-service-section-title" style={{ margin: 0, marginRight: "auto" }}>FAQ</h3>
                                <button
                                    type="button"
                                    style={{
                                        background: "#F5F3FF",
                                        border: "1px solid #D8B4FE",
                                        borderRadius: "8px",
                                        padding: "8px 16px",
                                        fontSize: "13px",
                                        fontWeight: "600",
                                        color: "#6B21A8",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => {
                                        const generated = generateFaqsFromSkills(skills.map(s => s.value));
                                        const currentQuestions = new Set(faqs.map(f => f.question));
                                        const newFaqs = [...faqs];
                                        generated.forEach(item => {
                                            if (!currentQuestions.has(item.question)) {
                                                newFaqs.push(item);
                                            }
                                        });
                                        setFaqs(newFaqs);
                                        alert(`Auto-generated ${newFaqs.length - faqs.length} FAQs based on selected skills!`);
                                    }}
                                >
                                    ✨ Auto-generate
                                </button>
                                <button
                                    type="button"
                                    className="faq-add-btn"
                                    onClick={() => {
                                        setIsAddingFaq(true);
                                        setEditingFaqIndex(-1);
                                        setFaqQuestion("");
                                        setFaqAnswer("");
                                    }}
                                >
                                    + Add Question
                                </button>
                            </div>

                            {faqs.length === 0 && !isAddingFaq && (
                                <div
                                    className="faq-box"
                                    style={{ marginTop: 8 }}
                                    onClick={() => {
                                        setIsAddingFaq(true);
                                        setEditingFaqIndex(-1);
                                        setFaqQuestion("");
                                        setFaqAnswer("");
                                    }}
                                >
                                    Add common questions clients ask about your service
                                </div>
                            )}

                            {isAddingFaq && (
                                <div style={{ background: "#F9FAFB", padding: "16px", borderRadius: "12px", border: "1px solid #E5E7EB", display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" }}>
                                    <div>
                                        <label className="add-service-label">Question</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Can you deliver within 2 days?"
                                            value={faqQuestion}
                                            onChange={(e) => setFaqQuestion(e.target.value)}
                                            className="add-service-input"
                                            style={{ background: "#fff", height: "50px" }}
                                        />
                                    </div>
                                    <div>
                                        <label className="add-service-label">Answer</label>
                                        <textarea
                                            placeholder="e.g. Yes, but it will cost an extra express delivery fee."
                                            value={faqAnswer}
                                            onChange={(e) => setFaqAnswer(e.target.value)}
                                            className="add-service-textarea"
                                            style={{ minHeight: "80px", background: "#fff", padding: "12px" }}
                                        />
                                    </div>
                                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                                        <button
                                            type="button"
                                            style={{
                                                background: "#F3F4F6",
                                                border: "1px solid #E5E7EB",
                                                borderRadius: "8px",
                                                padding: "6px 12px",
                                                fontSize: "12px",
                                                fontWeight: "600",
                                                color: "#4B5563",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => {
                                                setIsAddingFaq(false);
                                                setEditingFaqIndex(-1);
                                                setFaqQuestion("");
                                                setFaqAnswer("");
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            style={{
                                                background: "#6C4DFF",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "8px",
                                                padding: "6px 12px",
                                                fontSize: "12px",
                                                fontWeight: "600",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => {
                                                if (!faqQuestion.trim() || !faqAnswer.trim()) {
                                                    alert("Please enter both question and answer");
                                                    return;
                                                }
                                                if (editingFaqIndex !== -1) {
                                                    const updated = [...faqs];
                                                    updated[editingFaqIndex] = { question: faqQuestion.trim(), answer: faqAnswer.trim() };
                                                    setFaqs(updated);
                                                } else {
                                                    setFaqs([...faqs, { question: faqQuestion.trim(), answer: faqAnswer.trim() }]);
                                                }
                                                setIsAddingFaq(false);
                                                setEditingFaqIndex(-1);
                                                setFaqQuestion("");
                                                setFaqAnswer("");
                                            }}
                                        >
                                            {editingFaqIndex !== -1 ? "Save" : "Add"}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {faqs.length > 0 && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                                    {faqs.map((faq, index) => (
                                        <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", background: "#F8F9FA", padding: "12px 16px", borderRadius: "12px", border: "1px solid #E5E7EB" }}>
                                            <div style={{ flex: 1, paddingRight: "16px" }}>
                                                <div style={{ fontWeight: 600, fontSize: "14px", color: "#111" }}>Q: {faq.question}</div>
                                                <div style={{ fontSize: "13px", color: "#4B5563", marginTop: "4px" }}>A: {faq.answer}</div>
                                            </div>
                                            <div style={{ display: "flex", gap: "8px" }}>
                                                <button
                                                    type="button"
                                                    style={{ background: "transparent", border: "none", color: "#6C4DFF", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
                                                    onClick={() => {
                                                        setEditingFaqIndex(index);
                                                        setIsAddingFaq(true);
                                                        setFaqQuestion(faq.question);
                                                        setFaqAnswer(faq.answer);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    style={{ background: "transparent", border: "none", color: "#EF4444", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
                                                    onClick={() => {
                                                        setFaqs(faqs.filter((_, idx) => idx !== index));
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button onClick={handleSave} className="add-service-publish-btn">
                            Update Service
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

