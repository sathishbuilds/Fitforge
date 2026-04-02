import { useState, useEffect, useCallback, useMemo } from "react";
import { foodDatabase } from "./data/foodDatabase.js";
import { workoutData, muscleGroupOptions } from "./data/workoutData.js";
import { dietPlans } from "./data/dietPlans.js";

// ─── SUPABASE ────────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://epipmfvviuqsrzxskjmu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwaXBtZnZ2aXVxc3J6eHNram11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxOTQ3NTksImV4cCI6MjA4OTc3MDc1OX0.FkQ2ikCzEX76FuciBzqSHAvLAMftFG3f7xEVXObGArI";

const sb = (() => {
  const h = (tok) => ({
    "apikey": SUPABASE_ANON_KEY,
    "Content-Type": "application/json",
    "Authorization": `Bearer ${tok || SUPABASE_ANON_KEY}`,
  });
  const api = async (path, opts = {}) => {
    try {
      const res = await fetch(`${SUPABASE_URL}${path}`, { ...opts, headers: { ...h(opts.token), ...opts.extraHeaders } });
      const data = await res.json().catch(() => ({}));
      return res.ok ? { data, error: null } : { data: null, error: data };
    } catch (e) { return { data: null, error: { message: e.message } }; }
  };
  return {
    auth: {
      signUp: (e, p) => api("/auth/v1/signup", { method: "POST", body: JSON.stringify({ email: e, password: p }) }),
      signIn: (e, p) => api("/auth/v1/token?grant_type=password", { method: "POST", body: JSON.stringify({ email: e, password: p }) }),
      signOut: (tok) => api("/auth/v1/logout", { method: "POST", token: tok }),
    },
    from: (table) => ({
      select: (tok, filter = "") => api(`/rest/v1/${table}?select=*${filter}`, { token: tok }),
      insert: (data, tok) => api(`/rest/v1/${table}`, { method: "POST", body: JSON.stringify(data), token: tok, extraHeaders: { "Prefer": "return=representation" } }),
      upsert: (data, tok) => api(`/rest/v1/${table}`, { method: "POST", body: JSON.stringify(data), token: tok, extraHeaders: { "Prefer": "resolution=merge-duplicates,return=representation" } }),
      delete: (tok, filter = "") => api(`/rest/v1/${table}?${filter}`, { method: "DELETE", token: tok }),
    }),
  };
})();

// ─── THEME ───────────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: "#0A0A0F", surface: "#111118", card: "#16161E", border: "#1E1E2A",
    accent: "#C8F04C", accentDim: "#C8F04C1A", accentHover: "#D9FF5A",
    text: "#F0F0F5", muted: "#6B6B80", danger: "#FF5A5A",
    blue: "#5A8FFF", purple: "#A05AFF", orange: "#FF9A3C",
    inputBg: "#0F0F16",
  },
  light: {
    bg: "#F4F5F0", surface: "#FFFFFF", card: "#FFFFFF", border: "#E5E5EC",
    accent: "#5A8A00", accentDim: "#5A8A001A", accentHover: "#4A7800",
    text: "#1A1A24", muted: "#6B6B80", danger: "#D04040",
    blue: "#2B5FCC", purple: "#7030CC", orange: "#CC6A10",
    inputBg: "#F8F9F4",
  }
};

// ─── GLOBAL CSS (injected) ────────────────────────────────────────────────────
function buildCSS(t) {
  return `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:${t.bg};color:${t.text};font-family:'DM Sans',sans-serif;min-height:100vh;transition:background 0.3s,color 0.3s;}
::-webkit-scrollbar{width:4px;height:4px;}
::-webkit-scrollbar-track{background:${t.bg};}
::-webkit-scrollbar-thumb{background:${t.border};border-radius:2px;}

.app{display:flex;min-height:100vh;}

/* SIDEBAR */
.sidebar{width:228px;background:${t.surface};border-right:1px solid ${t.border};display:flex;flex-direction:column;padding:24px 14px;position:fixed;top:0;left:0;height:100vh;z-index:100;gap:4px;transition:background 0.3s,border-color 0.3s;}
.logo{font-family:'Syne',sans-serif;font-size:21px;font-weight:800;color:${t.accent};letter-spacing:-0.5px;padding:0 8px 20px;border-bottom:1px solid ${t.border};margin-bottom:8px;}
.logo span{color:${t.text};}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;cursor:pointer;transition:all 0.15s;color:${t.muted};font-size:13.5px;font-weight:500;border:none;background:none;width:100%;text-align:left;}
.nav-item:hover{background:${t.border};color:${t.text};}
.nav-item.active{background:${t.accentDim};color:${t.accent};font-weight:600;}
.nav-icon{font-size:15px;width:18px;text-align:center;}
.sidebar-footer{margin-top:auto;padding-top:14px;border-top:1px solid ${t.border};display:flex;flex-direction:column;gap:6px;}

/* MAIN */
.main{margin-left:228px;flex:1;min-height:100vh;background:${t.bg};padding:28px 32px;transition:background 0.3s;}

/* PAGE HEADER */
.page-header{margin-bottom:24px;}
.page-title{font-family:'Syne',sans-serif;font-size:26px;font-weight:800;color:${t.text};margin-bottom:3px;letter-spacing:-0.3px;}
.page-subtitle{font-size:13px;color:${t.muted};}

/* CARDS */
.card{background:${t.card};border:1px solid ${t.border};border-radius:16px;padding:20px;transition:border-color 0.2s,background 0.3s;}
.card:hover{border-color:${t.border === "#1E1E2A" ? "#2A2A38" : "#D0D0DC"};}
.card-sm{padding:14px 18px;border-radius:12px;}

/* METRIC CARDS */
.metric-card{background:${t.card};border:1px solid ${t.border};border-radius:14px;padding:18px 20px;transition:background 0.3s,border-color 0.3s;}
.metric-label{font-size:11px;color:${t.muted};text-transform:uppercase;letter-spacing:0.8px;margin-bottom:6px;font-weight:600;}
.metric-value{font-family:'Syne',sans-serif;font-size:26px;font-weight:700;color:${t.text};}
.metric-unit{font-size:12px;color:${t.muted};margin-left:3px;font-family:'DM Sans';}

/* GRID */
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
.g2{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}
.gauto{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;}

/* INPUTS */
.ig{display:flex;flex-direction:column;gap:5px;}
.label{font-size:11px;color:${t.muted};text-transform:uppercase;letter-spacing:0.8px;font-weight:600;}
input,select,textarea{background:${t.inputBg};border:1px solid ${t.border};border-radius:9px;color:${t.text};padding:9px 13px;font-size:13.5px;font-family:'DM Sans',sans-serif;outline:none;transition:border-color 0.2s,background 0.3s;width:100%;}
input:focus,select:focus{border-color:${t.accent};}
select option{background:${t.surface};color:${t.text};}

/* BUTTONS */
.btn{padding:9px 18px;border-radius:9px;font-size:13.5px;font-weight:600;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all 0.15s;display:inline-flex;align-items:center;gap:6px;justify-content:center;}
.btn-primary{background:${t.accent};color:${t.bg};}
.btn-primary:hover{background:${t.accentHover};transform:translateY(-1px);}
.btn-primary:disabled{opacity:0.5;cursor:not-allowed;transform:none;}
.btn-ghost{background:transparent;color:${t.text};border:1px solid ${t.border};}
.btn-ghost:hover{background:${t.border};}
.btn-danger{background:transparent;color:${t.danger};border:1px solid ${t.danger}44;}
.btn-danger:hover{background:${t.danger}15;}
.btn-sm{padding:6px 13px;font-size:12.5px;}
.btn-full{width:100%;}
.btn-icon{padding:8px;border-radius:8px;font-size:16px;background:transparent;border:1px solid ${t.border};cursor:pointer;color:${t.muted};transition:all 0.15s;}
.btn-icon:hover{background:${t.border};color:${t.text};}

/* CHIPS */
.chips{display:flex;gap:7px;flex-wrap:wrap;}
.chip{padding:7px 14px;border-radius:20px;font-size:12.5px;font-weight:500;cursor:pointer;border:1px solid ${t.border};background:none;color:${t.muted};transition:all 0.15s;}
.chip.selected{background:${t.accentDim};border-color:${t.accent};color:${t.accent};}
.chip:hover:not(.selected){border-color:${t.text}33;color:${t.text};}

/* TABS */
.tabs{display:flex;gap:3px;background:${t.surface};border-radius:11px;padding:3px;margin-bottom:20px;border:1px solid ${t.border};}
.tab{flex:1;padding:7px 10px;border-radius:8px;cursor:pointer;font-size:12.5px;font-weight:500;text-align:center;border:none;background:none;color:${t.muted};transition:all 0.15s;white-space:nowrap;}
.tab.active{background:${t.accent};color:${t.bg};font-weight:700;}
.tab:not(.active):hover{color:${t.text};background:${t.border};}

/* BADGE */
.badge{display:inline-block;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.4px;}
.ba{background:${t.accentDim};color:${t.accent};}
.bb{background:${t.blue}22;color:${t.blue};}
.bo{background:${t.orange}22;color:${t.orange};}
.bp{background:${t.purple}22;color:${t.purple};}
.br{background:${t.danger}22;color:${t.danger};}

/* PROGRESS BAR */
.pb-wrap{background:${t.border};border-radius:99px;height:5px;overflow:hidden;}
.pb-fill{height:100%;border-radius:99px;transition:width 0.5s ease;}
.pb-green{background:${t.accent};}
.pb-blue{background:${t.blue};}
.pb-orange{background:${t.orange};}

/* DIVIDER */
.divider{height:1px;background:${t.border};margin:14px 0;}

/* SECTION HEADER */
.sh{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
.st{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:${t.text};}

/* STAT ROW */
.sr{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid ${t.border}22;}
.sr:last-child{border-bottom:none;}
.sk{font-size:13px;color:${t.muted};}
.sv{font-size:13px;font-weight:600;color:${t.text};}

/* EXERCISE CARD */
.exc{background:${t.surface};border:1px solid ${t.border};border-radius:12px;overflow:hidden;transition:transform 0.2s,border-color 0.2s;}
.exc:hover{transform:translateY(-2px);border-color:${t.accent}44;}
.exc-icon{width:100%;height:110px;display:flex;align-items:center;justify-content:center;font-size:40px;background:${t.border}55;}
.exc-body{padding:12px;}
.exc-name{font-weight:700;font-size:13.5px;margin-bottom:3px;color:${t.text};}
.exc-sets{font-size:12px;color:${t.accent};font-weight:600;margin-bottom:3px;}
.exc-target{font-size:11px;color:${t.muted};text-transform:uppercase;letter-spacing:0.5px;}
.exc-desc{font-size:12px;color:${t.muted};margin-top:4px;line-height:1.4;}

/* FOOD TABLE */
.ftable{width:100%;border-collapse:collapse;font-size:13px;}
.ftable th{text-align:left;padding:10px 12px;color:${t.muted};font-size:11px;text-transform:uppercase;letter-spacing:0.8px;border-bottom:1px solid ${t.border};font-weight:600;}
.ftable td{padding:9px 12px;border-bottom:1px solid ${t.border}22;}
.ftable tr:hover td{background:${t.surface};}

/* MEAL CARD */
.mc{background:${t.surface};border:1px solid ${t.border};border-radius:12px;padding:16px;transition:background 0.3s;}
.mc-time{font-size:11px;color:${t.accent};text-transform:uppercase;letter-spacing:0.8px;font-weight:600;margin-bottom:5px;}
.mc-name{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;margin-bottom:6px;color:${t.text};}
.mc-items{list-style:none;}
.mc-items li{font-size:12.5px;color:${t.muted};padding:2px 0;}
.mc-items li::before{content:'·';margin-right:6px;color:${t.accent};}
.mc-macros{display:flex;gap:10px;margin-top:10px;padding-top:10px;border-top:1px solid ${t.border};}
.mc-macro{font-size:12px;color:${t.muted};}

/* CHART BARS */
.cbwrap{display:flex;align-items:flex-end;gap:6px;height:70px;}
.cbar{flex:1;border-radius:4px 4px 0 0;transition:height 0.5s ease;cursor:pointer;min-width:14px;}
.cbar:hover{opacity:0.8;}
.clabel{font-size:10px;color:${t.muted};text-align:center;margin-top:4px;}

/* AUTH */
.auth-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:${t.bg};}
.auth-card{background:${t.card};border:1px solid ${t.border};border-radius:22px;padding:36px;width:400px;max-width:90vw;}
.auth-logo{font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:${t.accent};text-align:center;margin-bottom:6px;}
.auth-sub{text-align:center;color:${t.muted};font-size:13px;margin-bottom:28px;}
.err-box{background:${t.danger}18;border:1px solid ${t.danger}44;border-radius:8px;padding:10px 13px;font-size:12.5px;color:${t.danger};margin-bottom:14px;}
.ok-box{background:${t.accentDim};border:1px solid ${t.accent}44;border-radius:8px;padding:10px 13px;font-size:12.5px;color:${t.accent};margin-bottom:14px;}
.form-row{display:flex;flex-direction:column;gap:14px;}

/* ONBOARD */
.ob-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:${t.bg};}
.ob-card{background:${t.card};border:1px solid ${t.border};border-radius:22px;padding:36px;width:500px;max-width:90vw;}

/* TOAST */
.toast{position:fixed;bottom:22px;right:22px;background:${t.card};border:1px solid ${t.accent}55;border-radius:12px;padding:11px 18px;font-size:13px;color:${t.text};z-index:9999;animation:tIn 0.25s ease;box-shadow:0 8px 28px #00000033;}
.toast.err{border-color:${t.danger}55;color:${t.danger};}
@keyframes tIn{from{transform:translateY(10px);opacity:0;}to{transform:translateY(0);opacity:1;}}

/* MODAL */
.modal-bg{position:fixed;inset:0;background:#00000088;z-index:999;display:flex;align-items:center;justify-content:center;padding:16px;}
.modal{background:${t.card};border:1px solid ${t.border};border-radius:18px;padding:28px;width:100%;max-width:560px;max-height:85vh;overflow-y:auto;}

/* MOBILE NAV */
.mob-nav{display:none;}

/* THEME TOGGLE */
.theme-btn{background:${t.surface};border:1px solid ${t.border};border-radius:8px;padding:6px 10px;cursor:pointer;font-size:15px;color:${t.muted};transition:all 0.15s;}
.theme-btn:hover{background:${t.border};color:${t.text};}

/* QUANTITY SLIDER */
.qty-input{display:flex;align-items:center;gap:10px;}
.qty-input input[type="range"]{-webkit-appearance:none;height:5px;border-radius:99px;background:${t.border};outline:none;cursor:pointer;}
.qty-input input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:${t.accent};cursor:pointer;}

/* PRIVACY / DELETE */
.prose{font-size:13.5px;color:${t.muted};line-height:1.7;}
.prose h3{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:${t.text};margin:16px 0 6px;}
.prose p{margin-bottom:10px;}

/* SCROLLABLE TABLE WRAPPER */
.tscroll{overflow-x:auto;border-radius:12px;}

@media(max-width:768px){
  .sidebar{display:none;}
  .main{margin-left:0;padding:14px 14px 80px;}
  .g4,.g3,.g2{grid-template-columns:1fr 1fr;gap:10px;}
  .mob-nav{display:flex;position:fixed;bottom:0;left:0;right:0;background:${t.surface};border-top:1px solid ${t.border};z-index:100;padding:6px 0 10px;}
  .mni{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;font-size:9.5px;color:${t.muted};cursor:pointer;border:none;background:none;}
  .mni.active{color:${t.accent};}
  .mni .icon{font-size:19px;}
}
`;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const today = () => new Date().toISOString().split("T")[0];
const fmt = (n) => Number(n).toLocaleString();
const exerciseIcon = (target = "") => {
  const t = target.toLowerCase();
  if (t.includes("chest")) return "🫁";
  if (t.includes("back")) return "🔙";
  if (t.includes("shoulder") || t.includes("delt")) return "🎯";
  if (t.includes("tricep")) return "💪";
  if (t.includes("bicep")) return "🦾";
  if (t.includes("quad") || t.includes("leg") || t.includes("calf")) return "🦵";
  if (t.includes("glute") || t.includes("hamstring")) return "🍑";
  if (t.includes("core") || t.includes("abs")) return "🔥";
  if (t.includes("cardio")) return "❤️";
  return "💪";
};

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, []);
  return <div className={`toast${type === "err" ? " err" : ""}`}>{type === "err" ? "✗" : "✓"} {msg}</div>;
}

// ─── STYLE INJECTOR ───────────────────────────────────────────────────────────
function StyleSheet({ darkMode }) {
  const t = darkMode ? themes.dark : themes.light;
  return <style>{buildCSS(t)}</style>;
}

// ─── AUTH PAGE ────────────────────────────────────────────────────────────────
function AuthPage({ onAuth, darkMode, toggleDark }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async () => {
    if (!email || !password) { setError("Please fill all fields"); return; }
    setLoading(true); setError(""); setSuccess("");
    const { data, error: err } = mode === "login"
      ? await sb.auth.signIn(email, password)
      : await sb.auth.signUp(email, password);
    setLoading(false);
    if (err) { setError(err.error_description || err.msg || "Auth failed. Check credentials."); return; }
    if (mode === "signup") { setSuccess("Account created! Check your email, then login."); return; }
    onAuth({ ...data, email });
  };

  return (
    <div className="auth-wrap">
      <div style={{ position: "fixed", top: 16, right: 16 }}>
        <button className="theme-btn" onClick={toggleDark}>{darkMode ? "☀️" : "🌙"}</button>
      </div>
      <div className="auth-card">
        <div className="auth-logo">FitForge⚡</div>
        <div className="auth-sub">Your intelligent fitness companion</div>
        {error && <div className="err-box">{error}</div>}
        {success && <div className="ok-box">{success}</div>}
        <div className="tabs">
          <button className={`tab${mode === "login" ? " active" : ""}`} onClick={() => setMode("login")}>Login</button>
          <button className={`tab${mode === "signup" ? " active" : ""}`} onClick={() => setMode("signup")}>Sign Up</button>
        </div>
        <div className="form-row">
          <div className="ig"><label className="label">Email</label>
            <input type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="ig"><label className="label">Password</label>
            <input type="password" placeholder="Min 6 characters" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} />
          </div>
          <button className="btn btn-primary btn-full" onClick={submit} disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Login →" : "Create Account →"}
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: "var(--muted)" }}>
          By signing up you agree to our <span style={{ cursor: "pointer", textDecoration: "underline" }}>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
}

// ─── ONBOARDING ───────────────────────────────────────────────────────────────
function Onboarding({ user, onDone }) {
  const [gender, setGender] = useState("Male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("Maintenance");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const wt = parseFloat(weight) || 0;
  const maint = wt ? Math.round(wt * 30) : 0;
  const calT = goal === "Lean Bulk" ? maint + 300 : goal === "Weight Loss" ? maint - 300 : maint;
  const protT = goal === "Lean Bulk" ? Math.round(wt * 1.8) : goal === "Weight Loss" ? Math.round(wt * 2) : Math.round(wt * 1.5);

  const save = async () => {
    if (!weight || !height) return;
    setLoading(true);
    await sb.from("profiles").upsert({
      id: user.id, email: user.email, gender, weight: parseFloat(weight),
      height: parseFloat(height), goal, updated_at: new Date().toISOString()
    }, user.access_token);
    setLoading(false);
    onDone({ gender, weight: parseFloat(weight), height: parseFloat(height), goal });
  };

  return (
    <div className="ob-wrap">
      <div className="ob-card">
        <div style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>
          {step === 1 ? "Welcome! Let's set up your profile 👋" : "Your targets are ready 🎯"}
        </div>
        <div style={{ fontSize: 13, marginBottom: 24, color: "var(--muted)" }}>
          {step === 1 ? "This helps us calculate your personal targets" : "Review your goals before we start"}
        </div>

        {step === 1 ? (
          <div className="form-row">
            <div className="ig"><label className="label">Gender</label>
              <div className="chips">{["Male", "Female"].map(g => (
                <button key={g} className={`chip${gender === g ? " selected" : ""}`} onClick={() => setGender(g)}>{g === "Male" ? "♂ Male" : "♀ Female"}</button>
              ))}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="ig"><label className="label">Weight (kg)</label>
                <input type="number" placeholder="e.g. 70" value={weight} onChange={e => setWeight(e.target.value)} />
              </div>
              <div className="ig"><label className="label">Height (cm)</label>
                <input type="number" placeholder="e.g. 175" value={height} onChange={e => setHeight(e.target.value)} />
              </div>
            </div>
            <div className="ig"><label className="label">Your Goal</label>
              <div className="chips">{["Weight Loss", "Lean Bulk", "Maintenance"].map(g => (
                <button key={g} className={`chip${goal === g ? " selected" : ""}`} onClick={() => setGoal(g)}>{g}</button>
              ))}</div>
            </div>
            <button className="btn btn-primary btn-full" disabled={!weight || !height} onClick={() => setStep(2)}>Calculate Targets →</button>
          </div>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Daily Calories", val: `${calT}`, unit: "kcal" },
                { label: "Daily Protein", val: `${protT}`, unit: "g" },
                { label: "Maintenance", val: `${maint}`, unit: "kcal" },
              ].map(t => (
                <div key={t.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 16, textAlign: "center" }}>
                  <div style={{ fontFamily: "Syne", fontSize: 24, fontWeight: 800, color: "var(--accent)" }}>{t.val}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{t.unit}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>{t.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "var(--surface)", borderRadius: 10, padding: 12, fontSize: 12.5, color: "var(--muted)", marginBottom: 18, lineHeight: 1.6, border: "1px solid var(--border)" }}>
              <strong style={{ color: "var(--text)" }}>Formula used:</strong> Maintenance = Weight × 30 · 
              {goal === "Lean Bulk" ? " Bulk = +300 kcal · Protein = 1.8g/kg" :
               goal === "Weight Loss" ? " Cut = −300 kcal · Protein = 2.0g/kg" :
               " Maintenance calories · Protein = 1.5g/kg"}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-ghost" onClick={() => setStep(1)}>← Edit</button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={save} disabled={loading}>
                {loading ? "Saving..." : "Start Training 💪"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── EXERCISE CARD ────────────────────────────────────────────────────────────
function ExCard({ ex }) {
  const icon = exerciseIcon(ex.target || ex.name);
  return (
    <div className="exc">
      <div className="exc-icon">{icon}</div>
      <div className="exc-body">
        <div className="exc-name">{ex.name}</div>
        <div className="exc-sets">{ex.sets}</div>
        {ex.target && <div className="exc-target">{ex.target}</div>}
        {ex.desc && <div className="exc-desc">{ex.desc}</div>}
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ profile, calLogs, workoutLogs, weightLogs, onNav, t }) {
  const { goal, weight, gender } = profile;
  const maint = Math.round(weight * 30);
  const calTarget = goal === "Lean Bulk" ? maint + 300 : goal === "Weight Loss" ? maint - 300 : maint;
  const protTarget = goal === "Lean Bulk" ? Math.round(weight * 1.8) : goal === "Weight Loss" ? Math.round(weight * 2) : Math.round(weight * 1.5);

  const tod = today();
  const todLogs = calLogs.filter(l => l.date === tod);
  const todCal = todLogs.reduce((s, l) => s + (l.calories || 0), 0);
  const todProt = todLogs.reduce((s, l) => s + (l.protein || 0), 0);
  const latestWt = weightLogs.length ? weightLogs[weightLogs.length - 1].weight : weight;

  const calPct = Math.min(100, Math.round((todCal / calTarget) * 100));
  const protPct = Math.min(100, Math.round((todProt / protTarget) * 100));

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const k = d.toISOString().split("T")[0];
    return { k, total: calLogs.filter(l => l.date === k).reduce((s, l) => s + (l.calories || 0), 0), label: d.toLocaleDateString("en", { weekday: "short" }).charAt(0) };
  });
  const maxCal = Math.max(...last7.map(d => d.total), 1);

  const thisWeek = workoutLogs.filter(w => {
    const d = new Date(w.date), now = new Date(), wa = new Date(); wa.setDate(now.getDate() - 7);
    return d >= wa;
  });

  const goalColor = goal === "Weight Loss" ? t.orange : goal === "Lean Bulk" ? t.purple : t.accent;
  const goalBadge = goal === "Weight Loss" ? "bo" : goal === "Lean Bulk" ? "bp" : "ba";

  return (
    <div>
      <div className="page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="page-title">Dashboard</div>
            <div className="page-subtitle">{new Date().toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</div>
          </div>
          <span className={`badge ${goalBadge}`} style={{ fontSize: 12, padding: "6px 14px" }}>{gender === "Female" ? "♀ " : "♂ "}{goal}</span>
        </div>
      </div>

      <div className="g4" style={{ marginBottom: 16 }}>
        {[
          { label: "Today's Calories", val: todCal, unit: `/ ${calTarget} kcal`, pct: calPct, cls: "pb-green", color: t.accent },
          { label: "Protein", val: `${todProt}g`, unit: `/ ${protTarget}g`, pct: protPct, cls: "pb-blue", color: t.blue },
          { label: "Current Weight", val: latestWt, unit: "kg", pct: null, color: t.text },
          { label: "Calorie Target", val: calTarget, unit: "kcal/day", pct: null, color: t.orange, sub: `Protein: ${protTarget}g/day` },
        ].map(m => (
          <div key={m.label} className="metric-card">
            <div className="metric-label">{m.label}</div>
            <div className="metric-value" style={{ color: m.color }}>{m.val}<span className="metric-unit">{m.unit}</span></div>
            {m.pct !== null && (
              <div style={{ marginTop: 8 }}>
                <div className="pb-wrap"><div className={`pb-fill ${m.cls}`} style={{ width: `${m.pct}%` }} /></div>
                <div style={{ fontSize: 11, color: t.muted, marginTop: 3 }}>{m.pct}% of target</div>
              </div>
            )}
            {m.sub && <div style={{ fontSize: 11, color: t.muted, marginTop: 5 }}>{m.sub}</div>}
          </div>
        ))}
      </div>

      <div className="g2" style={{ marginBottom: 16 }}>
        <div className="card">
          <div className="sh"><div className="st">Weekly Calories</div><span className="badge ba">7 Days</span></div>
          <div className="cbwrap">
            {last7.map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="cbar" style={{ height: `${Math.max(4, (d.total / maxCal) * 60)}px`, background: d.k === tod ? t.accent : `${t.accent}44` }} title={`${d.total} kcal`} />
                <div className="clabel">{d.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 12, color: t.muted }}>
            <span>Week total: <strong style={{ color: t.accent }}>{fmt(last7.reduce((s, d) => s + d.total, 0))} kcal</strong></span>
            <span>Avg: <strong style={{ color: t.text }}>{fmt(Math.round(last7.reduce((s, d) => s + d.total, 0) / 7))} kcal</strong></span>
          </div>
        </div>

        <div className="card">
          <div className="sh"><div className="st">Quick Actions</div></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {[
              { icon: "🍽️", label: "Log a Meal", page: "tracker" },
              { icon: "💪", label: "Log Workout", page: "tracker" },
              { icon: "⚖️", label: "Log Weight", page: "tracker" },
              { icon: "🏋️", label: "View Workouts", page: "workouts" },
              { icon: "🥗", label: "Diet Plan", page: "diet" },
              { icon: "🔢", label: "Calorie Calculator", page: "calculator" },
            ].map(a => (
              <button key={a.label} className="btn btn-ghost btn-sm" style={{ justifyContent: "flex-start" }} onClick={() => onNav(a.page)}>
                {a.icon} {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="g2">
        <div className="card">
          <div className="sh"><div className="st">This Week's Workouts</div><span className="badge ba">{thisWeek.length}</span></div>
          {thisWeek.length === 0 ? (
            <div style={{ fontSize: 13, color: t.muted, padding: "16px 0" }}>No workouts logged this week yet. Let's go! 💪</div>
          ) : (
            thisWeek.slice(-5).map((w, i) => (
              <div key={i} className="sr">
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{w.workout_type}</div>
                  <div style={{ fontSize: 11, color: t.muted }}>{new Date(w.date).toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })}</div>
                </div>
                <span className="badge ba">{w.duration} min</span>
              </div>
            ))
          )}
        </div>

        <div className="card">
          <div className="sh"><div className="st">Macro Targets</div></div>
          {[
            { label: "Maintenance TDEE", val: `${maint} kcal`, color: t.muted },
            { label: `${goal} Calories`, val: `${calTarget} kcal`, color: t.accent },
            { label: "Protein / day", val: `${protTarget}g`, color: t.blue },
            { label: "Cal Adjustment", val: goal === "Lean Bulk" ? "+300 kcal" : goal === "Weight Loss" ? "−300 kcal" : "0 kcal", color: t.orange },
          ].map(row => (
            <div key={row.label} className="sr">
              <div className="sk">{row.label}</div>
              <div className="sv" style={{ color: row.color }}>{row.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CALCULATOR PAGE ──────────────────────────────────────────────────────────
function Calculator({ profile, onUpdate, user, t }) {
  const [lp, setLp] = useState({ ...profile });
  const [saved, setSaved] = useState(false);

  const wt = lp.weight || 0;
  const ht = lp.height || 0;
  const bmi = wt && ht ? (wt / ((ht / 100) ** 2)).toFixed(1) : "—";
  const bmiCat = bmi === "—" ? "" : bmi < 18.5 ? "Underweight" : bmi < 25 ? "Healthy Weight" : bmi < 30 ? "Overweight" : "Obese";
  const bmiColor = bmi === "—" ? t.muted : bmi < 18.5 ? t.blue : bmi < 25 ? t.accent : bmi < 30 ? t.orange : t.danger;

  const maint = Math.round(wt * 30);
  const targets = {
    "Weight Loss": { cal: maint - 300, prot: Math.round(wt * 2), adj: "−300 kcal" },
    "Lean Bulk": { cal: maint + 300, prot: Math.round(wt * 1.8), adj: "+300 kcal" },
    "Maintenance": { cal: maint, prot: Math.round(wt * 1.5), adj: "0 kcal" },
  };

  const save = async () => {
    await sb.from("profiles").upsert({ id: user.id, ...lp, updated_at: new Date().toISOString() }, user.access_token);
    onUpdate(lp); setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="page-header"><div className="page-title">Smart Calculator</div>
        <div className="page-subtitle">Update your stats and see real-time personalised targets</div></div>

      <div className="g2" style={{ marginBottom: 16 }}>
        <div className="card">
          <div className="sh"><div className="st">Your Profile</div></div>
          <div className="form-row">
            <div className="ig"><label className="label">Gender</label>
              <div className="chips">{["Male", "Female"].map(g => (
                <button key={g} className={`chip${lp.gender === g ? " selected" : ""}`} onClick={() => setLp(p => ({ ...p, gender: g }))}>{g}</button>
              ))}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div className="ig"><label className="label">Weight (kg)</label>
                <input type="number" value={lp.weight || ""} onChange={e => setLp(p => ({ ...p, weight: parseFloat(e.target.value) || 0 }))} />
              </div>
              <div className="ig"><label className="label">Height (cm)</label>
                <input type="number" value={lp.height || ""} onChange={e => setLp(p => ({ ...p, height: parseFloat(e.target.value) || 0 }))} />
              </div>
            </div>
            <div className="ig"><label className="label">Goal</label>
              <div className="chips">{["Weight Loss", "Lean Bulk", "Maintenance"].map(g => (
                <button key={g} className={`chip${lp.goal === g ? " selected" : ""}`} onClick={() => setLp(p => ({ ...p, goal: g }))}>{g}</button>
              ))}</div>
            </div>
            <button className="btn btn-primary" onClick={save}>{saved ? "✓ Saved!" : "Save Profile"}</button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card card-sm">
            <div className="st" style={{ marginBottom: 10 }}>BMI Index</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontFamily: "Syne", fontSize: 38, fontWeight: 800, color: bmiColor }}>{bmi}</span>
              <span style={{ fontSize: 13, color: t.muted }}>kg/m²</span>
            </div>
            <div style={{ fontSize: 13, color: bmiColor, fontWeight: 600, marginTop: 4 }}>{bmiCat}</div>
            <div style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>Healthy range: 18.5 – 24.9</div>
          </div>
          <div className="card card-sm">
            <div className="st" style={{ marginBottom: 8 }}>Maintenance TDEE</div>
            <div style={{ fontFamily: "Syne", fontSize: 30, fontWeight: 800 }}>{maint || "—"} <span style={{ fontSize: 13, color: t.muted, fontFamily: "DM Sans" }}>kcal/day</span></div>
            <div style={{ fontSize: 12, color: t.muted, marginTop: 4 }}>Formula: Body Weight × 30</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="sh"><div className="st">All Goal Breakdowns</div></div>
        <div className="g3">
          {Object.entries(targets).map(([g, tgt]) => (
            <div key={g} style={{ padding: 18, borderRadius: 12, border: `1px solid ${lp.goal === g ? t.accent + "55" : t.border}`, background: lp.goal === g ? t.accentDim : t.surface }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div className="st" style={{ fontSize: 14 }}>{g}</div>
                {lp.goal === g && <span className="badge ba">Active</span>}
              </div>
              {[["Daily Calories", `${tgt.cal} kcal`, t.accent], ["Protein", `${tgt.prot}g/day`, t.blue], ["Adjustment", tgt.adj, t.orange]].map(([k, v, c]) => (
                <div key={k} className="sr"><div className="sk">{k}</div><div className="sv" style={{ color: c }}>{v}</div></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── WORKOUTS PAGE ────────────────────────────────────────────────────────────
function Workouts({ profile, t }) {
  const { goal, gender } = profile;
  const [selGoal, setSelGoal] = useState(goal);
  const [mode, setMode] = useState("ppl");
  const [dayIdx, setDayIdx] = useState(0);
  const [selMuscle, setSelMuscle] = useState("Chest");

  const genderKey = gender === "Female" ? "Female" : "Male";
  const plan = workoutData[selGoal]?.[genderKey];

  const muscles = gender === "Female"
    ? (muscleGroupOptions.Female[selGoal] || muscleGroupOptions.Female["Maintenance"])
    : muscleGroupOptions.Male;

  const pplDays = plan?.ppl || [];
  const singleExs = plan?.single?.[selMuscle] || [];

  return (
    <div>
      <div className="page-header"><div className="page-title">Workout Plans</div>
        <div className="page-subtitle">Personalised programs · {gender} · {gender === "Female" ? "Tone & Strength" : "Progressive Overload"}</div></div>

      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["Weight Loss", "Lean Bulk", "Maintenance"].map(g => (
            <button key={g} className={`btn btn-sm${selGoal === g ? " btn-primary" : " btn-ghost"}`} onClick={() => { setSelGoal(g); setDayIdx(0); }}>
              {goal === g ? "★ " : ""}{g}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <button className={`btn btn-sm${mode === "ppl" ? " btn-primary" : " btn-ghost"}`} onClick={() => setMode("ppl")}>Push/Pull/Legs</button>
          <button className={`btn btn-sm${mode === "single" ? " btn-primary" : " btn-ghost"}`} onClick={() => setMode("single")}>Single Muscle</button>
        </div>
      </div>

      {mode === "ppl" ? (
        <>
          <div className="tabs">
            {pplDays.map((d, i) => (
              <button key={i} className={`tab${dayIdx === i ? " active" : ""}`} onClick={() => setDayIdx(i)}>
                {d.day.split(" – ")[0]}
              </button>
            ))}
          </div>
          {pplDays[dayIdx] && (
            <>
              <div style={{ marginBottom: 14 }}>
                <div className="st">{pplDays[dayIdx].day}</div>
                <div style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>
                  {pplDays[dayIdx].exercises.length} exercises · {gender === "Female" ? "Toning & Functional" : "Progressive Overload"}
                </div>
              </div>
              <div className="gauto">
                {pplDays[dayIdx].exercises.map((ex, i) => <ExCard key={i} ex={ex} />)}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="tabs">
            {muscles.map(m => (
              <button key={m} className={`tab${selMuscle === m ? " active" : ""}`} onClick={() => setSelMuscle(m)}>{m}</button>
            ))}
          </div>
          <div style={{ marginBottom: 14 }}>
            <div className="st">{selMuscle} — {singleExs.length} Variations</div>
            <div style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>
              {gender === "Female" ? "Functional, safe, effective movements" : "Complete isolation & compound movements"}
            </div>
          </div>
          <div className="gauto">
            {singleExs.map((ex, i) => <ExCard key={i} ex={ex} />)}
          </div>
        </>
      )}

      <div className="card" style={{ marginTop: 20 }}>
        <div className="sh"><div className="st">💡 Personalised Suggestion</div><span className="badge ba">{gender}</span></div>
        <div style={{ fontSize: 13, color: t.muted, lineHeight: 1.7 }}>
          {goal === "Weight Loss" && gender === "Male" && "Recommended: PPL 3×/week + 2 cardio sessions. Higher reps (12–15), shorter rest (45s) to maximise calorie burn. Focus on form first."}
          {goal === "Weight Loss" && gender === "Female" && "Recommended: 3 full-body toning sessions/week + 2 low-impact cardio (walking, cycling). Focus on compound glute/leg work. Rest 60s between sets."}
          {goal === "Lean Bulk" && gender === "Male" && "Recommended: PPL 6×/week (run the split twice). Heavy compounds first (4×6–8). Progressive overload every week. Rest 2–3 min between working sets."}
          {goal === "Lean Bulk" && gender === "Female" && "Recommended: 3–4 sessions/week with focus on glutes, legs, and upper body toning. Moderate load, 3×10–12 reps. Add weight gradually every 2 weeks."}
          {goal === "Maintenance" && gender === "Male" && "Recommended: Full body or PPL 3×/week. Moderate weight (10–12 reps). Mix compound + isolation. Great for long-term health and muscle retention."}
          {goal === "Maintenance" && gender === "Female" && "Recommended: 3 sessions/week mixing lower body and upper body. Moderate intensity, enjoy your sessions. Focus on consistency over intensity."}
        </div>
      </div>
    </div>
  );
}

// ─── DIET PAGE ────────────────────────────────────────────────────────────────
function Diet({ profile, t }) {
  const { goal, gender } = profile;
  const [view, setView] = useState("plan");
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [qty, setQty] = useState(100);
  const [selFood, setSelFood] = useState(null);

  const plan = dietPlans[goal]?.[gender] || dietPlans["Maintenance"]["Male"];
  const cats = ["All", ...new Set(foodDatabase.map(f => f.category))];

  const filtered = useMemo(() => foodDatabase.filter(f =>
    (cat === "All" || f.category === cat) &&
    f.name.toLowerCase().includes(search.toLowerCase())
  ), [cat, search]);

  const meals = [
    { time: "Breakfast", meal: plan.breakfast },
    { time: "Lunch", meal: plan.lunch },
    { time: "Dinner", meal: plan.dinner },
  ];
  const totalCal = meals.reduce((s, m) => s + m.meal.cal, 0) + plan.snacks.reduce((s, sn) => s + sn.cal, 0);
  const totalProt = meals.reduce((s, m) => s + m.meal.protein, 0) + plan.snacks.reduce((s, sn) => s + sn.protein, 0);

  const calc = (val) => ((val * qty) / 100).toFixed(1);

  return (
    <div>
      <div className="page-header"><div className="page-title">Diet Plans</div>
        <div className="page-subtitle">Personalised meals & 400+ item food database</div></div>

      <div className="tabs">
        <button className={`tab${view === "plan" ? " active" : ""}`} onClick={() => setView("plan")}>My Diet Plan</button>
        <button className={`tab${view === "food" ? " active" : ""}`} onClick={() => setView("food")}>Food Database</button>
        <button className={`tab${view === "calc" ? " active" : ""}`} onClick={() => setView("calc")}>Calorie Calculator</button>
      </div>

      {view === "plan" && (
        <>
          <div style={{ display: "flex", gap: 8, marginBottom: 18, alignItems: "center", flexWrap: "wrap" }}>
            <span className="badge ba">{goal}</span>
            <span className="badge bb">{gender}</span>
            <span style={{ marginLeft: "auto", fontSize: 13, color: t.muted }}>
              Total: <strong style={{ color: t.accent }}>{totalCal} kcal</strong> · <strong style={{ color: t.blue }}>{totalProt}g protein</strong>
            </span>
          </div>
          <div className="g2" style={{ marginBottom: 14 }}>
            {meals.map(({ time, meal }) => (
              <div key={time} className="mc">
                <div className="mc-time">{time}</div>
                <div className="mc-name">{meal.name}</div>
                <div style={{ fontSize: 12, color: t.muted, marginBottom: 8 }}>{meal.desc}</div>
                <ul className="mc-items">{meal.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
                <div className="mc-macros">
                  <div className="mc-macro"><strong style={{ color: t.accent }}>{meal.cal}</strong> kcal</div>
                  <div className="mc-macro"><strong style={{ color: t.blue }}>{meal.protein}g</strong> protein</div>
                  <div className="mc-macro"><strong style={{ color: t.orange }}>{meal.carbs}g</strong> carbs</div>
                  <div className="mc-macro"><strong style={{ color: t.muted }}>{meal.fat}g</strong> fat</div>
                </div>
              </div>
            ))}
            <div className="mc">
              <div className="mc-time">Snacks</div>
              {plan.snacks.map((sn, i) => (
                <div key={i} style={{ marginBottom: i < plan.snacks.length - 1 ? 12 : 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{sn.name}</div>
                  <ul className="mc-items">{sn.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
                  <div className="mc-macros">
                    <div className="mc-macro"><strong style={{ color: t.accent }}>{sn.cal}</strong> kcal</div>
                    <div className="mc-macro"><strong style={{ color: t.blue }}>{sn.protein}g</strong> protein</div>
                  </div>
                  {i < plan.snacks.length - 1 && <div className="divider" />}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {view === "food" && (
        <>
          <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
            <input placeholder="Search food items..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, minWidth: 200 }} />
            <select value={cat} onChange={e => setCat(e.target.value)} style={{ width: "auto", minWidth: 160 }}>
              {cats.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ fontSize: 12, color: t.muted, marginBottom: 12 }}>Showing {filtered.length} items · All values per 100g</div>
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="tscroll">
              <table className="ftable">
                <thead><tr>
                  <th>Food Item</th><th>Cal</th><th>Protein</th><th>Carbs</th><th>Fat</th><th>Fiber</th><th>Sugar</th><th></th>
                </tr></thead>
                <tbody>
                  {filtered.map((f, i) => (
                    <tr key={i} style={{ cursor: "pointer" }} onClick={() => { setSelFood(f); setQty(100); setView("calc"); }}>
                      <td>
                        <div style={{ fontWeight: 500 }}>{f.name}</div>
                        <div style={{ fontSize: 11, color: t.muted }}>{f.category}</div>
                      </td>
                      <td style={{ color: t.accent, fontWeight: 600 }}>{f.calories}</td>
                      <td style={{ color: t.blue, fontWeight: 600 }}>{f.protein}g</td>
                      <td>{f.carbs}g</td>
                      <td style={{ color: t.orange }}>{f.fat}g</td>
                      <td style={{ color: t.muted }}>{f.fiber}g</td>
                      <td style={{ color: t.muted }}>{f.sugar}g</td>
                      <td><span style={{ fontSize: 11, color: t.accent }}>Calc →</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && <div style={{ padding: 32, textAlign: "center", color: t.muted }}>No foods found</div>}
            </div>
          </div>
        </>
      )}

      {view === "calc" && (
        <>
          <div style={{ marginBottom: 16 }}>
            {selFood ? (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div>
                  <div style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 800 }}>{selFood.name}</div>
                  <div style={{ fontSize: 12, color: t.muted }}>{selFood.category}</div>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => setSelFood(null)}>Change Food</button>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 13, color: t.muted, marginBottom: 10 }}>Select a food from the database or search below:</div>
                <input placeholder="Search food..." value={search} onChange={e => setSearch(e.target.value)} style={{ marginBottom: 10 }} />
                {search && (
                  <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, maxHeight: 200, overflowY: "auto" }}>
                    {foodDatabase.filter(f => f.name.toLowerCase().includes(search.toLowerCase())).slice(0, 15).map((f, i) => (
                      <div key={i} style={{ padding: "9px 12px", cursor: "pointer", borderBottom: `1px solid ${t.border}22`, fontSize: 13 }}
                        onClick={() => { setSelFood(f); setQty(100); setSearch(""); }}>
                        <strong>{f.name}</strong> <span style={{ color: t.muted }}>· {f.category} · {f.calories} kcal/100g</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {selFood && (
            <div className="card">
              <div className="ig" style={{ marginBottom: 20 }}>
                <label className="label">Quantity (grams)</label>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <input type="range" min="10" max="1000" step="10" value={qty} onChange={e => setQty(parseInt(e.target.value))} style={{ flex: 1, padding: 0 }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <input type="number" value={qty} onChange={e => setQty(parseInt(e.target.value) || 100)} style={{ width: 80 }} />
                    <span style={{ fontSize: 13, color: t.muted }}>g</span>
                  </div>
                </div>
              </div>

              <div className="g3" style={{ marginBottom: 16 }}>
                {[
                  { label: "Calories", val: calc(selFood.calories), unit: "kcal", color: t.accent },
                  { label: "Protein", val: calc(selFood.protein), unit: "g", color: t.blue },
                  { label: "Carbs", val: calc(selFood.carbs), unit: "g", color: t.orange },
                  { label: "Fat", val: calc(selFood.fat), unit: "g", color: t.purple },
                  { label: "Fiber", val: calc(selFood.fiber), unit: "g", color: t.muted },
                  { label: "Sugar", val: calc(selFood.sugar), unit: "g", color: t.danger },
                ].map(item => (
                  <div key={item.label} style={{ background: t.surface, borderRadius: 10, padding: "14px", border: `1px solid ${t.border}`, textAlign: "center" }}>
                    <div style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 800, color: item.color }}>{item.val}</div>
                    <div style={{ fontSize: 12, color: t.muted }}>{item.unit}</div>
                    <div style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{item.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: t.muted, textAlign: "center" }}>
                Showing values for <strong style={{ color: t.text }}>{qty}g</strong> of {selFood.name} (base per 100g)
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── TRACKER PAGE ─────────────────────────────────────────────────────────────
function Tracker({ user, profile, calLogs, workoutLogs, weightLogs, onRefresh, onToast, t }) {
  const [tab, setTab] = useState("calories");
  const [calForm, setCalForm] = useState({ food: "", calories: "", protein: "" });
  const [wkForm, setWkForm] = useState({ type: "Push", duration: "" });
  const [wtForm, setWtForm] = useState({ weight: "" });
  const [loading, setLoading] = useState(false);

  const tod = today();
  const todLogs = calLogs.filter(l => l.date === tod);
  const todCal = todLogs.reduce((s, l) => s + (l.calories || 0), 0);
  const todProt = todLogs.reduce((s, l) => s + (l.protein || 0), 0);

  const wt = profile.weight;
  const calT = profile.goal === "Lean Bulk" ? Math.round(wt * 30) + 300 : profile.goal === "Weight Loss" ? Math.round(wt * 30) - 300 : Math.round(wt * 30);
  const protT = profile.goal === "Lean Bulk" ? Math.round(wt * 1.8) : profile.goal === "Weight Loss" ? Math.round(wt * 2) : Math.round(wt * 1.5);

  const calRemain = calT - todCal;
  const recent7Wt = weightLogs.slice(-7);
  const wkInWeek = workoutLogs.filter(w => { const d = new Date(w.date), wa = new Date(); wa.setDate(wa.getDate() - 7); return d >= wa; });

  const addCal = async () => {
    if (!calForm.calories) return;
    setLoading(true);
    const entry = { user_id: user.id, date: tod, food: calForm.food || "Meal", calories: parseInt(calForm.calories), protein: parseInt(calForm.protein) || 0 };
    await sb.from("calories_log").insert(entry, user.access_token);
    onRefresh("calories", entry); setCalForm({ food: "", calories: "", protein: "" });
    onToast("Meal logged!"); setLoading(false);
  };

  const addWk = async () => {
    if (!wkForm.duration) return;
    setLoading(true);
    const entry = { user_id: user.id, date: tod, workout_type: wkForm.type, duration: parseInt(wkForm.duration) };
    await sb.from("workouts_log").insert(entry, user.access_token);
    onRefresh("workouts", entry); setWkForm({ type: "Push", duration: "" });
    onToast("Workout logged!"); setLoading(false);
  };

  const addWt = async () => {
    if (!wtForm.weight) return;
    setLoading(true);
    const entry = { user_id: user.id, date: tod, weight: parseFloat(wtForm.weight) };
    await sb.from("weight_log").insert(entry, user.access_token);
    onRefresh("weight", entry); setWtForm({ weight: "" });
    onToast("Weight logged!"); setLoading(false);
  };

  const wtypes = ["Push", "Pull", "Legs", "Full Body", "Chest", "Back", "Shoulders", "Arms", "Abs", "Cardio", "HIIT", "Glutes"];

  return (
    <div>
      <div className="page-header"><div className="page-title">Tracker</div>
        <div className="page-subtitle">Log meals, workouts & weight</div></div>

      <div className="tabs">
        <button className={`tab${tab === "calories" ? " active" : ""}`} onClick={() => setTab("calories")}>🍽 Calories</button>
        <button className={`tab${tab === "workout" ? " active" : ""}`} onClick={() => setTab("workout")}>💪 Workout</button>
        <button className={`tab${tab === "weight" ? " active" : ""}`} onClick={() => setTab("weight")}>⚖️ Weight</button>
      </div>

      {tab === "calories" && (
        <div className="g2">
          <div className="card">
            <div className="sh"><div className="st">Log a Meal</div></div>
            <div className="form-row">
              <div className="ig"><label className="label">Food / Meal Name</label>
                <input placeholder="e.g. Chicken Rice Bowl" value={calForm.food} onChange={e => setCalForm(p => ({ ...p, food: e.target.value }))} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div className="ig"><label className="label">Calories</label>
                  <input type="number" placeholder="500" value={calForm.calories} onChange={e => setCalForm(p => ({ ...p, calories: e.target.value }))} />
                </div>
                <div className="ig"><label className="label">Protein (g)</label>
                  <input type="number" placeholder="40" value={calForm.protein} onChange={e => setCalForm(p => ({ ...p, protein: e.target.value }))} />
                </div>
              </div>
              <button className="btn btn-primary" onClick={addCal} disabled={loading || !calForm.calories}>+ Log Meal</button>
            </div>

            <div className="divider" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[
                { label: "Consumed", val: todCal, color: t.accent, unit: "kcal" },
                { label: "Target", val: calT, color: t.text, unit: "kcal" },
                { label: calRemain >= 0 ? "Remaining" : "Over by", val: Math.abs(calRemain), color: calRemain >= 0 ? t.blue : t.danger, unit: "kcal" },
              ].map(item => (
                <div key={item.label} style={{ textAlign: "center", background: t.surface, borderRadius: 10, padding: "12px 8px", border: `1px solid ${t.border}` }}>
                  <div style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 800, color: item.color }}>{item.val}</div>
                  <div style={{ fontSize: 10, color: t.muted, textTransform: "uppercase", letterSpacing: "0.5px" }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="card" style={{ marginBottom: 14 }}>
              <div className="sh"><div className="st">Protein Today</div></div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontFamily: "Syne", fontSize: 32, fontWeight: 800, color: t.blue }}>{todProt}g</span>
                <span style={{ fontSize: 13, color: t.muted }}>/ {protT}g target</span>
              </div>
              <div style={{ marginTop: 8 }}>
                <div className="pb-wrap"><div className="pb-fill pb-blue" style={{ width: `${Math.min(100, (todProt / protT) * 100)}%` }} /></div>
              </div>
            </div>

            <div className="card" style={{ padding: 0, maxHeight: 320, overflowY: "auto" }}>
              <div style={{ padding: "12px 16px", borderBottom: `1px solid ${t.border}` }}><div className="st">Today's Log ({todLogs.length})</div></div>
              {todLogs.length === 0 ? (
                <div style={{ padding: 24, textAlign: "center", color: t.muted, fontSize: 13 }}>No meals logged today</div>
              ) : todLogs.map((l, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 16px", borderBottom: `1px solid ${t.border}22` }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{l.food}</div>
                    <div style={{ fontSize: 11, color: t.muted }}>Protein: {l.protein}g</div>
                  </div>
                  <div style={{ fontSize: 14, color: t.accent, fontWeight: 700 }}>{l.calories} kcal</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "workout" && (
        <div className="g2">
          <div className="card">
            <div className="sh"><div className="st">Log a Workout</div></div>
            <div className="form-row">
              <div className="ig"><label className="label">Workout Type</label>
                <div className="chips" style={{ flexWrap: "wrap" }}>
                  {wtypes.map(tp => (
                    <button key={tp} className={`chip${wkForm.type === tp ? " selected" : ""}`} onClick={() => setWkForm(p => ({ ...p, type: tp }))}>{tp}</button>
                  ))}
                </div>
              </div>
              <div className="ig"><label className="label">Duration (minutes)</label>
                <input type="number" placeholder="45" value={wkForm.duration} onChange={e => setWkForm(p => ({ ...p, duration: e.target.value }))} />
              </div>
              <button className="btn btn-primary" onClick={addWk} disabled={loading || !wkForm.duration}>+ Log Workout</button>
            </div>
          </div>

          <div className="card">
            <div className="sh"><div className="st">This Week</div><span className="badge ba">{wkInWeek.length} sessions</span></div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: "Syne", fontSize: 28, fontWeight: 800 }}>{wkInWeek.reduce((s, w) => s + w.duration, 0)}<span style={{ fontSize: 13, color: t.muted, fontFamily: "DM Sans" }}> min total</span></div>
            </div>
            {wkInWeek.length === 0 ? (
              <div style={{ fontSize: 13, color: t.muted }}>No workouts this week yet</div>
            ) : wkInWeek.map((w, i) => (
              <div key={i} className="sr">
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{w.workout_type}</div>
                  <div style={{ fontSize: 11, color: t.muted }}>{new Date(w.date).toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })}</div>
                </div>
                <span className="badge ba">{w.duration} min</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "weight" && (
        <div className="g2">
          <div className="card">
            <div className="sh"><div className="st">Log Weight</div></div>
            <div className="form-row">
              <div className="ig"><label className="label">Today's Weight (kg)</label>
                <input type="number" step="0.1" placeholder={profile.weight} value={wtForm.weight} onChange={e => setWtForm({ weight: e.target.value })} />
              </div>
              <button className="btn btn-primary" onClick={addWt} disabled={loading || !wtForm.weight}>+ Log Weight</button>
            </div>
          </div>

          <div className="card">
            <div className="sh"><div className="st">Weight Progress</div><span className="badge bb">Last {recent7Wt.length} entries</span></div>
            {recent7Wt.length < 2 ? (
              <div style={{ fontSize: 13, color: t.muted, padding: "12px 0" }}>Log at least 2 days to see a chart</div>
            ) : (
              <>
                <div className="cbwrap" style={{ height: 80, marginBottom: 8 }}>
                  {recent7Wt.map((w, i) => {
                    const min = Math.min(...recent7Wt.map(x => x.weight));
                    const max = Math.max(...recent7Wt.map(x => x.weight));
                    const range = max - min || 1;
                    const h = 20 + ((w.weight - min) / range) * 55;
                    return (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ fontSize: 9, color: t.accent, marginBottom: 2 }}>{w.weight}</div>
                        <div className="cbar" style={{ height: `${h}px`, width: "100%", background: `${t.blue}66` }} />
                        <div className="clabel">{new Date(w.date + "T00:00:00").toLocaleDateString("en", { day: "numeric", month: "short" })}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="divider" />
                {[
                  ["Start", `${recent7Wt[0].weight} kg`],
                  ["Latest", `${recent7Wt[recent7Wt.length - 1].weight} kg`],
                  ["Change", `${(recent7Wt[recent7Wt.length - 1].weight - recent7Wt[0].weight).toFixed(1)} kg`],
                ].map(([k, v]) => (
                  <div key={k} className="sr"><div className="sk">{k}</div><div className="sv">{v}</div></div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SETTINGS PAGE ────────────────────────────────────────────────────────────
function Settings({ user, profile, onLogout, onDeleteData, darkMode, toggleDark, page, setPage, t }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [delLoading, setDelLoading] = useState(false);

  const deleteAll = async () => {
    setDelLoading(true);
    await Promise.all([
      sb.from("calories_log").delete(user.access_token, `user_id=eq.${user.id}`),
      sb.from("workouts_log").delete(user.access_token, `user_id=eq.${user.id}`),
      sb.from("weight_log").delete(user.access_token, `user_id=eq.${user.id}`),
      sb.from("profiles").delete(user.access_token, `id=eq.${user.id}`),
    ]);
    setDelLoading(false);
    onDeleteData();
  };

  return (
    <div>
      <div className="page-header"><div className="page-title">Settings</div>
        <div className="page-subtitle">Account, privacy & preferences</div></div>

      <div className="g2">
        <div className="card">
          <div className="sh"><div className="st">Account</div></div>
          <div className="sr"><div className="sk">Email</div><div className="sv">{user.email}</div></div>
          <div className="sr"><div className="sk">Goal</div><div className="sv">{profile.goal}</div></div>
          <div className="sr"><div className="sk">Weight</div><div className="sv">{profile.weight} kg</div></div>
          <div className="sr"><div className="sk">Height</div><div className="sv">{profile.height} cm</div></div>
          <div className="sr"><div className="sk">Gender</div><div className="sv">{profile.gender}</div></div>
          <div style={{ marginTop: 14 }}>
            <button className="btn btn-danger btn-full" onClick={onLogout}>🚪 Logout</button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card">
            <div className="sh"><div className="st">Appearance</div></div>
            <div className="sr">
              <div className="sk">{darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}</div>
              <button className="btn btn-ghost btn-sm" onClick={toggleDark}>{darkMode ? "Switch to Light" : "Switch to Dark"}</button>
            </div>
          </div>

          <div className="card">
            <div className="sh"><div className="st">Data & Privacy</div></div>
            <div className="sr">
              <div className="sk">Privacy Policy</div>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowPrivacy(true)}>Read →</button>
            </div>
            <div className="sr">
              <div className="sk">Export Data</div>
              <span className="badge bb">Coming Soon</span>
            </div>
            <div style={{ marginTop: 14 }}>
              <button className="btn btn-danger btn-full" onClick={() => setShowDeleteConfirm(true)}>🗑️ Delete All My Data</button>
            </div>
          </div>

          <div className="card card-sm">
            <div className="sh"><div className="st">App Version</div></div>
            <div style={{ fontSize: 13, color: t.muted }}>FitForge v1.0 · Built with React + Supabase</div>
          </div>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="modal-bg" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 800, marginBottom: 8, color: t.danger }}>⚠️ Delete All Data</div>
            <div style={{ fontSize: 13, color: t.muted, marginBottom: 20, lineHeight: 1.6 }}>
              This will permanently delete your <strong style={{ color: t.text }}>profile, calorie logs, workout logs, and weight logs</strong>. This action cannot be undone.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button className="btn btn-danger" style={{ flex: 1 }} onClick={deleteAll} disabled={delLoading}>
                {delLoading ? "Deleting..." : "Yes, Delete Everything"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className="modal-bg" onClick={() => setShowPrivacy(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 800 }}>Privacy Policy</div>
              <button className="btn-icon" onClick={() => setShowPrivacy(false)}>✕</button>
            </div>
            <div className="prose">
              <p><em>Last updated: 2025. FitForge is a personal fitness tracking application.</em></p>
              <h3>1. Data We Collect</h3>
              <p>We collect your email address for authentication, and fitness data you voluntarily enter: body metrics (weight, height), daily calorie and protein logs, workout sessions, and weight tracking history.</p>
              <h3>2. How We Use Your Data</h3>
              <p>Your data is used solely to provide personalised fitness recommendations, calculate your nutritional targets, and display your progress. We do not sell or share your data with third parties.</p>
              <h3>3. Data Storage</h3>
              <p>All data is stored securely in Supabase (a PostgreSQL-based platform with row-level security). Your data is tied to your authenticated account and inaccessible to other users.</p>
              <h3>4. Data Deletion</h3>
              <p>You have the right to delete all your data at any time from Settings → Delete All My Data. This will permanently remove all records associated with your account. You can also close your account by contacting us.</p>
              <h3>5. Cookies & Tracking</h3>
              <p>FitForge does not use advertising cookies or third-party tracking. Authentication sessions are managed via Supabase's secure token system.</p>
              <h3>6. Children's Privacy</h3>
              <p>FitForge is intended for users 16 and older. We do not knowingly collect data from children.</p>
              <h3>7. Changes</h3>
              <p>We may update this policy. Continued use of the app constitutes acceptance of any updated policy.</p>
              <h3>8. Contact</h3>
              <p>For privacy concerns, contact us via the app's GitHub repository. We take all privacy requests seriously.</p>
            </div>
            <button className="btn btn-ghost btn-full" style={{ marginTop: 16 }} onClick={() => setShowPrivacy(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", icon: "⚡", label: "Dashboard" },
  { id: "calculator", icon: "🎯", label: "Calculator" },
  { id: "workouts", icon: "🏋️", label: "Workouts" },
  { id: "diet", icon: "🥗", label: "Diet Plans" },
  { id: "tracker", icon: "📊", label: "Tracker" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [calLogs, setCalLogs] = useState([]);
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [weightLogs, setWeightLogs] = useState([]);
  const [toast, setToast] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const t = darkMode ? themes.dark : themes.light;

  const loadData = useCallback(async (u, tok) => {
    const [c, w, wt, p] = await Promise.all([
      sb.from("calories_log").select(tok, `&user_id=eq.${u}&order=date.asc`),
      sb.from("workouts_log").select(tok, `&user_id=eq.${u}&order=date.asc`),
      sb.from("weight_log").select(tok, `&user_id=eq.${u}&order=date.asc`),
      sb.from("profiles").select(tok, `&id=eq.${u}`),
    ]);
    if (c.data) setCalLogs(Array.isArray(c.data) ? c.data : []);
    if (w.data) setWorkoutLogs(Array.isArray(w.data) ? w.data : []);
    if (wt.data) setWeightLogs(Array.isArray(wt.data) ? wt.data : []);
    if (p.data && Array.isArray(p.data) && p.data.length > 0) setProfile(p.data[0]);
  }, []);

  const handleAuth = async (userData) => {
    setUser(userData);
    await loadData(userData.id, userData.access_token);
  };

  const refresh = (type, entry) => {
    if (type === "calories") setCalLogs(p => [...p, entry]);
    else if (type === "workouts") setWorkoutLogs(p => [...p, entry]);
    else if (type === "weight") setWeightLogs(p => [...p, entry]);
  };

  const showToast = (msg, type = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const logout = async () => {
    await sb.auth.signOut(user.access_token);
    setUser(null); setProfile(null); setCalLogs([]); setWorkoutLogs([]); setWeightLogs([]);
  };

  const handleDeleteData = () => {
    setProfile(null); setCalLogs([]); setWorkoutLogs([]); setWeightLogs([]);
    showToast("All data deleted");
  };

  const props = { user, profile, calLogs, workoutLogs, weightLogs, t };

  return (
    <>
      <StyleSheet darkMode={darkMode} />
      {!user && <AuthPage onAuth={handleAuth} darkMode={darkMode} toggleDark={() => setDarkMode(d => !d)} />}
      {user && !profile && <Onboarding user={user} onDone={p => setProfile(p)} />}
      {user && profile && (
        <div className="app">
          {/* SIDEBAR */}
          <nav className="sidebar">
            <div className="logo">FitForge<span>⚡</span></div>
            {NAV.map(item => (
              <button key={item.id} className={`nav-item${page === item.id ? " active" : ""}`} onClick={() => setPage(item.id)}>
                <span className="nav-icon">{item.icon}</span>{item.label}
              </button>
            ))}
            <div className="sidebar-footer">
              <div style={{ padding: "0 8px 6px", fontSize: 12, color: t.muted }}>
                <div style={{ fontWeight: 600, color: t.text, fontSize: 13 }}>{profile.goal}</div>
                <div>{profile.weight}kg · {profile.height}cm · {profile.gender}</div>
              </div>
              <button className="btn-icon" onClick={() => setDarkMode(d => !d)} style={{ alignSelf: "flex-start" }}>
                {darkMode ? "☀️" : "🌙"}
              </button>
            </div>
          </nav>

          {/* MAIN */}
          <main className="main">
            {page === "dashboard" && <Dashboard {...props} onNav={setPage} />}
            {page === "calculator" && <Calculator {...props} onUpdate={setProfile} />}
            {page === "workouts" && <Workouts {...props} />}
            {page === "diet" && <Diet {...props} />}
            {page === "tracker" && <Tracker {...props} onRefresh={refresh} onToast={showToast} />}
            {page === "settings" && <Settings {...props} onLogout={logout} onDeleteData={handleDeleteData} darkMode={darkMode} toggleDark={() => setDarkMode(d => !d)} page={page} setPage={setPage} />}
          </main>

          {/* MOBILE NAV */}
          <nav className="mob-nav">
            {NAV.map(item => (
              <button key={item.id} className={`mni${page === item.id ? " active" : ""}`} onClick={() => setPage(item.id)}>
                <span className="icon">{item.icon}</span>
                <span>{item.label.split(" ")[0]}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
    </>
  );
}
