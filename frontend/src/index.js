import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { BrowserRouter, Route, Routes , useNavigate  } from 'react-router-dom';
import Dashboard from './components/dashboard';
import  Login  from './components/login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <ThemeProvider theme={theme}>
    <BrowserRouter>
     
        <Routes >
          <Route exact path="/" element={<App/>} />
          <Route exact path="/Dashboard" element={<Dashboard/>} />
        </Routes >
      </BrowserRouter>

    </ThemeProvider>
  </React.StrictMode>
);



