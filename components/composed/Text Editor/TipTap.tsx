"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import Heading from "@tiptap/extension-heading";
import { Toolbar } from "./Toolbar";

type Props = {
  onChange(richText: string): void;
};

//TODO : docs

const Tiptap = ({ onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Underline,
      Bold,
      Italic,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc pl-8 ml-4",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal pl-8 ml-4",
        },
      }),
      ListItem,
      Heading.configure({
        HTMLAttributes: { class: "text-xl font-bold", levels: [1] },
      }),
    ],
    onUpdate({ editor }) {
      console.log(editor.getText());
    },
    content: "<p>Hello World! 🌎️</p>",
  });

  if (editor) {
    return (
      <div className="">
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    );
  } else {
    return <div>Loading Editor...</div>;
  }
};

export default Tiptap;
