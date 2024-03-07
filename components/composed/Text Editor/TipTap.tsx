"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderLine from "@tiptap/extension-underline";
import { Toolbar } from "./Toolbar";

type Props = {
  onChange: React.Dispatch<React.SetStateAction<string>>;
  content?: string;
};

/**
 * This is a text editor component that uses the Tiptap library.
 * It provides a WYSIWYG editor with a toolbar for text formatting.
 */

const Tiptap = ({ onChange, content }: Props) => {
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
      onChange(editor.getHTML());
    },
    content: content || "Detalles Del Producto...",
  });

  if (editor) {
    return (
      <div className="border ">
        <Toolbar editor={editor} />
        <EditorContent editor={editor} content={content} className="p-1" />
      </div>
    );
  } else {
    return <div>Loading Editor...</div>;
  }
};

export default Tiptap;
