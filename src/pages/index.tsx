import {
  AspectRatio,
  Card,
  Container,
  Image,
  Pagination,
  SimpleGrid,
  Text,
} from "@mantine/core";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { InputWithButton } from "../components/Searchbar";
import { API_BASE_URL, OFFSET } from "../misc/constants";
import {
  generateOffsetUrl,
  getPokemonIndexFromUrl,
  getTotalPagesForPagination,
} from "../misc/helpers";

export default function Home(props: any) {
  const router = useRouter();
  const [pokemon, setPokemon] = useState(props.pokemon.results);
  const [activePage, setPage] = useState(1);
  const [userQuery, setUserQuery] = useState("");
  const [queryUrl, setqueryUrl] = useState(
    `${API_BASE_URL}pokemon?${generateOffsetUrl((activePage - 1) * OFFSET)}`
  );

  const handleClick = (pokemonName: string) => {
    router.push("./" + pokemonName);
  };

  useEffect(() => {
    if (userQuery.length > 3) {
      // WITH USERQUERY
      const url = `${API_BASE_URL}pokemon/${userQuery}?${generateOffsetUrl(
        (activePage - 1) * OFFSET
      )}`;
      setqueryUrl(url);
    } else {
      const url = `${API_BASE_URL}pokemon?${generateOffsetUrl(
        (activePage - 1) * OFFSET
      )}`;
      setqueryUrl(url);
    }
  }, [activePage, userQuery, setqueryUrl]);

  //@ts-ignore
  const fetcher = (...args) => fetch(...args).then((r) => r.json());
  const url = `${API_BASE_URL}pokemon?${generateOffsetUrl(
    (activePage - 1) * OFFSET
  )}`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  useEffect(() => {
    if (data) {
      console.log(data);
      setPokemon(data.results);
    }
  }, [data]);

  if (error) return "An error has occurred. / No Pokemon found";
  if (isLoading) return "Loading...";

  if (!pokemon)
    return (
      <React.Fragment>
        <h1>Something went wrong !</h1>
      </React.Fragment>
    );

  const pokemonCards = pokemon.map((p: any, index: number) => (
    <Card
      key={p.name}
      p="md"
      radius="md"
      className={"card"}
      onClick={() => handleClick(p.name)}
      style={{ cursor: "pointer" }}
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonIndexFromUrl(
            p.url
          )}.png`}
        />
      </AspectRatio>

      <Text mt={5}>{p.name}</Text>
    </Card>
  ));

  return (
    <>
      <Head>
        <title>PokemonApp</title>
        <meta name="description" content="Pokemon Overview" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Pokemon App</h1>
        <br />
        <InputWithButton updateQuery={setUserQuery} />

        <br />
        <Pagination
          value={activePage}
          onChange={setPage}
          total={getTotalPagesForPagination(props.pokemon.count)}
        />
        <br />
        <div>
          <Container py="xl">
            <SimpleGrid cols={2}>{pokemonCards}</SimpleGrid>
          </Container>
        </div>
      </main>
    </>
  );
}

// NEXT.JS

export async function getStaticProps() {
  // Static Generation for only 15 items not good for SEO
  const url = `${API_BASE_URL}pokemon?${generateOffsetUrl(0)}`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    props: {
      pokemon: data,
    },

    // TODO set revalidate
  };
}
