import Head from "next/head";

import Layout from "../../components/Layout/Layout";
import { getFilesLinks, getFileContent } from "../../lib/post";
import { DateTag } from "../../components/Date";

const Post = ({ data }) => {
  console.log(data);

  return (
    <Layout>
      <Head>
        <title>{data.title}</title>
      </Head>

      <h1>{data.title}</h1>
      <DateTag dateToFormat={data.date} />
      <div dangerouslySetInnerHTML={{ __html: data.contentHTML }} />
    </Layout>
  );
};

// ? returns a possible value for the id
export const getStaticPaths = async () => {
  const paths = getFilesLinks();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const data = await getFileContent(params.id);
  return {
    props: {
      data,
    },
  };
};
export default Post;
