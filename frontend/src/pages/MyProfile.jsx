import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { User, Mail, Phone, MapPin, Calendar, Edit2, Check, ShieldCheck } from 'lucide-react'

const MyProfile = () => {
    const [userData, setUserData] = useState({
        name: "Ramanan R",
        image: assets.profile_pic,
        email: 'ramanan@gmail.com',
        phone: '+1 123 456 7890',
        address: {
            line1: "57th Cross, Richmond ",
            line2: "Circle, Church Road, London"
        },
        gender: 'Male',
        dob: '2004-09-18'
    })

    const [isEdit, setIsEdit] = useState(false)

    return (
        <div className='max-w-3xl mx-auto py-8 px-4'>
            <div className='bg-white rounded-3xl border border-slate-100 shadow-xl shadow-blue-500/5 p-6 sm:p-10 space-y-8'>
                
                {/* Header Profile Section */}
                <div className='flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100'>
                    <div className='relative group'>
                        <div className='p-1 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md'>
                            <img className='w-28 h-28 rounded-2xl object-cover border-2 border-white' src={userData.image} alt="User Avatar" />
                        </div>
                    </div>

                    <div className='flex-1 text-center sm:text-left space-y-1'>
                        <div className='flex items-center justify-center sm:justify-start gap-2'>
                            {isEdit ? (
                                <input 
                                    className='bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20' 
                                    type="text" 
                                    value={userData.name} 
                                    onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                                />
                            ) : (
                                <h1 className='text-3xl font-extrabold text-slate-900'>{userData.name}</h1>
                            )}
                            <ShieldCheck className='w-5 h-5 text-blue-600' />
                        </div>
                        <p className='text-slate-500 text-xs sm:text-sm font-medium'>Verified Patient Account</p>
                    </div>

                    <button 
                        onClick={() => setIsEdit(!isEdit)} 
                        className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${isEdit ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20' : 'bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700'}`}
                    >
                        {isEdit ? (
                            <>
                                <Check className='w-3.5 h-3.5' />
                                <span>Save Changes</span>
                            </>
                        ) : (
                            <>
                                <Edit2 className='w-3.5 h-3.5' />
                                <span>Edit Profile</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Contact Information */}
                <div className='space-y-4'>
                    <h3 className='text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5'>
                        <Mail className='w-3.5 h-3.5 text-blue-500' />
                        <span>Contact Information</span>
                    </h3>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>
                        <div className='p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1'>
                            <span className='text-xs text-slate-400 font-medium block'>Email Address</span>
                            <span className='font-semibold text-slate-800 break-all'>{userData.email}</span>
                        </div>

                        <div className='p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1'>
                            <span className='text-xs text-slate-400 font-medium block'>Phone Number</span>
                            {isEdit ? (
                                <input 
                                    className='w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-sm font-semibold focus:outline-none' 
                                    type="text" 
                                    value={userData.phone} 
                                    onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                                />
                            ) : (
                                <span className='font-semibold text-blue-600'>{userData.phone}</span>
                            )}
                        </div>

                        <div className='sm:col-span-2 p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1'>
                            <span className='text-xs text-slate-400 font-medium block'>Residential Address</span>
                            {isEdit ? (
                                <div className='space-y-2 mt-1'>
                                    <input 
                                        className='w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-sm' 
                                        onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                        value={userData.address.line1} 
                                        type="text" 
                                    />
                                    <input 
                                        className='w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-sm' 
                                        onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                        value={userData.address.line2} 
                                        type="text" 
                                    />
                                </div>
                            ) : (
                                <span className='font-medium text-slate-700 leading-relaxed block'>
                                    {userData.address.line1}<br />{userData.address.line2}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Basic Personal Information */}
                <div className='space-y-4 pt-4 border-t border-slate-100'>
                    <h3 className='text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5'>
                        <User className='w-3.5 h-3.5 text-blue-500' />
                        <span>Basic Information</span>
                    </h3>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>
                        <div className='p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1'>
                            <span className='text-xs text-slate-400 font-medium block'>Gender</span>
                            {isEdit ? (
                                <select 
                                    className='bg-white border border-slate-200 rounded-lg px-2 py-1 text-sm font-semibold' 
                                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                                    value={userData.gender}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            ) : (
                                <span className='font-semibold text-slate-800'>{userData.gender}</span>
                            )}
                        </div>

                        <div className='p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1'>
                            <span className='text-xs text-slate-400 font-medium block'>Date of Birth</span>
                            {isEdit ? (
                                <input 
                                    className='bg-white border border-slate-200 rounded-lg px-2 py-1 text-sm font-semibold' 
                                    type="date" 
                                    onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                                    value={userData.dob} 
                                />
                            ) : (
                                <span className='font-semibold text-slate-800'>{userData.dob}</span>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MyProfile