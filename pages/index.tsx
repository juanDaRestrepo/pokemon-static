
import type { NextPage, GetStaticProps } from 'next'
import { pokeApi } from '../api';
import { Layout } from '../components/layouts';
import { PokemonListsResponse } from '../interfaces/pokemon-list';



const HomePage: NextPage = (props) => {
  console.log(props);
  
  return (

    <Layout title='Pokemons list'>
      
    </Layout>
   
  )
}

//This function is for static generation and can be only use in pages
//is executes when aplication is built an executes only one time 
export const getStaticProps: GetStaticProps = async (ctx) => {
  
  const { data } = await pokeApi.get<PokemonListsResponse>('/pokemon?limit=151');
  
  return {
    props: {
      pokemons: data.results
    }
  }
}

export default HomePage
