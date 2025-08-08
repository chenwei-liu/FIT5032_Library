<template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model="email"/></p>
  <p><input type="password" placeholder="Password" v-model="password"/></p>
  <p><button @click="signin">Sign in via Firebase</button></p>
  <!-- <p v-if="role != ''">Welcome {{ role }} login in!</p> -->
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
// const role = ref("")
const router = useRouter();
const auth = getAuth();
const db = getFirestore();

const signin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    const userDocRef = doc(db, "users", user.uid)
    const userDocSnap = await getDoc(userDocRef)

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data()
      const role = userData.role
      console.log("User role:", role)
      console.log(auth.currentUser)
      router.push('/')
    }
  } catch (error) {
    console.error("Login failed:", error.code, error.message)
  }
}
</script>

