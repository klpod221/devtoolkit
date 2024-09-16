import toolList from "./constants/ToolList.js";
import fs from "fs";
import { exec } from "child_process";

let text = `<div align="center">
    <h1>--// Developer Toolkit //</h1>
    <img src="https://img.shields.io/github/last-commit/klpod221/devtoolkit?style=for-the-badge&color=ffb4a2&labelColor=201a19">
    <img src="https://img.shields.io/github/stars/klpod221/devtoolkit?style=for-the-badge&color=e6c419&labelColor=1d1b16">
    <img src="https://img.shields.io/github/repo-size/klpod221/devtoolkit?style=for-the-badge&color=a8c7ff&labelColor=1a1b1f">
</div>

## About

This is a open-source project that I created to help developers with some tools that I use in my day-to-day life. I hope you enjoy it!

If you want to contribute, feel free to fork this repository and make a pull request with your changes.

And if you have any suggestions, please let me know by creating an issue.

## Tools List

`;

toolList.forEach((category) => {
  text += `### ${category.title}\n`;
  text += `| Status | Name | Description |\n`;
  text += `| --- | --- | --- |\n`;
  category.tools.forEach((tool) => {
    text += `| <ul><li> - [${tool.status ? "x" : " "}] </li></ul> | [${
      tool.name
    }](https://devtools.klpod221.site${category.path}${tool.path}) | ${
      tool.description
    } |\n`;
  });
});

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

// format the README file
exec("npx prettier --write README.md", (error, stdout, stderr) => {
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
