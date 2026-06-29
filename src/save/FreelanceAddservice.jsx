

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firbase/Firebase"; // 👉 adjust path to your firebase file
import backarrow from "../assets/backarrow.png";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

// --------------------------------------------------
// INLINE CSS (same file)
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
  .as-chip-wrap {
    display: flex;
    gap: 10px;
    margin-top: 10px;
    flex-wrap: wrap;
  }
  .as-chip {
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
    background: #EEF2FF;
    color: #6366F1;
  }
  .as-chip-remove {
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 10px;
    color: #6366F1;
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
  
  /* Sidebar styling */
  .ai-sidebar {
    flex: 1;
    max-width: 456px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding-top: 76px;
    position: sticky;
    top: 40px;
    height: max-content;
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

  `;
  document.head.appendChild(style);
}

// --------------------------------------------------
// COMPONENT
// --------------------------------------------------

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
    const skillValue = typeof skill === 'object' ? skill.value : skill;
    if (!skillValue) return;

    const skillLower = skillValue.toLowerCase();
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
    zIndex: 9999,
  }),
  menuPortal: base => ({ ...base, zIndex: 9999 }),
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

export default function AddServiceForm({ jobData = null, jobId = null }) {
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  // -------------------- BASIC STATE -------------------- //
  const [selectedTab, setSelectedTab] = useState("Work"); // "Work" | "24 Hours"
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [budgetFrom, setBudgetFrom] = useState("");
  const [budgetTo, setBudgetTo] = useState("");
  const [sampleUrl, setSampleUrl] = useState("");
  const [urlError, setUrlError] = useState("");

  const [clientReq, setClientReq] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState("");

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [faqs, setFaqs] = useState([]);
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [isAddingFaq, setIsAddingFaq] = useState(false);
  const [editingFaqIndex, setEditingFaqIndex] = useState(-1);

  const deliveryOptions = [
    "1-7 days",
    "7-15 days",
    "15-30 days",
    "1-2 months",
    "2-3 months",
    "3-6 months",
    "6+ months",
  ];

  const expertiseOptions = [
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
    "Personal Growth & Hobbies",
  ].map(e => ({ label: e, value: e }));


  const skillOptions = [
    // Graphics & Design
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
    "Confidence Coaching",
  ].map(e => ({ label: e, value: e }));

  const toolOptions = [
    // Design tools
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

  useEffect(() => {
    if (jobData) {
      setTitle(jobData.title || "");
      setDesc(jobData.description || "");
      setBudgetFrom(
        jobData.budget_from != null ? String(jobData.budget_from) : ""
      );
      setBudgetTo(
        jobData.budget_to != null ? String(jobData.budget_to) : ""
      );
      setSampleUrl(jobData.sampleProjectUrl || "");
      setClientReq(jobData.clientRequirements || "");
      setSelectedCategory(jobData.category ? { label: jobData.category, value: jobData.category } : null);
      setSelectedDuration(jobData.deliveryDuration || "");
      setSelectedSkills(Array.isArray(jobData.skills) ? jobData.skills.map(s => ({ label: s, value: s })) : []);
      setSelectedTools(Array.isArray(jobData.tools) ? jobData.tools.map(t => ({ label: t, value: t })) : []);
      setFaqs(Array.isArray(jobData.faqs) ? jobData.faqs : []);
      if (jobData.is24Hour) {
        setSelectedTab("24 Hours");
      }
    }
  }, [jobData]);

  // -------------------- VALIDATION + SAVE -------------------- //
  const handleSave = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!isValidHttpsUrl(sampleUrl)) {
      alert("invalid URLs are not allowed for sample projects link");
      return;
    }

    if (!title.trim()) {
      setErrorMsg("Please enter a service title");
      return;
    }
    if (!desc.trim()) {
      setErrorMsg("Please enter a description");
      return;
    }
    if (!budgetFrom.trim() || isNaN(Number(budgetFrom))) {
      setErrorMsg("Please enter a valid 'from' price");
      return;
    }
    if (!budgetTo.trim() || isNaN(Number(budgetTo))) {
      setErrorMsg("Please enter a valid 'to' price");
      return;
    }

    if (selectedTab === "Work") {
      if (!selectedCategory) {
        setErrorMsg("Please select a category");
        return;
      }
      if (!selectedDuration) {
        setErrorMsg("Please select delivery duration");
        return;
      }
    }

    if (selectedSkills.length < 3) {
      setErrorMsg("Please select at least 3 skills");
      return;
    }
    if (selectedTools.length < 3) {
      setErrorMsg("Please select at least 3 tools");
      return;
    }

    if (!sampleUrl.trim().startsWith("https://")) {
      setErrorMsg("Please enter a valid https:// project URL");
      return;
    }

    const user = currentUser || auth.currentUser;
    if (!user) {
      setErrorMsg("User not logged in");
      return;
    }

    setSaving(true);
    try {
      const data = {
        title: title.trim(),
        description: desc.trim(),
        budget_from: Number(budgetFrom.trim()),
        budget_to: Number(budgetTo.trim()),
        category: selectedCategory?.value || null,
        skills: selectedSkills.map(s => s.value),
        tools: selectedTools.map(t => t.value),
        sampleProjectUrl: sampleUrl.trim(),
        clientRequirements: clientReq.trim(),
        updatedAt: serverTimestamp(),
        userId: user.uid,
        faqs: faqs,
      };

      let collectionName = "services";

      if (selectedTab === "24 Hours") {
        data.is24Hour = true;
        data.timeline = "24 Hours";
        collectionName = "service_24h";
      } else {
        data.deliveryDuration = selectedDuration || null;
      }

      if (jobId) {
        const mainRef = doc(collection(db, collectionName), jobId);
        const userRef = doc(
          collection(db, "users", user.uid, collectionName),
          jobId
        );
        await updateDoc(mainRef, data);
        await updateDoc(userRef, data);
        setSuccessMsg("Service updated successfully");
      } else {
        data.createdAt = serverTimestamp();
        const mainRef = doc(collection(db, collectionName));
        await setDoc(mainRef, data);
        const userRef = doc(
          collection(db, "users", user.uid, collectionName),
          mainRef.id
        );
        await setDoc(userRef, data);
        setSuccessMsg("Service added successfully");
      }

      setTimeout(() => navigate("/freelance-dashboard/accountfreelancer"), 800);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to save service: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const isValidHttpsUrl = (url) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "https:";
    } catch {
      return false;
    }
  };

  // -------------------- RENDER -------------------- //
  return (
    <div className="add-service-wrapper">
      <div className="add-service-container">
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
            Create New Service
          </h1>
          <p className="add-service-subtitle">Launch your service and let clients find you.</p>
        </div>

        <div className="add-service-layout">
          <div className="add-service-form">

            {(errorMsg || successMsg) && (
              <div style={{ color: errorMsg ? 'red' : 'green', marginBottom: '10px' }}>
                {errorMsg || successMsg}
              </div>
            )}

            {/* SERVICE TYPE TOGGLE */}
            <div className="add-service-toggle-bg">
              <div
                className={`add-service-toggle-btn ${selectedTab === "Work" ? "active" : "inactive"}`}
                onClick={() => setSelectedTab("Work")}
              >Work</div>
              <div
                className={`add-service-toggle-btn ${selectedTab === "24 Hours" ? "active" : "inactive"}`}
                onClick={() => navigate("/freelance-dashboard/add-service-form-24-hour")}
              >24 hours</div>
            </div>

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
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div className="add-service-grid-2">
                <div>
                  <label className="add-service-label">Category</label>
                  <Select
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    options={expertiseOptions}
                    styles={customSelectStyles}
                  />
                </div>
                <div>
                  <label className="add-service-label">Delivery Days</label>
                  <select
                    className="add-service-select"
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                  >
                    <option value="">In days</option>
                    {deliveryOptions.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
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
                  className="add-service-input"
                  placeholder="Add Deliverables"
                />
              </div>

              <div>
                <label className="add-service-label">Client Requirements <span className="add-service-label-sub">[Optional]</span></label>
                <textarea
                  className="add-service-textarea"
                  placeholder="What do you need from your client to get started"
                  style={{ minHeight: '100px' }}
                  value={clientReq}
                  onChange={(e) => setClientReq(e.target.value)}
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
                    const generated = generateFaqsFromSkills(selectedSkills);
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
                <div style={{ background: "#F9FAFB", padding: "16px", borderRadius: "12px", border: "1px solid #E5E7EB", display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
                  <div>
                    <label className="add-service-label" style={{ marginBottom: "6px" }}>Question</label>
                    <input
                      type="text"
                      className="add-service-input"
                      style={{ height: "45px", background: "#FFFFFF", border: "1px solid #E5E7EB" }}
                      placeholder="e.g. Can you deliver within 2 days?"
                      value={faqQuestion}
                      onChange={(e) => setFaqQuestion(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="add-service-label" style={{ marginBottom: "6px" }}>Answer</label>
                    <textarea
                      className="add-service-textarea"
                      style={{ minHeight: "80px", background: "#FFFFFF", border: "1px solid #E5E7EB", padding: "12px" }}
                      placeholder="e.g. Yes, but it will cost an extra express delivery fee."
                      value={faqAnswer}
                      onChange={(e) => setFaqAnswer(e.target.value)}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                    <button
                      type="button"
                      className="faq-add-btn"
                      style={{ background: "#F3F4F6", border: "none" }}
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
                      className="faq-add-btn"
                      style={{ background: "#6C4DFF", color: "#FFFFFF", border: "none" }}
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
                    <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", background: "#F9FAFB", padding: "12px 16px", borderRadius: "10px", border: "1px solid #E5E7EB" }}>
                      <div style={{ flex: 1, paddingRight: "16px" }}>
                        <div style={{ fontWeight: 600, fontSize: "14px", color: "#1A1730" }}>Q: {faq.question}</div>
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

            {/* ACTIONS */}
            <button type="button" className="add-service-publish-btn" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "✓ Publish Service"}
            </button>

          </div>

          {/* RIGHT SIDEBAR - AI ASSISTANT */}
          <div className="ai-sidebar">
            <div className="ai-card">
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', background: '#E0D4FF', borderRadius: '50%', filter: 'blur(40px)', opacity: 0.6, zIndex: 0 }}></div>

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '15.2px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <h3 className="ai-card-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#6C4DFF" />
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
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFFFFF" />
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

              <div className="ai-price-row">
                <div>
                  <div className="ai-price-name">Starter</div>
                  <div className="ai-price-sub">Basic deliverables</div>
                </div>
                <div className="ai-price-val">₹800–1,200</div>
              </div>

              <div className="ai-price-row highlight">
                <div>
                  <div className="ai-price-name">Standard ✦ Popular</div>
                  <div className="ai-price-sub">Full scope delivery</div>
                </div>
                <div className="ai-price-val">₹1,500–2,500</div>
              </div>

              <div className="ai-price-row" style={{ borderBottom: 'none' }}>
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
    </div>
  );
}

/* -------------------- SMALL UI SUBCOMPONENTS -------------------- */

function SectionLabel({ label, required = false, className = "" }) {
  return (
    <div
      className={`as-section-label ${className}`}
      style={{ marginTop: className?.includes("mt-5") ? 20 : 0 }}
    >
      {label}
      {required && <span className="as-required">*</span>}
    </div>
  );
}

function ChipWrap({ items, onRemove }) {
  if (!items || !items.length) return null;
  return (
    <div className="as-chip-wrap">
      {items.map((item) => (
        <div key={item} className="as-chip">
          <span>{item}</span>
          <button
            type="button"
            className="as-chip-remove"
            onClick={() => onRemove(item)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

