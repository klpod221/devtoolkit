import TOOL_LIST from "./constants/tool_list.js";
import fs from "fs";
import { exec } from "child_process";

const format = (path) => {
  exec(`npx prettier --write ${path}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    console.log(`stdout: ${stdout}`);

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
  });
};

let siteMap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://devtools.klpod221.site/</loc>
    <lastmod>2024-09-20T06:47:18+01:00</lastmod>
    <priority>1.0</priority>
  </url>`;

let TOOL_LISTText = "";
let numberOfTools = 0;
let countCompleted = 0;

TOOL_LIST.forEach((category) => {
  TOOL_LISTText += `### ${category.title}\n`;
  TOOL_LISTText += `| Status | Name | Description |\n`;
  TOOL_LISTText += `| --- | --- | --- |\n`;

  const folderPath = "./pages/" + category.path.replace("/", "");

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  category.tools.forEach((tool) => {
    TOOL_LISTText += `| <ul><li> - [${tool.status ? "x" : " "}] </li></ul> | [${
      tool.name
    }](https://devtools.klpod221.site${category.path}${tool.path}) | ${
      tool.description
    } |\n`;

    // Create the file for each tool
    const fileName = tool.path.replace("/", "");
    const filePath = folderPath + "/" + fileName + ".jsx";

    if (!tool.status) {
      let componentName = tool.name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("")
        .replace(/[^a-zA-Z0-9]/g, "");

      let content = `
        import React from "react";
        import NextLink from "next/link";

        import MyCard from "@components/MyCard";
        import MyButton from "@components/MyButton";

        import { AiFillHome, AiFillGithub } from "react-icons/ai";

        const ${componentName} = () => {
          return (
            <MyCard className="w-full max-w-5xl">
              <h5 className="text-2xl font-bold tracking-tight">
                This tool is under development 🚧
              </h5>

              <p className="text-xl text-gray-700 dark:text-gray-400">
                I{"'"}m currently working on this tool (or not). Please check back later or create 
                a request on our Github repository if you want to see this tool sooner.
              </p>

              <div className="flex items-center space-x-2 mt-4">
                <MyButton>
                  <NextLink href="/" className="flex items-center space-x-2">
                    <AiFillHome className="w-5 h-5" />
                    <span>Go back home</span>
                  </NextLink>
                </MyButton>

                <MyButton color="warning">
                  <NextLink
                    href="https://github.com/klpod221/devtoolkit/issues"
                    target="_blank"
                    className="flex items-center space-x-2"
                  >
                    <AiFillGithub className="w-5 h-5" />
                    <span>Create a request</span>
                  </NextLink>
                </MyButton>
              </div>
            </MyCard>
          );
        };

        ${componentName}.title = "${tool.name}";
        export default ${componentName};

        `;

      fs.writeFileSync(filePath, content);
      format(filePath);
    }

    const stats = fs.statSync(filePath);
    const lastModified = stats.mtime.toISOString();

    siteMap += `
  <url>
    <loc>https://devtools.klpod221.site${category.path}${tool.path}</loc>
    <lastmod>${lastModified}</lastmod>
    <priority>1.0</priority>
  </url>`;
  });

  countCompleted += category.tools.filter((tool) => tool.status).length;
  numberOfTools += category.tools.length;
});

siteMap += `\n</urlset>`;
fs.writeFileSync("public/sitemap.xml", siteMap);

let text = `<div align="center">
    <h1>--// Developer Toolkit //--</h1>
    <img src="https://img.shields.io/github/last-commit/klpod221/devtoolkit?style=for-the-badge&color=ffb4a2&labelColor=201a19">
    <img src="https://img.shields.io/github/stars/klpod221/devtoolkit?style=for-the-badge&color=e6c419&labelColor=1d1b16">
    <img src="https://img.shields.io/github/repo-size/klpod221/devtoolkit?style=for-the-badge&color=a8c7ff&labelColor=1a1b1f">
</div>

## About

This is a open-source project that I created to help developers with some tools that I use in my day-to-day life. I hope you enjoy it!

If you want to contribute, feel free to fork this repository and make a pull request with your changes.

And if you have any suggestions, please let me know by creating an issue.

## Tools List (${countCompleted}/${numberOfTools})

`;

text += TOOL_LISTText;

text +=
  "\nAll tools are open-source and available on [GitHub](https://github.com/klpod221/devtoolkit).\n\n";

text += `## How to use

You can access the tools by clicking on the links above or by accessing the [website](https://devtools.klpod221.site).

Or you can clone this repository and run the project locally. Project uses [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) and [Flowbite React UI](https://flowbite-react.com/). To run the project locally or for development, follow the steps below:

1. Clone the repository
2. Install the dependencies with \`npm install\` (this project uses node v20)
3. Run the project with \`npm run dev\`
4. Access the project at \`http://localhost:3000\`

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
`;

fs.writeFileSync("README.md", text);

format("README.md");
