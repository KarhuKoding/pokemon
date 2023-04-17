import React, { Fragment } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { API_BASE_URL } from "@/misc/constants";
import { get } from "lodash";
import Head from "next/head";

interface PokemonDetailData {
  species: string;
  stats: Array<any>;
  types: Array<any>;
  weight: number;
  moves: Array<any>;
}

function getDetails(data: any): PokemonDetailData {
  return {
    species: get(data, "species.name", "no species"),
    stats: get(data, "stats", []),
    types: get(data, "types", []),
    weight: get(data, "weight", 0),
    moves: get(data, "moves", []),
  };
}

export default function DetailPage() {
  const router = useRouter();
  const pokemonName = router.query.pokemon;

  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  if (!pokemonName) return <div>Something went wrong !</div>;

  // TODO rewrite to NEXT.JS
  const url = API_BASE_URL + "pokemon/" + pokemonName;
  const { data, error, isLoading } = useSWR(url, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const pokemonDetails = getDetails(data);

  return (
    <React.Fragment>
      <Head>
        <title>PokemonApp - {pokemonName}</title>
      </Head>
      <div>
        <div onClick={() => router.back()} style={{ cursor: "pointer" }}>
          <h1>&#8592; Go Back</h1>
        </div>
        <h1>{pokemonName}</h1>
        <section>
          <div>Species: {pokemonDetails.species}</div>
          <ul>
            Stats:
            {pokemonDetails.stats.map((stat) => {
              return (
                <li key={stat.stat.name}>
                  <strong>{stat.stat.name} </strong>Base: {stat.base_stat},
                  Effort: {stat.effort}
                </li>
              );
            })}
          </ul>
          <ul>
            Types:
            {pokemonDetails.types.map((type) => {
              return <li key={type.type.name}>{type.type.name}</li>;
            })}
          </ul>
          <div>Weight: {pokemonDetails.weight}</div>
          <p>
            Moves:
            <br />
            {pokemonDetails.moves.map((move) => {
              return <span key={move.move.name}>{move.move.name} /</span>;
            })}
          </p>
        </section>
      </div>
    </React.Fragment>
  );
}
