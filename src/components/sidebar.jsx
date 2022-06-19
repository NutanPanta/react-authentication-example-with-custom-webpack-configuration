import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Logo from '../assets/images/logo.png';

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div id='mainSideBar' className='sidebar hideSideBar bg-white'>
      <div className='sidebarWrapper'>
        <Link to={'/home'}>
          <div className='logo'>
            <img src={Logo} alt='Logo' />
          </div>
        </Link>
        <ul className='sidebar__nav nav'>
          <Link
            to='/home'
            className={`sidebar__nav__item nav-link ${
              pathname === '/home' ? 'active' : null
            }`}
          >
            <FontAwesomeIcon icon={solid('file-lines')} />
            Home
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
