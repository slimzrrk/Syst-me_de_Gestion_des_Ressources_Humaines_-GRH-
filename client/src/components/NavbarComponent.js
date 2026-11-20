import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated, getUsername, clearSession } from '../auth';

const NavbarComponent = () => {
  const navigate = useNavigate();
  useLocation(); // ré-affiche le menu à chaque changement de page (connexion / déconnexion)
  const loggedIn = isAuthenticated();

  const logout = () => {
    clearSession();
    navigate('/auth');
  };

  return (
    <nav>
      <span className="brand">GRH</span>
      <ul>
        {loggedIn ? (
          <>
            <li><NavLink to="/" end>Accueil</NavLink></li>
            <li><NavLink to="/employees">Employés</NavLink></li>
            <li><NavLink to="/leave">Congés</NavLink></li>
            <li><NavLink to="/absences">Absences</NavLink></li>
            <li><NavLink to="/attendance">Pointage</NavLink></li>
          </>
        ) : (
          <>
            <li><NavLink to="/auth">Connexion</NavLink></li>
            <li><NavLink to="/register">Inscription</NavLink></li>
          </>
        )}
      </ul>
      {loggedIn && (
        <div className="nav-user">
          <span>{getUsername()}</span>
          <button type="button" className="btn-small btn-secondary" onClick={logout}>Déconnexion</button>
        </div>
      )}
    </nav>
  );
};

export default NavbarComponent;
