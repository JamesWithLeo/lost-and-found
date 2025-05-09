import Link from "next/link";
import LogoutButton from "./logoutButton";
import SigninButton from "./server/SigninButton";
import SignupButton from "./server/SignupButton";
import Logo from "./server/Logo";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function DiscoveryHeader({
  isAuth,
  photoUrl,
}: {
  isAuth: boolean;
  photoUrl: string | undefined;
}) {
  return (
    <header
      className={`sticky top-0 z-40 flex h-[--header-height] w-full items-center justify-between bg-white px-8 text-sm shadow`}
    >
      <Link href={isAuth ? "/" : "/discovery"} className={""}>
        <Logo />
      </Link>

      <span className="flex items-center gap-8">
        {!isAuth && (
          <div className="flex gap-4">
            <SigninButton />
            <SignupButton />
          </div>
        )}

        <div className="h-6 border-l border-gray-300"></div>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="flex items-center justify-center"
          >
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
              <AvatarImage src={photoUrl} />
              <AvatarFallback className="text-primary flex items-center justify-between">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M172,120a44,44,0,1,1-44-44A44.05,44.05,0,0,1,172,120Zm60,8A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88.09,88.09,0,0,0-91.47-87.93C77.43,41.89,39.87,81.12,40,128.25a87.65,87.65,0,0,0,22.24,58.16A79.71,79.71,0,0,1,84,165.1a4,4,0,0,1,4.83.32,59.83,59.83,0,0,0,78.28,0,4,4,0,0,1,4.83-.32,79.71,79.71,0,0,1,21.79,21.31A87.62,87.62,0,0,0,216,128Z"></path>
                </svg>
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side={"bottom"}
            align="start"
            sideOffset={10}
            className="mr-10 w-40 rounded-sm border bg-white py-2 shadow"
          >
            <DropdownMenuGroup>
              <DropdownMenuItem className="mx-1 flex items-center justify-between rounded border-0 px-2 py-1 outline-0 hover:bg-gray-100">
                <Link
                  href={isAuth ? "/" : "/discovery"}
                  className={"flex w-full items-center justify-between"}
                >
                  {isAuth ? "Home" : "Discovery"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-house text-gray-400"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="mx-1 flex items-center justify-between rounded border-0 px-2 py-1 outline-0 hover:bg-gray-100">
                <Link href={"/about"} className="w-full">
                  About us
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="mx-1 flex items-center justify-between rounded border-0 px-2 py-1 outline-0 hover:bg-gray-100">
                <Link href={"/contact"} className="w-full">
                  Contact us
                </Link>
              </DropdownMenuItem>
              {isAuth && (
                <>
                  <DropdownMenuSeparator className="my-1 h-[1px] w-full border-gray-500 bg-gray-200" />
                  <DropdownMenuItem className="mx-1 flex items-center justify-between rounded border-0 px-2 py-1 outline-0 hover:bg-gray-100">
                    <Link
                      href={"/my-item"}
                      className={"flex w-full items-center justify-between"}
                    >
                      My items
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-lock text-gray-500"
                      >
                        <rect
                          width="18"
                          height="11"
                          x="3"
                          y="11"
                          rx="2"
                          ry="2"
                        />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mx-1 flex items-center justify-between rounded border-0 px-2 py-1 outline-0 hover:bg-gray-100">
                    <Link
                      href={"/found-item"}
                      className={"flex w-full items-center justify-between"}
                    >
                      Found items
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-search-check text-gray-500"
                      >
                        <path d="m8 11 2 2 4-4" />
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1 h-[1px] w-full border-gray-500 bg-gray-200" />
                  <LogoutButton />
                </>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </span>
    </header>
  );
}
