import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import {
  Bold, Italic, List, Type, Heading1, Heading2, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Highlighter, Link as LinkIcon, Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon, Table as TableIcon,
  Underline as UnderlineIcon, ListOrdered, Quote,
  Undo, Redo, Strikethrough
} from 'lucide-react';
import { useEffect } from 'react';

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const setLink = () => {
    const url = window.prompt('URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="sticky top-0 z-10 flex flex-wrap gap-1 p-2 border-b bg-white shadow-sm">
      <div className="flex gap-1 items-center border-r pr-1">
        <button 
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
          title="Gras"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button 
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
          title="Italique"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button 
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
          title="Souligné"
        >
          <UnderlineIcon className="w-4 h-4" />
        </button>
        <button 
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}
          title="Barré"
        >
          <Strikethrough className="w-4 h-4" />
        </button>
        <button 
          type="button"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('highlight') ? 'bg-gray-200' : ''}`}
          title="Surligner"
        >
          <Highlighter className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-1 items-center border-r pr-1">
        <button 
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('paragraph') ? 'bg-gray-200' : ''}`}
          title="Paragraphe"
        >
          <Type className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
          title="Titre 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button 
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
          title="Titre 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-1 items-center border-r pr-1">
        <button 
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
          title="Aligner à gauche"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button 
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
          title="Centrer"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button 
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
          title="Aligner à droite"
        >
          <AlignRight className="w-4 h-4" />
        </button>
        <button 
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200' : ''}`}
          title="Justifier"
        >
          <AlignJustify className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-1 items-center border-r pr-1">
        <button 
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
          title="Liste à puces"
        >
          <List className="w-4 h-4" />
        </button>
        <button 
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
          title="Liste numérotée"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button 
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
          title="Citation"
        >
          <Quote className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-1 items-center border-r pr-1">
        <button 
          type="button"
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('subscript') ? 'bg-gray-200' : ''}`}
          title="Indice"
        >
          <SubscriptIcon className="w-4 h-4" />
        </button>
        <button 
          type="button"
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('superscript') ? 'bg-gray-200' : ''}`}
          title="Exposant"
        >
          <SuperscriptIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-1 items-center border-r pr-1">
        <button 
          type="button"
          onClick={setLink}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
          title="Lien"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        <button 
          type="button"
          onClick={addTable}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('table') ? 'bg-gray-200' : ''}`}
          title="Insérer un tableau"
        >
          <TableIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-1 items-center">
        <button 
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50"
          title="Annuler"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button 
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50"
          title="Rétablir"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

interface EditorProps {
  onUpdateHandler: (html: string) => void;
  initialContent?: string;
  editorRef?: React.RefObject<HTMLDivElement>;
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
}

export const Editor: React.FC<EditorProps> = ({ onUpdateHandler, initialContent = '', editorRef,
  onScroll  }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,

      Highlight,
      Link,
      Subscript,
      Superscript,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
    ],
    content: initialContent,
    editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
    },
    },
    onUpdate: ({ editor }) => {
      
      onUpdateHandler(editor.getHTML());
    },
  });
    
     useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  return (
    <div className="border rounded-lg overflow-hidden bg-white h-full flex flex-col">
      <MenuBar editor={editor} />
      <div 
        ref={editorRef}
        onScroll={onScroll}
        className="flex-1 overflow-auto"
      >
        <EditorContent editor={editor} className="p-4 w-full cursor-text min-h-full" />
      </div>
    </div>
  );
};