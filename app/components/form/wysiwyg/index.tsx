import Mention from "@tiptap/extension-mention";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import { type Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Icon } from "~/components/icon";
import { cn } from "~/utils/misc";

import suggestion from "./suggestion";

const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex justify-between gap-x-1">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cn(
          editor.isActive("bold") ? "is-active" : "",
          "flex p-0.5 hover:bg-slate-100 rounded-md group"
        )}
      >
        <Icon
          name="font-bold"
          size="md"
          className="text-zinc-500 group-hover:text-zinc-700"
        />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cn(
          editor.isActive("italic") ? "is-active" : "",
          "flex p-0.5 hover:bg-slate-100 rounded-md group"
        )}
      >
        <Icon
          name="font-italic"
          size="md"
          className="text-zinc-500 group-hover:text-zinc-700"
        />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={cn(
          editor.isActive("underline") ? "is-active" : "",
          "flex p-0.5 hover:bg-slate-100 rounded-md group"
        )}
      >
        <Icon
          name="underline"
          size="md"
          className="text-zinc-500 group-hover:text-zinc-700"
        />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={cn(
          editor.isActive("strike") ? "is-active" : "",
          "flex p-0.5 hover:bg-slate-100 rounded-md group"
        )}
      >
        <Icon
          name="strikethrough"
          size="md"
          className="text-zinc-500 group-hover:text-zinc-700"
        />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        className={cn(
          editor.isActive("bullet-list") ? "is-active" : "",
          "flex p-0.5 hover:bg-slate-100 rounded-md group"
        )}
      >
        <Icon
          name="list-bullet"
          size="md"
          className="text-zinc-500 group-hover:text-zinc-700"
        />
      </button>

      {/* <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        className={
          editor.isActive("textStyle", { color: "#958DF1" }) ? "is-active" : ""
        }
      >
        purple
      </button> */}
    </div>
  );
};

export default () => {
  const editor = useEditor({
    extensions: [
      Mention.configure({
        HTMLAttributes: {
          class:
            "mention font-bold text-indigo-600 cursor-pointer bg-violet-100 rounded-md p-0.5",
        },
        suggestion,
      }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      Underline,
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    content: ``,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-32 px-2 py-2",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="rounded-md border px-2 pb-2">
      <EditorContent editor={editor} />
      <div className="flex justify-between gap-x-1">
        <MenuBar editor={editor} />
        <button className="flex min-w-12 items-center justify-center gap-x-2 rounded-md bg-violet-100 px-4 py-1 transition-colors ease-in-out hover:bg-violet-50">
          <span className="text-sm font-medium text-indigo-600">Comment</span>
          {/* <Icon name="paper-plane" size="sm" className="text-indigo-600" /> */}
        </button>
      </div>
    </div>
  );
};
