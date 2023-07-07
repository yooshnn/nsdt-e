import React from 'react';
import ReactDOM from 'react-dom/client';

import LeveltableMake from '../components/LeveltableMake';

const crxroot = document.createElement('div');
crxroot.id = 'crx-root';
crxroot.style.width = '100%';

const position =
  document.getElementsByClassName('container-fluid')[0].children[1];
position.insertAdjacentElement('beforebegin', crxroot);

ReactDOM.createRoot(crxroot).render(
  <React.StrictMode>
    <LeveltableMake />
  </React.StrictMode>
);
