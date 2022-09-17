import Head from "next/head"
import { FC, PropsWithChildren } from "react"

interface Props{
    title: string;
}

export const Layout: FC<PropsWithChildren<Props>>= ({ children, title }) => {
  return (
    <>
        <Head>
            <title>{ title || 'Pokemon App'}</title>
            <meta name="author" content="Daniel Restrepo" />
            <meta name="description" content={`${title} pokemon information` } />
            <meta name="keywords" content={`${title}, pokemon, pokedex`}/>
        </Head>

        {/* Navbar */}

        <main>
            { children }
        </main>
    </>
  )
}
