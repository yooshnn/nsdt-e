import * as db from './database';

/*
const testFun = async () => {
  const time = new Date().toLocaleString('sv');
  await chrome.runtime.sendMessage({
    action: 'DB_WRITE',
    param: {
      store: 'APP',
      value: time,
      key: 'latestUpdate',
    },
  });
  const res = await chrome.runtime.sendMessage({
    action: 'DB_READ',
    param: {
      store: 'APP',
      key: 'latestUpdate',
    },
  });
  setLatestUpdate(res);
};
*/

chrome.runtime.onInstalled.addListener((details) => {
  switch (details.reason) {
    case 'install':
      db.init();
      break;
  }
});

const asyncWrapper = (listener) => (message, sender, sendResponse) => {
  Promise.resolve(listener(message, sender)).then(sendResponse);
  return true;
};

chrome.runtime.onMessage.addListener(
  asyncWrapper(async (message, sender) => {
    console.log('@ background.jsx', message);
    switch (message.action) {
      case 'OPEN_OPTIONS_PAGE':
        await chrome.runtime.openOptionsPage();
        return true;
      case 'APPLY_TEMPLATE': {
        return;
      }
      case 'DB_READ': {
        const { store, key = null } = message.param;
        const res = await dbRead(store, key);
        return res;
      }
      case 'DB_WRITE': {
        const { store, value, key = null } = message.param;
        const res = await dbWrite(store, value, key);
        return res;
      }
      case 'DB_WRITE_MULTIPLE': {
        const { store, data } = message.param;
        const res = await dbWriteMultiple(store, data);
        return res;
      }
      case 'DB_ERASE': {
        const { store, key } = message.param;
        const res = await dbErase(store, key);
        return res;
      }
    }
  })
);

const applyTemplate = (config, query) => {
  console.log(config, query);
};

const dbWrite = async (store, value, key = null) => {
  const res = await db.write(store, value, key);
  return res;
};

const dbWriteMultiple = async (store, data) => {
  const res = await db.writeMultiple(store, data);
  return res;
};

const dbRead = async (store, key = null) => {
  const res = await db.read(store, key);
  return res;
};

const dbErase = async (store, key) => {
  const res = await db.erase(store, key);
  return res;
};
