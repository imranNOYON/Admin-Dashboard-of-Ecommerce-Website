import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import toast from "react-hot-toast";

const Product = (
  {
    _id,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice,
    images:existingImages
  }
) => {
  const router = useRouter();
  const [redirect, setRedirect] = useState(false);
  const [title, setTitle] = useState(existingTitle ||"");
  const [description, setDescription] = useState(existingDescription ||"");
  const [price, setPrice] = useState(existingPrice ||"");
  const [images, setImages] = useState(existingImages ||[]);
  const [isUploading, setIsUploading] = useState(false);

  const uploadImagesQueue = [];

  async function createProduct(ev) {
    ev.preventDefault();
    if (isUploading) {
      await Promise.all(uploadImagesQueue);
    }

    try {
      const data = { title, description, price, images };
      if(_id){
        await axios.put("/api/products", {...data,_id});
        toast.success('Product Updated!')
      }
      else{
        await axios.post("/api/products", data);
        toast.success('Product Created!')
      }
      setRedirect(true);
    } catch (error) {
      console.error(
        "Error creating product:",
        error.response?.data || error.message
      );
    }
  }

  async function uploadImage(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      for (const file of files) {
        const data = new FormData();
        data.append("file", file);

        uploadImagesQueue.push(
          axios
            .post("/api/upload", data)
            .then((res) => {
              setImages((oldImages) => [...oldImages, ...res.data.links]);
            })
            .catch((error) => {
              console.error(
                "Error uploading image:",
                error.response?.data || error.message
              );
            })
        );
      }
      await Promise.all(uploadImagesQueue);
      setIsUploading(false);
    } else {
      console.error("No files selected");
    }
  }

  if (redirect) {
    router.push("/products");
    return null;
  }

  function updateImagesOrder(Images) {
    setImages(Images);
  }

  function handleDeleteImage(index){
   const updateImages=[...images]
   updateImages.splice(index,1);
   setImages(updateImages)
  }

  return (
    <form onSubmit={createProduct} className="mx-auto max-w-screen-sm">
      {/* Title */}
      <div className="mx-auto my-4">
        <label htmlFor="title" className="block text-lg font-medium py-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="block w-full rounded-md p-4"
          placeholder="Product Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
      </div>

      {/* Images */}
      <div className="mx-auto my-4">
        <div className="mx-auto">
          <label for="example1" className="mb-1 block text-lg font-medium py-2">
            Images
          </label>
          <label
            className="flex w-full cursor-pointer border-2 border-dashed p-6 transition-all
        hover:border-primary-300"
          >
            <div className="text-center">
              <p>Click to upload or drag and drop</p>
              <p className="text-sm">SVG, PNG, JPG, or GIF (max. 800x400px)</p>
            </div>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={uploadImage}
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 items-center rounded">
        {isUploading && (
          <Spinner
            className="p-4 absolute top-1/2 left-1/2 transform
          -translate-x-1/2 -translate-y-1/2"
          />
        )}
      </div>

      {!isUploading && (
        <div className="grid grid-cols-2 gap-4">
          <ReactSortable
            list={Array.isArray(images) ? images : []}
            setList={updateImagesOrder}
            animation={200}
            className="grid grid-cols-2 gap-4"
          >
            {Array.isArray(images) &&
              images.map((link, index) => (
                <div key={link} className="relative group">
                  <img
                    src={link}
                    alt="image"
                    className="object-cover h-32 w-44
                       rounded-md"
                  />
                  <div
                    className="absolute top-1 right-2 cursor-pointer group-hover:opacity-100
                       opacity-0 transition-opacity"
                  >
                    <button onClick={() => handleDeleteImage(index)}>
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
          </ReactSortable>
        </div>
      )}

      {/* Description */}
      <div className="mx-auto my-4">
        <label htmlFor="description" className="block text-lg font-medium py-2">
          Description
        </label>
        <textarea
          id="description"
          rows={5}
          className="block w-full rounded-md p-4"
          placeholder="Product Description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
      </div>

      {/* Price */}
      <div className="mx-auto my-4">
        <label htmlFor="price" className="block text-lg font-medium py-2">
          Price
        </label>
        <input
          type="number"
          id="price"
          className="block w-full rounded-md p-4"
          placeholder="Product Price"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
      </div>

      {/* Submit Button */}
      <button
        className="block w-full bg-green-600 text-white py-3 rounded-md"
        type="submit"
      >
        Save Product
      </button>
    </form>
  );
};

export default Product;
