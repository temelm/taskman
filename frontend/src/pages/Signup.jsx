import {
  useState,
  useEffect
} from 'react'
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
  FaUserAlt
} from 'react-icons/fa'
import {
  createUser,
  reset
} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Signup () {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const {
    email,
    password,
    confirmPassword
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

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.')
    } else {
      const userData = {
        email,
        password
      }

      dispatch(createUser(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUserAlt /> Signup
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
            <input type='password' id='confirmPassword' name='confirmPassword'
              value={confirmPassword} placeholder='Please confirm your password.'
              onChange={onChange} />
          </div>
          <div className='form-group'>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Signup