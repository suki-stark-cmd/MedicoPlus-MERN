import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div className='page-wrapper'>
      <Header />
      <div className='section-divider my-4'></div>
      <SpecialityMenu />
      <div className='section-divider my-4'></div>
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home