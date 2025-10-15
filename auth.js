import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 1. Your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 2. Premium check
async function checkPremium(uid) {
  const ref = doc(db, "premiumUsers", uid);
  const snap = await getDoc(ref);
  return snap.exists();
}

// 3. Handle login button
document.getElementById("loginBtn").onclick = async () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  try {
    await signInWithEmailAndPassword(auth, email, pass);
  } catch (err) {
    document.getElementById("error").style.display = "block";
  }
};

// 4. Redirect after login
onAuthStateChanged(auth, async (user) => {
  if (user) {
    if (await checkPremium(user.uid)) {
      window.location.href = "premium.html";
    } else {
      window.location.href = "limited.html";
    }
  }
});
