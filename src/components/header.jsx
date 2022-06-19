import { defaultState } from '../features/auth/reducers/authSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import BreadCrumbs from './breadCrumbs';
const header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    dispatch(defaultState());
    navigate('/');
  };
  return (
    <header className='header mainHeader'>
      <div className='container-fluid'>
        <div className='top-header d-flex justify-content-between align-items-end'>
          <BreadCrumbs />
          <div className='d-inline-block'>
            <Dropdown
              className='bg-transparent'
              style={{ padding: '0px', margin: '5px 15px 5px 0px' }}
            >
              <Dropdown.Toggle className='header-dropdown d-flex gap-2 align-items-center'>
                <span>{localStorage.getItem('username')}</span>
                <span>
                  <i className='uil uil-user-circle'></i>
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className='header__dropdown-menu'>
                <Dropdown.Item
                  onClick={logout}
                  role={'button'}
                  className='nav-link'
                >
                  <i className='uil uil-signout' />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
};

export default header;
