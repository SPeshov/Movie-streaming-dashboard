import Head from "next/head";
import Image from "next/image";

import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { getMovies, groupeByGenre, Movie, ResponseData } from "@/helpers";
import { DebounceInput } from "react-debounce-input";
import { ParsedUrlQuery } from "querystring";

export default function Home({ data: serverData }: ResponseData) {
  console.log(serverData);
  const { query } = useRouter();
  const search = query.search as string;

  const [moviesByGenre, setMoviesByGenre] = useState<{
    [key: string]: Movie[];
  }>(groupeByGenre({ movies: serverData.movies }));

  const updateQuery = (search: string) => {
    Router.replace({
      pathname: "/",
      query: { search: encodeURI(search) },
    });
  };

  useEffect(() => {
    const getNewData = async () => {
      const response = await getMovies({ search });
      setMoviesByGenre(groupeByGenre({ movies: response.movies }));
    };

    if (search) {
      getNewData();
    }

    if (!search || search.length < 3) {
      setMoviesByGenre(groupeByGenre({ movies: serverData.movies }));
    }
  }, [search]);

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
          <DebounceInput
            minLength={2}
            value={search}
            className="search"
            placeholder="Enter something here..."
            debounceTimeout={500}
            onChange={(e) => updateQuery(e.target.value)}
          />
        </div>
        {Object.keys(moviesByGenre).map((genre) => (
          <div key={genre} className={styles.genre_wrapper}>
            <h3>{genre}</h3>

            <div className={styles.genre_row}>
              {moviesByGenre[genre].map((movie) => (
                <Link
                  key={movie.id}
                  href={{
                    pathname: "/details",
                    query: { id: movie.id },
                  }}
                >
                  <a className={styles.movie_wrapper}>
                    <Image
                      src={movie.poster}
                      alt="Vercel Logo"
                      width={600}
                      height={400}
                      layout="responsive"
                    />
                    <span> {movie.title}</span>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        ))}
        <footer className={styles.footer}>footer</footer>
      </main>
    </div>
  );
}

export async function getServerSideProps({
  query,
  res,
}: {
  query: ParsedUrlQuery;
}) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const search = query.search as string;

  const data = await getMovies({ search });

  return { props: { data } };
}
