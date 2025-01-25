import React from 'react'
import CNavBar from '../../components/clients-components/CNavBar'
import OurStore from '../../pages/Client/OurStore'
import HeroPage from './HeroPage'
import ContactUs from './ContactUs'
import Footer from '../../components/clients-components/Footer'

const LandingPage = () => {
  return (
    <div className='bg-[#0D2F26] min-h-screen'>
          <CNavBar/>
          <HeroPage/>
          <OurStore/>
          <ContactUs/>
          <Footer/>
    </div>
  )
}

export default LandingPage