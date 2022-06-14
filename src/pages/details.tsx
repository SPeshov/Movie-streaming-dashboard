import Head from "next/head";
import Image from "next/image";

import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { BASE_API, BASE_API_KEY, ResponseData } from "@/helpers";

export default function Details({ data }: ResponseData) {
  const router = useRouter();
  const { id } = router.query;

  const movie = data?.movies.find((movie) => movie.id === id);

  return (
    <div className={styles.container}>
      <Head>
        <title>TypeScript starter for Next.js</title>
        <meta name="description" content="Wookiea movies rockes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <h1>header</h1>
        </div>
        {movie ? (
          <div>
            <p> {movie.title}</p>
            <p> {movie.imdb_rating}</p>
            <p>{movie.overview}</p>
            <Image
              src={movie.poster}
              alt="Vercel Logo"
              width={600}
              height={400}
              layout="responsive"
            />
          </div>
        ) : (
          <div>movie not found</div>
        )}

        <footer className={styles.footer}>footer</footer>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch(BASE_API, {
    method: "get",
    headers: new Headers({
      Authorization: `Bearer ${BASE_API_KEY}`,
    }),
  });
  const data = await response.json();

  return { props: { data } };
}
