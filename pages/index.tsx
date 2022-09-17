import { Button } from '@nextui-org/react'

import type { NextPage } from 'next'
import { Layout } from '../components/layouts';



const HomePage: NextPage = () => {
  return (

    <Layout title='Pokemons list'>
      <Button color="gradient">
        Hello world!
      </Button>
    </Layout>
   
  )
}

export default HomePage
