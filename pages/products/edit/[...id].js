import Product from "@/components/Product";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState(null);
  useEffect(()=>{
   if(!id){
    return;
   }
   else{
    axios.get('/api/products?id='+id).then(response=>{
      setProductInfo(response.data)
    })
   }
  },[id])
  return (
    <>
      <div className="sm:flex sm:items-start sm:justify-between py-3">
        <p className="mt-1.5 text-md text-gray-500 max-w-lg">
          Editing {productInfo?.title}
        </p>
      </div>
      <hr class=" h-px border-0 bg-gray-300" />
      <div className="my-10">
           {
            productInfo && (
              <Product {...productInfo}/>
            )
           }
      </div>
    </>
  );
};

export default EditProduct;
