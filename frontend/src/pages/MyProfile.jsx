import React, { useState } from 'react'
import { assets } from '../assets/assets'

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
    <div className='page-wrapper py-6 max-w-2xl'>
      <div className='glass-card-static p-8 animate-fadeInUp'>

        {/* Avatar Section */}
        <div className='flex items-center gap-6 mb-8'>
          <div className='relative'>
            <div className='w-24 h-24 rounded-full overflow-hidden border-3 border-emerald-500/50 p-0.5' style={{ background: 'linear-gradient(135deg, #10b981, #14b8a6)' }}>
              <img className='w-full h-full rounded-full object-cover' src={userData.image} alt="Profile" />
            </div>
            {isEdit && (
              <div className='absolute bottom-0 right-0 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-400 transition-colors'>
                <svg className='w-3.5 h-3.5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' /></svg>
              </div>
            )}
          </div>
          <div>
            {isEdit
              ? <input className='input-dark text-xl font-bold max-w-60' type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
              : <h2 className='text-2xl font-bold text-white' style={{ fontFamily: 'Inter, sans-serif' }}>{userData.name}</h2>
            }
            <p className='text-slate-400 text-sm mt-1'>Patient Profile</p>
          </div>
        </div>

        <div className='h-px bg-slate-700/50 mb-6'></div>

        {/* Contact Information */}
        <div className='mb-6'>
          <h3 className='text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4'>Contact Information</h3>
          <div className='grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-y-4 gap-x-4 text-sm'>
            <p className='text-slate-400 font-medium'>Email:</p>
            <p className='text-emerald-400'>{userData.email}</p>

            <p className='text-slate-400 font-medium'>Phone:</p>
            {isEdit
              ? <input className='input-dark text-sm' type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              : <p className='text-slate-300'>{userData.phone}</p>
            }

            <p className='text-slate-400 font-medium'>Address:</p>
            {isEdit
              ? <div className='flex flex-col gap-2'>
                <input className='input-dark text-sm' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type="text" />
                <input className='input-dark text-sm' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type="text" />
              </div>
              : <p className='text-slate-300'>{userData.address.line1}<br />{userData.address.line2}</p>
            }
          </div>
        </div>

        <div className='h-px bg-slate-700/50 mb-6'></div>

        {/* Basic Information */}
        <div className='mb-8'>
          <h3 className='text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4'>Basic Information</h3>
          <div className='grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-y-4 gap-x-4 text-sm'>
            <p className='text-slate-400 font-medium'>Gender:</p>
            {isEdit
              ? <select className='input-dark text-sm max-w-32' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              : <p className='text-slate-300'>{userData.gender}</p>
            }

            <p className='text-slate-400 font-medium'>Birthday:</p>
            {isEdit
              ? <input className='input-dark text-sm max-w-40' type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
              : <p className='text-slate-300'>{userData.dob}</p>
            }
          </div>
        </div>

        {/* Action Button */}
        <div className='flex gap-3'>
          {isEdit
            ? <>
              <button className='gradient-btn px-8 py-2.5 text-sm' onClick={() => setIsEdit(false)}>
                Save Changes
              </button>
              <button className='gradient-btn-outline px-6 py-2.5 text-sm' onClick={() => setIsEdit(false)}>
                Cancel
              </button>
            </>
            : <button className='gradient-btn-outline px-8 py-2.5 text-sm flex items-center gap-2' onClick={() => setIsEdit(true)}>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' /></svg>
              Edit Profile
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default MyProfile