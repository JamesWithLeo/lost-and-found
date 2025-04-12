"use client";
import { formatDistanceToNowStrict } from "date-fns";
import { redirect } from "next/navigation";
export default function ClaimantCard({
  claim,
  isAuthor,
  isCurrentUser,
}: {
  claim: {
    userId: string;
    createdAt: Date | null;
    itemId: string;
    caption: string | null;
    firstName: string | null;
    lastName: string | null;
  };
  isAuthor?: boolean;
  isCurrentUser: boolean;
}) {
  return (
    <div
      className="grid cursor-pointer grid-cols-[2fr_1fr_1fr] items-center rounded border border-gray-300 p-4 text-sm"
      onClick={() => {
        if (isAuthor) {
          redirect(`${claim.itemId}/c/${claim.userId}`);
        }
      }}
    >
      <h1 className="">
        {claim.firstName} {claim.lastName} {isCurrentUser && "(You)"}
      </h1>
      <h1 className="">{claim.caption}</h1>
      <h1>{formatDistanceToNowStrict(new Date(claim.createdAt!))} ago</h1>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-ellipsis-icon lucide-ellipsis"
      >
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg> */}
    </div>
  );
}
