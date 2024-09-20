import toolList from "./constants/ToolList.js";
import fs from "fs";

let siteMap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://devtools.klpod221.site/</loc>
    <lastmod>2024-09-20T06:47:18+01:00</lastmod>
    <priority>1.0</priority>
  </url>
`;

toolList.forEach((category) => {
  const folderPath = "./pages/" + category.path.replace("/", "");

  category.tools.forEach((tool) => {
    const fileName = tool.path.replace("/", "");
    const filePath = folderPath + "/" + fileName + ".jsx";
    const stats = fs.statSync(filePath);
    const lastModified = stats.mtime.toISOString();

    siteMap += `\n  <url>`;
    siteMap += `\n    <loc>https://devtools.klpod221.site${category.path}${tool.path}</loc>`;
    siteMap += `\n    <lastmod>${lastModified}</lastmod>`;
    siteMap += `\n    <priority>0.8</priority>`;
    siteMap += `\n  </url>`;
  });
});

siteMap += `\n</urlset>`;

fs.writeFileSync("./public/sitemap.xml", siteMap);
