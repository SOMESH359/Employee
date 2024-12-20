import React, { useState, useEffect } from 'react';

function EmployeeList() {
  const [employees, setEmployees] = useState([]); // To store the employee data
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To handle any errors

  // Fetch data from the API
  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get-all-employee'); // API endpoint

      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }

      const data = await response.json();

      if (data.sucess) {
        setEmployees(data.data); // Set the fetched data to state
      } else {
        throw new Error(data.msg || 'Unknown error');
      }
    } catch (err) {
      setError(err.message); // Set the error message
    } finally {
      setLoading(false); // Loading is complete
    }
  };

  // Fetch employees when the component mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="employee-list">
      <h2>Employee List</h2>

      {loading && <p>Loading...</p>} {/* Show loading indicator */}

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error if any */}

      {!loading && !error && employees.length === 0 && (
        <p>No employees found.</p>
      )} {/* Show message if no employees */}

      {!loading && employees.length > 0 && (
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Date of Joining</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.f_name}</td>
                <td>{employee.n_name}</td>
                <td>{employee.email}</td>
                <td>{employee.ph}</td>
                <td>{employee.dept}</td>
                <td>{employee.date}</td>
                <td>{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )} {/* Display data in a table */}
    </div>
  );
}

export default EmployeeList;
