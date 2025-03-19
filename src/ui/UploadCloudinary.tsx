"use client";

import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

export default function UploadCloudanryButton() {
  const [source, setSource] = useState<undefined | string>();
  return (
    <>
      {source && (
        <div className="">
          <CldImage
            src={source}
            alt="item proof"
            width={100}
            height={100}
            crop={"scale"}
          />
        </div>
      )}
      <CldUploadWidget
        uploadPreset="ml_default"
        onSuccess={(result) => {
          if (typeof result !== "string") {
            const secureUrl = (result as { info: { secure_url: string } }).info
              .secure_url;
            setSource(secureUrl);
          }
        }}
        signatureEndpoint={"/api/sign-cloudinary-params"}
      >
        {({ open }) => {
          return (
            <button onClick={() => open()}>
              {!source ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-image-up"
                >
                  <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
                  <path d="m14 19.5 3-3 3 3" />
                  <path d="M17 22v-5.5" />
                  <circle cx="9" cy="9" r="2" />
                </svg>
              ) : null}
            </button>
          );
        }}
      </CldUploadWidget>
    </>
  );
}
