import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div>
      {pathnames.length > 0 && (
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {pathnames.map((name, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isLast = index === pathnames.length - 1;
              return (
                <li key={index}>
                  <Link to={routeTo}>{name}</Link>
                  {!isLast && <span>&gt;</span>}
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Breadcrumbs;