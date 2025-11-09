// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// -------------------------
// 1. Firebase Config
// -------------------------
const firebaseConfig = {
  apiKey: "AIzaSyB38CCq1Qg5KSa3NNoNVWI9eMT-O1BSaZo",
  authDomain: "algebra2help-95863.firebaseapp.com",
  projectId: "algebra2help-95863",
  storageBucket: "algebra2help-95863.firebasestorage.app",
  messagingSenderId: "380121022411",
  appId: "1:380121022411:web:3cc18105c4d1bb76e0404e",
  measurementId: "G-HQ8G8VZ2SJ"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// -------------------------
// 2. Feature Toggles
// -------------------------
// Flip these true/false to enable or disable each method
const USE_HARDCODED_LIST = true;   // set to false to ignore the email list
const USE_FIRESTORE_LIST = false;  // set to false to ignore Firestore

// -------------------------
// 3. Hard‑coded premium emails
// -------------------------
const premiumEmails = [
  "isaemirtm@gmail.com",
  "isa@myhla.org",
  "8023775@student.harmonytx.org",
  "8001399@student.harmonytx.org",
  "8001399@student.harmonytx.org"
];

// -------------------------
// 4. Firestore premium check
// -------------------------
async function checkPremium(uid) {
  const ref = doc(db, "premiumUsers", uid);
  const snap = await getDoc(ref);
  return snap.exists();
}

// -------------------------
// 5. Handle email/password login
// -------------------------
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.onclick = async () => {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err) {
      document.getElementById("error").style.display = "block";
    }
  };
}

// -------------------------
// 6. Handle Google login
// -------------------------
const googleBtn = document.getElementById("googleLoginBtn");
if (googleBtn) {
  googleBtn.onclick = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      document.getElementById("error").style.display = "block";
    }
  };
}

// -------------------------
// 7. Redirect after login
// -------------------------
onAuthStateChanged(auth, async (user) => {
  if (user) {
    let isPremium = false;

    if (USE_HARDCODED_LIST && premiumEmails.includes(user.email)) {
      isPremium = true;
    }
    if (USE_FIRESTORE_LIST && await checkPremium(user.uid)) {
      isPremium = true;
    }

    const currentPage = window.location.pathname;

      // Determine the current filename (empty string for root '/').
      const page = currentPage.substring(currentPage.lastIndexOf('/') + 1);

      // Only auto-redirect when the user just landed on the login/root page
      // (i.e. index.html or the site root). This prevents forcing navigation
      // when the user intentionally visits other pages while signed in.
      const arrivedAtLogin = page === '' || page === 'index.html';

      if (arrivedAtLogin) {
        if (isPremium) {
          window.location.href = "premium.html";
        } else {
          window.location.href = "limited.html";
        }
      }
  } else {
    // If not logged in and not already on index.html, send back to login
    const currentPage = window.location.pathname;
    if (!currentPage.endsWith("index.html")) {
      window.location.href = "index.html";
    }
  }
});

