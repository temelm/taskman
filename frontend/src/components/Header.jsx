import {
  Link,
  useNavigate
} from 'react-router-dom'
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUserAlt
} from 'react-icons/fa'
import {
  userSelector,
  useDispatch,
  useSelector
} from 'react-redux'
import {
  logoutUser,
  reset
} from '../features/auth/authSlice'

function Header () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    user
  } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logoutUser())
    dispatch(reset())
    navigate('/login')
  }

  return (
    <header>
      <div className='logo'>
        <Link to='/'>Taskman</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>) : (
            <>
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
        </>)}
      </ul>
    </header>
  )
}

export default Header