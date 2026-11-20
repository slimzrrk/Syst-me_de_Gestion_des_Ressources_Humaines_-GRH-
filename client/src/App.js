import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import EmployeePage from './pages/EmployeePage';
import LeavePage from './pages/LeavePage';
import AbsencePage from './pages/AbsencePage';
import AttendancePage from './pages/AttendancePage';
import AuthPage from './pages/AuthPage';
import RegisterPage from './pages/RegisterPage';
import AddEmployeePage from './pages/AddEmployeePage';
import AddLeavePage from './pages/AddLeavePage';
import AddAbsencePage from './pages/AddAbsencePage';
import AddAttendancePage from './pages/AddAttendancePage';
import UpdateAttendancePage from './pages/updateAttendancePage';
import UpdateAbsencePage from './pages/updateAbsencePage';
import UpdateEmployeePage from './pages/updateEmployee';
import UpdateLeavePage from './pages/updateLeavePAge';

// Pages accessibles uniquement après connexion
const privateRoutes = [
  ['/', HomePage],
  ['/employees', EmployeePage],
  ['/leave', LeavePage],
  ['/absences', AbsencePage],
  ['/attendance', AttendancePage],
  ['/addEmployee', AddEmployeePage],
  ['/addLeave', AddLeavePage],
  ['/addAbsence', AddAbsencePage],
  ['/addAttendance', AddAttendancePage],
  ['/updateEmployee/:id', UpdateEmployeePage],
  ['/updateLeave/:id', UpdateLeavePage],
  ['/updateAttendance/:id', UpdateAttendancePage],
  ['/updateAbsence/:id', UpdateAbsencePage],
];

const App = () => (
  <Router>
    <NavbarComponent />
    <main className="container">
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {privateRoutes.map(([path, Page]) => (
          <Route key={path} path={path} element={<ProtectedRoute><Page /></ProtectedRoute>} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </Router>
);

export default App;
