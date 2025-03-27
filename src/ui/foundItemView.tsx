"use client";
import { items as itemTable } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import FoundItemCard from "@/ui/FoundItemCard";

export default function FoundItemView({
  items,
}: {
  items: InferSelectModel<typeof itemTable>[] | null;
}) {
  const [view, setView] = useState<"grid" | "list">("grid");
  useEffect(() => {
    const savedView = localStorage.getItem("foundItemView");
    if (savedView === "list") setView(savedView);
  }, []);
  const toggleView = (value: "list" | "grid") => {
    setView(value);
    localStorage.setItem("foundItemView", value);
  };
  return (
    <section className="max-w-[1440px]] mt-4 flex w-full flex-col gap-2 px-48">
      <Tabs defaultValue="all" className="col-start-2">
        <div className="flex w-max justify-between gap-8">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Input placeholder="Search" />
            <button className="bg-primary rounded px-2 text-white">
              Search
            </button>
            <button
              className="rounded bg-slate-100 p-2 text-gray-500"
              onClick={() => {
                toggleView(view === "list" ? "grid" : "list");
              }}
            >
              {view === "grid" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M120,56v48a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40h48A16,16,0,0,1,120,56Zm80-16H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm-96,96H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm96,0H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Z"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M224,152v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V152a16,16,0,0,1,16-16H208A16,16,0,0,1,224,152ZM208,48H48A16,16,0,0,0,32,64v40a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V64A16,16,0,0,0,208,48Z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
        <TabsContent
          value="all"
          className={`grid ${view === "list" ? "grid-cols-1" : "grid-cols-3"} justify-end gap-1.5`}
        >
          {items &&
            items.length &&
            items.map((i) => (
              <FoundItemCard
                key={`${i.id}`}
                view={view}
                href={`/found-item/${i.id}`}
                i={i}
              />
            ))}
        </TabsContent>
        <TabsContent
          value="pending"
          className="grid grid-cols-3 justify-end gap-1.5"
        >
          {items &&
            items.length &&
            items
              .filter((h) => h.itemStatus === "pending")
              .map((i) => (
                <FoundItemCard
                  view={view}
                  key={`${i.id}`}
                  href={`/found-item/${i.id}`}
                  i={i}
                />
              ))}
        </TabsContent>
      </Tabs>
    </section>
  );
}
