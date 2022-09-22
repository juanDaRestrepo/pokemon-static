import { useRouter } from "next/router";
import { Layout } from "../../components/layouts";


const PokemonPage = () => {
  
    const router = useRouter();
    
    
    return (
        <Layout title='some pokemon'>
            <h1>hello</h1>
        </Layout>
  )
}

export async function getStaticPaths() {
    return {
      paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
      fallback: false, // can also be true or 'blocking'
    }
  }
  
  // `getStaticPaths` requires using `getStaticProps`
  export async function getStaticProps() {
    return {
      // Passed to the page component as props
      props: { post: {} },
    }
  }

export default PokemonPage;