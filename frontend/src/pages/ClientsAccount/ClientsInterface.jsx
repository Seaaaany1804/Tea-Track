import React from 'react'
import AccountHero from './AccountHero'
import ClientInterfaceNavBar from '../../components/clients-components/ClientInterfaceNavBar'
import OurStore from './OurStore'
import ClientFooter from '../../components/clients-components/ClientFooter'

const ClientsInterface = () => {
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