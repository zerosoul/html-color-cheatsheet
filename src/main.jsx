import React from 'react';
import ReactDOM from 'react-dom/client';
import CssColor from './CssColor';
import GlobalStyle from './Global.style';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <GlobalStyle />
    <CssColor />
  </>
);
