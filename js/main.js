/* ============ TOKENS ============ */
:root{
  --bg:#0A0E1A;
  --bg-card:#0F1729;
  --bg-card-raised:#131D35;
  --gold:#C9A227;
  --gold-bright:#E0BD4F;
  --parchment:#E8E3D5;
  --slate:#7C8AA8;
  --slate-dim:#4D5876;
  --emerald:#3E6B57;
  --emerald-bright:#5C9A7E;
  --rule:rgba(201,162,39,0.22);
  --rule-bright:rgba(201,162,39,0.5);
  --max-w:1180px;
  --radius:2px;
}

*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{
  background:var(--bg);
  color:var(--parchment);
  font-family:'Inter',sans-serif;
  font-size:16px;
  line-height:1.6;
  -webkit-font-smoothing:antialiased;
  overflow-x:hidden;
}
.serif{font-family:'Fraunces',serif;}
.mono{font-family:'JetBrains Mono',monospace;}

a{color:inherit;text-decoration:none;}
img{max-width:100%;height:auto;display:block;}

.wrap{max-width:var(--max-w);margin:0 auto;padding:0 28px;}

/* subtle paper-grain + vignette texture on bg */
body::before{
  content:"";
  position:fixed; inset:0;
  background:
    radial-gradient(ellipse 900px 500px at 18% -8%, rgba(201,162,39,0.07), transparent 60%),
    radial-gradient(ellipse 700px 500px at 100% 10%, rgba(62,107,87,0.08), transparent 55%);
  pointer-events:none;
  z-index:0;
}

/* ============ LEDGER LINE (signature motif) ============ */
.ledger-rule{
  position:relative;
  height:1px;
  background:var(--rule);
  width:100%;
}
.ledger-rule.bright{background:var(--rule-bright);}
.ledger-ticked{
  position:relative;
  display:flex;
  align-items:center;
  gap:0;
}
.ledger-ticked::before, .ledger-ticked::after{
  content:"";
  height:7px;
  width:1px;
  background:var(--rule-bright);
}
.ledger-ticked .line{flex:1;height:1px;background:var(--rule);}

.eyebrow{
  font-family:'JetBrains Mono',monospace;
  font-size:11px;
  letter-spacing:0.18em;
  text-transform:uppercase;
  color:var(--gold);
  display:flex;
  align-items:center;
  gap:10px;
}
.eyebrow .tick{width:14px;height:1px;background:var(--gold);display:inline-block;}

/* ============ NAV ============ */
header{
  position:sticky; top:0; z-index:50;
  background:rgba(10,14,26,0.86);
  backdrop-filter:blur(10px);
  border-bottom:1px solid var(--rule);
}
nav{
  display:flex; align-items:center; justify-content:space-between;
  padding:20px 28px;
  max-width:var(--max-w); margin:0 auto;
}
.logo{
  display:flex; align-items:center; gap:10px;
  font-family:'Fraunces',serif; font-weight:600; font-size:20px;
  letter-spacing:0.01em;
  color:var(--parchment);
}
.logo .mark{
  width:26px;height:26px;
  border:1px solid var(--gold);
  display:flex;align-items:center;justify-content:center;
  font-family:'JetBrains Mono',monospace;
  font-size:12px; color:var(--gold);
  transform:rotate(45deg);
}
.logo .mark span{transform:rotate(-45deg);}
.navlinks{display:flex; gap:36px; font-size:14px; color:var(--slate);}
.navlinks a:hover{color:var(--gold-bright);}
.nav-cta{
  font-family:'JetBrains Mono',monospace;
  font-size:12px; letter-spacing:0.05em;
  border:1px solid var(--gold);
  color:var(--gold);
  padding:9px 18px;
  transition:all .2s ease;
}
.nav-cta:hover{background:var(--gold); color:var(--bg);}
.navlinks-mobile-toggle{
  display:none;background:none;border:1px solid var(--rule-bright);
  color:var(--parchment);font-size:18px;line-height:1;cursor:pointer;
  padding:8px 12px;
}
.navlinks-mobile-toggle:hover{border-color:var(--gold); color:var(--gold-bright);}
.sign-in-link{
  font-family:'JetBrains Mono',monospace; font-size:13px; color:var(--slate);
  transition:color .2s ease;
}
.sign-in-link:hover{color:var(--gold-bright);}

/* ============ AUTH MODAL ============ */
.modal-overlay{
  position:fixed; inset:0; background:rgba(5,7,13,0.82);
  backdrop-filter:blur(4px);
  z-index:200; display:none;
  align-items:center; justify-content:center;
  padding:24px;
}
.modal-overlay.show{display:flex;}
.modal-box{
  background:var(--bg-card-raised);
  border:1px solid var(--rule-bright);
  max-width:420px; width:100%;
  padding:40px;
  position:relative;
}
.modal-close{
  position:absolute; top:18px; right:18px;
  background:none; border:none; color:var(--slate);
  font-size:20px; cursor:pointer; line-height:1;
}
.modal-close:hover{color:var(--gold-bright);}
.modal-box h3{font-family:'Fraunces',serif; font-size:24px; margin-bottom:8px;}
.modal-box .sub{color:var(--slate); font-size:13.5px; margin-bottom:28px;}
.form-field{margin-bottom:18px;}
.form-field label{
  display:block; font-family:'JetBrains Mono',monospace; font-size:10.5px;
  letter-spacing:0.08em; text-transform:uppercase; color:var(--slate); margin-bottom:8px;
}
.form-field input{
  width:100%; background:var(--bg); border:1px solid var(--rule-bright);
  color:var(--parchment); padding:13px 14px; font-family:'Inter',sans-serif; font-size:14.5px;
}
.form-field input:focus{outline:2px solid var(--gold); outline-offset:1px; border-color:var(--gold);}
.modal-submit{
  width:100%; font-family:'JetBrains Mono',monospace; font-size:13px; letter-spacing:0.04em;
  background:var(--gold); color:var(--bg); padding:14px; border:none; cursor:pointer;
  margin-top:8px; transition:background .2s ease;
}
.modal-submit:hover{background:var(--gold-bright);}
.modal-submit:focus-visible{outline:2px solid var(--parchment); outline-offset:2px;}
.modal-switch{
  text-align:center; margin-top:20px; font-size:13px; color:var(--slate);
}
.modal-switch a{color:var(--gold); cursor:pointer;}
.modal-switch a:focus-visible{outline:1px solid var(--gold); outline-offset:2px;}
.modal-note{
  margin-top:22px; font-family:'JetBrains Mono',monospace; font-size:10px;
  color:var(--slate-dim); line-height:1.6; border-top:1px solid var(--rule); padding-top:16px;
}
.purchase-mode-options{display:flex; flex-direction:column; gap:10px;}
.pm-option{
  display:flex; gap:12px; align-items:flex-start;
  border:1px solid var(--rule-bright); padding:12px 14px; cursor:pointer;
  transition:border-color .2s ease;
}
.pm-option:has(input:checked){border-color:var(--gold);}
.pm-option input{margin-top:3px; accent-color:var(--gold); flex-shrink:0;}
.pm-option div{display:flex; flex-direction:column; gap:3px;}
.pm-option strong{font-size:13.5px; color:var(--parchment); font-family:'Inter',sans-serif; font-weight:600;}
.pm-option span{font-size:12px; color:var(--slate); line-height:1.5;}

/* ============ EMAIL CAPTURE POPUP ============ */
.email-popup-overlay{
  position:fixed; inset:0; background:rgba(5,7,13,0.78);
  backdrop-filter:blur(4px);
  z-index:190; display:none;
  align-items:center; justify-content:center;
  padding:24px;
  opacity:0; transition:opacity .35s ease;
}
.email-popup-overlay.show{display:flex;}
.email-popup-overlay.in{opacity:1;}
.email-popup-box{
  background:var(--bg-card-raised);
  border:1px solid var(--gold);
  max-width:460px; width:100%;
  padding:44px 40px;
  position:relative;
  transform:translateY(14px);
  transition:transform .35s ease;
}
.email-popup-overlay.in .email-popup-box{transform:translateY(0);}
.email-popup-close{
  position:absolute; top:16px; right:16px;
  background:none; border:none; color:var(--slate);
  font-size:20px; cursor:pointer; line-height:1;
}
.email-popup-close:hover{color:var(--gold-bright);}
.email-popup-box .eyebrow{margin-bottom:18px;}
.email-popup-box h3{
  font-family:'Fraunces',serif; font-style:italic; font-weight:500;
  font-size:26px; line-height:1.25; color:var(--gold-bright); margin-bottom:14px;
}
.email-popup-box p.sub{color:var(--slate); font-size:14px; margin-bottom:26px; line-height:1.6;}
.email-popup-form{display:flex; gap:10px;}
.email-popup-form input{
  flex:1; background:var(--bg); border:1px solid var(--rule-bright);
  color:var(--parchment); padding:13px 14px; font-family:'Inter',sans-serif; font-size:14.5px;
}
.email-popup-form input:focus{outline:2px solid var(--gold); outline-offset:1px; border-color:var(--gold);}
.email-popup-form button{
  font-family:'JetBrains Mono',monospace; font-size:12.5px; letter-spacing:0.04em;
  background:var(--gold); color:var(--bg); padding:0 22px; border:none; cursor:pointer;
  transition:background .2s ease; white-space:nowrap;
}
.email-popup-form button:hover{background:var(--gold-bright);}
.email-popup-skip{
  display:block; text-align:center; margin-top:18px;
  font-family:'JetBrains Mono',monospace; font-size:11.5px; color:var(--slate-dim);
  cursor:pointer;
}
.email-popup-skip:hover{color:var(--slate);}
.email-popup-skip:focus-visible{outline:1px solid var(--gold); outline-offset:2px;}
.email-popup-success{
  text-align:center; font-family:'JetBrains Mono',monospace; font-size:13px;
  color:var(--emerald-bright); padding:8px 0;
}
@media (max-width:480px){
  .email-popup-form{flex-direction:column;}
}

/* ============ CONTENT VIEWER + WATERMARK + COPY DETERRENCE ============ */
.viewer-overlay{
  position:fixed; inset:0; background:rgba(3,4,8,0.94);
  z-index:300; display:none; align-items:center; justify-content:center;
  padding:24px;
}
.viewer-overlay.show{display:flex;}
.viewer-box{
  background:var(--bg-card); border:1px solid var(--rule-bright);
  width:100%; max-width:760px; max-height:88vh;
  display:flex; flex-direction:column;
  position:relative;
  /* deter casual copy/paste of guide text */
  -webkit-user-select:none; -moz-user-select:none; user-select:none;
}
.viewer-topbar{
  display:flex; justify-content:space-between; align-items:center;
  padding:18px 24px; border-bottom:1px solid var(--rule);
  flex-shrink:0;
}
.viewer-title{font-family:'Fraunces',serif; font-size:17px; color:var(--parchment);}
.viewer-close{
  font-family:'JetBrains Mono',monospace; font-size:11.5px; color:var(--slate);
  background:none; border:1px solid var(--rule-bright); padding:8px 14px; cursor:pointer;
}
.viewer-close:hover{color:var(--gold-bright); border-color:var(--gold);}
.viewer-content{
  position:relative; overflow-y:auto; padding:36px 40px; flex-grow:1;
  font-size:14.5px; line-height:1.75; color:var(--parchment);
}
.viewer-content h4{font-family:'Fraunces',serif; font-size:19px; margin:22px 0 10px; color:var(--gold-bright);}
.viewer-content p{margin-bottom:14px; color:var(--parchment);}
.viewer-content ul{padding-left:20px; margin-bottom:14px;}
.viewer-content li{margin-bottom:8px;}
.viewer-footer-note{
  flex-shrink:0; padding:14px 24px; border-top:1px solid var(--rule);
  font-family:'JetBrains Mono',monospace; font-size:10.5px; color:var(--slate-dim);
}
/* Repeating, semi-transparent per-user watermark tiled across the content */
.watermark-layer{
  position:absolute; inset:0; pointer-events:none;
  display:grid; grid-template-columns:repeat(3,1fr); gap:60px;
  padding:30px; opacity:0.07; z-index:5;
  transform:rotate(-22deg) scale(1.3);
}
.watermark-layer span{
  font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--gold);
  white-space:nowrap;
}

/* ============ MEMBER DASHBOARD ============ */
.dashboard-overlay{
  position:fixed; inset:0; background:var(--bg);
  z-index:150; display:none; overflow-y:auto;
}
.dashboard-overlay.show{display:block;}
.dash-header{
  border-bottom:1px solid var(--rule); padding:24px 0;
}
.dash-header .wrap{display:flex; justify-content:space-between; align-items:center;}
.dash-signout{
  font-family:'JetBrains Mono',monospace; font-size:12px; color:var(--slate);
  border:1px solid var(--rule-bright); padding:9px 16px; cursor:pointer; background:none;
}
.dash-signout:hover{color:var(--gold-bright); border-color:var(--gold);}
.dash-hero{padding:48px 0 32px;}
.dash-plan-badge{
  display:inline-flex; align-items:center; gap:10px;
  border:1px solid var(--rule-bright); padding:8px 16px;
  font-family:'JetBrains Mono',monospace; font-size:11.5px; color:var(--gold);
  margin-bottom:18px;
}
.dash-hero h2{font-family:'Fraunces',serif; font-size:clamp(26px,3.5vw,36px); font-weight:500;}
.dash-meta{display:flex; gap:32px; margin-top:20px; flex-wrap:wrap;}
.dash-meta-item .label{font-family:'JetBrains Mono',monospace; font-size:10.5px; color:var(--slate); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:6px;}
.dash-meta-item .val{font-family:'JetBrains Mono',monospace; font-size:15px; color:var(--parchment);}

.savings-tracker{
  display:grid; grid-template-columns:1.4fr 1fr; gap:1px; background:var(--rule);
  border:1px solid var(--rule-bright); margin:40px 0 56px;
}
.st-left{background:var(--bg-card); padding:32px;}
.st-left h3{font-family:'Fraunces',serif; font-size:19px; margin:14px 0 10px; font-weight:600;}
.st-left p{font-size:13.5px; color:var(--slate); line-height:1.6;}
.st-right{
  background:var(--bg-card-raised); padding:32px;
  display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;
}
.st-amount{font-family:'JetBrains Mono',monospace; font-size:42px; color:var(--gold-bright); font-weight:500;}
.st-label{font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--slate); text-transform:uppercase; letter-spacing:0.06em; margin-top:8px;}
.st-sub{font-size:12.5px; color:var(--slate-dim); margin-top:14px;}
@media (max-width:760px){.savings-tracker{grid-template-columns:1fr;}}

.library-grid{display:grid; grid-template-columns:repeat(2,1fr); gap:1px; background:var(--rule); border:1px solid var(--rule);}
.library-item{
  background:var(--bg-card); padding:28px; display:flex; flex-direction:column;
}
.library-item.locked{opacity:0.5;}
.lib-tag{font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.08em; color:var(--gold); text-transform:uppercase; margin-bottom:12px;}
.library-item.locked .lib-tag{color:var(--slate);}
.library-item h4{font-family:'Fraunces',serif; font-size:18px; margin-bottom:8px;}
.library-item p{font-size:13.5px; color:var(--slate); line-height:1.6; margin-bottom:18px; flex-grow:1;}
.lib-action{
  font-family:'JetBrains Mono',monospace; font-size:12px; letter-spacing:0.04em;
  padding:11px; text-align:center; border:1px solid var(--gold); color:var(--gold);
  transition:all .2s ease; cursor:pointer;
}
.lib-action:hover{background:var(--gold); color:var(--bg);}
.lib-action:focus-visible{outline:2px solid var(--gold); outline-offset:2px;}
.lib-action.locked-action{border-color:var(--slate-dim); color:var(--slate-dim); cursor:not-allowed;}
.lib-action.locked-action:hover{background:none;}
@media (max-width:760px){.library-grid{grid-template-columns:1fr;} .dash-header .wrap{flex-wrap:wrap; gap:12px;}}

.dash-demo-flag{
  background:rgba(201,162,39,0.08); border:1px solid var(--rule-bright);
  padding:16px 20px; font-family:'JetBrains Mono',monospace; font-size:11px;
  color:var(--gold); line-height:1.7; margin-bottom:36px;
}

/* ============ MOBILE NAV MENU ============ */
@media (max-width:860px){
  .navlinks{
    display:none;
    position:absolute;
    top:100%; left:0; right:0;
    background:var(--bg-card-raised);
    border-bottom:1px solid var(--rule-bright);
    flex-direction:column;
    gap:0;
    padding:8px 0;
    box-shadow:0 12px 24px rgba(0,0,0,0.35);
  }
  .navlinks.mobile-open{display:flex;}
  .navlinks a{
    padding:14px 28px;
    border-top:1px solid var(--rule);
    color:var(--parchment);
  }
  .navlinks a:first-child{border-top:none;}
  .navlinks-mobile-toggle{display:block;}
  header{position:sticky;}
  nav{position:relative;}
}

/* ============ HERO ============ */
.hero{
  position:relative; z-index:1;
  padding:120px 0 100px;
  border-bottom:1px solid var(--rule);
}
.hero .wrap{display:grid; grid-template-columns:1.1fr 0.9fr; gap:70px; align-items:end;}
.hero-eyebrow{margin-bottom:28px;}
.hero h1{
  font-family:'Fraunces',serif;
  font-weight:500;
  font-size:clamp(38px,5.2vw,64px);
  line-height:1.08;
  letter-spacing:-0.01em;
  color:var(--parchment);
}
.hero h1 em{
  font-style:italic;
  font-weight:500;
  color:var(--gold-bright);
}
.hero p.lede{
  margin-top:24px;
  font-size:18px;
  color:var(--slate);
  max-width:520px;
  line-height:1.65;
}
.hero-actions{display:flex; gap:16px; margin-top:40px; align-items:center; flex-wrap:wrap;}
.btn-primary{
  font-family:'JetBrains Mono',monospace;
  font-size:13px; letter-spacing:0.04em;
  background:var(--gold);
  color:var(--bg);
  padding:15px 28px;
  border:1px solid var(--gold);
  transition:all .2s ease;
  display:inline-block;
}
.btn-primary:hover{background:var(--gold-bright); border-color:var(--gold-bright);}
.btn-primary:focus-visible{outline:2px solid var(--parchment); outline-offset:2px;}
.btn-ghost{
  font-family:'JetBrains Mono',monospace;
  font-size:13px; letter-spacing:0.04em;
  color:var(--parchment);
  padding:15px 4px;
  border-bottom:1px solid var(--slate-dim);
  transition:all .2s ease;
}
.btn-ghost:hover{border-color:var(--gold);color:var(--gold-bright);}
.btn-ghost:focus-visible{outline:2px solid var(--gold); outline-offset:2px;}

.hero-panel{
  border:1px solid var(--rule);
  background:linear-gradient(165deg, var(--bg-card-raised), var(--bg-card));
  padding:28px;
}
.hero-panel .label{
  font-family:'JetBrains Mono',monospace; font-size:11px;
  color:var(--slate); letter-spacing:0.1em; text-transform:uppercase;
  margin-bottom:6px;
}
.rate-row{
  display:flex; justify-content:space-between; align-items:baseline;
  padding:16px 0; gap:12px; flex-wrap:wrap;
}
.rate-row + .rate-row{border-top:1px solid var(--rule);}
.rate-name{font-size:14px; color:var(--parchment);}
.rate-name .sub{display:block; font-size:11px; color:var(--slate); margin-top:2px;}
.rate-val{font-family:'JetBrains Mono',monospace; font-size:22px; color:var(--gold-bright); font-weight:500;}
.hero-panel .asof{
  margin-top:14px; font-family:'JetBrains Mono',monospace; font-size:10px;
  color:var(--slate-dim); letter-spacing:0.05em;
}

@media (max-width:900px){
  .hero .wrap{grid-template-columns:1fr; gap:48px;}
}

/* ============ TRUST STRIP ============ */
.trust-strip{
  padding:30px 0;
  border-bottom:1px solid var(--rule);
}
.trust-strip .wrap{
  display:flex; justify-content:space-between; flex-wrap:wrap; gap:24px;
}
.trust-item{
  font-family:'JetBrains Mono',monospace;
  font-size:12px; color:var(--slate);
  display:flex; align-items:center; gap:8px;
}
.trust-item .dot{width:5px;height:5px;background:var(--emerald-bright);border-radius:50%;flex-shrink:0;}

/* ============ SECTION SHELL ============ */
section{padding:96px 0; position:relative; z-index:1;}
.section-head{margin-bottom:56px; max-width:680px;}
.section-head h2{
  font-family:'Fraunces',serif; font-weight:500;
  font-size:clamp(28px,3.6vw,42px);
  margin-top:18px; line-height:1.15;
  color:var(--parchment);
}
.section-head p{margin-top:18px; color:var(--slate); font-size:16px; max-width:560px;}
.border-top{border-top:1px solid var(--rule);}

@media (max-width:600px){
  section{padding:64px 0;}
}

/* ============ PRODUCT GRID ============ */
.products{display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--rule); border:1px solid var(--rule);}
.product-card{
  background:var(--bg-card);
  padding:36px 32px;
  display:flex; flex-direction:column;
  position:relative;
}
.product-card.featured{background:var(--bg-card-raised);}
.product-card .tier-tag{
  font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.12em;
  color:var(--slate); text-transform:uppercase; margin-bottom:18px;
}
.product-card.featured .tier-tag{color:var(--gold);}
.product-card h3{font-family:'Fraunces',serif; font-size:23px; font-weight:600; margin-bottom:10px; color:var(--parchment);}
.price-row{display:flex; align-items:baseline; gap:8px; margin:18px 0 22px; flex-wrap:wrap;}
.price{font-family:'JetBrains Mono',monospace; font-size:34px; color:var(--gold-bright); font-weight:500;}
.price-period{font-family:'JetBrains Mono',monospace; font-size:12px; color:var(--slate);}
.product-card .desc{color:var(--slate); font-size:14.5px; line-height:1.6; margin-bottom:24px;}
.feat-list{list-style:none; margin-bottom:28px;}
.feat-list li{
  font-size:13.5px; color:var(--parchment);
  padding:9px 0; display:flex; gap:10px;
  border-top:1px solid var(--rule);
}
.feat-list li:first-child{border-top:none;}
.feat-list li .check{color:var(--emerald-bright); font-family:'JetBrains Mono',monospace; flex-shrink:0;}

/* ---- FIX APPLIED HERE: .product-btn now works correctly as a <button> ---- */
.product-btn{
  display:block; text-align:center;
  font-family:'JetBrains Mono',monospace; font-size:13px; letter-spacing:0.04em;
  padding:14px; border:1px solid var(--gold); color:var(--gold);
  background:transparent;
  width:100%;
  cursor:pointer;
  -webkit-appearance:none; appearance:none;
  transition:all .2s ease;
}
.product-btn:hover{background:var(--gold); color:var(--bg);}
.product-btn:focus-visible{outline:2px solid var(--gold-bright); outline-offset:2px;}
.product-card.featured .product-btn{background:var(--gold); color:var(--bg);}
.product-card.featured .product-btn:hover{background:var(--gold-bright);}

.risk-tag{
  display:inline-flex; align-items:center; gap:6px;
  font-family:'JetBrains Mono',monospace; font-size:10.5px;
  border:1px solid var(--rule-bright); color:var(--gold);
  padding:5px 10px; letter-spacing:0.04em;
  margin-bottom:20px; align-self:flex-start;
}

@media (max-width:900px){.products{grid-template-columns:1fr;}}

/* ============ BILLING TOGGLE (3-way segmented) ============ */
.billing-toggle{
  display:inline-flex; align-items:center; gap:2px;
  margin-bottom:36px;
  border:1px solid var(--rule-bright);
  padding:4px;
  flex-wrap:wrap;
}
.billing-seg{
  font-family:'JetBrains Mono',monospace; font-size:12px; letter-spacing:0.05em;
  color:var(--slate); background:none; border:none; cursor:pointer;
  padding:10px 16px; transition:all .2s ease;
  display:flex; align-items:center; gap:7px;
  white-space:nowrap;
}
.billing-seg:focus-visible{outline:2px solid var(--gold); outline-offset:2px;}
@media (max-width:480px){
  .billing-toggle{width:100%;}
  .billing-seg{flex:1 1 auto; justify-content:center; padding:10px 10px; font-size:11px;}
}
.billing-seg.active{background:var(--gold); color:var(--bg);}
.billing-seg:not(.active):hover{color:var(--gold-bright);}
.save-pill{
  font-size:9.5px; background:var(--emerald); color:var(--parchment);
  padding:2px 6px; letter-spacing:0.04em;
}
.billing-seg.active .save-pill{background:var(--bg); color:var(--gold-bright);}
.price-lock-note{
  font-family:'JetBrains Mono',monospace; font-size:11.5px; color:var(--slate);
  margin-bottom:28px; line-height:1.7; max-width:640px;
}
.price-lock-note .lock-icon{margin-right:4px;}
.price-lock-note a{color:var(--gold);}

.desc-small{
  font-family:'JetBrains Mono',monospace; font-size:11.5px;
  color:var(--emerald-bright); margin-bottom:18px; margin-top:-10px;
}

.recurring-box{
  border-top:1px solid var(--rule);
  padding-top:18px; margin-bottom:24px; flex-grow:1;
}
.recurring-label{
  font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.1em;
  color:var(--gold); text-transform:uppercase; margin-bottom:6px;
}

/* ============ ALL-ACCESS CARD ============ */
.all-access-card{
  margin-top:1px;
  background:linear-gradient(135deg, var(--bg-card-raised), var(--bg-card));
  border:1px solid var(--gold);
  padding:40px;
  display:grid; grid-template-columns:1.6fr 1fr; gap:40px; align-items:center;
}
.aa-left h3{font-family:'Fraunces',serif; font-size:26px; font-weight:600; margin:12px 0 14px; color:var(--parchment);}
.aa-right{border-left:1px solid var(--rule); padding-left:36px;}
.aa-right .price{font-size:30px;}
@media (max-width:760px){
  .all-access-card{grid-template-columns:1fr; padding:32px;}
  .aa-right{border-left:none; border-top:1px solid var(--rule); padding-left:0; padding-top:28px;}
}

/* ============ ANNUAL TOGGLE BANNER ============ */
.annual-banner{
  margin-top:1px;
  background:var(--bg-card-raised);
  border:1px solid var(--rule);
  border-top:none;
  padding:22px 32px;
  display:flex; align-items:center; justify-content:space-between;
  flex-wrap:wrap; gap:16px;
}
.annual-banner .l{display:flex; align-items:center; gap:14px; flex-wrap:wrap;}
.annual-banner .badge{
  font-family:'JetBrains Mono',monospace; font-size:11px;
  background:var(--emerald); color:var(--parchment);
  padding:5px 10px; letter-spacing:0.04em;
}
.annual-banner p{font-size:14px; color:var(--slate);}
.annual-banner strong{color:var(--parchment);}

/* ============ ONBOARDING PREVIEW ============ */
.onboarding-block{margin-top:80px;}
.onboard-steps{display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--rule); border:1px solid var(--rule);}
.onboard-step{background:var(--bg-card); padding:28px 24px;}
.step-num{
  font-family:'JetBrains Mono',monospace; font-size:13px; color:var(--bg);
  background:var(--gold); width:26px; height:26px; display:flex; align-items:center; justify-content:center;
  margin-bottom:16px;
}
.onboard-step h4{font-family:'Fraunces',serif; font-size:16px; margin-bottom:8px;}
.onboard-step p{font-size:13px; color:var(--slate); line-height:1.6;}
@media (max-width:860px){.onboard-steps{grid-template-columns:1fr 1fr;}}
@media (max-width:560px){.onboard-steps{grid-template-columns:1fr;}}

/* ============ GUARANTEE BLOCK ============ */
.guarantee-block{
  margin-top:1px;
  border:1px solid var(--emerald-bright);
  background:linear-gradient(160deg, rgba(92,154,126,0.07), transparent);
  padding:36px;
  display:grid; grid-template-columns:auto 1fr; gap:26px; align-items:start;
}
.guarantee-icon{
  width:44px; height:44px; border:1px solid var(--emerald-bright); border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  font-size:20px; color:var(--emerald-bright); flex-shrink:0;
}
.guarantee-block h3{font-family:'Fraunces',serif; font-size:20px; margin-bottom:10px;}
.guarantee-block p{font-size:14px; color:var(--slate); line-height:1.7;}
.guarantee-block a{color:var(--gold);}
@media (max-width:600px){.guarantee-block{grid-template-columns:1fr;}}

/* ============ DATA / RATES TABLE ============ */
.rates-table{border:1px solid var(--rule); border-top:none;}
.rates-row{
  display:grid; grid-template-columns:2fr 1fr 1fr 1.4fr;
  padding:18px 28px; align-items:center;
  border-top:1px solid var(--rule);
  gap:12px;
}
.rates-row.head{
  font-family:'JetBrains Mono',monospace; font-size:10.5px; letter-spacing:0.1em;
  color:var(--slate); text-transform:uppercase; border-top:1px solid var(--rule-bright);
}
.rates-row .name{font-size:14.5px; color:var(--parchment);}
.rates-row .name .bank-sub{display:block; font-size:12px; color:var(--slate); margin-top:3px;}
.rates-row .apy{font-family:'JetBrains Mono',monospace; color:var(--gold-bright); font-size:17px;}
.rates-row .note{font-size:12.5px; color:var(--slate); line-height:1.5;}
@media (max-width:760px){
  .rates-row{grid-template-columns:1fr 1fr; row-gap:8px; padding:18px 20px;}
  .rates-row .note{grid-column:1/-1;}
}

.source-note{
  margin-top:18px; font-family:'JetBrains Mono',monospace; font-size:11px;
  color:var(--slate-dim);
}

.upgrade-nudge{
  margin-top:28px; padding:24px 28px;
  background:var(--bg-card-raised); border:1px solid var(--rule-bright);
  display:flex; align-items:center; justify-content:space-between; gap:24px;
  flex-wrap:wrap;
}
.upgrade-nudge p{font-size:13.5px; color:var(--slate); max-width:520px; line-height:1.6;}
.upgrade-nudge strong{color:var(--parchment);}

/* ============ APPROACH / METHOD ============ */
.method-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:48px;}
.method-item .num{font-family:'JetBrains Mono',monospace; font-size:12px; color:var(--gold); margin-bottom:14px;}
.method-item h4{font-family:'Fraunces',serif; font-size:19px; font-weight:600; margin-bottom:10px;}
.method-item p{font-size:14px; color:var(--slate); line-height:1.65;}
@media (max-width:860px){.method-grid{grid-template-columns:1fr; gap:36px;}}

/* ============ RISK BLOCK ============ */
.risk-block{
  border:1px solid var(--rule-bright);
  background:linear-gradient(160deg, rgba(201,162,39,0.05), transparent);
  padding:40px;
  display:grid; grid-template-columns:auto 1fr; gap:28px; align-items:start;
}
.risk-block .icon{
  width:44px;height:44px; border:1px solid var(--gold);
  display:flex; align-items:center; justify-content:center;
  font-family:'Fraunces',serif; font-size:22px; color:var(--gold); flex-shrink:0;
}
.risk-block h3{font-family:'Fraunces',serif; font-size:21px; margin-bottom:12px;}
.risk-block p{color:var(--slate); font-size:14.5px; line-height:1.7;}
.risk-block ul{margin-top:14px; padding-left:0;}
.risk-block li{font-size:14px; color:var(--parchment); margin-bottom:9px; padding-left:18px; position:relative;}
.risk-block li::before{content:"—"; position:absolute; left:0; color:var(--gold);}
@media (max-width:700px){.risk-block{grid-template-columns:1fr; padding:28px;}}

/* ============ TESTIMONIAL / SOCIAL PROOF ============ */
.proof-stats{
  display:grid; grid-template-columns:repeat(3,1fr); gap:1px;
  background:var(--rule); border:1px solid var(--rule); margin-bottom:1px;
}
.proof-stat{background:var(--bg-card); padding:32px 28px; text-align:center;}
.proof-stat .num{font-family:'JetBrains Mono',monospace; font-size:34px; color:var(--gold-bright); font-weight:500; margin-bottom:10px;}
.proof-stat .lbl{font-size:13px; color:var(--slate); line-height:1.5;}

.testimonial-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--rule); border:1px solid var(--rule); border-top:none;}
.testimonial-card{background:var(--bg-card-raised); padding:32px 28px;}
.testimonial-card p{font-family:'Fraunces',serif; font-style:italic; font-size:16.5px; line-height:1.55; color:var(--parchment); margin-bottom:18px;}
.testimonial-card .attrib{font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--slate); letter-spacing:0.02em;}

.proof-disclaimer{margin-top:18px; font-family:'JetBrains Mono',monospace; font-size:10.5px; color:var(--slate-dim); line-height:1.6;}

@media (max-width:860px){
  .proof-stats{grid-template-columns:1fr;}
  .testimonial-grid{grid-template-columns:1fr;}
}

/* ============ WEB3 GUIDE TEASER ============ */
.web3-grid{display:grid; grid-template-columns:1fr 1fr; gap:1px; background:var(--rule); border:1px solid var(--rule);}
.web3-card{background:var(--bg-card); padding:32px;}
.web3-card h4{font-family:'Fraunces',serif; font-size:18px; margin-bottom:10px;}
.web3-card p{font-size:14px; color:var(--slate); line-height:1.6;}
.web3-card .flag{
  font-family:'JetBrains Mono',monospace; font-size:10.5px; color:var(--gold);
  letter-spacing:0.08em; margin-bottom:12px; text-transform:uppercase;
}
@media (max-width:760px){.web3-grid{grid-template-columns:1fr;}}

/* ============ ABOUT SECTION ============ */
#about .section-head{
  border-left:2px solid var(--gold);
  padding-left:28px;
}
#about .section-head p{
  font-size:16.5px;
  color:var(--parchment);
  opacity:0.92;
  max-width:640px;
}
#about .section-head p + p{margin-top:14px;}

/* ============ CONTACT SECTION ============ */
.contact-card{
  border:1px solid var(--rule-bright);
  background:linear-gradient(160deg, rgba(201,162,39,0.05), transparent);
  padding:48px;
  max-width:560px;
}
.contact-card h2{
  font-family:'Fraunces',serif; font-weight:500;
  font-size:clamp(26px,3.2vw,34px);
  margin-top:16px; margin-bottom:18px;
  color:var(--parchment);
}
.contact-card p{font-size:15.5px; color:var(--slate); margin-bottom:18px;}
.contact-email{
  display:inline-block;
  font-family:'JetBrains Mono',monospace;
  font-size:18px;
  color:var(--gold-bright);
  border-bottom:1px solid var(--rule-bright);
  padding-bottom:6px;
  margin-bottom:28px;
  transition:border-color .2s ease, color .2s ease;
}
.contact-email:hover{color:var(--gold); border-color:var(--gold);}
.contact-email:focus-visible{outline:2px solid var(--gold); outline-offset:3px;}
.contact-meta{border-top:1px solid var(--rule); padding-top:18px;}
.contact-meta .label{
  font-family:'JetBrains Mono',monospace; font-size:10.5px; letter-spacing:0.08em;
  color:var(--slate); text-transform:uppercase; margin-bottom:6px;
}
.contact-meta .val{font-family:'JetBrains Mono',monospace; font-size:14px; color:var(--parchment);}
@media (max-width:600px){
  .contact-card{padding:32px 28px;}
}

/* ============ FAQ ============ */
.faq-item{border-top:1px solid var(--rule); padding:24px 0;}
.faq-item:last-child{border-bottom:1px solid var(--rule);}
.faq-q{
  display:flex; justify-content:space-between; align-items:center;
  cursor:pointer; font-family:'Fraunces',serif; font-size:17px; font-weight:600;
  color:var(--parchment); gap:16px;
}
.faq-q:focus-visible{outline:2px solid var(--gold); outline-offset:4px;}
.faq-q .plus{font-family:'JetBrains Mono',monospace; color:var(--gold); font-size:18px; transition:transform .2s ease; flex-shrink:0;}
.faq-item.open .plus{transform:rotate(45deg);}
.faq-a{max-height:0; overflow:hidden; transition:max-height .3s ease;}
.faq-a p{padding-top:16px; color:var(--slate); font-size:14.5px; line-height:1.7; max-width:680px;}

/* ============ FOOTER ============ */
footer{border-top:1px solid var(--rule); padding:64px 0 40px;}
.footer-grid{display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr; gap:40px; margin-bottom:48px;}
.footer-col h5{font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:0.1em; color:var(--slate); text-transform:uppercase; margin-bottom:18px;}
.footer-col a, .footer-col p{display:block; font-size:13.5px; color:var(--slate); margin-bottom:11px; line-height:1.6;}
.footer-col a:hover{color:var(--gold-bright);}
.footer-col a:focus-visible{outline:1px solid var(--gold); outline-offset:2px;}
.footer-bottom{
  display:flex; justify-content:space-between; align-items:center;
  flex-wrap:wrap; gap:16px;
  padding-top:28px; border-top:1px solid var(--rule);
  font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--slate-dim);
}
.disclosure-full{
  margin-top:28px; padding:20px; border:1px solid var(--rule);
  font-size:11.5px; color:var(--slate-dim); line-height:1.7;
}
@media (max-width:860px){.footer-grid{grid-template-columns:1fr 1fr; gap:32px;}}
@media (max-width:500px){.footer-grid{grid-template-columns:1fr;}}

/* reveal-on-scroll */
.reveal{opacity:0; transform:translateY(16px); transition:opacity .6s ease, transform .6s ease;}
.reveal.in{opacity:1; transform:translateY(0);}

@media (prefers-reduced-motion: reduce){
  .reveal{transition:none; opacity:1; transform:none;}
  html{scroll-behavior:auto;}
}

/* ============ GLOBAL FOCUS VISIBILITY ============ */
a:focus-visible, button:focus-visible{
  outline:2px solid var(--gold);
  outline-offset:2px;
}
  /* ===== LEDGER & CO. — FADE-AWAY SPLASH OVERLAY ===== */
  .ledger-splash{
    position:fixed; inset:0; z-index:4000;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    background:radial-gradient(120% 90% at 50% 0%, #162542 0%, #0a1124 55%, #05070f 100%);
    padding:40px 28px; text-align:center; overflow-y:auto;
    opacity:1; transition:opacity .7s ease;
  }
  .ledger-splash.is-hiding{ opacity:0; }
  .ledger-splash.is-done{ display:none; }
  .ledger-splash .ls-tag{
    font-family:'JetBrains Mono',monospace; text-transform:uppercase;
    letter-spacing:.34em; font-size:11px; color:var(--gold); margin-bottom:22px;
  }
  .ledger-splash .ls-title{
    font-family:'Fraunces',serif; font-size:clamp(26px,4vw,42px); font-weight:500;
    margin-bottom:10px; color:#fff;
  }
  .ledger-splash .ls-title em{ color:var(--gold-bright); font-style:italic; }
  .ledger-splash .ls-intro{
    max-width:560px; color:var(--slate); font-size:15px; margin-bottom:40px; line-height:1.6;
  }
  .ledger-splash .ls-rows{
    display:grid; grid-template-columns:repeat(3,1fr); gap:14px 26px;
    max-width:680px; margin-bottom:36px;
  }
  .ledger-splash .ls-wr{ text-align:left; }
  .ledger-splash .ls-w{
    font-family:'Fraunces',serif; font-size:clamp(20px,2.4vw,28px); font-weight:700;
    color:#0b0f1a; line-height:1.1;
    -webkit-text-stroke:1px rgba(255,255,255,.9); paint-order:stroke fill;
    text-shadow:0 1px 2px rgba(0,0,0,.4);
  }
  .ledger-splash .ls-w .ls-ini{
    color:var(--gold); font-size:1.3em;
    -webkit-text-stroke:1.4px rgba(255,255,255,.5); paint-order:stroke fill;
  }
  .ledger-splash .ls-d{
    font-family:'Inter',sans-serif; font-size:11px; color:var(--slate);
    margin-top:3px; display:flex; gap:7px;
  }
  .ledger-splash .ls-d::before{
    content:"\25C6"; color:var(--gold); font-size:7px; line-height:1.8; flex-shrink:0;
  }
  .ledger-splash .ls-skip{
    font-family:'JetBrains Mono',monospace; font-size:12px; color:var(--slate);
    background:none; border:none; cursor:pointer; letter-spacing:.06em;
  }
  .ledger-splash .ls-skip:hover{ color:var(--gold-bright); }
  @media(max-width:640px){
    .ledger-splash .ls-rows{ grid-template-columns:1fr; text-align:center; }
    .ledger-splash .ls-wr{ text-align:center; }
    .ledger-splash .ls-d{ justify-content:center; }
  }
/* EMERGENCY OVERRIDE — force reveal sections visible */
.reveal,
.reveal-up,
.fade-in {
  opacity: 1 !important;
  transform: none !important;
  visibility: visible !important;
}
/* Log-a-win button — brand style */
button[onclick*="logWin"],
.log-win-btn {
  background: transparent !important;
  color: var(--gold) !important;
  border: 1px solid var(--gold) !important;
  padding: 12px 24px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  letter-spacing: .08em;
  cursor: pointer;
  transition: all .2s ease;
}
button[onclick*="logWin"]:hover,
.log-win-btn:hover {
  background: var(--gold) !important;
  color: #0b1626 !important;
}
