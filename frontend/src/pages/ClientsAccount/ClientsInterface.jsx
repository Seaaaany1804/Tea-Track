import React from 'react'
import AccountHero from './AccountHero'
import ClientInterfaceNavBar from '../../components/clients-components/ClientInterfaceNavBar'
import OurStore from './OurStore'
import ClientFooter from '../../components/clients-components/ClientFooter'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const ClientsInterface = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    if (!isLoggedIn) {
      navigate('/login');
    }
    else if (userType !== 'client') {
      navigate('/404');
    }
  }, [navigate]);

  return (
    <div className='bg-[#0D2F26] min-h-screen'>
        <ClientInterfaceNavBar/>
        <AccountHero/>
        <OurStore/>
        <ClientFooter/>
    </div>
  )
}

export default ClientsInterface