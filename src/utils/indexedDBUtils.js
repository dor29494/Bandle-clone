// src/utils/indexedDBUtils.js
const dbName = "songDB";
const storeName = "playedSongs";

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        const objectStore = db.createObjectStore(storeName, {
          keyPath: ["songId", "categoryId"],
        });
        objectStore.createIndex("categoryId", "categoryId", { unique: false });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

const addPlayedSong = async (songId, categoryId) => {
  const db = await openDB();
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);

  const data = { songId, categoryId };
  store.add(data);

  return transaction.complete;
};

const getPlayedSongsByCategory = async (categoryId) => {
  const db = await openDB();
  const transaction = db.transaction(storeName, "readonly");
  const store = transaction.objectStore(storeName);
  const index = store.index("categoryId");

  return new Promise((resolve, reject) => {
    const request = index.getAll(categoryId);

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

const clearPlayedSongsByCategory = async (categoryId) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const index = store.index("categoryId");

    const request = index.openCursor(IDBKeyRange.only(categoryId));

    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        cursor.delete(); // Deletes the current record.
        cursor.continue(); // Move to the next record.
      }
    };

    transaction.oncomplete = () => resolve();
    transaction.onerror = (event) => reject(event.target.error);
    transaction.onabort = (event) => reject(event.target.error);
  });
};

export { addPlayedSong, getPlayedSongsByCategory, clearPlayedSongsByCategory };
