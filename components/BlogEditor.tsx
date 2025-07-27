'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const CKEditor = dynamic(
  () => import('@ckeditor/ckeditor5-react').then(mod => mod.CKEditor),
  { ssr: false }
);

export interface BlogEditorProps {
  data: string;
  onChange: (data: string) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ data, onChange }) => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    import('@ckeditor/ckeditor5-build-classic')
      .then(mod => {
        editorRef.current = mod.default;
        setEditorLoaded(true);
      })
      .catch(err => console.error("Failed to load ClassicEditor", err));
  }, []);

  return (
    <div className="border rounded-md p-2 bg-white">
      {editorLoaded && CKEditor && editorRef.current && (
        <CKEditor
          editor={editorRef.current}
          data={data}
          onChange={(event: any, editor: any) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      )}
    </div>
  );
};

export default BlogEditor;
