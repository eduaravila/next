import Head from "next/head";
import Link from "next/link";

import utilStyles from "../styles/utils.module.css";
import Layout, { siteTitle } from "../components/Layout/Layout";
import { getSortedPostData } from "../lib/post";
import { DateTag } from "../components/Date";

export default function Home({ allPostsData }) {
  console.log(allPostsData);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello i have big pp</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, data }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/post/[id]" as={"/post/" + id}>
                {data.title}
              </Link>

              <br />
              {id}
              <br />
              <DateTag dateToFormat={data.date} />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const allPostsData = getSortedPostData();
  return {
    props: {
      allPostsData,
    },
  };
};
