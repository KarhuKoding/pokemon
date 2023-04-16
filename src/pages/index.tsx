import Head from "next/head";

export default function Home(props: any) {
  const { pokemon } = props;

  console.log(pokemon);
  return (
    <>
      <Head>
        <title>PokemonApp</title>
        <meta name="description" content="Pokemon Overview" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>Pokemon App</main>
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
