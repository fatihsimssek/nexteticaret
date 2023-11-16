import React from 'react'
import Logo from './Logo'
import Search from './Search'
import CardCount from './CardCount'
import User from './User'
import HamburgerMenu from './HamburgerMenu'
import { getCurrentUser } from '@/app/actions/getCurrentUser'

const Navbar = async () => {

  const currentUser:any = await getCurrentUser();
  return (
      <div className='flex text-slate-100 items-center justify-between gap-3 md:gap-10 px-3 md:px-10 h-16 bg-orange-600 '>
          <Logo />
          <Search />
          <CardCount />
          <User currentUser={currentUser} />
          <HamburgerMenu/>
    </div>
  )
}

export default Navbar