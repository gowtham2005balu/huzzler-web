// import React, { useState } from "react";
// import backarrow from "../assets/backarrow.png"

// const HelpCenter = () => {
//   const [openIndex, setOpenIndex] = useState(null);

//   const faqs = [
//     {
//       question: "How do I create or delete my account?",
//       answer:
//         "Dummy content: You can create an account by signing up on our platform. To delete your account, please contact support."
//     },
//     {
//       question: "How is my personal data protected under the DPDP Act?",
//       answer:
//         "All users have the right to withdraw consent at any point in time by contacting the company. The DPDP Act is a law requiring Huzzler to only use data for legal purposes and as described in our Terms & Disclosures. We store and protect your data according to strict security guidelines."
//     },
//     {
//       question: "Can I withdraw my consent for data processing?",
//       answer:
//         "Dummy content: Yes, you can withdraw your consent at any time by contacting our support team."
//     },
//     {
//       question: "Who can see my freelancer or client profile?",
//       answer:
//         "Dummy content: Your profile is visible to registered users depending on your visibility settings."
//     },
//     {
//       question: "Are payments handled?",
//       answer:
//         "Dummy content: All payments are securely processed and monitored by our system."
//     },
//     {
//       question: "What should I do if I face an issue with another user?",
//       answer:
//         "Dummy content: Contact our support team with details so we can review and resolve the issue."
//     },
//     {
//       question: "Who can I contact for data or privacy concerns?",
//       answer:
//         "Dummy content: Please reach out to privacy@yourapp.com for any privacy-related queries."
//     }
//   ];

//   const toggle = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div style={styles.page}>
//       {/* Header */}
//       <div style={styles.header}>
//         <div
//           onClick={() => navigate(-1)}
//           aria-label="Back"
//           style={{
//             width: "36px",
//             height: "36px",
//             borderRadius: "14px",
//             border: "0.8px solid #ccc",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             cursor: "pointer",
//             fontSize: "20px",
//             opacity: 1,
//             flexShrink: 0,
//             marginBottom: "18px",
//             marginTop:"17px"
//           }}
//         >
//           <img
//             src={backarrow}
//             alt="back arrow"
//             height={20}
//           />
//         </div>

//         <h2 style={styles.title}>Help Center</h2>
//       </div>

//       {/* FAQ Section */}
//       <div style={styles.container}>
//         <h1 style={styles.heading}>Frequently Asked Questions</h1>

//         <div style={styles.faqWrapper}>
//           {faqs.map((item, index) => (
//             <div key={index} style={styles.faqItem}>
//               <div style={styles.questionRow} onClick={() => toggle(index)}>
//                 <span>{item.question}</span>
//                 <span style={styles.icon}>{openIndex === index ? "✕" : "+"}</span>
//               </div>

//               {openIndex === index && (
//                 <div style={styles.answer}>
//                   {item.answer}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ---------- Inline Styles ---------- */
// const styles = {
//   page: {
//     fontFamily: "Arial, sans-serif",
//     minHeight: "100vh",
//     padding: "20px 40px"
//   },
//   header: {
//     display: "flex",
//     alignItems: "center",
//     gap: "15px",
//     marginBottom: "20px"
//   },
//   backBtn: {
//     fontSize: "25px",
//     border: "none",
//     background: "transparent",
//     cursor: "pointer"
//   },
//   title: {
    
//     fontSize: "22px",
//     fontWeight: "600"
//   },

//   heading: {
//     textAlign: "center",
//     marginBottom: "35px",
//     fontSize: "28px",
//     fontWeight: "600"
//   },
//   faqWrapper: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px"
//   },
//   faqItem: {
//     background: "#f8f5e5",
//     padding: "18px 22px",
//     borderRadius: "12px",
//     cursor: "pointer",
//     transition: "0.3s"
//   },
//   questionRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     fontSize: "16px",
//     fontWeight: 500
//   },
//   icon: {
//     fontSize: "20px",
//     fontWeight: "bold"
//   },
//   answer: {
//     marginTop: "10px",
//     fontSize: "14px",
//     lineHeight: "1.5",
//     color: "#555"
//   }
// };

// export default HelpCenter;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backarrow from "../assets/backarrow.png";
import { ChevronDown, ChevronUp, Search, MessageCircle } from "lucide-react";

const HelpCenter = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  // ✅ 1️⃣ Add sidebar collapsed state
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebar-collapsed") === "true"
  );

  // ✅ 2️⃣ Listen for sidebar toggle
  useEffect(() => {
    function handleToggle(e) {
      setCollapsed(e.detail);
    }
    window.addEventListener("sidebar-toggle", handleToggle);
    return () => window.removeEventListener("sidebar-toggle", handleToggle);
  }, []);

  const faqs = [
    {
      question: "How do I create or delete my account?",
      answer:
        "You can create an account by clicking the 'Sign Up' button on our homepage and following the prompts. If you ever need to delete your account, you can do so from the Account Settings page under the 'Danger Zone' section, or by reaching out to our support team for assistance."
    },
    {
      question: "How is my personal data protected under the DPDP Act?",
      answer:
        "All users have the right to withdraw consent at any point in time by contacting the company. The DPDP Act is a law requiring Huzzler to only use data for legal purposes and as described in our Terms & Disclosures. We store and protect your data according to strict security guidelines."
    },
    {
      question: "Can I withdraw my consent for data processing?",
      answer:
        "Yes, you can withdraw your consent for data processing at any time. Simply visit your Privacy Settings or contact our support team at privacy@huzzler.com, and we will process your request promptly in accordance with applicable laws."
    },
    {
      question: "Who can see my freelancer or client profile?",
      answer:
        "Your profile visibility depends on your settings. By default, your public profile is visible to all registered users on Huzzler to help you find work or hire talent. You can adjust your privacy settings to restrict who can view your full details."
    },
    {
      question: "How are payments handled?",
      answer:
        "All payments are securely processed through our integrated, bank-grade payment gateway. Funds are held in escrow for fixed-price projects and released only when milestones are approved, ensuring both clients and freelancers are protected."
    },
    {
      question: "What should I do if I face an issue with another user?",
      answer:
        "If you experience any issues, such as a dispute over deliverables or inappropriate behavior, please use the 'Report User' feature on their profile or contact our 24/7 support team with the details. We will review the situation and mediate if necessary."
    },
    {
      question: "Who can I contact for data or privacy concerns?",
      answer:
        "For any privacy-related queries or to request a copy of the data we hold about you, please reach out directly to our Data Protection Officer at privacy@huzzler.com. We take your privacy seriously and aim to respond within 48 hours."
    }
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // ✅ 3️⃣ Wrap whole UI inside margin-left
  return (
    <div
      className="freelance-wrapper"
      style={{
        marginLeft: collapsed ? "-110px" : "50px",
        transition: "margin-left 0.25s ease",
        background: "#F7F7F9",
        minHeight: "100vh",
      }}
    >
      <div style={styles.page}>
        {/* Header */}
        <div style={styles.header}>
          <div
            onClick={() => navigate(-1)}
            aria-label="Back"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#fff",
              border: "1px solid #EEEDF3",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
            }}
          >
            <img src={backarrow} alt="back arrow" height={16} />
          </div>
          <h2 style={styles.title}>Help Center</h2>
        </div>

        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {/* Hero Section */}
          <div style={{ textAlign: "center", margin: "40px 0 50px" }}>
            <h1 style={{ fontSize: 36, fontWeight: 700, color: "#1A1433", fontFamily: "'Sora', sans-serif", marginBottom: 16 }}>
              Frequently Asked Questions
            </h1>
            <p style={{ fontSize: 16, color: "#6B6B8A", fontFamily: "'DM Sans', sans-serif", maxWidth: 600, margin: "0 auto" }}>
              Find answers to common questions about managing your account, privacy, payments, and making the most of Huzzler.
            </p>
          </div>

          {/* Search/Contact Banner (Optional UI element) */}
          <div style={{ display: "flex", gap: 16, marginBottom: 40, justifyContent: "center" }}>
            <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 999, border: "none", background: "#6C3EEB", color: "#fff", fontWeight: 600, fontSize: 15, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
              <MessageCircle size={18} /> Contact Support
            </button>
          </div>

          {/* FAQ Accordion */}
          <div style={styles.faqWrapper}>
            {faqs.map((item, index) => (
              <div 
                key={index} 
                style={{
                  ...styles.faqItem,
                  borderColor: openIndex === index ? "#6C3EEB" : "#EEEDF3",
                  boxShadow: openIndex === index ? "0 8px 24px rgba(108, 62, 235, 0.08)" : "0 2px 8px rgba(0,0,0,0.02)"
                }}
              >
                <div
                  style={styles.questionRow}
                  onClick={() => toggle(index)}
                >
                  <span style={{ color: openIndex === index ? "#6C3EEB" : "#1A1433", fontWeight: openIndex === index ? 700 : 600 }}>
                    {item.question}
                  </span>
                  <div style={{ 
                    width: 32, height: 32, borderRadius: "50%", 
                    background: openIndex === index ? "#6C3EEB" : "#F5F2FF", 
                    color: openIndex === index ? "#fff" : "#6C3EEB",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0
                  }}>
                    {openIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {openIndex === index && (
                  <div style={styles.answer}>
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Inline Styles ---------- */
const styles = {
  page: {
    padding: "30px 40px",
    maxWidth: 1200,
    margin: "0 auto"
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px"
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1A1433",
    fontFamily: "'Sora', sans-serif",
    margin: 0
  },
  faqWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    paddingBottom: 60
  },
  faqItem: {
    background: "#fff",
    padding: "24px",
    borderRadius: "20px",
    border: "1px solid #EEEDF3",
    cursor: "pointer",
    transition: "all 0.3s ease",
    overflow: "hidden"
  },
  questionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "17px",
    fontFamily: "'Sora', sans-serif",
    gap: 20
  },
  answer: {
    marginTop: "16px",
    paddingTop: "16px",
    borderTop: "1px dashed #EEEDF3",
    fontSize: "15px",
    lineHeight: "1.7",
    color: "#6B6B8A",
    fontFamily: "'DM Sans', sans-serif",
    animation: "fadeIn 0.3s ease"
  }
};

export default HelpCenter;
