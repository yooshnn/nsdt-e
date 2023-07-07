import React from 'react';
import ReactDOM from 'react-dom/client';

import Mypage from '../components/Mypage';

const crxroot = document.createElement('div');
crxroot.id = 'crx-root';
crxroot.style.width = '100%';

const position = document.getElementsByClassName('row')[1];
position.prepend(crxroot);

ReactDOM.createRoot(crxroot).render(
  <React.StrictMode>
    <Mypage />
  </React.StrictMode>
);
