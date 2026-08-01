import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { User, Mail, Lock, Sparkles, ArrowRight } from 'lucide-react'

const Signup = () => {
    const { backendUrl, setToken } = useContext(AppContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            const response = await axios.post(`${backendUrl}/api/user/register`, {
                name, email, password
            })

            if (response.data.success) {
                setToken(response.data.token)
                localStorage.setItem('token', response.data.token)
                navigate('/')
            } else {
                // Error handled by toast in context
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='min-h-[75vh] flex items-center justify-center px-4 py-8'>
            <form
                onSubmit={onSubmitHandler}
                className='w-full max-w-md bg-white/90 backdrop-blur-xl border border-slate-100 p-8 rounded-3xl shadow-2xl shadow-blue-500/10 space-y-6'
            >
                {/* Header */}
                <div className='text-center space-y-2'>
                    <div className='inline-flex items-center justify-center p-3 rounded-2xl bg-blue-50 text-blue-600 mb-2'>
                        <Sparkles className='w-6 h-6' />
                    </div>
                    <h2 className='text-3xl font-extrabold text-slate-900 tracking-tight'>
                        Create Your Account
                    </h2>
                    <p className='text-slate-500 text-xs sm:text-sm'>
                        Join MedicoPlus to start booking appointments and managing your health records.
                    </p>
                </div>

                {/* Form Fields */}
                <div className='space-y-4 text-left'>
                    <div className='space-y-1.5'>
                        <label className='text-xs font-semibold text-slate-700 block'>Full Name</label>
                        <div className='relative'>
                            <User className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                            <input
                                className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400'
                                type="text"
                                placeholder="Jane Doe"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                            />
                        </div>
                    </div>

                    <div className='space-y-1.5'>
                        <label className='text-xs font-semibold text-slate-700 block'>Email Address</label>
                        <div className='relative'>
                            <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                            <input
                                className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400'
                                type="email"
                                placeholder="name@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>
                    </div>

                    <div className='space-y-1.5'>
                        <label className='text-xs font-semibold text-slate-700 block'>Password</label>
                        <div className='relative'>
                            <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                            <input
                                className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400'
                                type="password"
                                placeholder="Minimum 8 characters"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                minLength={8}
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className='w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70'
                >
                    <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
                    {!isLoading && <ArrowRight className='w-4 h-4' />}
                </button>

                {/* Switcher */}
                <div className='text-center pt-2 text-xs text-slate-500'>
                    Already have an account?{' '}
                    <Link to="/login" className='text-blue-600 font-bold hover:underline ml-1 cursor-pointer'>
                        Sign in here
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Signup
