import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import remark_html from "remark-html";

const postDir = path.join(process.cwd(), "posts");

export const getSortedPostData = () => {
  const fileNames = fs.readdirSync(postDir);

  const allFilesWidouthMd = fileNames.map((file) => {
    // replace the .md string with nothing at the end of the word if this contains said word
    const id = file.replace(/\.md$/, "");

    const fullPath = path.join(postDir, file);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const parsedData = matter(fileContent);

    // ? returns the parsed data & the id
    return { id, ...parsedData };
  });
  return allFilesWidouthMd.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
};

export const getFilesLinks = () => {
  const fileNames = fs.readdirSync(postDir);

  return fileNames.map((file) => {
    // replace the .md string with nothing at the end of the word if this contains said word
    return { params: { id: file.replace(/\.md$/, "") } };
  });
};

export const getFileContent = async (file) => {
  const fullPath = path.join(postDir, file + ".md");
  const fileContent = fs.readFileSync(fullPath, "utf8");

  const parsedData = matter(fileContent);

  const contentHTMLProcess = await remark()
    .use(remark_html)
    .process(parsedData.content);
  const contentHTML = contentHTMLProcess.toString();
  return {
    id: file,
    contentHTML,
    ...parsedData.data,
  };
};
