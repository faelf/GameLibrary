export const firebase = {
  app: "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js",
  Database: "Firestore",
  Firestore: {
    ConfigKey: "game-collection-firebase",
    url: "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js",
  },
};

export const database = {
  Key: "game-collection-storage",
  Default: "Local Storage",
  LocalStorage: "Local Storage",
  Firestore: "Firestore",
};

export function init() {
  if (!localStorage.getItem(database.Key)) {
    localStorage.setItem(database.Key, database.Default);
  }
}

export function getStorage() {
  return localStorage.getItem(database.Key) ?? database.Default;
}

export async function getFirestore() {
  const [firebaseApp, firestore] = await Promise.all([
    import(firebase.app),
    import(firebase.Firestore.url),
  ]);

  const configStr = localStorage.getItem(firebase.Firestore.ConfigKey);
  if (!configStr) {
    throw new Error("Firebase configuration not found.");
  }

  const config = JSON.parse(configStr);
  const app = firebaseApp.initializeApp(config);
  const db = firestore.getFirestore(app);

  return { db, ...firestore };
}

export async function load(collectionName) {
  if (getStorage() === database.LocalStorage) {
    try {
      const storedData = localStorage.getItem(collectionName);
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error("Local Storage parse error:", error);
      return [];
    }
  }

  if (getStorage() === database.Firestore) {
    const { db, collection, getDocs } = await getFirestore();
    const col = collection(db, collectionName);
    const snapshot = await getDocs(col);

    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  }

  return [];
}

export async function get(collectionName, itemId) {
  if (getStorage() === database.LocalStorage) {
    const items = await load(collectionName);
    return items.find((item) => item.id == itemId);
  }

  if (getStorage() === database.Firestore) {
    const { db, doc, getDoc } = await getFirestore();
    const docRef = doc(db, collectionName, itemId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  }
}

export async function add(collectionName, data) {
  if (getStorage() === database.LocalStorage) {
    const items = await load(collectionName);
    const newItem = {
      id: String(Date.now() + Math.floor(Math.random() * 1000)),
      ...data,
    };
    items.push(newItem);
    save(collectionName, items);
    return newItem;
  }

  if (getStorage() === database.Firestore) {
    const { db, collection, addDoc } = await getFirestore();
    const col = collection(db, collectionName);
    const { id, ...dataToSave } = data;
    const docRef = await addDoc(col, dataToSave);
    return { id: docRef.id, ...dataToSave };
  }
}

export async function update(collectionName, itemId, updates) {
  if (getStorage() === database.LocalStorage) {
    const items = await load(collectionName);
    const itemIndex = items.findIndex((item) => item.id == itemId);
    if (itemIndex === -1) return false;
    items[itemIndex] = { ...items[itemIndex], ...updates };
    save(collectionName, items);
    return true;
  }

  if (getStorage() === database.Firestore) {
    const { db, doc, updateDoc } = await getFirestore();
    const docRef = doc(db, collectionName, itemId);
    await updateDoc(docRef, updates);
    return true;
  }
}

export async function remove(collectionName, itemId) {
  if (getStorage() === database.LocalStorage) {
    const items = await load(collectionName);
    const filteredItems = items.filter((item) => item.id != itemId);
    save(collectionName, filteredItems);
    return true;
  }

  if (getStorage() === database.Firestore) {
    const { db, doc, deleteDoc } = await getFirestore();
    const docRef = doc(db, collectionName, itemId);
    await deleteDoc(docRef);
    return true;
  }
}

export async function exists(collectionName, itemId) {
  return Boolean(await get(collectionName, itemId));
}

export function save(key, values) {
  localStorage.setItem(key, JSON.stringify(values));
}
