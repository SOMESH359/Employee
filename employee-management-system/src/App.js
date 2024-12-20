import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'; // Import necessary components from react-router-dom
import AddEmployeeForm from './components/AddEmployeeForm'; // Import the AddEmployeeForm component
import EmployeeList from './components/Viewemp';
function App() {
  const navigate = useNavigate(); // Hook to navigate between routes

  return (
    <div className="app">
      <Routes>
        {/* This route will render the home page with buttons */}
        <Route 
          path="/" 
          element={
            <div className="home-page">
              <h1>Employee Management System</h1>
              <button onClick={() => navigate('/add-employee')}>Add Employee</button>
              <button onClick={() => navigate('/view-employee')}>View Employee</button>
            </div>
          }
        />

        {/* This route will render only the AddEmployeeForm when navigating to /add-employee */}
        <Route path="/add-employee" element={<AddEmployeeForm />} />
        
        {/* Route for View Employee feature */}
        <Route path="/view-employee" element={<EmployeeList/>} />
      </Routes>
    </div>
  );
}

export default App;

