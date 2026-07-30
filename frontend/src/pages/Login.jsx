import React, { useState } from 'react'

const Login = () => {

  const [state, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
  }

  return (
    <div className='min-h-[80vh] flex items-center justify-center page-wrapper'>
      {/* Background Blobs */}
      <div className='fixed inset-0 pointer-events-none overflow-hidden'>
        <div className='blob blob-emerald w-96 h-96 top-20 -left-40'></div>
        <div className='blob blob-teal w-80 h-80 bottom-20 -right-20'></div>
      </div>

      <form onSubmit={onSubmitHandler} className='relative z-10 glass-card-static p-8 sm:p-10 w-full max-w-md animate-scaleIn'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-white' style={{ fontFamily: 'Inter, sans-serif' }}>
            {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className='text-slate-400 mt-2 text-sm'>
            {state === 'Sign Up' ? 'Sign up to book your first appointment' : 'Login to manage your appointments'}
          </p>
        </div>

        <div className='flex flex-col gap-5'>
          {/* Name Field */}
          {state === 'Sign Up' && (
            <div className='animate-fadeInUp'>
              <label className='text-slate-300 text-sm font-medium mb-1.5 block'>Full Name</label>
              <input
                className='input-dark'
                type="text"
                placeholder='Enter your full name'
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className='text-slate-300 text-sm font-medium mb-1.5 block'>Email</label>
            <input
              className='input-dark'
              type="email"
              placeholder='Enter your email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className='text-slate-300 text-sm font-medium mb-1.5 block'>Password</label>
            <input
              className='input-dark'
              type="password"
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          {/* Submit Button */}
          <button type='submit' className='gradient-btn w-full mt-2 py-3 text-base font-semibold'>
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </button>

          {/* Divider */}
          <div className='flex items-center gap-3'>
            <div className='flex-1 h-px bg-slate-700'></div>
            <span className='text-slate-500 text-xs'>OR</span>
            <div className='flex-1 h-px bg-slate-700'></div>
          </div>

          {/* Toggle */}
          <p className='text-center text-slate-400 text-sm'>
            {state === 'Sign Up'
              ? <>Already have an account? <span onClick={() => setState('Login')} className='text-emerald-400 hover:text-emerald-300 cursor-pointer font-medium transition-colors'>Login here</span></>
              : <>Create a new account? <span onClick={() => setState('Sign Up')} className='text-emerald-400 hover:text-emerald-300 cursor-pointer font-medium transition-colors'>Sign up here</span></>
            }
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login