import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Loading from './components/Loading';
import TeacherForm from './components/TeacherSignup';
import StudentForm from './components/StudentSignup';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      setIsLoading(false);
    }, 2200); // Adjust the duration as needed
  }, []);

  return (
    <div id='main'>
      <Routes>
        {isLoading ? (
          <Route path='/*' element={<Loading/>} /> // Show Loading component for all routes
        ) : (
          <Route path='/' element={<RegistrationPage/>}>
            <Route index element={<Login/>} />
            <Route path='login' element={<Login/>} />
            <Route path='signup' element={<Signup/>} />
            <Route path='signup/teachers' element={<TeacherForm/>}/>
            <Route path='signup/students' element={<StudentForm/>}/>
          </Route>
        )}
        <Route path='*' element={<Navigate to='/' />} /> {/* Redirect to the appropriate route based on conditions */}
      </Routes>
    </div>
  );
}

export default App;
