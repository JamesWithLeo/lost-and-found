"use client";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
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
    <>
      {isAuthor ? (
        <Link
          className="grid cursor-pointer grid-cols-[2fr_1fr_1fr] items-center rounded border-gray-300 bg-white p-4 text-sm hover:bg-gray-100"
          href={`${claim.itemId}/c/${claim.userId}`}
        >
          <h1 className="">
            {claim.firstName} {claim.lastName} {isCurrentUser && "(You)"}
          </h1>
          <h1 className="">{claim.caption}</h1>
          <h1>
            {formatDistanceToNowStrict(new Date(claim.createdAt!), {
              addSuffix: true,
            })}
          </h1>
        </Link>
      ) : (
        <div className="grid cursor-pointer grid-cols-[2fr_1fr_1fr] items-center rounded border-gray-300 bg-white p-4 text-sm hover:bg-gray-100">
          <h1 className="">
            {claim.firstName} {claim.lastName} {isCurrentUser && "(You)"}
          </h1>
          <h1 className="">{claim.caption}</h1>
          <h1>
            {claim.createdAt
              ? `${formatDistanceToNowStrict(new Date(claim.createdAt), { addSuffix: true })}`
              : "Unknown Time"}
          </h1>
        </div>
      )}
    </>
  );
}
