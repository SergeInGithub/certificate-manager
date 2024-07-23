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

export const getTransactionAndStore = async (
  dbName: string,
  version: number,
  mode: 'readwrite' | 'readonly' = 'readwrite',
): Promise<{ transaction: IDBTransaction; store: IDBObjectStore }> => {
  const db = await openDB(dbName, version);
  const transaction = db.transaction('certificates', mode);
  const store = transaction.objectStore('certificates');
  return { transaction, store };
};

export const addCertificate = async (
  dbName: string,
  version: number,
  data: any,
) => {
  const { store } = await getTransactionAndStore(dbName, version);

  return new Promise<void>((resolve, reject) => {
    const request = store.add(data);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const fetchCertificates = async (dbName: string, version: number) => {
  const { store } = await getTransactionAndStore(dbName, version, 'readonly');

  return new Promise<any[]>((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const editCertificate = async (
  dbName: string,
  version: number,
  id: number,
  data: any,
) => {
  const { store } = await getTransactionAndStore(dbName, version);

  return new Promise<void>((resolve, reject) => {
    const request = store.put({ ...data, id });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const deleteCertificate = async (
  dbName: string,
  version: number,
  id: number,
) => {
  const { store } = await getTransactionAndStore(dbName, version);

  return new Promise<void>((resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
