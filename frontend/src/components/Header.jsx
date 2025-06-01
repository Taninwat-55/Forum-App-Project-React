import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className='header'>
      <div className='container'>
        <Link to='/'>
          <h1>Forum App</h1>
        </Link>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/new-thread'>New Thread</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
