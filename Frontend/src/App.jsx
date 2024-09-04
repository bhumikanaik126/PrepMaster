import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginComponent } from '../Components/LoginComponent';
import { SignupComponent } from '../Components/SignupComponent'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/users/signup" element={<SignupComponent />} /> {/* Added SignupComponent */}
      </Routes>
    </Router>
  );
}

export default App;
