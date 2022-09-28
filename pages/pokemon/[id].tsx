import { Layout } from "../../components/layouts";

import { GetStaticProps, NextPage } from "next";
import pokeApi from "../../api/pokeApi";
import { Pokemon } from "../../interfaces";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  return (
    <Layout title="some pokemon">
      <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
        <Grid xs={12} sm={4}>
          <Card>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: "flex", justifyContent: "space-between" }}>
              <Text h1 transform="capitalize">{ pokemon.name }</Text>
              <Button
                color="gradient"
                ghost
              >
                Save to favorites
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites</Text>
              <Container direction="row" display="flex" gap={ 0 }>
                <Image
                  src={ pokemon.sprites.front_default }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image
                  src={ pokemon.sprites.back_default }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image
                  src={ pokemon.sprites.front_shiny }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image
                  src={ pokemon.sprites.back_shiny }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export async function getStaticPaths() {
  const pokemon151 = [...Array(151)].map((value, index) => `${index + 1}`);
  return {
    paths: pokemon151.map((id) => ({
      params: { id },
    })),
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const { data } = await pokeApi.get<Pokemon>(`pokemon/${id}`);

  return {
    // Passed to the page component as props
    props: { pokemon: data },
  };
};

export default PokemonPage;
