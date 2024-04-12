"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderLine from "@tiptap/extension-underline";

type Props = {
  content?: string;
};

/**
 * This is a text editor component that uses the Tiptap library.
 * It provides a WYSIWYG editor with a toolbar for text formatting.
 */

const TiptapReadOnly = ({ content }: Props) => {
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

    content: content || "Detalles Del Producto...",
  });
  if (editor) {
    editor.setEditable(false);
    return (
      <div className=" ">
        <EditorContent
          editor={editor}
          content={content}
          className="p-1"
          readOnly={true}
        />
      </div>
    );
  } else {
    return <div>Loading Content...</div>;
  }
};

export default TiptapReadOnly;
