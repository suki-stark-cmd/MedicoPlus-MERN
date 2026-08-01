import React, { useContext, useState, useRef, useEffect } from 'react'
import { Globe, ChevronDown } from 'lucide-react'
import { AppContext } from '../context/AppContext'

const LanguageSelector = () => {
    const { language, setLanguage } = useContext(AppContext)
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)

    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
        { code: 'zh', name: '中文', flag: '🇨🇳' },
    ]

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full text-slate-600 hover:bg-white hover:border-blue-300 transition-all duration-200 text-sm font-medium shadow-sm"
                aria-label="Select language"
            >
                <Globe className="w-4 h-4 text-blue-500" />
                <span>{languages.find(l => l.code === language)?.flag || '🇺🇸'}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div className="absolute top-full right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
                    <div className="py-1 max-h-60 overflow-y-auto">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setLanguage(lang.code)
                                    setOpen(false)
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm hover:bg-slate-50 transition-colors ${
                                    language === lang.code ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-700'
                                }`}
                            >
                                <span>{lang.flag}</span>
                                <span>{lang.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default LanguageSelector
