// src/App.jsx
import React from 'react';
import Layout from './components/Layout';
import LandingPage from './sections/LandingPage';
import MessageSection from './sections/MessageSection';
// import EndSection from './sections/EndSection'; // Xóa dòng này
import './styles/index.css';
import './styles/variables.css';

function App() {
  return (
    <Layout>
      <LandingPage />
      <MessageSection />
      {/* <EndSection /> // Xóa dòng này */}
    </Layout>
  );
}

export default App;