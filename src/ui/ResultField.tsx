"use client";
import { useState } from "react";

export default function ResultField({
  itemName,
  timeDate,
  location,
  category,
}: {
  itemName: string | undefined;
  location: string | undefined;
  timeDate: string | undefined;
  category: string | undefined;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  return (
    <div className="grid-col grid w-full flex-col gap-2 p-2">
      <div className="flex justify-between">
        <h1>Quick searh results: </h1>
        <div className="flex gap-1">
          <button
            className={`cursor-pointer rounded border ${!isEditing ? "bg-gray-700" : "bg-gray-400"} px-2 text-sm text-white shadow-sm`}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          {isEditing && (
            <button className="cursor-pointer rounded border bg-red-400 px-2 text-sm text-white shadow-sm">
              Save
            </button>
          )}
        </div>
      </div>
      <span className="grid grid-cols-2 gap-2">
        {!isEditing ? (
          <>
            <h1 className="">Item:</h1>
            <h1>{itemName}</h1>
          </>
        ) : (
          <>
            <h1>Item:</h1>
            <input
              className="rounded border px-2"
              defaultValue={itemName}
              name="itemName"
            />
          </>
        )}
      </span>

      <span className="grid grid-cols-2 gap-2">
        {!isEditing ? (
          <>
            <h1 className="">Category:</h1>
            <h1>{category}</h1>
          </>
        ) : (
          <>
            <h1>Category:</h1>

            <select
              name="category"
              required
              defaultValue={category}
              className="rounded border px-2"
            >
              <option value="">Select a category</option>
              <option value="animals">Animals</option>
              <option value="accessory">Accessory</option>
              <option value="clothing">Clothing</option>
              <option value="bags & wallet">Bags & Wallet</option>
              <option value="documents">Documents</option>
              <option value="electronics">Electronics</option>
              <option value="food & beverages">Food & Beverages</option>
              <option value="pets & person">Pets & Person</option>
              <option value="miscellaneous">Miscellaneous</option>
              <option value={"furniture"}>furniture</option>
              <option value={"toys & games"}>toys & games</option>
              <option value={"health & beauty"}>health & beauty</option>
              <option value={"sports & outdoors"}>sports & outdoors</option>
              <option value={"tools & equipment"}>tools & equipment</option>
              <option value={"jewelry"}>jewelry</option>
              <option value={"art & collectibles"}>art & collectibles</option>
            </select>
          </>
        )}
      </span>

      <span className="grid grid-cols-2 gap-2">
        {!isEditing ? (
          <>
            <h1>Last seen: </h1>
            <h1>
              {location} at {timeDate && new Date(timeDate).toLocaleString()}
            </h1>
          </>
        ) : (
          <>
            <h1>Location:</h1>
            <input
              className="rounded border px-2"
              name="location"
              defaultValue={location}
            />

            <h1>Time & Date:</h1>
            <input
              className="rounded border px-2"
              name="timeDate"
              type="datetime-local"
              defaultValue={timeDate}
            />
          </>
        )}
      </span>
    </div>
  );
}
