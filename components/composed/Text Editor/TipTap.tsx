"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderLine from "@tiptap/extension-underline";
import { Toolbar } from "./Toolbar";
import { NewStoreItem } from "@/types/newStoreItem";

type Props = {
  onChange: React.Dispatch<React.SetStateAction<NewStoreItem>>;
};

//TODO : docs

const Tiptap = ({ onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
          HTMLAttributes: { class: "text-xl font-bold" },
        },
        bulletList: { HTMLAttributes: { class: "list-disc pl-8 ml-4" } },
        orderedList: { HTMLAttributes: { class: "list-decimal pl-8 ml-4" } },
      }),
      UnderLine,
    ],
    onUpdate({ editor }) {
      onChange((prevState) => ({ ...prevState, details: editor.getHTML() }));
    },
    content: "<p>...</p>",
  });

  if (editor) {
    return (
      <div className="border ">
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    );
  } else {
    return <div>Loading Editor...</div>;
  }
};

export default Tiptap;
