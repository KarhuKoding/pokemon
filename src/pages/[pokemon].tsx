import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { API_BASE_URL } from "@/misc/constants";

interface PokemonDetailData  {
    species: string;
    stats: Array<any>;
    types: Array<any>;
    weight: number;
    moves: Array<any>;
}


export default function DetailPage() {
  const router = useRouter();
  const name = router.query.pokemon;

  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  if (!name) return <div>Something went wrong !</div>;

  // TODO rewrite to NEXT.JS
  const url = API_BASE_URL + "pokemon/" + name;
  const { data, error, isLoading } = useSWR(url, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;



  console.log(data);

// - Species // data.species.name: string
// - Stats  //data.stats : array
// - Types //data.types : array
// - Weight //data.weight : number
// - Moves  //data.abilities : array

  return (
    <div>
      <div onClick={() => router.back()} style={{ cursor: "pointer" }}>
        <h1>&#8592; Go Back</h1>
      </div>
      {name}
    </div>
  );
}
