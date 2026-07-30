import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const cardsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )
    if (cardsRef.current) observer.observe(cardsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className='page-wrapper py-6'>
      {/* Page Header */}
      <div className='text-center pt-10 animate-fadeInUp'>
        <h1 className='text-3xl md:text-4xl font-bold text-white' style={{ fontFamily: 'Inter, sans-serif' }}>
          About <span className='gradient-text'>Us</span>
        </h1>
        <div className='w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-4 rounded-full'></div>
      </div>

      {/* About Content */}
      <div className='my-12 flex flex-col md:flex-row gap-12 animate-fadeInUp stagger-2'>
        <div className='w-full md:max-w-[360px] rounded-2xl overflow-hidden flex-shrink-0'>
          <img className='w-full h-full object-cover' src={assets.about_image} alt="About MedicoPlus" style={{ filter: 'brightness(0.9)' }} />
        </div>
        <div className='flex flex-col justify-center gap-6 md:w-2/4'>
          <p className='text-slate-300 text-sm leading-relaxed'>
            Welcome to MedicoPlus — Your Smart Healthcare Companion. At MedicoPlus, we simplify the way you connect with doctors and manage your health. Whether you're booking appointments, accessing medical records, or exploring available specialists, MedicoPlus ensures a seamless, secure, and personalized experience right at your fingertips.
          </p>
          <p className='text-slate-400 text-sm leading-relaxed'>
            At MedicoPlus, we're committed to redefining digital healthcare. Our team is constantly evolving the platform, integrating cutting-edge technology to enhance user experience and ensure seamless access to care. Whether you're scheduling your first consultation or managing follow-ups, MedicoPlus is designed to support your health journey every step of the way.
          </p>
          <div>
            <h3 className='text-lg font-bold text-white' style={{ fontFamily: 'Inter, sans-serif' }}>
              Our <span className='gradient-text'>Vision</span>
            </h3>
            <p className='text-slate-400 text-sm leading-relaxed mt-2'>
              Our vision at MedicoPlus is to build a connected and accessible healthcare ecosystem for all. We strive to bridge the gap between patients and medical professionals by offering a platform that makes finding, booking, and managing healthcare effortless — ensuring you get the care you need, exactly when you need it.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-white' style={{ fontFamily: 'Inter, sans-serif' }}>
          Why <span className='gradient-text'>Choose Us</span>
        </h2>
        <div className='w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mt-3 rounded-full'></div>
      </div>

      <div ref={cardsRef} className='grid grid-cols-1 md:grid-cols-3 gap-5 mb-20'>
        {[
          {
            icon: '⚡',
            title: 'Efficiency',
            description: 'Streamlined appointment scheduling that fits into your busy lifestyle.'
          },
          {
            icon: '🎯',
            title: 'Convenience',
            description: 'Access to a network of trusted healthcare professionals in your area.'
          },
          {
            icon: '✨',
            title: 'Personalization',
            description: 'Tailored recommendations and reminders to help you stay on top of your health.'
          }
        ].map((item, index) => (
          <div
            key={index}
            className={`glass-card p-8 flex flex-col gap-4 cursor-pointer group ${isVisible ? 'animate-fadeInUp stagger-' + (index + 1) : 'opacity-0'}`}
          >
            <span className='text-3xl'>{item.icon}</span>
            <h3 className='text-lg font-bold text-white group-hover:text-emerald-300 transition-colors duration-300' style={{ fontFamily: 'Inter, sans-serif' }}>
              {item.title}
            </h3>
            <p className='text-slate-400 text-sm leading-relaxed'>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default About