import Head from "next/head";
import Image from "next/image";

import styles from "@/styles/Home.module.css";

const BASE_API = "https://wookie.codesubmit.io/movies";
const BASE_API_KEY = "Wookie2021";

export default function Home({ data }: any) {
  console.log(data);
  return (
    <div className={styles.container}>
      <Head>
        <title>TypeScript starter for Next.js</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{data?.movies?.[0].title}</h1>
      </main>

      <footer className={styles.footer}>
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </footer>
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
