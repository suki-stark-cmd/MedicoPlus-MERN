import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { FaUser, FaPhone, FaMapMarkerAlt, FaVenusMars, FaBirthdayCake, FaEnvelope, FaEdit, FaSave } from 'react-icons/fa'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)

    const [image, setImage] = useState(false)

    const [loading, setLoading] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    // Function to update user profile data using API
    const updateUserProfileData = async () => {
        setLoading(true)
        try {

            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
        setLoading(false)
    }

    return userData ? (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl py-10">
            <div className="backdrop-blur-lg bg-white/70 shadow-2xl rounded-3xl p-8 max-w-xl w-full flex flex-col items-center gap-6 border-blue-200">
                {/* Profile Image */}
                <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-white-100 shadow-lg bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center">
                    {isEdit ? (
                        <label htmlFor="image" className="absolute inset-0 cursor-pointer group flex items-center justify-center">
                            <img
                                className="w-full h-full object-cover object-center"
                                src={image ? URL.createObjectURL(image) : userData.image}
                                alt="Profile"
                                style={{ aspectRatio: '1/1' }}
                            />
                            <div className="absolute inset-0 bg-blue-900/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <FaEdit className="text-white text-3xl" />
                            </div>
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden accept="image/*" />
                        </label>
                    ) : (
                        <img
                            className="w-full h-full object-cover object-center"
                            src={userData.image}
                            alt="Profile"
                            style={{ aspectRatio: '1/1' }}
                        />
                    )}
                </div>
                {/* Name */}
                {isEdit ? (
                    <input className="bg-white/80 border-b-2 border-blue-400 text-3xl font-bold text-center py-2 px-4 rounded-lg focus:outline-none focus:border-blue-700 transition-all w-full max-w-xs shadow" type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
                ) : (
                    <p className="font-extrabold text-3xl text-blue-900 mt-2 flex items-center gap-2"><FaUser className="text-blue-400" />{userData.name}</p>
                )}
                {/* Contact Info */}
                <div className="w-full flex flex-col gap-4 mt-4">
                    <h2 className="text-lg font-bold text-blue-700 flex items-center gap-2"><FaEnvelope className="text-blue-400" />Contact Information</h2>
                    <div className="flex flex-col gap-2 bg-white/60 rounded-xl p-4 shadow">
                        <div className="flex items-center gap-2 text-blue-900"><FaEnvelope className="text-blue-400" /><span className="font-medium">{userData.email}</span></div>
                        <div className="flex items-center gap-2 text-blue-900">
                            <FaPhone className="text-blue-400" />
                            {isEdit ? (
                                <input className="bg-white/80 border-b-2 border-blue-200 px-2 py-1 rounded focus:outline-none focus:border-blue-500 transition-all w-full max-w-xs" type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                            ) : (
                                <span className="font-medium">{userData.phone}</span>
                            )}
                        </div>
                        <div className="flex items-start gap-2 text-blue-900">
                            <FaMapMarkerAlt className="text-blue-400 mt-1" />
                            {isEdit ? (
                                <div className="flex flex-col gap-1 w-full">
                                    <input className="bg-white/80 border-b-2 border-blue-200 px-2 py-1 rounded focus:outline-none focus:border-blue-500 transition-all" type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} placeholder="Address line 1" />
                                    <input className="bg-white/80 border-b-2 border-blue-200 px-2 py-1 rounded focus:outline-none focus:border-blue-500 transition-all" type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} placeholder="Address line 2" />
                                </div>
                            ) : (
                                <span className="font-medium">{userData.address.line1}<br />{userData.address.line2}</span>
                            )}
                        </div>
                    </div>
                </div>
                {/* Basic Info */}
                <div className="w-full flex flex-col gap-4 mt-4">
                    <h2 className="text-lg font-bold text-blue-700 flex items-center gap-2"><FaVenusMars className="text-blue-400" />Basic Information</h2>
                    <div className="flex flex-col gap-2 bg-white/60 rounded-xl p-4 shadow">
                        <div className="flex items-center gap-2 text-blue-900">
                            <FaVenusMars className="text-blue-400" />
                            {isEdit ? (
                                <select className="bg-white/80 border-b-2 border-blue-200 px-2 py-1 rounded focus:outline-none focus:border-blue-500 transition-all max-w-xs" onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                                    <option value="Not Selected">Not Selected</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            ) : (
                                <span className="font-medium">{userData.gender}</span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-blue-900">
                            <FaBirthdayCake className="text-blue-400" />
                            {isEdit ? (
                                <input className="bg-white/80 border-b-2 border-blue-200 px-2 py-1 rounded focus:outline-none focus:border-blue-500 transition-all max-w-xs" type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                            ) : (
                                <span className="font-medium">{userData.dob}</span>
                            )}
                        </div>
                    </div>
                </div>
                {/* Action Button */}
                <div className="mt-8 flex justify-center w-full">
                    {isEdit ? (
                        <button onClick={updateUserProfileData} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all min-w-[160px] border-2 border-blue-700 focus:scale-95 active:scale-95" disabled={loading}>
                            {loading && <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>}
                            <FaSave /> {loading ? 'Saving...' : 'Save information'}
                        </button>
                    ) : (
                        <button onClick={() => setIsEdit(true)} className="flex items-center gap-2  bg-blue-400 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all min-w-[160px] border-1 border-blue-700 focus:scale-95 active:scale-95">
                            <FaEdit /> Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    ) : null
}

export default MyProfile