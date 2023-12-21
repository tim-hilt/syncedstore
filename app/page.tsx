"use client";

import { getYjsValue, syncedStore } from "@syncedstore/core";
import { useSyncedStore } from "@syncedstore/react";
import { FormEvent } from "react";
import { WebrtcProvider } from "y-webrtc";

export type Point = {
  x: number;
  y: number;
};

const globalStore = syncedStore({ points: [] as Array<Point> });
new WebrtcProvider("oienarsoietnoi", getYjsValue(globalStore) as any);

export default function Home() {
  const store = useSyncedStore(globalStore);

  const addCoordinate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const x = Number(formData.get("x"));
    const y = Number(formData.get("y"));
    const p: Point = { x, y };
    store.points.push(p);
  };

  return (
    <div className="p-4">
      <form onSubmit={addCoordinate} className="flex space-x-5">
        <label htmlFor="x">x</label>
        <input name="x" id="x" className="border-2 p-1" />
        <label htmlFor="y">y</label>
        <input name="y" id="y" className="border-2 p-1" />
        <button type="submit" className="border-2 p-1">
          Add Coordinate
        </button>
      </form>
      <ul className="list-disc p-4">
        {store.points.map((p, i) => {
          return <li key={`${i}-${p.x}-${p.y}`}>{`(${p.x}, ${p.y})`}</li>;
        })}
      </ul>
    </div>
  );
}
