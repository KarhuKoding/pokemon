import React from "react";
import { useRouter } from "next/router";

export default function DetailPage() {
  const router = useRouter();
  const name = router.query.pokemon;

  if (!name) return <div>Something went wrong !</div>;

  return (
    <div>
      <div onClick={() => router.back()} style={{ cursor: "pointer" }}>
        <h1>&#8592; Go Back</h1>
      </div>
      {name}
    </div>
  );
}
