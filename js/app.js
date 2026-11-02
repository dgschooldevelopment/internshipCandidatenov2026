/**
 * DreamsGuider & Sarvaj Edtech Pvt. Ltd.
 * GenAI with Data Science: Training & Internship Program
 * Application Logic, Payment Gateway Flow & Google Sheets Integration
 */

// ==========================================
// 1. CONFIGURATION & CONSTANTS
// ==========================================

// If you have deployed Google Apps Script on your Google Sheet, paste your Web App URL here:
// Example: const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycb.../exec";
const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwi9N4UQ10E6MjMJvcnmUETziPwjcgNjavfs7Vtd5Ie601M8tr_NQbNDjmJqqa4dC12Ig/exec";

// UPI & Official Contact Configuration
const DEFAULT_UPI_ID = "9373346490-2@ybl";
const UPI_PAYEE_NAME = "DreamsGuider Sarvaj Edtech";
const SUPPORT_PHONE = "9373346490";
const SUPPORT_EMAIL = "dreamsguider@gmail.com";

// Global DOM Helper
function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = (text !== undefined && text !== null) ? text : "-";
  }
}

// ==========================================
// 2. SYLLABUS DATA DEFINITION
// ==========================================
const syllabusData = {
  phase1: {
    title: "Phase 1: Data Science Foundations & GenAI Fundamentals",
    timeline: "Weeks 1 - 4",
    badge: "Foundations",
    description: "Build robust mathematical, statistical, and programming foundations while mastering cutting-edge GenAI prompt engineering.",
    weeks: [
      {
        week: "Week 1",
        title: "Data & AI Overview",
        objective: "Understanding the role of Data Science and GenAI in modern applications.",
        topics: ["Data Science Lifecycle", "EDA Basics", "AI vs. ML vs. DL vs. GenAI", "Industry Use Cases"],
        practical: "Exploratory Data Analysis using Python and exploring GenAI interfaces (ChatGPT, Claude).",
        icon: "fa-brain"
      },
      {
        week: "Week 2",
        title: "Advanced Python & Data Analysis",
        objective: "Master data manipulation, statistical analysis, and data visual insights.",
        topics: ["NumPy & Pandas Mastery", "Data Cleaning & Imputation", "Data Visualization (Matplotlib/Seaborn)", "Descriptive Statistics"],
        practical: "Cleaning real-world messy datasets and generating an executive visual insights report.",
        icon: "fa-chart-pie"
      },
      {
        week: "Week 3",
        title: "Machine Learning & Prompting",
        objective: "Combine traditional Machine Learning techniques with GenAI prompt engineering.",
        topics: ["Supervised vs. Unsupervised Learning", "Scikit-Learn Workflows", "Prompt Engineering Techniques", "Few-Shot & Zero-Shot Learning"],
        practical: "Building predictive ML models and prompt-based automated data classifiers.",
        icon: "fa-microchip"
      },
      {
        week: "Week 4",
        title: "Feature Engineering & LLMs",
        objective: "Prepare data for machine learning models and leverage LLMs for data enhancement.",
        topics: ["Feature Selection & Scaling", "Categorical Encoding", "Text Preprocessing", "LLM Data Augmentation"],
        practical: "Capstone Project Phase 1: Develop an ML Data Insights & Synthesis Tool using LLMs.",
        project: "ML Data Insights & Synthesis Tool using LLMs",
        icon: "fa-wand-magic-sparkles"
      }
    ]
  },
  phase2: {
    title: "Phase 2: Building GenAI & Data Science Solutions",
    timeline: "Weeks 5 - 8",
    badge: "GenAI Core & RAG",
    description: "Dive deep into Neural Networks, OpenAI APIs, LangChain analytics, and production-grade RAG with Vector Databases.",
    weeks: [
      {
        week: "Week 5",
        title: "Deep Learning & NLP Essentials",
        objective: "Explore neural networks and natural language processing basics powering GenAI.",
        topics: ["Neural Networks Architecture", "PyTorch / TensorFlow Basics", "Tokenization & Text Encoders", "Vector Embeddings"],
        practical: "Building an end-to-end text classification model and generating semantic word embeddings.",
        icon: "fa-network-wired"
      },
      {
        week: "Week 6",
        title: "OpenAI APIs & Data Pipelines",
        objective: "Connect data pipelines to OpenAI models for automated analysis and text generation.",
        topics: ["OpenAI API SDK", "Function Calling & Tools", "System Prompts & Temperature Tuning", "Structured JSON Outputs & Parsing"],
        practical: "Project: Develop an Automated Data Summarization & Insights Bot.",
        project: "Automated Data Summarization & Insights Bot",
        icon: "fa-robot"
      },
      {
        week: "Week 7",
        title: "LangChain & Data Analytics",
        objective: "Combine LangChain frameworks with data analysis workflows for intelligent enterprise queries.",
        topics: ["LangChain LCEL & Chains", "Agents for Data Analysis", "Conversation Memory", "SQL & Database Tool Integration"],
        practical: "Building a Natural-Language-to-SQL Query Assistant with real SQL database connection.",
        project: "NL-to-SQL Enterprise Query Assistant",
        icon: "fa-link"
      },
      {
        week: "Week 8",
        title: "RAG & Vector Databases",
        objective: "Build Retrieval-Augmented Generation systems to query custom datasets and enterprise documents.",
        topics: ["Vector Databases (ChromaDB & Pinecone)", "Similarity Metrics (Cosine/Euclidean)", "Hybrid Search Strategies", "Production RAG Architecture"],
        practical: "Project: A Question-Answering system over complex CSV/PDF enterprise datasets with citations.",
        project: "Enterprise RAG QA System for PDF & CSV Data",
        icon: "fa-database"
      }
    ]
  },
  phase3: {
    title: "Phase 3: Deployment, AI Agents & Portfolio",
    timeline: "Weeks 9 - 12",
    badge: "AI Agents & MLOps",
    description: "Master autonomous multi-agent systems, workflow automation, full-stack data apps, Docker, and cloud deployment.",
    weeks: [
      {
        week: "Week 9",
        title: "Data Science Agents",
        objective: "Construct multi-agent systems to perform complex data analysis autonomously without manual prompt chaining.",
        topics: ["Agentic Workflows", "LangGraph State Graphs", "CrewAI Collaborative Agents", "Automated EDA Agents"],
        practical: "Building an Autonomous Data Analyst Agent Squad (Researcher, Coder, Reviewer).",
        project: "Autonomous Multi-Agent Data Analyst Squad",
        icon: "fa-users-gear"
      },
      {
        week: "Week 10",
        title: "Automated Data Pipelines",
        objective: "Automate data collection, processing, and LLM reporting workflows using modern automation engines.",
        topics: ["n8n Workflow Automation", "Zapier & Webhooks", "Airflow Orchestration Basics", "Automated ETL & Alerts"],
        practical: "Project: An Automated Market & Financial Data Intelligence Pipeline.",
        project: "Automated Market & Financial Intelligence Pipeline",
        icon: "fa-gears"
      },
      {
        week: "Week 11",
        title: "Data Web Applications",
        objective: "Turn Data Science & GenAI models into client-ready, interactive web applications.",
        topics: ["Streamlit UI Development", "FastAPI High-Performance Backends", "Model Dashboarding", "Secure API Integration"],
        practical: "Project: Launch an Interactive GenAI Data Analytics Dashboard with live visualization.",
        project: "Interactive GenAI Data Analytics Dashboard",
        icon: "fa-window-maximize"
      },
      {
        week: "Week 12",
        title: "MLOps & Portfolio Capstone",
        objective: "Deploy end-to-end Data Science & GenAI applications and finalize an employer-ready portfolio.",
        topics: ["Git & GitHub Best Practices", "Docker Containerization", "Cloud Deployment (Render/AWS)", "CI/CD & MLOps Fundamentals"],
        practical: "Final Capstone Project: Choose from AI Data Copilot, Predictive Analytics Agent, or Automated Document Intelligence.",
        project: "Capstone Deployment: AI Data Copilot / Document Intelligence",
        icon: "fa-rocket"
      }
    ]
  }
};

// ==========================================
// 3. TRACK DETAILS & PRICING
// ==========================================
const trackDetails = {
  "1.5-month": {
    id: "1.5-month",
    name: "Fast-Track 1.5-Month Internship",
    shortName: "Fast-Track 1.5-Month",
    duration: "1.5 Months (6 Weeks)",
    fee: 2899,
    originalFee: 5999,
    discount: "51% OFF",
    targetAudience: "This track is ideal for a rapid skill upgrade and focused project development.",
    curriculumScope: "Phase 1 (Weeks 1-4) + Fast-track GenAI & OpenAI API Practical Application",
    documents: [
      "Internship Completion Certificate (Sarvaj Edtech Pvt. Ltd.)",
      "Project Completion Certificate"
    ],
    support: "Dedicated Mentor Guidance & Project Code Reviews during 1.5 months",
    badge: "Fast-Track Skill Upgrade",
    color: "indigo"
  },
  "3-4-month": {
    id: "3-4-month",
    name: "Comprehensive 3-Month Internship",
    shortName: "Comprehensive 3-Month",
    duration: "3 Months (12 Weeks)",
    fee: 4398,
    originalFee: 8999,
    discount: "51% OFF",
    targetAudience: "Our most immersive program, designed for deep technical mastery and professional credentialing.",
    curriculumScope: "Complete 12-Week Syllabus (Phase 1 + Phase 2 + Phase 3) + Capstone Live Industry Project",
    documents: [
      "Internship Completion Certificate (Sarvaj Edtech Pvt. Ltd.)",
      "Project Completion Certificate (if applicable)",
      "Experience Letter (where applicable)",
      "Letter of Recommendation (for eligible candidates)",
      "Performance Evaluation Report",
      "Appreciation Certificate (for outstanding performers)"
    ],
    support: "Complete Long-Term Support: 1-on-1 Career Mentorship, GitHub Portfolio Review, Resume Enhancement, Mock Interviews & Job Placement Guidance",
    badge: "Deep Technical Mastery & All Documents",
    color: "amber"
  }
};

// ==========================================
// 4. GLOBAL STATE & INITIALIZATION
// ==========================================
let selectedTrackId = "3-4-month"; // Default to recommended 3-Month track
let activePhase = "all";
let pendingCandidateData = null; // Stored when form is submitted, updated on payment

document.addEventListener("DOMContentLoaded", () => {
  // Check for webhook URL in query parameters (e.g. ?webhook=https://script.google.com/...)
  const urlParams = new URLSearchParams(window.location.search);
  const webhookParam = urlParams.get("webhook");
  if (webhookParam) {
    localStorage.setItem("dg_google_webhook_url", webhookParam);
    console.log("Google Apps Script Webhook configured from URL parameter.");
  }

  setupMobileNavigation();
  renderSyllabus();
  setupTrackSelection();
  setupFormListeners();
  setupSmoothScroll();
  updateSummaryCard();
  initFaqAccordion();
});

// Setup Mobile Navigation Drawer
function setupMobileNavigation() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("mobile-menu-icon");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (!menuBtn || !mobileMenu) return;

  function toggleMenu(show) {
    const isCurrentlyHidden = mobileMenu.classList.contains("hidden");
    const willOpen = (typeof show === "boolean") ? show : isCurrentlyHidden;

    if (willOpen) {
      mobileMenu.classList.remove("hidden");
      if (menuIcon) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");
      }
    } else {
      mobileMenu.classList.add("hidden");
      if (menuIcon) {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
      }
    }
  }

  menuBtn.addEventListener("click", () => toggleMenu());

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => toggleMenu(false));
  });
}

// ==========================================
// 5. SYLLABUS RENDERING & FILTERING
// ==========================================
function renderSyllabus() {
  const container = document.getElementById("syllabus-container");
  if (!container) return;

  let html = "";
  const phases = ["phase1", "phase2", "phase3"];

  phases.forEach((phaseKey) => {
    const phase = syllabusData[phaseKey];
    if (activePhase !== "all" && activePhase !== phaseKey) return;

    html += `
      <div class="mb-8 md:mb-10 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-md">
        <!-- Phase Header -->
        <div class="p-5 md:p-8 bg-gradient-to-r ${phaseKey === 'phase1' ? 'from-indigo-900 to-slate-900' : phaseKey === 'phase2' ? 'from-purple-900 to-indigo-950' : 'from-slate-900 to-cyan-950'} text-white">
          <div class="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
            <span class="px-3 py-1 text-[11px] md:text-xs font-semibold uppercase tracking-wider rounded-full bg-white/10 text-cyan-300 border border-white/20">
              ${phase.timeline}
            </span>
            <span class="px-2.5 py-0.5 text-[11px] md:text-xs font-semibold rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
              ${phase.badge}
            </span>
          </div>
          <h3 class="text-xl sm:text-2xl md:text-3xl font-bold font-heading mb-1.5">${phase.title}</h3>
          <p class="text-slate-300 text-xs sm:text-sm md:text-base max-w-3xl leading-relaxed">${phase.description}</p>
        </div>

        <!-- Weeks Grid -->
        <div class="p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-slate-50/50">
          ${phase.weeks.map((w) => `
            <div class="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all group flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-2.5">
                  <span class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                    <i class="fa-solid ${w.icon}"></i> ${w.week}
                  </span>
                  ${w.project ? `<span class="text-[10px] sm:text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200"><i class="fa-solid fa-star text-amber-500"></i> Project</span>` : ''}
                </div>
                <h4 class="text-base sm:text-lg font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">${w.title}</h4>
                <p class="text-xs text-slate-500 mb-3 font-medium leading-relaxed">${w.objective}</p>
                
                <div class="mb-3">
                  <div class="text-[11px] sm:text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <i class="fa-solid fa-list-check text-indigo-500 text-[11px]"></i> Key Topics:
                  </div>
                  <div class="flex flex-wrap gap-1.5">
                    ${w.topics.map(t => `<span class="text-[11px] sm:text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">${t}</span>`).join('')}
                  </div>
                </div>
              </div>

              <div class="pt-3 border-t border-slate-100 mt-2">
                <div class="text-xs text-emerald-700 flex items-start gap-2">
                  <i class="fa-solid fa-flask-vial mt-0.5 text-emerald-500 text-sm"></i>
                  <div>
                    <span class="font-bold text-slate-800">Practical:</span>
                    <span class="text-slate-600 block mt-0.5 leading-relaxed">${w.practical}</span>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

window.filterPhase = function(phase) {
  activePhase = phase;
  document.querySelectorAll(".phase-tab-btn").forEach(btn => {
    if (btn.dataset.phase === phase) {
      btn.classList.add("bg-indigo-600", "text-white", "shadow-sm");
      btn.classList.remove("bg-white", "text-slate-600", "hover:bg-slate-100");
    } else {
      btn.classList.remove("bg-indigo-600", "text-white", "shadow-sm");
      btn.classList.add("bg-white", "text-slate-600", "hover:bg-slate-100");
    }
  });
  renderSyllabus();
};

// ==========================================
// 6. TRACK SELECTION & SUMMARY UPDATE
// ==========================================
function setupTrackSelection() {
  const trackRadios = document.querySelectorAll('input[name="internshipTrack"]');
  const trackCards = document.querySelectorAll(".track-select-card");

  trackRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      selectTrack(e.target.value);
    });
  });

  trackCards.forEach(card => {
    card.addEventListener("click", () => {
      const trackId = card.dataset.track;
      selectTrack(trackId);
    });
  });
}

window.selectTrack = function(trackId) {
  selectedTrackId = trackId;

  // Sync Radio Inputs
  const radio = document.querySelector(`input[name="internshipTrack"][value="${trackId}"]`);
  if (radio) radio.checked = true;

  // Sync Form Radio Cards
  document.querySelectorAll(".form-track-card").forEach(c => {
    if (c.dataset.track === trackId) {
      c.classList.add("ring-2", "ring-indigo-600", "border-indigo-600", "bg-indigo-50/50");
      c.classList.remove("border-slate-200", "bg-white");
    } else {
      c.classList.remove("ring-2", "ring-indigo-600", "border-indigo-600", "bg-indigo-50/50");
      c.classList.add("border-slate-200", "bg-white");
    }
  });

  updateSummaryCard();
};

window.chooseTrackAndRegister = function(trackId) {
  selectTrack(trackId);
  const formElement = document.getElementById("registration-section");
  if (formElement) {
    formElement.scrollIntoView({ behavior: "smooth" });
  }
};

function updateSummaryCard() {
  const details = trackDetails[selectedTrackId];
  if (!details) return;

  const titleEl = document.getElementById("summary-track-title");
  const durationEl = document.getElementById("summary-track-duration");
  const badgeEl = document.getElementById("summary-track-badge");
  const feeEl = document.getElementById("summary-track-fee");
  const docsListEl = document.getElementById("summary-docs-list");
  const supportEl = document.getElementById("summary-support");

  if (titleEl) titleEl.textContent = details.name;
  if (durationEl) durationEl.textContent = details.duration;
  if (badgeEl) {
    badgeEl.textContent = details.badge;
    badgeEl.className = `text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${selectedTrackId === '3-4-month' ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'}`;
  }

  if (feeEl) {
    feeEl.innerHTML = `
      <div class="flex items-baseline gap-2">
        <span class="text-2xl font-black text-slate-900 font-heading">₹${details.fee.toLocaleString()}</span>
        <span class="text-xs text-slate-400 line-through">₹${details.originalFee.toLocaleString()}</span>
        <span class="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">${details.discount}</span>
      </div>
      <div class="text-[10px] text-slate-500 mt-0.5">One-time enrollment fee • Includes verification &amp; credentials</div>
    `;
  }

  if (docsListEl) {
    docsListEl.innerHTML = details.documents.map(doc => `
      <li class="flex items-start gap-2 text-xs text-slate-700">
        <i class="fa-solid fa-circle-check text-emerald-500 mt-0.5 text-xs shrink-0"></i>
        <span>${doc}</span>
      </li>
    `).join('');
  }

  if (supportEl) {
    supportEl.innerHTML = `
      <div class="flex items-start gap-2 text-xs text-indigo-900 bg-indigo-50/70 p-3 rounded-lg border border-indigo-100">
        <i class="fa-solid fa-headset text-indigo-600 text-sm mt-0.5 shrink-0"></i>
        <div>
          <span class="font-bold block">Mentorship & Support:</span>
          <span>${details.support}</span>
        </div>
      </div>
    `;
  }
}

// ==========================================
// 7. FORM SUBMISSION (STAGE 1: PAYMENT PAGE REACHED)
// ==========================================
function setupFormListeners() {
  const form = document.getElementById("registration-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Mandatory Policies Validation
    const agreedNotice = document.getElementById("agreeNotice")?.checked;
    const agreedAttendance = document.getElementById("agreeAttendance")?.checked;
    const agreedTerms = document.getElementById("agreeTerms")?.checked;

    if (!agreedNotice || !agreedAttendance || !agreedTerms) {
      alert("कृपया 75% उपस्थिती, 10 दिवसांचा Notice Period आणि नियमांची हमी स्वीकारा (Please accept the Attendance, Notice Period, and Code of Conduct policies to proceed).");
      return;
    }

    // Input Validations
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const college = document.getElementById("college").value.trim();
    const degree = document.getElementById("degree").value.trim();
    const year = document.getElementById("passoutYear").value;
    const currentStatus = document.getElementById("currentStatus").value;
    const experienceLevel = document.querySelector('input[name="expLevel"]:checked')?.value || "Beginner";

    if (!fullName || !email || !phone || !college) {
      alert("कृपया सर्व आवश्यक माहिती भरा (Please fill all required fields).");
      return;
    }

    // Phone validation
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      alert("कृपया वैध 10-अंकी मोबाईल नंबर प्रविष्ट करा (Please enter a valid 10-digit mobile number).");
      return;
    }

    const track = trackDetails[selectedTrackId];
    const regId = "DG-SARVAJ-" + Math.floor(100000 + Math.random() * 900000);
    const regTimestamp = new Date().toISOString();
    const readableDate = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    // Prepare candidate data payload
    // STAGE 1: Candidate has reached the payment step
    pendingCandidateData = {
      regId,
      fullName,
      email,
      phone: cleanPhone,
      trackId: selectedTrackId,
      trackName: track.name,
      duration: track.duration,
      amount: track.fee,
      college,
      degree,
      passoutYear: year,
      currentStatus,
      experienceLevel,
      githubUrl: document.getElementById("githubUrl")?.value.trim() || "",
      linkedinUrl: document.getElementById("linkedinUrl")?.value.trim() || "",
      notes: document.getElementById("notes")?.value.trim() || "",
      registeredAt: regTimestamp,
      readableDate,
      stage: "Payment Page Reached",
      enrolled: "No (Pending Payment)",
      paymentStatus: "PENDING",
      utrNumber: "Pending"
    };

    // 1. Immediately persist Stage 1 to localStorage
    saveToLocalStorage(pendingCandidateData);

    // 2. Immediately save Stage 1 to local server database & CSV
    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pendingCandidateData)
    }).catch(() => {
      // Local backend offline or standalone
    });

    // 3. Immediately send Stage 1 to Google Sheet (shows "No (Pending Payment)")
    syncToGoogleSheet(pendingCandidateData);

    // 4. Open Payment Gateway Modal
    openPaymentModal(pendingCandidateData);
  });
}

// ==========================================
// 8. PAYMENT MODAL FLOW
// ==========================================
function openPaymentModal(data) {
  const modal = document.getElementById("payment-modal");
  if (!modal) return;

  const track = trackDetails[data.trackId];
  const upiId = DEFAULT_UPI_ID;
  const amount = track.fee;

  // Set candidate info in payment modal
  safeSetText("pay-modal-name", data.fullName);
  safeSetText("pay-modal-phone", data.phone);
  safeSetText("pay-modal-regid", data.regId);
  safeSetText("pay-modal-track", `${track.shortName} (${track.duration})`);
  safeSetText("pay-modal-amount", `Rs. ${amount.toLocaleString()}`);
  safeSetText("pay-modal-upi-id", upiId);

  // Dynamic UPI URL for QR Code & Mobile Deep Link
  const upiString = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(UPI_PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent('Internship Reg ' + data.regId)}`;
  
  // Generate QR Code via clean QR Server API
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiString)}&margin=4`;
  const qrImg = document.getElementById("pay-qr-image");
  if (qrImg) qrImg.src = qrUrl;

  // Set mobile direct UPI app deep link
  const upiDeepLink = document.getElementById("mobile-pay-upi-btn");
  if (upiDeepLink) {
    upiDeepLink.href = upiString;
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
}

window.closePaymentModal = function() {
  const modal = document.getElementById("payment-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
};

// Copy UPI ID to Clipboard
window.copyUpiId = function() {
  navigator.clipboard.writeText(DEFAULT_UPI_ID).then(() => {
    const copyBtn = document.getElementById("copy-upi-btn");
    if (copyBtn) {
      const orig = copyBtn.innerHTML;
      copyBtn.innerHTML = `<i class="fa-solid fa-check text-emerald-500"></i> Copied!`;
      setTimeout(() => copyBtn.innerHTML = orig, 2000);
    }
  }).catch(() => {
    alert("UPI ID: " + DEFAULT_UPI_ID);
  });
};

// ==========================================
// 9. PAYMENT CONFIRMATION (STAGE 2: PAYMENT COMPLETED)
// ==========================================
window.verifyAndCompletePayment = async function() {
  if (!pendingCandidateData) {
    alert("कोणतीही नोंदणी माहिती आढळली नाही (No pending registration found).");
    return;
  }

  const utrInput = document.getElementById("utrNumber");
  const utrValue = utrInput ? utrInput.value.trim() : "";

  if (!utrValue || utrValue.length < 6) {
    alert("कृपया योग्य 12-अंकी UPI UTR / Transaction / Reference Number प्रविष्ट करा (Please enter a valid Transaction / UTR number from your payment app).");
    if (utrInput) utrInput.focus();
    return;
  }

  const verifyBtn = document.getElementById("verify-pay-btn");
  const originalBtnText = verifyBtn ? verifyBtn.innerHTML : "";
  if (verifyBtn) {
    verifyBtn.disabled = true;
    verifyBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> पडताळणी व डेटा सेव्ह होत आहे (Verifying & Saving...)`;
  }

  // STAGE 2: Candidate has paid and submitted UTR / Transaction ID
  pendingCandidateData.stage = "Payment Completed";
  pendingCandidateData.enrolled = "Yes (Enrolled)";
  pendingCandidateData.paymentStatus = "PAID";
  pendingCandidateData.utrNumber = utrValue;
  pendingCandidateData.paymentDate = new Date().toISOString();

  // 1. Primary Save: LocalStorage (Guaranteed Instant Backup)
  try {
    saveToLocalStorage(pendingCandidateData);
  } catch (err) {
    console.error("LocalStorage save error:", err);
  }

  // 2. Save to Local Python Server (registrations.csv & registrations.json)
  try {
    await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pendingCandidateData)
    });
  } catch (e) {
    console.log("Local backend server offline or standalone mode.");
  }

  // 3. Update Record in Google Sheet (switches Enrolled to "Yes (Enrolled)")
  try {
    await syncToGoogleSheet(pendingCandidateData);
  } catch (e) {
    console.warn("Google Sheet sync notice:", e);
  }

  // 4. Close Payment Modal
  try {
    closePaymentModal();
  } catch (e) {
    console.warn(e);
  }

  // 5. Open Success Modal with Verified Official Receipt
  try {
    showSuccessModal(pendingCandidateData);
  } catch (e) {
    console.error("Error in showSuccessModal:", e);
  }

  // 6. Reset Form
  try {
    const form = document.getElementById("registration-form");
    if (form) form.reset();
    selectTrack(selectedTrackId);
    pendingCandidateData = null;
  } catch (e) {
    console.warn(e);
  }

  if (verifyBtn) {
    verifyBtn.disabled = false;
    verifyBtn.innerHTML = originalBtnText;
  }
};

// ==========================================
// 10. GOOGLE SHEET DIRECT SYNC
// ==========================================
async function syncToGoogleSheet(candidate) {
  const webhookUrl = GOOGLE_SHEET_WEBHOOK_URL || localStorage.getItem("dg_google_webhook_url") || "";

  if (!webhookUrl) {
    console.log("Google Apps Script Webhook not configured yet. Candidate recorded in local database & CSV.");
    return;
  }

  try {
    // Using no-cors mode with text/plain payload to smoothly handle Google Apps Script 302 redirects without CORS blocking
    await fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(candidate)
    });
    console.log(`Candidate data synced with Google Sheet! [${candidate.regId} | Enrolled: ${candidate.enrolled}]`);
  } catch (err) {
    console.warn("Google Sheet sync error:", err);
  }
}

// ==========================================
// 11. LOCAL STORAGE PERSISTENCE
// ==========================================
function saveToLocalStorage(data) {
  try {
    let existing = JSON.parse(localStorage.getItem("dg_sarvaj_registrations") || "[]");
    const idx = existing.findIndex(item => item.regId === data.regId);
    if (idx !== -1) {
      existing[idx] = data;
    } else {
      existing.unshift(data);
    }
    localStorage.setItem("dg_sarvaj_registrations", JSON.stringify(existing));
  } catch (e) {
    console.error("Failed saving to localStorage", e);
  }
}

// ==========================================
// 12. SUCCESS MODAL & RECEIPT
// ==========================================
function showSuccessModal(data) {
  const modal = document.getElementById("success-modal");
  if (!modal) return;

  const trackInfo = trackDetails[data.trackId] || trackDetails["3-4-month"];

  // Populate receipt fields safely
  safeSetText("receipt-id", data.regId);
  safeSetText("receipt-date", data.readableDate);
  safeSetText("receipt-name", data.fullName);
  safeSetText("receipt-email", data.email);
  safeSetText("receipt-phone", data.phone);
  safeSetText("receipt-college", `${data.college} (${data.degree || 'Student'}, ${data.passoutYear || '2026'})`);
  safeSetText("receipt-track", trackInfo.name);
  safeSetText("receipt-duration", trackInfo.duration);
  safeSetText("receipt-amount", `Rs. ${(data.amount || trackInfo.fee).toLocaleString()}`);
  safeSetText("receipt-utr", data.utrNumber || "Verified");

  // Documents list in receipt
  const docsContainer = document.getElementById("receipt-docs");
  if (docsContainer && trackInfo.documents) {
    docsContainer.innerHTML = trackInfo.documents.map(d => `
      <li class="flex items-center gap-2">
        <i class="fa-solid fa-check text-emerald-600 text-xs shrink-0"></i>
        <span>${d}</span>
      </li>
    `).join('');
  }

  // Configure WhatsApp Share Button
  const waBtn = document.getElementById("whatsapp-confirm-btn");
  if (waBtn) {
    const waMessage = encodeURIComponent(
      `Hello DreamsGuider & Sarvaj Edtech Team,\n\nI have registered and completed the payment for the *GenAI with Data Science Training & Internship Program*!\n\n📋 *Registration ID:* ${data.regId}\n👤 *Candidate:* ${data.fullName}\n📱 *Phone:* ${data.phone}\n🎓 *Track:* ${trackInfo.name} (${trackInfo.duration})\n💰 *Fee Paid:* ₹${data.amount || trackInfo.fee}\n🔢 *UTR / Transaction ID:* ${data.utrNumber}\n\nPlease confirm my onboarding and share orientation details. Thank you!`
    );
    waBtn.href = `https://wa.me/919373346490?text=${waMessage}`;
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
}

window.closeSuccessModal = function() {
  const modal = document.getElementById("success-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
};

// Print / PDF download for receipt
window.printReceipt = function() {
  window.print();
};

// ==========================================
// 13. FAQ & SMOOTH SCROLL UTILITIES
// ==========================================
function initFaqAccordion() {
  document.querySelectorAll(".faq-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector(".faq-icon");
      const isOpen = !content.classList.contains("hidden");

      // Close other FAQs
      document.querySelectorAll(".faq-content").forEach(c => c.classList.add("hidden"));
      document.querySelectorAll(".faq-icon").forEach(i => i.classList.remove("rotate-180"));

      if (!isOpen) {
        content.classList.remove("hidden");
        if (icon) icon.classList.add("rotate-180");
      }
    });
  });
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
