import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
        
        <div className='text-center text-2xl pt-10 text-gray-500'>
          <p>ABOUT <span className='text-gray-600 font-medium'>US</span></p>
        </div>

        <div className='my-10 flex flex-col md:flex-row gap-12'> 
          <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
            <p>Welcome to MedicoPlus - Your Smart Healthcare Companion. At MedicoPlus, we simplify the way you connect with doctors and manage your health. Whether you're booking appointments, accessing medical records, or exploring available specialists, MedicoPlus ensures a seamless, secure, and personalized experience right at your fingertips.</p>
            <p>At MedicoPlus, we're committed to redefining digital healthcare. Our team is constantly evolving the platform, integrating cutting-edge technology to enhance user experience and ensure seamless access to care. Whether you're scheduling your first consultation or managing follow-ups, MedicoPlus is designed to support your health journey every step of the way.</p>
            <b className='text-gray-800'>Our Vision</b>
            <p>Our vision at MedicoPlus is to build a connected and accessible healthcare ecosystem for all. We strive to bridge the gap between patients and medical professionals by offering a platform that makes finding, booking, and managing healthcare effortless ensuring you get the care you need, exactly when you need it.</p>
          </div>
        </div>

        <div className='text-xl my-4'>
          <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
        </div>

        <div className='flex flex-col md:flex-row mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
            <b>Efficiency:</b>
            <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convenience:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Personalization:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
    </div>
  )
}

export default About