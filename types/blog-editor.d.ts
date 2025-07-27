declare module '@/components/BlogEditor' {
  import * as React from 'react';

  export interface BlogEditorProps {
    data: string;
    onChange: (data: string) => void;
  }

  const BlogEditor: React.ComponentType<BlogEditorProps>;
  export default BlogEditor;
}
