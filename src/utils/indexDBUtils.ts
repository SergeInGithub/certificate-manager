export const openDB = (dbName: string, version: number) => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, version);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('certificates')) {
        db.createObjectStore('certificates', {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const addCertificate = async (
  dbName: string,
  version: number,
  data: any,
) => {
  const db = await openDB(dbName, version);
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction('certificates', 'readwrite');
    const store = transaction.objectStore('certificates');
    const request = store.add(data);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const fetchCertificates = async (dbName: string, version: number) => {
  const db = await openDB(dbName, version);
  return new Promise<any[]>((resolve, reject) => {
    const transaction = db.transaction('certificates', 'readonly');
    const store = transaction.objectStore('certificates');
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};