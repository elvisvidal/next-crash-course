import { server } from '../config';
import Head from 'next/head';
import ArticleList from '../components/ArticleList';

export default function Home({ externalArticles, internalArticles }) {
  return (
    <div>
      <Head>
        <title>WebDev Newz</title>
        <meta name='keywords' content='web development, programming' />
      </Head>

      <h2>External API</h2>
      <ArticleList articles={externalArticles} />

      <h2>Internal API</h2>
      <ArticleList articles={internalArticles} />
    </div>
  )
}

export const getStaticProps = async () => {
  // external api
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
  const externalArticles =  await res.json();

  // internal api
  const resInternal = await fetch(`${server}/api/articles`);
  const internalArticles =  await resInternal.json();

  return {
    props: {
      externalArticles,
      internalArticles
    }
  }
}
