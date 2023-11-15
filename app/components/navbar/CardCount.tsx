'use client'
import useCart from '@/hooks/useCart';
import Link from 'next/link';
import {MdShoppingBasket} from 'react-icons/md'

const CardCount = () => {
  const { cartPrdcts } = useCart();
  return (
    <div className='hidden md:flex relative'>
      <Link href='/cart'> <MdShoppingBasket size='30'/> </Link> 
      <div className='absolute -top-1 -right-2 text-xs bg-orange-900 w-5 h-5 flex items-center justify-center rounded-full'>{cartPrdcts?.length}</div>
    </div>
  )
}

export default CardCount