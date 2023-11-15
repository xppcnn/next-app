"use client";
import React, { useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";

interface uploadResult {
  public_id: string;
}
const UploadPage = () => {
  const [publicId, setPublicId] = useState("");
  return (
    <>
      {publicId && (
        <CldImage src={publicId} alt="image" width={300} height={200} />
      )}
      <CldUploadWidget
        uploadPreset="uap75rom"
        onUpload={(result, widget) => {
          if (result.event !== "success") return;
          const info = result.info as uploadResult;
          setPublicId(info.public_id);
        }}
      >
        {({ open }) => {
          return <Button onClick={() => open()}>Upload an Image</Button>;
        }}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
