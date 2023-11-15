import Image from 'next/image'
import React from 'react'

const Banner = () => {
  return (
      <div className='h-[237px] bg-black flex items-center justify-center'>
          <div className='h-[220px] relative w-full'>
              <Image src={'/hepsi.jfif'} fill alt='' className='object-cover'/>
          </div>
    </div>
  )
}

export default Banner