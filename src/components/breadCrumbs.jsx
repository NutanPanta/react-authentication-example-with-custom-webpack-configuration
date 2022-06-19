import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useLocation, Link } from 'react-router-dom';

const BreadCrumb = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split('/').filter((path) => path);

  function capitalize(string) {
    let text = string.toLowerCase();
    return text.split(' ')[0] === 'csv'
      ? text.trim().slice(0, 3).toUpperCase() + text.slice(3)
      : text.trim()[0].toUpperCase() + text.slice(1);
  }

  return (
    <Breadcrumb>
      {pathnames.map((path, key) => {
        const routeTo = `/${pathnames.slice(0, key + 1).join('/')}`;
        return (
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{ to: routeTo }}
            key={key}
            className={`${
              key === 0
                ? `breadcrum-first-item active-bradcrumb`
                : 'breadcrum-last-item'
            }  `}
          >
            {capitalize(path.split('-').join(' '))}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};
// {`/${path}`}
export default BreadCrumb;
