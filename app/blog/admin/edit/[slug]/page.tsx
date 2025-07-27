'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Search, Bell, Sun, Plus, FileText, MessageSquare, Eye, TrendingUp, LayoutDashboard, Folder, Tags, BarChart, Users, Settings, FileEdit, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BlogHeader from '@/components/blog/BlogHeader';
import dynamic from 'next/dynamic';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogPost, Author } from '@/lib/blog-types';
import Image from "next/image"; // Import Image component

const CKEditor = dynamic(
  () => import('@ckeditor/ckeditor5-react').then(mod => mod.CKEditor),
  { ssr: false }
);

// Define a type for the form data to handle the file upload
interface EditBlogPostFormData {
  title: string;
  content: string;
  excerpt: string;
  coverImage: string | File | null;
  category: string;
  author: Author;
  date: string;
  readingTime: number;
  commentCount: number;
  categories: string[];
}

export default function EditBlogPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { slug } = params;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<EditBlogPostFormData>({
    title: '',
    content: '',
    excerpt: '',
    coverImage: '',
    category: '',
    author: { name: '', image: '', bio: '' }, // Initialize author as an object
    date: '',
    readingTime: 0, // Initialize readingTime
    commentCount: 0, // Initialize commentCount
    categories: [], // Initialize categories
  });

  const categories = [
    'Health',
    'Travel',
    'Lifestyle',
    'Inspiration',
    'Home & Family',
    'Money-Matters',
    'Food',
    'Retirement'
  ];

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`/api/blogs?slug=${slug}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch blog post');
        }
        const data: BlogPost = await response.json();
        setFormData({
          title: data.title,
          content: data.content,
          excerpt: data.excerpt,
          coverImage: data.coverImage,
          category: data.category,
          author: data.author, // Set the entire author object
          date: data.date,
          readingTime: data.readingTime,
          commentCount: data.commentCount,
          categories: data.categories,
        });
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Handle image upload if a new file is selected
      let imageUrl = formData.coverImage;
      if (imageUrl instanceof File) { // Correct type checking
        const imageData = new FormData();
        imageData.append('coverImage', imageUrl);

        const uploadResponse = await fetch('/api/upload-image', {
          method: 'POST',
          body: imageData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          alert(`Failed to upload image: ${errorData.message || 'Unknown error'}`);
          setIsSubmitting(false);
          return;
        }

        const uploadResult = await uploadResponse.json();
        imageUrl = uploadResult.filename; // Assuming the backend returns the filename or URL
      }


      const updateResponse = await fetch(`/api/blogs?slug=${slug}`, {
        method: 'PUT', // Use PUT for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          coverImage: imageUrl, // Use the potentially new image URL
          // author object is already in formData
        }),
      });

      if (updateResponse.ok) {
        alert('Blog post updated successfully!');
        router.push('/blog/admin/list');
      } else {
        const errorData = await updateResponse.json();
        alert(`Failed to update blog post: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
      alert('Failed to update blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        setFormData(prev => ({ ...prev, [name]: files[0] })); // Store file object
      }
    } else if (name === 'authorName' || name === 'authorImage') {
      setFormData(prev => ({
        ...prev,
        author: {
          ...prev.author,
          [name === 'authorName' ? 'name' : 'image']: value,
        },
      }));
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-background flex justify-center items-center">Loading blog post...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-background flex justify-center items-center text-red-600">Error: {error}</div>;
  }


  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6 space-y-6">
        <div className="flex items-center space-x-2">
           <Image alt="Zense Logo" src="/uploads/icon.png" width={30} height={30} /> {/* Added Zense Logo */}
          <h2 className="text-xl font-semibold">Zense</h2> {/* Changed Blog CMS to Zense */}
        </div>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/blog/admin')}>
            <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/blog/admin/list')}>
            <FileText className="mr-2 h-4 w-4" /> Posts
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/blog/admin/create')}>
            <Plus className="mr-2 h-4 w-4" /> Create New
          </Button>
          {/*<Button variant="ghost" className="w-full justify-start">
            <Folder className="mr-2 h-4 w-4" /> Categories
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Tags className="mr-2 h-4 w-4" /> Tags
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Image src="/placeholder.png" alt="Media Icon" width={16} height={16} className="mr-2 h-4 w-4" /> Media 
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <BarChart className="mr-2 h-4 w-4" /> Analytics
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" /> Users
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>*/}
        </nav>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Quick Access</h3>
           <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/blog/admin/drafts')}>
            <FileEdit className="mr-2 h-4 w-4" /> Draft Posts
          </Button>
           {/*<Button variant="ghost" className="w-full justify-start">
            <List className="mr-2 h-4 w-4" /> Recent Comments
          </Button>*/}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">


        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl">Edit Blog Post</CardTitle>
            </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter blog post title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Enter a brief excerpt"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <div className="border rounded-md p-2 bg-white">
                  <CKEditor
                    editor={ClassicEditor as any}
                    data={formData.content}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setFormData(prev => ({ ...prev, content: data }));
                    }}
                  />
                </div>
              </div>



              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="coverImage">Cover Image</Label>
                  {formData.coverImage && typeof formData.coverImage === 'string' && (
                    <img src={formData.coverImage} alt="Current Cover" className="w-32 h-32 object-cover rounded mb-2" />
                  )}
                  <Input
                    id="coverImage"
                    name="coverImage"
                    type="file" // Change input type to file
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData(prev => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Publication Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">Author Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="authorName">Author Name</Label>
                    <Input
                      id="authorName"
                      name="authorName"
                      value={formData.author?.name || ''} // Access name from author object with optional chaining
                      onChange={handleChange}
                      placeholder="Enter author name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="authorImage">Author Image URL</Label>
                    <Input
                      id="authorImage"
                      name="authorImage"
                      value={formData.author?.image || ''} // Access image from author object with optional chaining
                      onChange={handleChange}
                      placeholder="Enter author image URL"
                      required
                    />
                  </div>

                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/blog/admin/list')}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Updating...' : 'Update Post'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  </div>
  );
}
