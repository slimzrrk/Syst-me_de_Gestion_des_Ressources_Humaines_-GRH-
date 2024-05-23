import React from 'react';

const NavbarComponent = () => {
  return (
    <nav>
      <ul>
        <li><a href="/">Accueil</a></li>
        <li><a href="/employees">Employés</a></li>
        <li><a href="/leave">Congés</a></li>
        <li><a href="/absences">Absences</a></li>
        <li><a href="/attendance">Pointage</a></li>
        <li><a href="/auth">Connexion</a></li>
        <li><a href="/register">inscription</a></li>
      </ul>
    </nav>
  );
};

export default NavbarComponent;
