"use client";

import { itemsSchema } from "@/db/schema";
import { inferSelectModel } from "drizzle-orm";
import { useEffect, useState, useRef, useCallback } from "react";
import MatchingCard from "@/ui/MatchingCard.tsx";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const loaderRef = useRef(null);
  const lastDatePosted = useRef<string>("");

  const postedItemsRef = useRef<
    {
      item: inferSelectModel<typeof itemsSchema>;
      user: {
        id: string;
        firstName: string | null;
        lastName: string | null;
        email: string | null;
      } | null;
      claimantCount: number;
    }[]
  >([]);

  const [postedItems, setPostedItems] = useState<
    {
      item: inferSelectModel<typeof itemsSchema>;
      user: {
        id: string;
        firstName: string | null;
        lastName: string | null;
        email: string | null;
      } | null;
      claimantCount: number;
    }[]
  >([]);

  const fetchItems = useCallback(async () => {
    const offset = postedItemsRef.current.length;
    const query = new URLSearchParams({
      byDate: true,
      lastDate: lastDatePosted.current,
      byPopularity: false,
      byBounty: false,
      random: true,
      offset: offset,
    });
    try {
      setIsFetching(true);
      const res = await fetch(`/api/browse?${query}`);
      const data = await res.json();
      setIsFetching(false);
      // End of result

      const combined = [...postedItemsRef.current, ...data.items];
      const uniqueItemsMap = new Map<
        number,
        {
          item: inferSelectModel<typeof itemsSchema>;
          user: {
            id: string;
            firstName: string | null;
            lastName: string | null;
            email: string | null;
          } | null;
          claimantCount: number;
        }
      >();

      combined.forEach((items) => {
        uniqueItemsMap.set(items.item.id, items);
      });

      const mergedItems = Array.from(uniqueItemsMap.values());
      console.log("current:", postedItemsRef.current);
      postedItemsRef.current = mergedItems;
      setPostedItems(mergedItems);

      if (data.remaining <= 0) {
        setIsEnd(true);
      } else {
        lastDatePosted.current = data.items.at(-1).item.createdAt;
      }
    } catch (error) {
      console.error("Failed to load items", error);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (isEnd) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("Search again!");
          fetchItems();
        }
      },
      { threshold: 1.0 },
    );
    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => el && observer.unobserve(el);
  }, [isEnd]);

  return (
    <main className="flex w-full  flex-col gap-8 items-center px-[1.5rem] py-10 sm:px-8">
      <section className="grid items-start grid-cols-1 min-h-dvh grid-rows-1  md:grid-cols-4 w-full  max-w-7xl  gap-8">
        {postedItems &&
          Array.isArray(postedItems) &&
          postedItems.length &&
          postedItems.map(({ item, claimCount, user }) => (
            <MatchingCard
              key={item.id}
              item={item}
              isCurrentUser={false}
              user={user}
              claimantCount={claimCount}
              clickLink="/found-item/"
            />
          ))}
      </section>

      {isFetching && !isEnd && <div>Loading...</div>}

      {<div ref={loaderRef}></div>}

      {isEnd && <h1>No more result</h1>}
    </main>
  );
}
