import { useEditor, EditorContent, Editor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import {
  FaBold,
  FaItalic,
  FaListUl,
  FaListOl,
  FaRotateLeft,
  FaRotateRight,
  FaUnderline,
} from "react-icons/fa6";
import { Dispatch, SetStateAction } from "react";
import Placeholder from "@tiptap/extension-placeholder";
import { FieldValues, UseFormSetValue } from "react-hook-form";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap pt-2 px-2 items-center gap-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "is-active text-purple-900 p-1 rounded cursor-pointer bg-purple-50"
            : "bg-white text-gray-500 p-1 cursor-pointer hover:bg-purple-50"
        }
      >
        <FaBold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "is-active text-purple-900 p-1 rounded cursor-pointer bg-purple-50"
            : "bg-white text-gray-500 p-1 cursor-pointer hover:bg-purple-50"
        }
      >
        <FaItalic className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={
          editor.isActive("underline")
            ? "is-active text-purple-900 p-1 rounded cursor-pointer bg-purple-50"
            : "bg-white text-gray-500 p-1 cursor-pointer hover:bg-purple-50"
        }
      >
        <FaUnderline className="w-4 h-4" />
      </button>
      <div className="h-6 border-l border-gray-300" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? "is-active text-purple-900 p-1 rounded cursor-pointer bg-purple-50"
            : "bg-white text-gray-500 p-1 cursor-pointer hover:bg-purple-50"
        }
      >
        <FaListUl className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? "is-active text-purple-900 p-1 rounded cursor-pointer bg-purple-50"
            : "bg-white text-gray-500 p-1 cursor-pointer hover:bg-purple-50"
        }
      >
        <FaListOl className="w-4 h-4" />
      </button>
      <div className="h-6 border-l border-gray-300" />
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="bg-white text-gray-500 p-1 cursor-pointer hover:bg-purple-50"
      >
        <FaRotateLeft className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="bg-white text-gray-500 p-1 cursor-pointer hover:bg-purple-50"
      >
        <FaRotateRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ({
  setValue,
  placeholder = "",
}: {
  setValue: (value: string) => void;
  placeholder?: string;
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
      Underline,
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none w-full p-4 h-56",
      },
    },
    // content: value,
    onUpdate: ({ editor }) => {
      setValue(editor.getHTML());
    },
  });

  return (
    <div className="border rounded focus-within:outline focus-within:outline-2 focus-within:outline-purple-500 border-gray-500">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
