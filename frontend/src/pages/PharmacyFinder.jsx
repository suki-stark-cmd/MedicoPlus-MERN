import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { MapPin, Search, Phone, Clock, Star, ShoppingBag } from 'lucide-react'

const PharmacyFinder = () => {
    const { backendUrl, token } = useContext(AppContext)
    const [location, setLocation] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [pharmacies, setPharmacies] = useState([])
    const [loading, setLoading] = useState(false)

    // Mock pharmacy data for demonstration
    // In production, fetch from a real pharmacy API with geolocation
    const mockPharmacies = [
        {
            id: 1,
            name: 'CVS Pharmacy',
            address: '1247 Broadway, New York, NY 10001',
            phone: '+1 (212) 555-0123',
            hours: 'Open 24 hours',
            distance: '0.3 mi',
            rating: 4.5,
            image: 'https://source.unsplash.com/random/100x100/?pharmacy',
        },
        {
            id: 2,
            name: 'Walgreens',
            address: '599 5th Ave, New York, NY 10022',
            phone: '+1 (212) 555-0145',
            hours: 'Open until 10 PM',
            distance: '0.7 mi',
            rating: 4.2,
            image: 'https://source.unsplash.com/random/100x100/?pharmacy,2',
        },
        {
            id: 3,
            name: 'Rite Aid',
            address: '350 5th Ave, New York, NY 10118',
            phone: '+1 (212) 555-0167',
            hours: 'Open until 9 PM',
            distance: '1.2 mi',
            rating: 4.0,
            image: 'https://source.unsplash.com/random/100x100/?pharmacy,3',
        },
    ]

    const handleSearch = async () => {
        if (!location.trim()) return

        setLoading(true)
        try {
            // In production, call real API with geolocation
            // const response = await axios.get(`${backendUrl}/api/user/pharmacies?location=${location}`)
            // setPharmacies(response.data.pharmacies)

            // Mock delay
            setTimeout(() => {
                setPharmacies(mockPharmacies)
                setLoading(false)
            }, 1000)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        // Try to get user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setLocation(`${pos.coords.latitude}, ${pos.coords.longitude}`)
                },
                (err) => {
                    console.log('Geolocation error:', err)
                }
            )
        }
    }, [])

    return (
        <div className="py-12 px-4 sm:px-[6%] max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Pharmacy Finder</h1>
                <p className="text-slate-500 text-sm">
                    Find nearby pharmacies that accept MedicoPlus prescriptions and offer medication delivery.
                </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Enter your location or enable GPS..."
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        disabled={loading || !location.trim()}
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 cursor-pointer"
                    >
                        {loading ? 'Searching...' : <><Search className="w-4 h-4" /><span>Search</span></>}
                    </button>
                </div>
            </div>

            {/* Pharmacy List */}
            <div className="space-y-4">
                {pharmacies.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                        <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-700 mb-2">No pharmacies found</h3>
                        <p className="text-slate-500 text-sm">
                            Enter your location above to find nearby pharmacies.
                        </p>
                    </div>
                ) : (
                    pharmacies.map((pharmacy) => (
                        <div key={pharmacy.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-xl transition-shadow">
                            <div className="flex items-start gap-4">
                                <img
                                    src={pharmacy.image}
                                    alt={pharmacy.name}
                                    className="w-20 h-20 rounded-xl object-cover border border-slate-100"
                                />
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900">{pharmacy.name}</h3>
                                            <p className="text-sm text-slate-500 mt-0.5">{pharmacy.address}</p>
                                        </div>
                                        <div className="flex items-center gap-1 text-amber-500 font-semibold text-sm">
                                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                                            <span>{pharmacy.rating}</span>
                                        </div>
                                    </div>

                                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3 text-slate-400" />
                                            <span>{pharmacy.distance}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Phone className="w-3 h-3 text-slate-400" />
                                            <span>{pharmacy.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3 text-slate-400" />
                                            <span>{pharmacy.hours}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Note about map integration */}
            <div className="mt-6 text-center text-xs text-slate-400">
                <p>Note: Map view requires Google Maps API integration. This is a listing view placeholder.</p>
            </div>
        </div>
    )
}

export default PharmacyFinder
