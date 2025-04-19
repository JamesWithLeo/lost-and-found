"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProofGallary({
  itemProof,
  className,
}: {
  itemProof: string[] | null;
  className?: string;
}) {
  const [selected, SetSeleted] = useState<string | null>(
    itemProof?.length ? itemProof[0] : null,
  );
  className ??=
    "flex h-full max-h-60 min-h-60 w-full flex-col items-center gap-2 overflow-hidden";
  return (
    <div className={className}>
      {selected ? (
        <Image
          src={selected}
          width={100}
          height={100}
          alt={`proof-${selected}`}
          className="h-full w-full overflow-hidden object-cover"
        />
      ) : (
        <span className="text-primary flex h-full w-full items-center justify-center rounded p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32l80.34,44-29.77,16.3-80.35-44ZM128,120,47.66,76l33.9-18.56,80.34,44ZM40,90l80,43.78v85.79L40,175.82Zm176,85.78h0l-80,43.79V133.82l32-17.51V152a8,8,0,0,0,16,0V107.55L216,90v85.77Z"></path>
          </svg>
        </span>
      )}
      <section className="grid grid-cols-3 gap-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={`${index}`}>
            {itemProof?.length && itemProof[index] ? (
              <button
                key={`remaining-proof-${index + 1}`}
                className={`${itemProof[index] === selected ? "border-primary" : "hover:border-primary"} flex h-full w-full cursor-pointer items-center justify-center rounded border text-slate-400`}
                onClick={() => {
                  SetSeleted(itemProof[index]);
                }}
              >
                <Image
                  src={itemProof[index]}
                  width={100}
                  height={100}
                  alt={`proof-${selected}`}
                  className="h-full max-h-8 w-full max-w-8"
                />
              </button>
            ) : (
              <span
                key={`remaining-proof-${index + 1}`}
                className="flex h-full w-full items-center justify-center rounded border text-slate-400 sm:p-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32l80.35,44L178.57,92.29l-80.35-44Zm0,88L47.65,76,81.56,57.43l80.35,44Zm88,55.85h0l-80,43.79V133.83l32-17.51V152a8,8,0,0,0,16,0V107.56l32-17.51v85.76Z"></path>
                </svg>
              </span>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
