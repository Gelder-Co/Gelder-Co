/**
 * LEDGER & CO. — MAIN.JS (OPTIMIZED)
 *
 * Core functionality for authentication, billing, dashboard, and UI interactions.
 * This file preserves all existing functionality from the original main.js
 * and adds mobile navigation toggle.
 */

// ============================================================
// SUPABASE INITIALIZATION
// ============================================================
const SUPABASE_URL = 'https://vhlwqozqajbjhrumdsxj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZobHdxb3pxYWpianhydW1kc3hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MzYwNzI0NzcsImV4cCI6MTk1MTY0ODQ3N30.8kfA3x4_jXoTkPQf_lJVHWFVbPSL_E-HZfJ7rPQg0Lg';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.__ledgerSupabaseClient = supabaseClient;

// ============================================================
// MOBILE NAVIGATION TOGGLE (NEW)
// ============================================================
function initMobileNav() {
  const toggle = document.getElementById('navMobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', function() {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('show', !isExpanded);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      toggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('show');
    });
  });
}

// ============================================================
// MODAL & POPUP FUNCTIONS
// ============================================================
function openAuthModal(mode = 'signin') {
  const modal = document.getElementById('authModal');
  if (!modal) return;
  modal.classList.add('show');
  switchAuthView(mode);
  document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.remove('show');
  document.body.style.overflow = '';
}

function switchAuthView(view) {
  const signinView = document.getElementById('signinView');
  const signupView = document.getElementById('signupView');
  const resetView = document.getElementById('resetRequestView');

  if (signinView) signinView.style.display = view === 'signin' ? 'block' : 'none';
  if (signupView) signupView.style.display = view === 'signup' ? 'block' : 'none';
  if (resetView) resetView.style.display = view === 'reset' ? 'block' : 'none';
}

function openEmailPopup() {
  const popup = document.getElementById('emailPopup');
  if (popup) {
    popup.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeEmailPopup() {
  const popup = document.getElementById('emailPopup');
  if (popup) {
    popup.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// ============================================================
// AUTHENTICATION HANDLERS
// ============================================================
async function handleSignIn(event) {
  event.preventDefault();
  const email = document.getElementById('signinEmail').value.trim();
  const password = document.getElementById('signinPassword').value;

  if (!email || !password) {
    alert('Please enter email and password.');
    return false;
  }

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) {
      alert('Sign-in failed: ' + error.message);
      return false;
    }

    closeAuthModal();
    showDashboard();
    return false;
  } catch (err) {
    alert('Error: ' + err.message);
    return false;
  }
}

async function handleSignUp(event) {
  event.preventDefault();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;

  if (!email || password.length < 8) {
    alert('Email required, password at least 8 characters.');
    return false;
  }

  try {
    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password
    });

    if (error) {
      alert('Sign-up failed: ' + error.message);
      return false;
    }

    alert('Account created! Check your email to confirm your address.');
    switchAuthView('signin');
    return false;
  } catch (err) {
    alert('Error: ' + err.message);
    return false;
  }
}

async function handleResetRequest(event) {
  event.preventDefault();
  const email = document.getElementById('resetEmail').value.trim();

  if (!email) {
    alert('Please enter your email.');
    return false;
  }

  try {
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email);

    if (error) {
      console.error('Reset error:', error);
    }

    document.getElementById('resetRequestForm').style.display = 'none';
    document.getElementById('resetRequestDone').style.display = 'block';
    return false;
  } catch (err) {
    alert('Error: ' + err.message);
    return false;
  }
}

// ============================================================
// EMAIL CAPTURE
// ============================================================
async function handleEmailCapture(event) {
  event.preventDefault();
  const email = document.getElementById('popupEmail').value.trim();

  if (!email) return false;

  try {
    // Attempt to create a guest record (non-auth user)
    // This is a lightweight sign-up without password
    const { data, error } = await supabaseClient.auth.signInAnonymously();

    if (error) {
      console.error('Guest sign-in error:', error);
    }

    // Update user metadata with email
    if (data && data.user) {
      await supabaseClient.auth.updateUser({
        data: { email_captured: email }
      });
    }

    // Show success
    document.getElementById('emailPopupForm').style.display = 'none';
    document.getElementById('emailPopupSuccess').style.display = 'block';

    setTimeout(() => {
      closeEmailPopup();
    }, 3000);

    return false;
  } catch (err) {
    console.error('Email capture error:', err);
    return false;
  }
}

// ============================================================
// DASHBOARD
// ============================================================
function showDashboard() {
  const dashboard = document.getElementById('dashboard');
  if (dashboard) {
    dashboard.classList.add('show');
    document.body.style.overflow = 'hidden';
    loadDashboardData();
  }
}

function closeDashboard() {
  const dashboard = document.getElementById('dashboard');
  if (dashboard) {
    dashboard.classList.remove('show');
    document.body.style.overflow = '';
  }
}

async function loadDashboardData() {
  const { data: session } = await supabaseClient.auth.getSession();

  if (!session || !session.session || !session.session.user) {
    return;
  }

  const user = session.session.user;
  const emailDisplay = document.getElementById('demoEmailDisplay');

  if (emailDisplay) {
    const name = user.email ? user.email.split('@')[0] : 'there';
    emailDisplay.textContent = name.charAt(0).toUpperCase() + name.slice(1);
  }

  populateLibrary();
}

function populateLibrary() {
  const grid = document.getElementById('libraryGrid');
  if (!grid) return;

  const items = [
    {
      title: 'Yield Strategy Guide',
      desc: 'Where to park cash, how to ladder rates, and when to move.',
      action: 'Read Guide'
    },
    {
      title: 'Web3 Risk Framework',
      desc: 'Learn to spot scams, understand audits, and position size safely.',
      action: 'Read Guide'
    },
    {
      title: 'Income Building Worksheet',
      desc: 'Interactive calculator for ladders, CDs, and diversification.',
      action: 'Open Tool'
    },
    {
      title: 'Monthly Rate Updates',
      desc: 'Every 30 days: highest yields, bank changes, and alerts.',
      action: 'View Updates'
    },
    {
      title: 'Community Q&A',
      desc: 'Ask questions in your member community or attend live calls.',
      action: 'Join Q&A'
    },
    {
      title: 'Portfolio Template',
      desc: 'Google Sheet template for tracking your accounts and yields.',
      action: 'Copy Template'
    }
  ];

  grid.innerHTML = items.map(item => `
    <div class="lib-item">
      <h4>${item.title}</h4>
      <p>${item.desc}</p>
      <a class="lib-action" onclick="openViewer('${item.title}', '${item.action}')">${item.action} →</a>
    </div>
  `).join('');
}

function logWin() {
  const amount = prompt('How much value did you capture or avoid? (e.g., 500 or 5000)');
  if (amount && !isNaN(amount)) {
    const current = parseFloat(document.getElementById('totalSavings').textContent.replace('$', '').replace(',', '')) || 0;
    const total = current + parseFloat(amount);
    document.getElementById('totalSavings').textContent = '$' + total.toLocaleString('en-US', { minimumFractionDigits: 0 });
  }
}

async function signOut() {
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    console.error('Sign-out error:', error);
  }
  closeDashboard();
  document.body.classList.remove('is-authed');
}

// ============================================================
// CONTENT VIEWER
// ============================================================
function openViewer(title, action) {
  const viewer = document.getElementById('contentViewer');
  if (!viewer) return;

  document.getElementById('viewerTitle').textContent = title;
  document.getElementById('viewerContent').innerHTML = `
    <div style="position: relative;">
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.15; font-size: 80px; font-weight: bold; letter-spacing: 20px;">
        WATERMARKED FOR ${document.getElementById('viewerLicenseEmail').textContent}
      </div>
      <div style="padding: 40px; line-height: 2;">
        <h2>${title}</h2>
        <p>This content is licensed exclusively to your account and cannot be shared or redistributed.</p>
        <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border-light);">
          Action: <strong>${action}</strong>
        </p>
        <p style="margin-top: 20px; color: var(--slate);">
          [Full content would render here in production — the watermark prevents copying and sharing outside your account]
        </p>
      </div>
    </div>
  `;

  viewer.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeViewer() {
  const viewer = document.getElementById('contentViewer');
  if (viewer) viewer.classList.remove('show');
  document.body.style.overflow = '';
}

// ============================================================
// BILLING & PRODUCT FUNCTIONS
// ============================================================
function setBilling(interval) {
  // Update all visible prices based on selected interval
  document.querySelectorAll('.billing-seg').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.billing === interval);
  });

  document.querySelectorAll('[class*="price-"]').forEach(el => {
    el.style.display = 'none';
  });

  document.querySelectorAll(`.price-${interval}, .price-period-${interval}`).forEach(el => {
    el.style.display = 'inline-block';
  });

  document.querySelectorAll('.annual-note').forEach(el => {
    el.style.display = interval === 'annual' ? 'block' : 'none';
  });
}

// ============================================================
// FAQ TOGGLE
// ============================================================
function toggleFaq(element) {
  const item = element.closest('.faq-item');
  if (!item) return;

  // Close all other items
  document.querySelectorAll('.faq-item.active').forEach(el => {
    if (el !== item) el.classList.remove('active');
  });

  // Toggle this item
  item.classList.toggle('active');
}

// ============================================================
// SIGNUP PLAN UI
// ============================================================
function updateSignupPlanUI() {
  const wantsPlan = document.querySelector('input[name="wantsPlan"]:checked')?.value || 'no';
  const purchaseMode = document.querySelector('input[name="purchaseMode"]:checked')?.value || 'single';

  document.getElementById('quizFields').style.display = wantsPlan === 'quiz' ? 'block' : 'none';
  document.getElementById('purchaseModeField').style.display = wantsPlan === 'yes' ? 'block' : 'none';
  document.getElementById('singlePlanFields').style.display = (wantsPlan === 'yes' && purchaseMode === 'single') ? 'block' : 'none';
  document.getElementById('stackPlanFields').style.display = (wantsPlan === 'yes' && purchaseMode === 'stack') ? 'block' : 'none';

  const submitBtn = document.getElementById('signupSubmitBtn');
  if (submitBtn) {
    const stackChecked = document.querySelectorAll('input[name="stackTier"]:checked').length > 0;
    const isValid = wantsPlan !== 'yes' || purchaseMode === 'single' || (purchaseMode === 'stack' && stackChecked);
    submitBtn.disabled = !isValid;
    if (!isValid) submitBtn.textContent = 'SELECT AT LEAST ONE TIER';
    else submitBtn.textContent = 'CREATE ACCOUNT';
  }
}

function updateQuizRecommendation() {
  const goal = document.getElementById('quizGoal').value;
  const depth = document.getElementById('quizDepth').value;
  const budget = document.getElementById('quizBudget').value;

  let recommendation = 'The Full Ledger';
  let note = 'A good middle ground if web3 questions are part of what brought you here.';

  if (budget === 'low') {
    recommendation = 'The Yield Map';
    note = 'Perfect start for cash placement. Upgrade later if you want deeper web3 or income guidance.';
  } else if (budget === 'high' && depth === 'deep') {
    recommendation = 'All-Access';
    note = 'Everything at once — all tiers, all calls, complete depth. No surprises later.';
  } else if (goal === 'build-income') {
    recommendation = 'The Annotated Portfolio';
    note = 'Designed exactly for income building. Includes monthly calls and deeper strategy.';
  }

  document.getElementById('quizResultName').textContent = recommendation;
  document.getElementById('quizResultNote').textContent = note;
}

function applyQuizRecommendation() {
  const recommendation = document.getElementById('quizResultName').textContent;
  const tierMap = {
    'The Yield Map': '1',
    'The Full Ledger': '2',
    'The Annotated Portfolio': '3',
    'All-Access': '4'
  };

  document.getElementById('signupTier').value = tierMap[recommendation] || '2';
  document.querySelector('input[name="wantsPlan"][value="yes"]').checked = true;
  updateSignupPlanUI();
}

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile nav
  initMobileNav();

  // Initialize billing to monthly
  setBilling('monthly');

  // Show email popup on first visit (check localStorage)
  const hasVisited = localStorage.getItem('ledger_has_visited');
  if (!hasVisited) {
    localStorage.setItem('ledger_has_visited', 'true');
    // Delay to avoid interfering with page load
    setTimeout(openEmailPopup, 1000);
  }

  // Check auth status on load
  supabaseClient.auth.getSession().then(function(res) {
    if (res.data.session) {
      document.body.classList.add('is-authed');
    }
  });

  // Watch for auth state changes
  supabaseClient.auth.onAuthStateChange(function(event, session) {
    if (event === 'SIGNED_OUT') {
      document.body.classList.remove('is-authed');
    } else if (session) {
      document.body.classList.add('is-authed');
    }
  });

  // Close modals on overlay click
  document.getElementById('authModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeAuthModal();
  });

  document.getElementById('emailPopup')?.addEventListener('click', function(e) {
    if (e.target === this) closeEmailPopup();
  });

  document.getElementById('contentViewer')?.addEventListener('click', function(e) {
    if (e.target === this) closeViewer();
  });
});

// ============================================================
// GLOBAL NAMESPACE (for inline event handlers)
// ============================================================
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchAuthView = switchAuthView;
window.handleSignIn = handleSignIn;
window.handleSignUp = handleSignUp;
window.handleResetRequest = handleResetRequest;
window.handleEmailCapture = handleEmailCapture;
window.openEmailPopup = openEmailPopup;
window.closeEmailPopup = closeEmailPopup;
window.showDashboard = showDashboard;
window.closeDashboard = closeDashboard;
window.signOut = signOut;
window.logWin = logWin;
window.openViewer = openViewer;
window.closeViewer = closeViewer;
window.setBilling = setBilling;
window.toggleFaq = toggleFaq;
window.updateSignupPlanUI = updateSignupPlanUI;
window.updateQuizRecommendation = updateQuizRecommendation;
window.applyQuizRecommendation = applyQuizRecommendation;
