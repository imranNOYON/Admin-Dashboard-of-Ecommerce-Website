
import Product from '@/components/Product'
import React from 'react'

const NewProduct = () => {
  return (
    <>
    <div className="sm:flex sm:items-start sm:justify-between py-3">
        <div className='text-center sm:text-left'>
              <p className="mt-1.5 text-md text-gray-500 max-w-lg">
              Let's Create a new product
              </p>
        </div>
    </div>
    <hr class=" h-px border-0 bg-gray-300" />
    <div className='my-10'>
      <Product/>
    </div>
    </>
  )
}

export default NewProduct