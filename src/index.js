import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TimeAgo from 'javascript-time-ago'
import pt from 'javascript-time-ago/locale/pt-PT'
TimeAgo.addDefaultLocale(pt)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


