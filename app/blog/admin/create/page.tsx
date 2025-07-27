'use client';

import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image"; // Import Image component
import { Calendar, LayoutDashboard, FileText, Plus, Folder, Tags, BarChart, Users, Settings, FileEdit, List } from 'lucide-react'; // Added necessary icons
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
import { type BlogEditorProps } from '@/components/BlogEditor'; // Import the props type

const BlogEditor = dynamic<BlogEditorProps>(
  () => import('@/components/BlogEditor').then((mod) => mod.default),
  { ssr: false }
);

export default function AdminCreatePage() { // Renamed the component
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false); // New state for saving draft
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    coverImage: null as File | null, // Change to File | null for file upload
    category: '',
    authorName: '',
    authorImage: '',
    date: new Date().toISOString().split('T')[0],
    status: 'draft', // Added status field, default to draft
  });

  // Function to handle image upload
  const uploadCoverImage = async (): Promise<string | null> => {
    if (!formData.coverImage) {
      return formData.authorImage; // Return author image if no cover image
    }

    const imageData = new FormData();
    imageData.append('coverImage', formData.coverImage);

    const uploadResponse = await fetch('/api/upload-image', {
      method: 'POST',
      body: imageData,
    });

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json();
      throw new Error(`Failed to upload image: ${errorData.message || 'Unknown error'}`);
    }

    const uploadResult = await uploadResponse.json();
    return uploadResult.filename; // Assuming the backend returns the filename or URL
  };


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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const imageUrl = await uploadCoverImage(); // Upload image

      // Submit the blog post data with the image URL and published status
      const blogPostResponse = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          coverImage: imageUrl, // Use the uploaded image URL
          status: 'published', // Set status to published
        }),
      });


      if (blogPostResponse.ok) {
        alert('Blog post created successfully!');
        router.push('/blog/admin/list'); // Navigate to blog list after publishing
      } else {
        const errorData = await blogPostResponse.json();
        alert(`Failed to create blog post: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error: any) {
      console.error('Error creating blog post:', error);
      alert(`Failed to create blog post. ${error.message || 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);

    try {
      const imageUrl = await uploadCoverImage(); // Upload image

      // Submit the blog post data with draft status
      const blogPostResponse = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          coverImage: imageUrl, // Use the uploaded image URL
          status: 'draft', // Set status to draft
        }),
      });

      if (blogPostResponse.ok) {
        alert('Blog post draft saved successfully!');
        // Optionally navigate to a drafts page or stay on the current page
        // router.push('/blog/admin/drafts');
      } else {
        const errorData = await blogPostResponse.json();
        alert(`Failed to save blog post draft: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error: any) {
      console.error('Error saving blog post draft:', error);
      alert(`Failed to save blog post draft. ${error.message || 'Please try again.'}`);
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        setFormData(prev => ({ ...prev, [name]: files[0] }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

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
              <CardTitle className="text-3xl">Create New Blog Post</CardTitle>
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
                {/* Use the dynamically imported BlogEditor component */}
                {/* Ensure BlogEditor is rendered only on the client side if needed,
                    though the dynamic import with ssr: false handles this */}
                <BlogEditor
                  data={formData.content}
                  onChange={(data: string) => setFormData(prev => ({ ...prev, content: data }))}
                />
              </div>



              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="coverImage">Cover Image</Label>
                  <Input
                    id="coverImage"
                    name="coverImage"
                    type="file" // Change input type to file
                    onChange={handleChange}
                    required
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
                      value={formData.authorName}
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
                      value={formData.authorImage}
                      onChange={handleChange}
                      placeholder="Enter author image URL"
                    />
                  </div>

                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/blog/admin/list')} // Changed to navigate to blog list
                >
                  Cancel
                </Button>
                 <Button
                  type="button" // Changed type to button
                  variant="secondary" // Changed variant to secondary
                  onClick={handleSaveDraft}
                  disabled={isSavingDraft || isSubmitting} // Disable if submitting or saving draft
                >
                  {isSavingDraft ? 'Saving Draft...' : 'Save Draft'}
                </Button>
                <Button type="submit" disabled={isSubmitting || isSavingDraft}> {/* Disable if saving draft */}
                  {isSubmitting ? 'Creating...' : 'Create Post'}
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
