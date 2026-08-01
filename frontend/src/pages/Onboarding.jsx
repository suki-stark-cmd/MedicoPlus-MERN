import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { Globe, MapPin, CheckCircle, ArrowRight } from 'lucide-react'

const Onboarding = () => {
    const { backendUrl, token, userData, setUserData, setLanguage } = useContext(AppContext)
    const [language, setLanguageState] = useState(userData?.language || 'en')
    const [location, setLocation] = useState(userData?.location || '')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token, navigate])

    if (!token) return null

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' },
        { code: 'hi', name: 'हिन्दी' },
        { code: 'zh', name: '中文' },
    ]

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const response = await axios.put(
                `${backendUrl}/api/user/profile`,
                { language: language, location: location, name: userData?.name || '', phone: userData?.phone || '', address: userData?.address || {}, gender: userData?.gender || 'Not Selected', dob: userData?.dob || 'Not Selected' },
                { headers: { token } }
            )

            if (response.data.success) {
                setUserData(response.data.user)
                setLanguage(language)

                // Check if this is first onboarding (no location set before)
                const firstTime = !userData?.location
                if (firstTime) {
                    navigate('/')
                } else {
                    navigate(-1)
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-2xl bg-white/90 backdrop-blur-xl border border-slate-100 p-8 rounded-3xl shadow-2xl shadow-blue-500/10">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                        <Globe className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
                        Welcome to MedicoPlus
                    </h1>
                    <p className="text-slate-500 text-sm max-w-md mx-auto">
                        Set up your preferences to personalize your healthcare experience.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Language Selector */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <Globe className="w-4 h-4 text-blue-500" />
                            Preferred Language
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    type="button"
                                    onClick={() => setLanguageState(lang.code)}
                                    className={`p-3 rounded-xl text-center transition-all border ${
                                        language === lang.code
                                            ? 'bg-blue-50 border-blue-500 text-blue-700 font-semibold'
                                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50/30'
                                    }`}
                                >
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Location Input */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <MapPin className="w-4 h-4 text-cyan-500" />
                            Your Location
                        </label>
                        <input
                            type="text"
                            placeholder="City, Country (e.g., New York, USA)"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
                        />
                        <p className="text-xs text-slate-400">
                            Used to find doctors near you and show relevant health resources.
                        </p>
                    </div>

                    {/* Consent Checkbox */}
                    <div className="flex items-start gap-3 pt-2">
                        <div className="flex-shrink-0 pt-0.5">
                            <input
                                type="checkbox"
                                id="consent"
                                defaultChecked
                                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                            />
                        </div>
                        <label htmlFor="consent" className="text-sm text-slate-600">
                            I agree to the{' '}
                            <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
                            {' '}and{' '}
                            <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8">
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || !location}
                        className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                        <span>{isLoading ? 'Saving...' : 'Complete Setup'}</span>
                        {!isLoading && <ArrowRight className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Onboarding
