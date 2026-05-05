import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyInput from "@components/MyInput";
import CodeOutput from "@components/CodeOutput";
import { AiOutlineSearch, AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

const GitignoreGenerator = () => {
  const [templates, setTemplates] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://api.github.com/gitignore/templates",
        );
        setTemplates(res.data);
      } catch (err) {
        toast.error("Failed to load gitignore templates.");
      }
      setLoading(false);
    };
    fetchTemplates();
  }, []);

  const handleSelect = (template) => {
    if (!selected.includes(template)) {
      setSelected([...selected, template]);
    }
    setSearch("");
  };

  const handleRemove = (template) => {
    setSelected(selected.filter((t) => t !== template));
  };

  const handleGenerate = async () => {
    if (selected.length === 0) {
      toast.warning("Please select at least one template");
      return;
    }
    setGenerating(true);
    try {
      const promises = selected.map((t) =>
        axios.get(`https://api.github.com/gitignore/templates/${t}`, {
          headers: { Accept: "application/vnd.github.v3.raw" },
        }),
      );
      const results = await Promise.all(promises);
      const combined = results
        .map((r, i) => `### ${selected[i]} ###\n${r.data}`)
        .join("\n\n");
      setOutput(combined);
      toast.success("Generated successfully");
    } catch (err) {
      toast.error("Failed to generate gitignore.");
    }
    setGenerating(false);
  };

  const filteredTemplates = templates
    .filter(
      (t) =>
        t.toLowerCase().includes(search.toLowerCase()) && !selected.includes(t),
    )
    .slice(0, 10);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header
          title="Gitignore Generator"
          helper="Search and select environments, frameworks, or languages to generate a combined .gitignore file."
        />

        <div className="mb-4 mt-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {selected.map((t) => (
              <span
                key={t}
                className="px-3 py-1 bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300 rounded-full flex items-center text-sm"
              >
                {t}
                <button
                  onClick={() => handleRemove(t)}
                  className="ml-2 hover:text-red-500"
                >
                  <AiOutlineClose />
                </button>
              </span>
            ))}
          </div>

          <div className="relative">
            <MyInput
              placeholder="Search OS, IDE, or Framework (e.g. Node, React, Mac)..."
              value={search}
              onChange={(val) => setSearch(val)}
              icon={AiOutlineSearch}
            />
            {search && filteredTemplates.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-dark-secondary border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {filteredTemplates.map((t) => (
                  <button
                    key={t}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-between"
                    onClick={() => handleSelect(t)}
                  >
                    {t}
                    <AiOutlinePlus className="text-gray-400" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <MyButton
          onClick={handleGenerate}
          disabled={generating || selected.length === 0}
          loading={generating}
          className="w-full"
        >
          Generate .gitignore
        </MyButton>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Generated .gitignore file" />
        <CodeOutput output={output} language="markdown" />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

GitignoreGenerator.title = "Gitignore Generator";
export default GitignoreGenerator;
