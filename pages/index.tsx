import type { NextPage, GetStaticProps } from "next";
import { Grid } from "@nextui-org/react";

import { pokeApi } from "../api";
import { Layout } from "../components/layouts";
import { PokemonListsResponse, SmallPokemon } from "../interfaces";
import { PokemonCard } from "../components/pokemon";


interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Pokemons list">
      <Grid.Container gap={ 2 } justify='flex-start'>
        {pokemons.map((pokemon) => {
          return (
            <PokemonCard pokemon={pokemon} key={pokemon.id}/>
          );
        })}
      </Grid.Container>
    </Layout>
  );
};

//This function is for static generation and can be only use in pages
//is executes when aplication is built an executes only one time
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListsResponse>(
    "/pokemon?limit=151"
  );

  console.log(data.results);

  const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => {
    return {
      ...pokemon,
      id: index + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`,
    };
  });

  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
