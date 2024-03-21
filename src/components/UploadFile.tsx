"use client";
import React, { useState } from "react";
import { photosId, storage } from "@/appwrite";
import { v4 as uuid } from "uuid";

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const createFile = async (file: any) => {
    const promise = storage.createFile(photosId, uuid(), file);

    promise.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
    window.location.reload();
  };

  const handleUpload = () => {
    createFile(selectedFile);
  };

  return (
    <div>
      <h3>Upload File</h3>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadFile;
