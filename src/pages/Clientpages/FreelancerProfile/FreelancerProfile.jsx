import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../../firbase/Firebase";

export default function FreelancerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [freelancer, setFreelancer] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFreelancer() {
      try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFreelancer(docSnap.data());
          // Fetch portfolio
          const { collection, getDocs } = await import("firebase/firestore");
          const portRef = collection(db, "users", id, "portfolio");
          const portSnap = await getDocs(portRef);
          setPortfolio(portSnap.docs.map(d => ({ id: d.id, ...d.data() })));
          
          // Fetch reviews
          const revRef = collection(db, "users", id, "reviews");
          const revSnap = await getDocs(revRef);
          setReviews(revSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        } else {
          console.error("No such freelancer!");
        }
      } catch (error) {
        console.error("Error fetching freelancer:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchFreelancer();
    }
  }, [id]);

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>Loading profile...</div>;
  }

  if (!freelancer) {
    return <div style={{ padding: "40px", textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>Freelancer not found.</div>;
  }

  const name = freelancer.first_name || freelancer.firstName || freelancer.name || freelancer.Company_name || "James Andrew";
  const role = freelancer.role || freelancer.professional_role || freelancer.title || "UI/UX Designer";
  const rawRate = freelancer.rate || freelancer.daily_rate || freelancer.hourlyRate;
  const rate = rawRate ? (typeof rawRate === 'number' ? rawRate.toLocaleString() : rawRate.toString().replace(/[^0-9,.]/g, '')) : "1,500";
  const about = freelancer.about || freelancer.description || freelancer.bio || "No description provided.";
  const experience = freelancer.experience || freelancer.exp || "N/A";
  const projectsCount = freelancer.completedProjects || freelancer.projectsCount || "0";
  const successRate = freelancer.onTime || freelancer.successRate || "N/A";
  const responseTime = freelancer.responseTime || "N/A";
  const initials = name.substring(0, 2).toUpperCase();

  const skills = Array.isArray(freelancer.skills) && freelancer.skills.length > 0 
    ? freelancer.skills 
    : [];

  // Mock colors for skills
  const skillColors = ["#F5F2FF", "#F0F7FF", "#FFF0F5", "#F0FFF4", "#FFF5F0", "#F8F9FA", "#F8F9FA", "#FDFCEB"];
  const skillTextColors = ["#6C3EEB", "#007BFF", "#FF3366", "#30B47A", "#FF6B35", "#333", "#333", "#D9A000"];

  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "column", height: "100vh", overflow: "hidden", background: "#F7F7F9", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ padding: "24px 32px", display: "flex", flex: 1, gap: "24px", overflowY: "auto", overflowX: "hidden" }}>
        
        {/* LEFT COLUMN */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Main Card */}
          <div style={{ background: "white", borderRadius: "16px", border: "1px solid #EEEDF3", padding: "40px", textAlign: "center" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "40px", background: "#6C3EEB", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: 700, fontFamily: "'Sora', sans-serif", margin: "0 auto 16px" }}>
              {freelancer.profileImage ? <img src={freelancer.profileImage} alt={name} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} /> : initials}
            </div>
            
            <h1 style={{ fontSize: "24px", fontWeight: 700, fontFamily: "'Sora', sans-serif", color: "#1A1433", margin: "0 0 4px 0" }}>{name}</h1>
            <div style={{ fontSize: "14px", color: "#8C84A8", marginBottom: "16px" }}>{role}</div>
            
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "32px" }}>
              <div style={{ background: "#FDFCEB", color: "#D9A000", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
                <span>⭐</span> 4.8
              </div>
              <div style={{ background: "#F5F2FF", color: "#6C3EEB", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700 }}>Top Rated</div>
              <div style={{ background: "#E8F8F0", color: "#30B47A", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700 }}>Available</div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "48px", borderTop: "1px solid #EEEDF3", paddingTop: "32px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: 700, color: "#1A1433", fontFamily: "'Sora', sans-serif" }}>{projectsCount}</div>
                <div style={{ fontSize: "12px", color: "#8C84A8" }}>Projects</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: 700, color: "#1A1433", fontFamily: "'Sora', sans-serif" }}>₹{rate}</div>
                <div style={{ fontSize: "12px", color: "#8C84A8" }}>Per Day</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: 700, color: "#1A1433", fontFamily: "'Sora', sans-serif" }}>{experience}</div>
                <div style={{ fontSize: "12px", color: "#8C84A8" }}>Exp.</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: 700, color: "#1A1433", fontFamily: "'Sora', sans-serif" }}>{successRate}</div>
                <div style={{ fontSize: "12px", color: "#8C84A8" }}>On Time</div>
              </div>
            </div>
          </div>

          {/* ABOUT */}
          <div style={{ background: "white", borderRadius: "16px", border: "1px solid #EEEDF3", padding: "32px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#8C84A8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>ABOUT</h3>
            <p style={{ fontSize: "14px", color: "#4A455E", lineHeight: "1.6", margin: 0 }}>{about}</p>
          </div>

          {/* SKILLS & TOOLS */}
          <div style={{ background: "white", borderRadius: "16px", border: "1px solid #EEEDF3", padding: "32px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#8C84A8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>SKILLS & TOOLS</h3>
            {skills.length > 0 ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {skills.map((skill, index) => (
                  <div key={index} style={{ background: skillColors[index % skillColors.length], color: skillTextColors[index % skillTextColors.length], padding: "8px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 600 }}>
                    {skill}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: "14px", color: "#8C84A8" }}>No skills listed.</div>
            )}
          </div>

          {/* PORTFOLIO */}
          <div style={{ background: "white", borderRadius: "16px", border: "1px solid #EEEDF3", padding: "32px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#8C84A8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>PORTFOLIO</h3>
            {portfolio.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {portfolio.map((item, index) => (
                  <div key={index} style={{ border: "1px solid #EEEDF3", borderRadius: "12px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    <div style={{ height: "120px", background: "#f5f5f5" }}>
                      {item.imageUrl ? <img src={item.imageUrl} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#8C84A8"}}>No Image</div>}
                    </div>
                    <div style={{ padding: "12px" }}>
                      <div style={{ fontWeight: 600, fontSize: "14px", color: "#1A1433" }}>{item.title || "Untitled"}</div>
                      <div style={{ fontSize: "12px", color: "#8C84A8", marginTop: "4px" }}>{item.description || ""}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: "14px", color: "#8C84A8" }}>No portfolio items uploaded yet.</div>
            )}
          </div>

          {/* RECENT REVIEWS */}
          <div style={{ background: "white", borderRadius: "16px", border: "1px solid #EEEDF3", padding: "32px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#8C84A8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "24px" }}>RECENT REVIEWS</h3>
            {reviews.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {reviews.map((review, idx) => (
                  <div key={idx} style={{ borderBottom: idx !== reviews.length - 1 ? "1px solid #EEEDF3" : "none", paddingBottom: idx !== reviews.length - 1 ? "24px" : "0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "16px", background: "#6C3EEB", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700 }}>
                          {review.clientName ? review.clientName.substring(0, 2).toUpperCase() : "CL"}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: "#1A1433", fontSize: "14px" }}>{review.clientName || "Client"}</div>
                          <div style={{ fontSize: "12px", color: "#8C84A8" }}>{review.projectTitle || "Project"}</div>
                        </div>
                      </div>
                      <div style={{ color: "#D9A000", fontSize: "12px", letterSpacing: "2px" }}>
                        {"★".repeat(Math.round(review.rating || 5)) + "☆".repeat(5 - Math.round(review.rating || 5))}
                      </div>
                    </div>
                    <p style={{ fontSize: "14px", color: "#4A455E", margin: 0 }}>{review.feedback || review.comment || "No feedback provided."}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: "14px", color: "#8C84A8" }}>No reviews yet.</div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN (Sticky) */}
        <div style={{ width: "320px", display: "flex", flexDirection: "column", gap: "24px" }}>
          
          <div style={{ background: "white", borderRadius: "16px", border: "1px solid #EEEDF3", padding: "32px", position: "sticky", top: 0 }}>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div style={{ fontSize: "32px", fontWeight: 700, fontFamily: "'Sora', sans-serif", color: "#1A1433" }}>₹{rate}</div>
              <div style={{ fontSize: "13px", color: "#8C84A8" }}>per day</div>
            </div>

            <button style={{ width: "100%", background: "#6C3EEB", color: "white", padding: "14px", borderRadius: "12px", border: "none", fontSize: "15px", fontWeight: 700, fontFamily: "'Sora', sans-serif", cursor: "pointer", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              Hire {name.split(" ")[0]} →
            </button>
            <button 
              onClick={() => {
                navigate("/client-dashbroad2/chat", {
                  state: {
                    currentUid: auth.currentUser?.uid,
                    otherUid: id,
                    otherName: name,
                    otherImage: freelancer.profileImage || "",
                  }
                });
              }}
              style={{ width: "100%", background: "white", color: "#6C3EEB", padding: "14px", borderRadius: "12px", border: "1px solid #EBE5F2", fontSize: "15px", fontWeight: 700, fontFamily: "'Sora', sans-serif", cursor: "pointer", marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
            >
              💬 Message
            </button>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", borderTop: "1px solid #EEEDF3", paddingTop: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13px", color: "#4A455E" }}>
                <span style={{ color: "#D9A000" }}>⚡</span> {responseTime !== "N/A" ? responseTime : "Response time N/A"}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13px", color: "#4A455E" }}>
                <span>📅</span> Available from Jan 20
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13px", color: "#4A455E" }}>
                <span>🌍</span> Open to remote work
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13px", color: "#4A455E" }}>
                <span style={{ color: "#30B47A" }}>✅</span> {projectsCount} successful projects
              </div>
            </div>
          </div>

          <div style={{ background: "white", borderRadius: "16px", border: "1px solid #EEEDF3", padding: "24px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1A1433", fontFamily: "'Sora', sans-serif", marginBottom: "16px" }}>Share Profile</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button style={{ width: "100%", background: "#F7F7F9", color: "#1A1433", padding: "12px", borderRadius: "8px", border: "1px solid #EEEDF3", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                🔗 Copy profile link
              </button>
              <button style={{ width: "100%", background: "#F7F7F9", color: "#1A1433", padding: "12px", borderRadius: "8px", border: "1px solid #EEEDF3", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                ✉️ Send via email
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
