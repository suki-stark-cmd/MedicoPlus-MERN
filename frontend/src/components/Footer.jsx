import React, { useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    if (footerRef.current) {
      footerRef.current.classList.add('animate-fadeIn');
    }
  }, []);

  return (
    <div ref={footerRef} className='px-4 md:mx-10 bg-gradient-to-r from-blue-200 via-white to-blue-100 rounded-t-2xl shadow-xl mt-8'>
      <div className='flex flex-col md:grid md:grid-cols-[3fr_1fr_1fr] gap-10 md:gap-14 my-8 mt-16 md:mt-24 text-sm items-start'>
        <div className='min-w-0 flex flex-col items-start'>
          <img className='mb-12 mt-8 w-32 md:w-40 transition-transform duration-300 hover:scale-105' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>Empowering smarter healthcare access for everyone. MedicoPlus is your digital partner for seamless doctor appointments, health record management, and personalized care—anytime, anywhere.</p>
          <div className='flex gap-4 mt-6'>
            <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-800 transition-colors'><FaFacebookF /></a>
            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer' className='bg-blue-400 text-white p-2 rounded-full shadow hover:bg-blue-600 transition-colors'><FaTwitter /></a>
            <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' className='bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white p-2 rounded-full shadow hover:opacity-80 transition-opacity'><FaInstagram /></a>
            <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer' className='bg-blue-700 text-white p-2 rounded-full shadow hover:bg-blue-900 transition-colors'><FaLinkedin /></a>
          </div>
        </div>
        <div className='min-w-2 flex flex-col items-start mt-8 md:mt-10'>
          <p className='text-lg md:text-xl font-medium mb-3 md:mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 md:gap-2 text-gray-600'>
            <li className='transition-colors duration-200 hover:text-blue-600 hover:underline cursor-pointer'>Home</li>
            <li className='transition-colors duration-200 hover:text-blue-600 hover:underline cursor-pointer'>About us</li>
            <li className='transition-colors duration-200 hover:text-blue-600 hover:underline cursor-pointer'>Delivery</li>
            <li className='transition-colors duration-200 hover:text-blue-600 hover:underline cursor-pointer'>Privacy policy</li>
          </ul>
        </div>
        <div className='min-w-0 flex flex-col items-start mt-8 md:mt-10'>
          <p className='text-lg md:text-xl font-medium mb-3 md:mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 md:gap-2 text-gray-600'>
            <li className='transition-colors duration-200 hover:text-blue-600 cursor-pointer'>+91 8903137541</li>
            <li className='transition-colors duration-200 hover:text-blue-600 cursor-pointer'>contact@medicopluscare.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr className='border-gray-300' />
        <p className='py-3 md:py-5 text-xs md:text-sm text-center text-gray-500'>Copyright © 2025 MedicoPlus - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
