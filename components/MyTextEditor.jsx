import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import {
  TbArrowBack,
  TbArrowForwardUp,
  TbBlockquote,
  TbBold,
  TbClearFormatting,
  TbCode,
  TbCodePlus,
  TbH1,
  TbH2,
  TbH3,
  TbH4,
  TbItalic,
  TbList,
  TbListNumbers,
  TbStrikethrough,
  TbTextWrap,
  TbArrowsHorizontal,
} from "react-icons/tb";

const MyTextEditor = ({ content, setContent }) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      if (setContent) {
        setContent(editor.getHTML());
      }
    },
  });

  const items = [
    {
      type: "button",
      icon: TbBold,
      title: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
    },
    {
      type: "button",
      icon: TbItalic,
      title: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
    },
    {
      type: "button",
      icon: TbStrikethrough,
      title: "Strike",
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("strike"),
    },
    {
      type: "button",
      icon: TbCode,
      title: "Inline code",
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive("code"),
    },
    {
      type: "divider",
    },
    {
      type: "button",
      icon: TbH1,
      title: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      type: "button",
      icon: TbH2,
      title: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      type: "button",
      icon: TbH3,
      title: "Heading 3",
      action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: () => editor.isActive("heading", { level: 4 }),
    },
    {
      type: "button",
      icon: TbH4,
      title: "Heading 4",
      action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: () => editor.isActive("heading", { level: 4 }),
    },
    {
      type: "divider",
    },
    {
      type: "button",
      icon: TbList,
      title: "Bullet list",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      type: "button",
      icon: TbListNumbers,
      title: "Ordered list",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      type: "button",
      icon: TbCodePlus,
      title: "Code block",
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
    },
    {
      type: "button",
      icon: TbBlockquote,
      title: "Blockquote",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      type: "divider",
    },
    {
      type: "button",
      icon: TbArrowsHorizontal,
      title: "Horizontal rule",
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      type: "button",
      icon: TbTextWrap,
      title: "Hard break",
      action: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      type: "button",
      icon: TbClearFormatting,
      title: "Clear format",
      action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    },

    {
      type: "button",
      icon: TbArrowBack,
      title: "Undo",
      action: () => editor.chain().focus().undo().run(),
    },
    {
      type: "button",
      icon: TbArrowForwardUp,
      title: "Redo",
      action: () => editor.chain().focus().redo().run(),
    },
  ];

  const isToolActive = (item) => {
    if (!editor) return false;

    if (item.isActive) {
      return item.isActive();
    }

    return false;
  };

  return (
    <div className="w-full h-full relative border border-gray-200 dark:border-dark-secondary overflow-y-auto">
      <div className="flex space-x-2 overflow-x-auto sticky border-b border-gray-200 dark:border-dark-secondary bg-white dark:bg-dark-secondary top-0 z-10">
        {items.map((item, index) => {
          if (item.type === "button") {
            return (
              <button
                key={index}
                className={`p-1 focus:outline-none hover:bg-gray-100 dark:hover:bg-dark rounded-full ${
                  isToolActive(item) ? "text-green-500" : ""
                }`}
                onClick={item.action}
              >
                <item.icon className="w-4 h-4" />
              </button>
            );
          } else if (item.type === "divider") {
            return <div key={index} className="border-r w-"></div>;
          }
        })}
      </div>

      <EditorContent editor={editor} className="text-editor h-full" />
    </div>
  );
};

export default MyTextEditor;
