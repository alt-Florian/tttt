import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CustomLinkProps {
  to: string | (() => string);
  children: React.ReactNode;
  className?: string;
  openInNewTab?: boolean;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  to,
  children,
  className = '',
  openInNewTab = false
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Permet le comportement natif si :
    // - La touche Ctrl (Windows) ou Cmd (Mac) est pressée
    // - Le clic milieu est utilisé (e.button === 1)
    // - openInNewTab est true
    if (e.ctrlKey || e.metaKey || e.button === 1 || openInNewTab) {
      return;
    }

    // Empêche le comportement par défaut du navigateur
    e.preventDefault();
    
    // Vérifie si to est une fonction de callback
    if (typeof to === 'function') {
       navigate(to());
    } else {
      // Sinon utilise navigate pour la navigation programmatique
      navigate(to);
    }
  };

  // Détermine l'attribut href en fonction du type de 'to'
  const getHref = (): string => {
      return typeof to === 'function' ? to() : to;
  };

  return (
    <a
      href={getHref()}
      className={className}
      onClick={handleClick}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      onAuxClick={handleClick}
    >
      {children}
    </a>
  );
};

export default CustomLink;