import { openDB } from 'idb';

const dbName = 'NSDTeDB';
const version = 1;

export const init = () => {
  openDB(dbName, version, {
    upgrade(db) {
      db.createObjectStore('TEMPLATES', { keyPath: 'id' });
      db.createObjectStore('PLAYDATA', { keyPath: 'id' });
      db.createObjectStore('APP');
    },
  });
};

const open = async () => {
  const db = await openDB(dbName, version, {
    upgrade(db) {
      db.createObjectStore('TEMPLATES', { keyPath: 'id' });
      db.createObjectStore('PLAYDATA', { keyPath: 'id' });
      db.createObjectStore('APP');
    },
  });
  return db;
};

export const writeMultiple = async (store, data) => {
  console.log('@ database.jsx', data);

  const db = await open();
  const tx = db.transaction([store], 'readwrite');

  if (typeof data === 'object') {
    for (const [key, value] of Object.entries(data)) {
      tx.objectStore(store).put(value);
    }
  } else {
    for (const value of data) {
      tx.objectStore(store).put(value);
    }
  }

  db.close();
  return true;
};

export const write = async (store, value, key = null) => {
  const db = await open();

  if (key) {
    await db.put(store, value, key);
  } else {
    await db.put(store, value);
  }

  db.close();
  return true;

  /*
  switch (store) {
    case 'APP':
      if (!key) flag = false;
      else await db.put(store, value, key);
      break;
    case 'PLAYDATA':
      if (
        key ||
        typeof value !== 'object' ||
        !('code' in value && 'diff' in value)
      ) {
        flag = false;
      } else {
        key = value.code + '.' + value.diff;
        await db.put(store, value, key);
      }
      break;
    case 'TEMPLATES':
      if (key) flag = false;
      else {
        await db.put(store, value);
      }
  }

  db.close();
  return flag;
  */
};

export const read = async (store, key = null) => {
  const db = await open();
  const ret = key ? await db.get(store, key) : await db.getAll(store);
  console.log(ret);
  db.close();
  return ret;
};

export const erase = async (store, key) => {
  const db = await open();
  await db.delete(store, key);
  db.close();
  return true;
};
