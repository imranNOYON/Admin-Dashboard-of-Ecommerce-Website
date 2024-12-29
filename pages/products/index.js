import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [products,setProducts]=useState([])
  const [loading,setLoading]=useState(true)
  const formatPrice=(price)=>{
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
  }

  useEffect(()=>{
   axios.get('/api/products').then(res=>{
    setProducts(res.data);
    setLoading(false)
   })
  },[])

  return (
    <>
      <header>
        <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                All Products
              </h1>

              <p className="mt-1.5 text-md text-gray-500 max-w-lg">
                View the statistic about your business. Also manage and add
                product.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                className="inline-flex items-center justify-center gap-1.5 rounded border border-green-200 px-5 py-3 text-green-700 transition hover:bg-green-50 hover:text-green-700 focus:outline-none focus:ring"
                href="/products/new"
              >
                <span className="text-md font-medium"> Create Products </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <hr class="my-1 h-px border-0 bg-gray-300" />
      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
        {products.length===0 ?(
           <p>No Product found</p>
        ):(
           
<div class="">
  <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
    <thead class="bg-gray-50">
      <tr>   
        <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Name</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Description</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Price</th>
     
        <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
      </tr>
    </thead>
   {
    products.map((product,index)=>(
      <tbody class="divide-y divide-gray-100 border-t border-gray-100" key={product._id}>
      <tr>
        <th class="px-6 py-4 font-medium text-gray-900">{index+1}</th>
        <td class="px-6 py-4">{product.title}</td>
        <td class="px-6 py-4 truncate max-w-xs">{product.description}</td>
        <td class="px-6 py-4">
         {formatPrice(product.price)}
        </td>
        <td class="flex justify-end gap-4 px-6 py-4 font-medium">
        <Link href={"/products/delete/"+product._id } className="text-red-700">Delete</Link>
        <Link href={"/products/edit/"+product._id }class="text-green-700">Edit</Link>
        </td>
      </tr>
     
    </tbody>
    ))
   }
  </table>
</div>

        )}
      </div>
    </>
  );
};

export default Products;
