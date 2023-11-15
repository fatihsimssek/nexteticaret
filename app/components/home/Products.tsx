import React from 'react'
import Heading from '../general/Heading'
import { products } from '@/utils/Products'
import ProductCard from './ProductCard'

const Products = () => {
  return (
      <div>
      <Heading text='Tüm Ürünler' />
      <div className='flex items-center gap-3 flex-wrap md:gap-10 px-3 md:px-10'>
        {
          products.map(product => (
            <ProductCard key={product.id} product={product}/>
          ))
        }
      </div>
    </div>
  )
}

export default Products