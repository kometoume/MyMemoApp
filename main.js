"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB5ugHdUQIEaC2seNx5Xhr31izLvyp02HI",
  authDomain: "mymemoapp-55494.firebaseapp.com",
  projectId: "mymemoapp-55494",
  storageBucket: "mymemoapp-55494.firebasestorage.app",
  messagingSenderId: "62523408639",
  appId: "1:62523408639:web:c4f535a523659f96704cca",
};

// Firebaseアプリを初期化
const app = initializeApp(firebaseConfig);
// Cloud Firestoreサービスへの参照を取得
const db = getFirestore(app);

const memoDocRef = doc(db, "memos", "my-memo");

const text = document.getElementById("text");
const save = document.getElementById("save");
const clear = document.getElementById("clear");
const message = document.getElementById("message");

async function loadMemo() {
  try {
    const docSnap = await getDoc(memoDocRef);
    if (docSnap.exists()) {
      text.value = docSnap.data().content || "";
    } else {
      text.value = "";
    }
  } catch (e) {
    console.error("メモの読み込み中にエラーが発生しました: ", e);
  }
}

document.addEventListener("DOMContentLoaded", loadMemo);
save.addEventListener("click", async () => {
  message.classList.add("appear");
  setTimeout(() => {
    message.classList.remove("appear");
  }, 1000);

  try {
    await setDoc(memoDocRef, {
      content: text.value,
      timestamp: serverTimestamp(),
    });
    console.log("メモが正常に保存されました！");
  } catch (e) {
    console.error("メモの保存中にエラーが発生しました: ", e);
  }
});

// --- 「削除」ボタンがクリックされた時の処理 ---
clear.addEventListener("click", async () => {
  if (confirm("本当にメモを削除しますか？") === true) {
    text.value = "";
    try {
      await deleteDoc(memoDocRef);
      console.log("メモが正常に削除されました！");
    } catch (e) {
      console.error("メモの削除中にエラーが発生しました: ", e);
    }
  }
});
