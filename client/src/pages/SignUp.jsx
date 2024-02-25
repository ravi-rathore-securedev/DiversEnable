import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import Headlogo from '../../assets/HeadLogo.jpg';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className='  min-h-screen mt-20'>
      <div className='  flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center '>
        {/* left */}
        <div className='flex-1 '>
        <Link
        to='/'
        className='  sm:w-2/3 w-1/2 m-auto whitespace-nowrap text-sm sm:text-xl font-bold dark:text-white flex'
      >
        <span className='py-1 rounded-lg px-1 '>
      <img src={Headlogo} alt='logo' className=' sm:block hidden w-12 h-12 rounded-full justify-center ' />
        </span>
        <h4 className='  py-3 sm:text-2xl text-3xl text-indigo-500 '>
  Diverse Enable
</h4>
      </Link>
          <p className='text-sm '>
          <img  className='h-80 w-60 border-purple-400 rounded-lg  mt-3 pb-1 m-auto' src='https://images.pexels.com/photos/8127978/pexels-photo-8127978.jpeg?auto=compress&cs=tinysrgb&w=600' alt='logo' />
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>
        
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='mt-20'>
              <Label value='Your username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
