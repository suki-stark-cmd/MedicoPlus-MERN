import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { Search, Filter, Star, Calendar, CheckCircle2, UserX } from 'lucide-react'

const Doctors = () => {
    const { speciality } = useParams()
    const [filterDoc, setFilterDoc] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [showFilter, setShowFilter] = useState(false)
    const navigate = useNavigate()

    const { doctors, currencySymbol } = useContext(AppContext)

    const specialtiesList = [
        'General physician',
        'Gynecologist',
        'Dermatologist',
        'Pediatricians',
        'Neurologist',
        'Gastroenterologist'
    ]

    const applyFilter = () => {
        let docs = doctors || []
        
        if (speciality) {
            docs = docs.filter(doc => doc.speciality.toLowerCase() === speciality.toLowerCase())
        }

        if (searchQuery.trim()) {
            docs = docs.filter(doc => 
                doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                doc.speciality.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        setFilterDoc(docs)
    }

    useEffect(() => {
        applyFilter()
    }, [doctors, speciality, searchQuery])

    return (
        <div className='py-6 px-4 sm:px-[4%] max-w-7xl mx-auto space-y-8'>
            {/* Header Title & Search Bar */}
            <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200'>
                <div>
                    <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight'>
                        Find & Book <span className='gradient-text'>Specialists</span>
                    </h1>
                    <p className='text-slate-500 text-sm mt-1'>
                        Browse through our verified team of medical professionals.
                    </p>
                </div>

                {/* Search Input Bar */}
                <div className='relative w-full md:w-80'>
                    <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
                    <input 
                        type="text" 
                        placeholder="Search doctor by name or specialty..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400 shadow-sm'
                    />
                </div>
            </div>

            <div className='flex flex-col lg:flex-row items-start gap-8'>
                {/* Mobile Filter Toggle */}
                <button 
                    className='lg:hidden inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 text-sm font-semibold shadow-sm hover:border-blue-500 transition-all' 
                    onClick={() => setShowFilter(prev => !prev)}
                >
                    <Filter className='w-4 h-4 text-blue-600' />
                    <span>{showFilter ? 'Hide Filters' : 'Show Specialty Filters'}</span>
                </button>

                {/* Left Sidebar Filter Pills */}
                <div className={`w-full lg:w-64 flex-shrink-0 flex flex-col gap-2 bg-white lg:bg-transparent p-4 lg:p-0 rounded-2xl border lg:border-none border-slate-200 shadow-sm lg:shadow-none ${showFilter ? 'block' : 'hidden lg:block'}`}>
                    <p className='text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-1'>Filter by Specialty</p>

                    <button 
                        onClick={() => navigate('/doctors')} 
                        className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 flex items-center justify-between ${!speciality ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                        <span>All Specialties</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${!speciality ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>{doctors?.length || 0}</span>
                    </button>

                    {specialtiesList.map((item, index) => {
                        const isSelected = speciality?.toLowerCase() === item.toLowerCase()
                        const count = doctors?.filter(d => d.speciality.toLowerCase() === item.toLowerCase()).length || 0
                        return (
                            <button 
                                key={index} 
                                onClick={() => isSelected ? navigate('/doctors') : navigate(`/doctors/${item}`)} 
                                className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 flex items-center justify-between ${isSelected ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-100'}`}
                            >
                                <span>{item}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>{count}</span>
                            </button>
                        )
                    })}
                </div>

                {/* Right Doctor Cards Grid */}
                <div className='flex-1 w-full'>
                    {filterDoc.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
                            {filterDoc.map((item, index) => (
                                <div 
                                    onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                                    key={index}
                                    className='group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between'
                                >
                                    <div className='relative bg-gradient-to-b from-blue-50/80 to-slate-100 overflow-hidden pt-4 px-4'>
                                        <div className='absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-emerald-100 text-emerald-600 text-xs font-medium'>
                                            <span className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse'></span>
                                            <span>Available</span>
                                        </div>

                                        <img 
                                            className='w-full h-52 object-cover object-top rounded-2xl group-hover:scale-105 transition-transform duration-500' 
                                            src={item.image} 
                                            alt={item.name} 
                                        />
                                    </div>

                                    <div className='p-5 flex flex-col gap-3 flex-1 justify-between'>
                                        <div>
                                            <div className='flex items-center justify-between gap-2 mb-1'>
                                                <span className='px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-medium truncate'>
                                                    {item.speciality}
                                                </span>
                                                <div className='flex items-center gap-1 text-xs text-amber-500 font-semibold'>
                                                    <Star className='w-3.5 h-3.5 fill-amber-400 text-amber-400' />
                                                    <span>4.9</span>
                                                </div>
                                            </div>

                                            <h3 className='text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200 truncate'>
                                                {item.name}
                                            </h3>

                                            <p className='text-xs text-slate-500 mt-0.5'>
                                                {item.degree} • {item.experience || '4+ Years Exp'}
                                            </p>
                                        </div>

                                        <div className='pt-3 border-t border-slate-100 flex items-center justify-between'>
                                            <div className='text-slate-900 font-bold text-sm'>
                                                {currencySymbol}{item.fees} <span className='text-xs text-slate-400 font-normal'>/ Visit</span>
                                            </div>

                                            <button className='px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-xs font-semibold group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 inline-flex items-center gap-1'>
                                                <span>Book</span>
                                                <Calendar className='w-3.5 h-3.5' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='flex flex-col items-center justify-center py-16 px-4 bg-white rounded-3xl border border-slate-100 text-center gap-4'>
                            <div className='p-4 rounded-full bg-slate-100 text-slate-400'>
                                <UserX className='w-10 h-10' />
                            </div>
                            <h3 className='text-xl font-bold text-slate-800'>No Doctors Found</h3>
                            <p className='text-slate-500 text-sm max-w-sm'>
                                We couldn't find any medical specialists matching your criteria. Try adjusting your search query or filters.
                            </p>
                            <button 
                                onClick={() => { setSearchQuery(''); navigate('/doctors'); }}
                                className='px-6 py-2.5 bg-blue-600 text-white font-medium text-xs rounded-full shadow-md hover:bg-blue-700 transition-colors'
                            >
                                Reset All Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Doctors