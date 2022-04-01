import {
  useState,
  useEffect
} from 'react'
import {
  FaSignInAlt
} from 'react-icons/fa'

function Login () {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {
    email,
    password,
  } = formData

  const onChange = (event) => {
    setFormData((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value
    }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
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