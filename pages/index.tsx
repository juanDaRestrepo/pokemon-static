import type { NextPage, GetStaticProps } from "next";
import { Card, Grid, Row, Text } from "@nextui-org/react";
import { pokeApi } from "../api";
import { Layout } from "../components/layouts";
import { PokemonListsResponse, SmallPokemon } from "../interfaces";
import Image from "next/image";

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Pokemons list">
      <Grid.Container gap={ 2 } justify='flex-start'>
        {pokemons.map(({ id, name, url, img }) => {
          return (
           <Grid xs={ 6 } sm={ 3 } md={ 2 } xl={ 1 } key={ id }>
              <Card isHoverable isPressable>
                <Card.Body css={{ p: 1}}>
                  <Card.Image 
                    src={ img }
                    width="100%"
                    height={ 140 }
                  />
                </Card.Body>
                <Card.Footer>
                  <Row justify="space-between">
                    <Text transform="capitalize">{ name }</Text>
                    <Text>#{ id }</Text>
                  </Row>
                </Card.Footer>
              </Card>
           </Grid>
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
