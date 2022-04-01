import {
  useState,
  useEffect
} from 'react'
import {
  FaUserAlt
} from 'react-icons/fa'

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