import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase";

export default function Dashboard({ user }) {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const q = query(collection(db, "items"), where("uid", "==", user.uid));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [user]);

  const addItem = async () => {
    if (!text.trim()) return;
    try {
      await addDoc(collection(db, "items"), {
        text,
        uid: user.uid,
        createdAt: Date.now(),
      });
      setText("");
    } catch (err) {
      console.error("Error adding item:", err); // ← check browser console
    }
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };

  return (
    <div>
      <h2>Hello, {user.displayName}</h2>
      <img src={user.photoURL} alt="avatar" width={40} />
      <button onClick={() => signOut(auth)}>Logout</button>

      <hr />

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addItem()}
        placeholder="Add something..."
      />
      <button onClick={addItem}>Add</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => deleteItem(item.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
