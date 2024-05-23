import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import HomePage from './pages/HomePage';
import EmployeePage from './pages/EmployeePage';
import LeavePage from './pages/LeavePage';
import AbsencePage from './pages/AbsencePage';
import AttendancePage from './pages/AttendancePage';
import AuthPage from './pages/AuthPage';
import RegisterPage from './pages/RegisterPage';
import EmployeeComponent from './components/EmployeeComponent';
import AddEmployeePage from './pages/AddEmployeePage';
import AddLeavePage from './pages/AddLeavePage';
import AddAbsencePage from './pages/AddAbsencePage';
import AddAttendancePage from './pages/AddAttendancePage ';
import UpdateAttendancePage from './pages/updateAttendancePage';
import UpdateAbsencePage from './pages/updateAbsencePage';
import UpdateEmployeePage from './pages/updateEmployee';
import UpdateLeavePage from './pages/updateLeavePAge';

const App = () => {
  return (
    <Router>
      <div>
        <NavbarComponent />
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route path="/employees" element={<EmployeePage/>} />
          <Route path="/leave" element={<LeavePage/>} />
          <Route path="/absences" element={<AbsencePage/>} />
          <Route path="/attendance" element={<AttendancePage/>} />
          <Route path="/auth" element={<AuthPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/addEmployee" element={<AddEmployeePage />} />
          <Route path="/addLeave" element={<AddLeavePage />} />
          <Route path="/addAbsence" element={<AddAbsencePage />} />
          <Route path="/addAttendance" element={<AddAttendancePage />} />

          <Route path="/updateEmployee/:id" element={<UpdateEmployeePage />} />
          <Route path="/updateLeave/:id" element={<UpdateLeavePage />} />
          <Route path="/updateAttendance/:id" element={<UpdateAttendancePage />} />
          <Route path="/updateAbsence/:id" element={<UpdateAbsencePage />} />
          

          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
