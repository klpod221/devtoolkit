import axios from "axios";
import languages from "@/const/languages";

const post = async (req, res) => {
  const { code, language, stdin } = req.body;

  const selectedLanguage = languages.find((lang) => lang.slug === language);

  if (!selectedLanguage) {
    return res.status(400).json({ error: "Invalid language" });
  }

  if (!code) {
    return res.status(200).json({ stdout: null });
  }

  try {
    let formData;

    if (language == "html") {
      const randomCode = Math.random().toString(36).substring(2, 11);

      formData = {
        properties: {
          language,
          files: [
            {
              name: "index.html",
              content: code,
            },
          ],
        },
        _id: randomCode,
      };
    } else {
      formData = {
        properties: {
          language,
          files: [
            {
              name: `main.${selectedLanguage.extension}`,
              content: code,
            },
          ],
          stdin,
        },
      };
    }

    const { data } = await axios.post(
      "https://onecompiler.com/api/code/exec",
      formData
    );

    delete data.job;

    if (language == "html" && data.stdout) {
      const url = `https://app.onecompiler.com/${data.stdout}`;

      const { data: htmlData } = await axios.get(url);

      data.stdout = htmlData;
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      return post(req, res);
    default:
      return res.status(405).end();
  }
};

export default handler;
