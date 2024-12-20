import React, { useState } from 'react';

function AddEmployeeForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    employeeId: '',
    email: '',
    phone: '',
    department: '',
    dateOfJoining: '',
    role: '',
  });

  const [errors, setErrors] = useState({}); 

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value) {
          error = 'This field is required';
        } else if (/\d/.test(value)) {
          error = 'Only text allowed';
        } else if (!/^[A-Z][a-zA-Z]*$/.test(value)) {
          error = 'Must start with a capital letter and contain only letters';
        }
        break;
      case 'employeeId':
        if (!value) error = 'This field is required';
        else if (!/^[a-zA-Z0-9]{4,}$/.test(value)) error = 'Must contain at least 4 letters or numbers';
        break;
      case 'email':
        if (!value) error = 'This field is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format';
        break;
      case 'phone':
        if (!value) error = 'This field is required';
        else if (!/^\d{10}$/.test(value)) error = 'Must contain exactly 10 digits';
        break;
      case 'department':
      case 'role':
        if (!value) error = 'This field is required';
        else if (/[^a-zA-Z\s]/.test(value)) error = 'Only text allowed';
        break;
      case 'dateOfJoining':
        if (!value) error = 'This field is required';
        else if (new Date(value).getFullYear() < 1950) error = 'Year must not be before 1950';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Prevent submission if errors exist
    }

    const req = async () => {
      console.log(formData);
      const data = {
        fname: formData.firstName,
        nname: formData.lastName,
        email: formData.email,
        ph: formData.phone,
        empno: formData.employeeId,
        role: formData.role,
        dept: formData.department,
        date: formData.dateOfJoining,
      };
      try {
        await fetch("http://127.0.0.1:5000/create-employee", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } catch (e) {
        console.error(e);
      }
    };

    req();
    alert("Employee details are submitted");

    setFormData({
      firstName: '',
      lastName: '',
      employeeId: '',
      email: '',
      phone: '',
      department: '',
      dateOfJoining: '',
      role: '',
    });
    setErrors({});
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      employeeId: '',
      email: '',
      phone: '',
      department: '',
      dateOfJoining: '',
      role: '',
    });
    setErrors({});
  };

  return (
    <div className="add-employee-form">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label> {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          style={{ borderColor: errors.firstName ? 'red' : '' }}
        />

        <label>Last Name:</label>{errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          style={{ borderColor: errors.lastName ? 'red' : '' }}
        />

        <label>Employee ID:</label>{errors.employeeId && <span style={{ color: 'red' }}>{errors.employeeId}</span>}
        <input
          type="text"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleInputChange}
          style={{ borderColor: errors.employeeId ? 'red' : '' }}
        />

        <label>Email:</label> {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          style={{ borderColor: errors.email ? 'red' : '' }}
        />

        <label>Phone Number:</label>{errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          style={{ borderColor: errors.phone ? 'red' : '' }}
        />

        <label>Department:</label>{errors.department && <span style={{ color: 'red' }}>{errors.department}</span>}
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          style={{ borderColor: errors.department ? 'red' : '' }}
        />

        <label>Date of Joining:</label>{errors.dateOfJoining && <span style={{ color: 'red' }}>{errors.dateOfJoining}</span>}
        <input
          type="date"
          name="dateOfJoining"
          value={formData.dateOfJoining}
          onChange={handleInputChange}
          max={new Date().toISOString().split('T')[0]}
          style={{ borderColor: errors.dateOfJoining ? 'red' : '' }}
        />

        <label>Role:</label>{errors.role && <span style={{ color: 'red' }}>{errors.role}</span>}
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          style={{ borderColor: errors.role ? 'red' : '' }}
        />

        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset} style={{ marginLeft: '10px' }}>Reset</button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployeeForm;
