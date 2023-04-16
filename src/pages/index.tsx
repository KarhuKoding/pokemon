import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
} from "@mantine/core";
import { API_BASE_URL } from "../misc/constants";
import { Pagination } from "@mantine/core";
import { TOTAL_PAGES } from "../misc/constants";
import { generateOffsetUrl } from "../misc/helpers";

export default function Home(props: any) {
  const { pokemon } = props;
  const router = useRouter();
  const [activePage, setPage] = useState(1);

  const handleClick = (pokemonName: string) => {
    router.push("./" + pokemonName);
  };

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
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`}
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
        <Pagination value={activePage} onChange={setPage} total={TOTAL_PAGES} />

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

// TODO create helper function to generate URL

export async function getStaticProps() {
  // Static Generation for only 15 items not good for SEO
  const url = API_BASE_URL + generateOffsetUrl(15);

  const res = await fetch(url);
  const data = await res.json();

  return {
    props: {
      pokemon: data.results,
    },

    // TODO set revalidate
  };
}
