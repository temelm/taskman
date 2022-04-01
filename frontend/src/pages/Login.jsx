import {
  useState,
  useEffect
} from 'react'
import {
  FaSignInAlt
} from 'react-icons/fa'
import {
  useSelector,
  useDispatch
} from 'react-redux'
import {
  useNavigate
} from 'react-router-dom'
import {
  toast
} from 'react-toastify'
import {
  loginUser,
  reset
} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login () {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {
    email,
    password,
  } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    user,
    isLoading,
    isSuccess,
    isFailure,
    message
  } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isFailure) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [user, isSuccess, isFailure, message, navigate, dispatch])

  const onChange = (event) => {
    setFormData((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value
    }))
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(loginUser(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
      </section>
      <section>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input type='email' id='email' name='email' value={email}
              placeholder='Please enter your email.' onChange={onChange} />
          </div>
          <div className='form-group'>
            <input type='password' id='password' name='password' value={password}
              placeholder='Please enter your password.' onChange={onChange} />
          </div>
          <div className='form-group'>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login