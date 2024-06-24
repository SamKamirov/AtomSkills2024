import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = ({ onClick }) => {
  const handleSertificateClick = () => {

  };

  const handleThemeClick = () => {

  };

  return (
    <div>
      <div className='docs-container'>
        <ul className='docs-list'>
          <li className='doc-list__item' onClick={handleSertificateClick}>
            <Link to={'/sertificates'}>
              <h2 className='doc-title'>Сертификаты</h2>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h2 className='title title--topic'>Темы</h2>
      </div>
    </div>
  );
};
