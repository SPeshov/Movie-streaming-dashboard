import Head from "next/head";
import Image from "next/image";

import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

const BASE_API = "https://wookie.codesubmit.io/movies";
const BASE_API_KEY = "Wookie2021";

type Movie = {
  genres: [string];
  backdrop: string;
  title: string;
  overview: string;
  id: string;
  poster: string;
};
type ResponseData = { data: { movies: Movie[] } };

export default function Home({ data }: ResponseData) {
  console.log(data);

  const [moviesByGenre, setMoviesByGenre] = useState<{
    [key: string]: Movie[];
  }>({});

  useEffect(() => groupeByGenre({ data }), []);

  // groupe movies by genre
  const groupeByGenre = ({ data }: ResponseData) => {
    let moviesByGenre: any = [];
    data.movies.forEach((movie) => {
      movie.genres.forEach((genre) => {
        if (typeof moviesByGenre[genre] === "undefined") {
          moviesByGenre[genre] = [];
        }
        moviesByGenre[genre].push(movie);
      });
    });
    setMoviesByGenre(moviesByGenre);
  };

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
        {Object.keys(moviesByGenre).map((genre) => (
          <div key={genre} className={styles.genre_wrapper}>
            <h3>{genre}</h3>

            <div className={styles.genre_row}>
              {moviesByGenre[genre].map((movie) => (
                <div key={movie.id}>
                  <Image
                    src={movie.poster}
                    alt="Vercel Logo"
                    width={600}
                    height={400}
                    layout="responsive"
                  />
                  <span> {movie.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
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
