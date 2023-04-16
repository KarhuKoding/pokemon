import Head from "next/head";
import React from "react";
import {
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
} from "@mantine/core";

export default function Home(props: any) {
  const { pokemon } = props;

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
      component="a"
      href="#"
      className={"card"}
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
      <main>Pokemon App</main>

      <div>
        <Container py="xl">
          <SimpleGrid cols={2}>{pokemonCards}</SimpleGrid>
        </Container>
      </div>
    </>
  );
}

const BASE_URL = "https://pokeapi.co/api/v2/";
const ALL_POKEMON = "pokemon?limit=100000&offset=0";
const FIRST_15 = "pokemon?limit=15&offset=0";

// TODO create helper function to generate URL

export async function getStaticProps() {
  const url = BASE_URL + FIRST_15;

  const res = await fetch(url);
  const data = await res.json();

  return {
    props: {
      pokemon: data.results,
    },

    // TODO set revalidate
  };
}
