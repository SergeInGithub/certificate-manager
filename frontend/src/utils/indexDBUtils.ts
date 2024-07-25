import { TSupplier, TUserApplicant } from '@types';

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
      if (!db.objectStoreNames.contains('suppliers')) {
        db.createObjectStore('suppliers', {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      console.error('openDB error:', request.error);
      reject(request.error);
    };
  });
};

export const getTransactionAndStore = async (
  dbName: string,
  version: number,
  storeName: string,
  mode: 'readwrite' | 'readonly' = 'readwrite',
): Promise<{ transaction: IDBTransaction; store: IDBObjectStore }> => {
  const db = await openDB(dbName, version);
  const transaction = db.transaction(storeName, mode);
  const store = transaction.objectStore(storeName);
  return { transaction, store };
};

//* Certificates-related functions

export const addCertificate = async (
  dbName: string,
  version: number,
  data: any,
) => {
  const { store } = await getTransactionAndStore(
    dbName,
    version,
    'certificates',
  );

  return new Promise<void>((resolve, reject) => {
    const request = store.add(data);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const fetchCertificates = async (dbName: string, version: number) => {
  const { store } = await getTransactionAndStore(
    dbName,
    version,
    'certificates',
    'readonly',
  );

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
  const { store } = await getTransactionAndStore(
    dbName,
    version,
    'certificates',
  );

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
  const { store } = await getTransactionAndStore(
    dbName,
    version,
    'certificates',
  );

  return new Promise<void>((resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

//* Suppliers-related functions

export const addSupplier = async (
  dbName: string,
  version: number,
  data: any,
) => {
  const { store } = await getTransactionAndStore(dbName, version, 'suppliers');

  return new Promise<void>((resolve, reject) => {
    const request = store.add(data);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

//! Just for storing the hardcoded suppliers at once - might delete later
export const addSuppliers = async (
  dbName: string,
  version: number,
  suppliers: any[],
) => {
  const { store } = await getTransactionAndStore(dbName, version, 'suppliers');

  return new Promise<void>((resolve, reject) => {
    const transaction = store.transaction;
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);

    suppliers.forEach((supplier) => {
      store.add(supplier);
    });
  });
};

export const fetchSuppliers = async (dbName: string, version: number) => {
  const { store } = await getTransactionAndStore(
    dbName,
    version,
    'suppliers',
    'readonly',
  );

  return new Promise<any[]>((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const initializeSuppliers = async (
  dbName: string,
  version: number,
  hardcodedSuppliers: TSupplier[],
) => {
  try {
    const existingSuppliers = await fetchSuppliers(dbName, version);

    const existingIndexes = new Set(
      existingSuppliers.map((supplier) => supplier.supplierIndex),
    );

    const suppliersToAdd = hardcodedSuppliers.filter(
      (supplier) => !existingIndexes.has(supplier.supplierIndex),
    );

    if (suppliersToAdd.length > 0) {
      await addSuppliers(dbName, version, suppliersToAdd);
    }
  } catch (error) {
    console.error('Error in initializeSuppliers:', error);
  }
};

export const searchSuppliers = async (
  dbName: string,
  version: number,
  name: string,
  index: string,
  city: string,
): Promise<TSupplier[]> => {
  const { store } = await getTransactionAndStore(
    dbName,
    version,
    'suppliers',
    'readonly',
  );
  return new Promise<TSupplier[]>((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => {
      const results = request.result.filter(
        (supplier: TSupplier) =>
          (name
            ? supplier.supplierName.toLowerCase().includes(name.toLowerCase())
            : true) &&
          (index
            ? supplier.supplierIndex.toString().includes(index.toLowerCase())
            : true) &&
          (city
            ? supplier.city.toLowerCase().includes(city.toLowerCase())
            : true),
      );
      resolve(results);
    };
    request.onerror = () => reject(request.error);
  });
};

//! Just for storing the hardcoded users at once - might delete later
export const addUsers = async (
  dbName: string,
  version: number,
  users: any[],
) => {
  const { store } = await getTransactionAndStore(dbName, version, 'users');
  return new Promise<void>((resolve, reject) => {
    const transaction = store.transaction;
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);

    users.forEach((user) => {
      const request = store.add(user);
      request.onerror = () => {
        reject(request.error);
      };
    });
  });
};

export const fetchUsers = async (dbName: string, version: number) => {
  const { store } = await getTransactionAndStore(
    dbName,
    version,
    'users',
    'readonly',
  );
  return new Promise<any[]>((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => {
      const results = request.result.filter(
        (user: TUserApplicant) =>
          (userName
            ? user.userLookupName.toLowerCase().includes(userName.toLowerCase())
            : true) &&
          (userFirstName
            ? user.userLookupFirstName
                .toLowerCase()
                .includes(userFirstName.toLowerCase())
            : true) &&
          (userId
            ? user.userLookupId.toLowerCase().includes(userId.toLowerCase())
            : true) &&
          (userDepartment
            ? user.userLookupDepartment
                .toLowerCase()
                .includes(userDepartment.toLowerCase())
            : true) &&
          (userPlant
            ? user.userLookupPlant
                .toLowerCase()
                .includes(userPlant.toLowerCase())
            : true),
      );
      resolve(results);
    };
    request.onerror = () => reject(request.error);
  });
};

export const searchUsers = async (
  dbName: string,
  version: number,
  userName: string,
  userFirstName: string,
  userId: string,
  userDepartment: string,
  userPlant: string,
): Promise<TUserApplicant[]> => {
  const { store } = await getTransactionAndStore(
    dbName,
    version,
    'users',
    'readonly',
  );
  return new Promise<TUserApplicant[]>((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => {
      const results = request.result.filter(
        (user: TUserApplicant) =>
          (userName
            ? user.userLookupName.toLowerCase().includes(userName.toLowerCase())
            : true) &&
          (userFirstName
            ? user.userLookupFirstName
                .toLowerCase()
                .includes(userFirstName.toLowerCase())
            : true) &&
          (userId
            ? user.userLookupId.toLowerCase().includes(userId.toLowerCase())
            : true) &&
          (userDepartment
            ? user.userLookupDepartment
                .toLowerCase()
                .includes(userDepartment.toLowerCase())
            : true) &&
          (userPlant
            ? user.userLookupPlant
                .toLowerCase()
                .includes(userPlant.toLowerCase())
            : true),
      );
      resolve(results);
    };
    request.onerror = () => reject(request.error);
  });
};

//! Just for storing the hardcoded users at once - might delete later
export const addUsers = async (
  dbName: string,
  version: number,
  users: any[],
) => {
  const { store } = await getTransactionAndStore(dbName, version, 'users');
  return new Promise<void>((resolve, reject) => {
    const transaction = store.transaction;
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);

    users.forEach((user) => {
      const request = store.add(user);
      request.onerror = () => {
        reject(request.error);
      };
    });
  });
};

export const fetchUsers = async (dbName: string, version: number) => {
  const { store } = await getTransactionAndStore(
    dbName,
    version,
    'users',
    'readonly',
  );
  return new Promise<any[]>((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};
