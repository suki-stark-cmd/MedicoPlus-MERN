import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

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
        <div className='max-w-lg flex flex-col gap-4 text-sm pt-8 mx-auto bg-white rounded-xl shadow-lg p-8'>
            <div className='flex flex-col items-center gap-2'>
                {isEdit
                    ? <label htmlFor='image'>
                        <div className='relative cursor-pointer w-36 h-36 rounded-full overflow-hidden border-4 border-primary shadow-md bg-gray-100 flex items-center justify-center'>
                            <img
                                className='w-full h-full object-cover object-center'
                                src={image ? URL.createObjectURL(image) : userData.image}
                                alt="Profile"
                                style={{ aspectRatio: '1/1' }}
                            />
                            <img className='w-10 absolute bottom-2 right-2 bg-white rounded-full p-1 border border-gray-200' src={image ? '' : assets.upload_icon} alt="Upload" />
                        </div>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden accept="image/*" />
                    </label>
                    : <div className='w-36 h-36 rounded-full overflow-hidden border-4 border-primary shadow-md bg-gray-100 flex items-center justify-center'>
                        <img
                            className='w-full h-full object-cover object-center'
                            src={userData.image}
                            alt="Profile"
                            style={{ aspectRatio: '1/1' }}
                        />
                    </div>
                }
                {isEdit
                    ? <input className='bg-gray-50 text-3xl font-medium max-w-60 text-center mt-2' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
                    : <p className='font-semibold text-3xl text-[#262626] mt-4'>{userData.name}</p>
                }
            </div>
            <hr className='bg-[#ADADAD] h-[1px] border-none my-2' />
            <div>
                <p className='text-gray-600 underline mt-3 font-semibold'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]'>
                    <p className='font-medium'>Email id:</p>
                    <p className='text-blue-500 break-all'>{userData.email}</p>
                    <p className='font-medium'>Phone:</p>
                    {isEdit
                        ? <input className='bg-gray-50 max-w-52' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                        : <p className='text-blue-500'>{userData.phone}</p>
                    }
                    <p className='font-medium'>Address:</p>
                    {isEdit
                        ? <p>
                            <input className='bg-gray-50 mb-1' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
                            <br />
                            <input className='bg-gray-50' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} /></p>
                        : <p className='text-gray-500'>{userData.address.line1} <br /> {userData.address.line2}</p>
                    }
                </div>
            </div>
            <div>
                <p className='text-[#797979] underline mt-3 font-semibold'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600'>
                    <p className='font-medium'>Gender:</p>
                    {isEdit
                        ? <select className='max-w-20 bg-gray-50' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                            <option value="Not Selected">Not Selected</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        : <p className='text-gray-500'>{userData.gender}</p>
                    }
                    <p className='font-medium'>Birthday:</p>
                    {isEdit
                        ? <input className='max-w-28 bg-gray-50' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                        : <p className='text-gray-500'>{userData.dob}</p>
                    }
                </div>
            </div>
            <div className='mt-10 flex justify-center'>
                {isEdit
                    ? <button onClick={updateUserProfileData} className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all flex items-center justify-center min-w-[150px]' disabled={loading}>
                        {loading && <svg className="animate-spin h-5 w-5 mr-2 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>}
                        {loading ? 'Saving...' : 'Save information'}
                    </button>
                    : <button onClick={() => setIsEdit(true)} className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'>Edit</button>
                }
            </div>
        </div>
    ) : null
}

export default MyProfile