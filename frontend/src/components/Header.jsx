import {
  Link
} from 'react-router-dom'
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUserAlt
} from 'react-icons/fa'

function Header () {
  return (
    <header>
      <div className='logo'>
        <Link to='/'>Taskman</Link>
      </div>
      <ul>
        <li>
          <Link to='/login'>
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          <Link to='/signup'>
            <FaUserAlt /> Signup
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header