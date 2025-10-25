// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
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
  "alice@gmail.com",
  "bob@yahoo.com",
  "isa@myhla.org"
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
// 5. Handle login button
// -------------------------
document.getElementById("loginBtn").onclick = async () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  try {
    await signInWithEmailAndPassword(auth, email, pass);
  } catch (err) {
    document.getElementById("error").style.display = "block";
  }
};

// -------------------------
// 6. Redirect after login
// -------------------------
onAuthStateChanged(auth, async (user) => {
  if (user) {
    let isPremium = false;

    // Check hard‑coded list
    if (USE_HARDCODED_LIST && premiumEmails.includes(user.email)) {
      isPremium = true;
    }

    // Check Firestore list
    if (USE_FIRESTORE_LIST && await checkPremium(user.uid)) {
      isPremium = true;
    }

    // Redirect based on result
    if (isPremium) {
      window.location.href = "premium.html";
    } else {
      window.location.href = "limited.html";
    }
  }
});

