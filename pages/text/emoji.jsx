import React from "react";
import { toast } from "react-toastify";

import { emojiGroups, searchEmojiGroups } from "@utils/emojiPicker";

import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";

import { AiOutlineSearch } from "react-icons/ai";

const EmojiPicker = () => {
  const [keyword, setKeyword] = React.useState("");
  const [emojiData, setEmojiData] = React.useState(emojiGroups);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success(`${text} copied to clipboard`);
  };

  const handleSearch = React.useMemo(
    () =>
      _.debounce((value) => {
        if (value) {
          setEmojiData(searchEmojiGroups(value));
        } else {
          setEmojiData(emojiGroups);
        }
      }, 300),
    [],
  );

  React.useEffect(() => {
    handleSearch(keyword);
  }, [keyword, handleSearch]);

  return (
    <MyCard className="w-full">
      <MyInput
        type="search"
        placeholder="Search emoji by name or keyword"
        icon={AiOutlineSearch}
        value={keyword}
        onChange={setKeyword}
        id="search-input"
      />

      <div className="w-full h-[80vh] overflow-y-auto flex flex-col gap-3">
        {emojiData?.map((group) => (
          <div key={group.group}>
            <h2 className="text-xl font-bold">{group.group}</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {group.emojis.map((item) => (
                <div
                  key={item.name}
                  className="bg-gray-100 p-3 rounded-lg dark:bg-dark-secondary flex items-center gap-3"
                >
                  <div
                    className="text-3xl cursor-pointer"
                    onClick={() => copyToClipboard(item.emoji)}
                  >
                    {item.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-bold">
                      {item.title}
                    </div>
                    <div className="flex gap-2 text-xs font-mono opacity-70">
                      <span
                        className="cursor-pointer transition-colors hover:text-gray-500 dark:hover:text-gray-400"
                        onClick={() => copyToClipboard(item.codePoint)}
                      >
                        {item.codePoint}
                      </span>
                      <span
                        className="cursor-pointer transition-colors hover:text-gray-500 dark:hover:text-gray-400 truncate"
                        onClick={() => copyToClipboard(item.unicode)}
                      >
                        {item.unicode}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MyCard>
  );
};

EmojiPicker.title = "Emoji picker";
export default EmojiPicker;
