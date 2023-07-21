import { useEditor, EditorContent } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import {
  FaBold,
  FaItalic,
  FaParagraph,
  FaListUl,
  FaListOl,
  FaRotateLeft,
  FaRotateRight,
} from "react-icons/fa6";
import { Dispatch, SetStateAction } from "react";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap pt-2 px-2 items-center justify-end gap-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "is-active bg-black text-white rounded p-1 border border-black"
            : "bg-white text-black rounded border border-black p-1 cursor-pointer hover:bg-purple-50"
        }
      >
        <FaBold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "is-active bg-black text-white rounded p-1 border border-black cursor-pointer hover:bg-purple-950"
            : "bg-white text-black rounded border border-black p-1 cursor-pointer hover:bg-purple-50"
        }
      >
        <FaItalic />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={
          editor.isActive("paragraph")
            ? "is-active bg-black text-white rounded p-1 border border-black cursor-pointer hover:bg-purple-950"
            : "bg-white text-black rounded border border-black p-1 cursor-pointer hover:bg-purple-50"
        }
      >
        <FaParagraph />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? "is-active bg-black text-white rounded p-1 border border-black cursor-pointer hover:bg-purple-950"
            : "bg-white text-black rounded border border-black p-1 cursor-pointer hover:bg-purple-50"
        }
      >
        <FaListUl />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? "is-active bg-black text-white rounded p-1 border border-black cursor-pointer hover:bg-purple-950"
            : "bg-white text-black rounded border border-black p-1 cursor-pointer hover:bg-purple-50"
        }
      >
        <FaListOl />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="bg-white text-black rounded border border-black p-1 cursor-pointer hover:bg-purple-50"
      >
        <FaRotateLeft />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="bg-white text-black rounded border border-black p-1 cursor-pointer hover:bg-purple-50"
      >
        <FaRotateRight />
      </button>
    </div>
  );
};

export default ({
  notes,
  setNotes,
}: {
  notes: string;
  setNotes: Dispatch<SetStateAction<string>>;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose focus:outline-none p-4 h-56",
      },
    },
    content: `
     
    `,
    onUpdate: ({ editor }) => {
      setNotes(editor.getHTML());
    },
  });

  return (
    <div className="border rounded border-gray-500">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
