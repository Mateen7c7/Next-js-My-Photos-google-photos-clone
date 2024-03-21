/* eslint-disable @next/next/no-img-element */
"use client";

import { photosId, storage } from "@/appwrite";
import { DownloadLink } from "@/components/DownloadLink";
import UploadFile from "@/components/UploadFile";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export default function Home() {
  const [photosIds, setPhotosIds] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");

  const getImage = (id: string) => {
    const image = storage.getFileView(photosId, id);
    // console.log(image);
    return image;
  };

  const deletePhoto = async (id: string) => {
    console.log(id);
    const arr = id.split("/");
    console.log(arr);
    const promise = await storage.deleteFile(photosId, arr[8]);
    console.log(promise);
    window.location.reload();
  };

  const getIds = async () => {
    const { files } = await storage.listFiles(photosId);
    // console.log(files);
    setPhotosIds(files.map((file) => file.$id));
  };

  useEffect(() => {
    getIds();
  }, []);

  const imagesArr = photosIds.map((id) => getImage(id));

  return (
    <div className="px-20 py-10">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">My Photos</h1>
      </div>
      <div className="text-center my-4">
        {/* <button className="bg-green-400 text-white font-medium px-2 py-1 rounded-md ">
          Add Image
        </button> */}
        <UploadFile />
      </div>
      <div className="flex flex-wrap gap-5">
        {imagesArr.map((image, i) => {
          return (
            <Imager
              setImage={setImage}
              setOpen={setOpen}
              key={i}
              image={image}
            />
          );
        })}
      </div>
      {open && (
        <div className="absolute backdrop-blur-md left-0 top-0 w-full h-full flex items-center justify-center">
          <div className="p-10 bg-white rounded relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4"
            >
              X
            </button>

            <div className="h-[100px] w-[100px] overflow-hidden">
              <img
                // src={getImage(image).href}
                src={image}
                alt=""
                className="h-auto max-w-[100%] "
              />
            </div>
            <div className="mt-4 flex flex-col gap-5">
              <DownloadLink url={image} fileName="image.jpg" />
              <button
                onClick={() => deletePhoto(image)}
                className="bg-red-500 text-white px-2 py-1 rounded-md font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Imager({
  image,
  setOpen,
  setImage,
}: {
  image: any;
  setOpen: any;
  setImage: any;
}) {
  return (
    <div
      onClick={() => {
        setImage(image.href);
        // setImage(image.pathname.slice(-25, -5));
        // console.log(image);
        // console.log(image.pathname.slice(-25, -5));
        setOpen(true);
      }}
      className="h-[200px]  cursor-pointer w-[200px] overflow-hidden rounded-sm border border-gray-100"
    >
      <img src={image.href} alt="" className="h-auto max-w-[100%] " />
    </div>
  );
}

// http://localhost:3030/v1/storage/buckets/65fbb53b741465c89cb4/files/8d0dea42-ef12-48f7-ab70-a7167ba1ae88/view?project=65fbb47d705df78cbc66
