'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getBlogPosts } from '@/lib/getBlogPosts';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog-types'; // Import BlogPost type
import Image from "next/image"; // Import Image component
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'; // Import table components
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'; // Import dropdown components
import { Checkbox } from '@/components/ui/checkbox'; // Import checkbox
import { Badge } from '@/components/ui/badge'; // Import badge for status
import { Search, Plus, FileText, LayoutDashboard, Folder, Tags, BarChart, Users, Settings, FileEdit, List, Eye, MoreHorizontal, Filter, Sun, Bell } from 'lucide-react'; // Added necessary icons, including Sun and Bell

export default function ListBlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10); // State for posts per page
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // State for selected category
  const [categories, setCategories] = useState<string[]>([]); // State for unique categories

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const posts = await getBlogPosts();
        setBlogs(posts);
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(posts.map(blog => blog.category)));
        setCategories(uniqueCategories);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    // Filter blogs based on search query and selected category
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(lowerCaseQuery) &&
      (selectedCategory === null || blog.category === selectedCategory)
    );
    setFilteredBlogs(filtered);
    setCurrentPage(1); // Reset to first page on filter/search change
  }, [searchQuery, blogs, selectedCategory]);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleUnpublish = async (slug: string) => {
    if (window.confirm("Are you sure you want to unpublish this blog post?")) {
      try {
        const response = await fetch(`/api/blogs?slug=${slug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'unpublished' }),
        });

        if (response.ok) {
          // Update the status in the local state
          setBlogs(blogs.map(blog => blog.slug === slug ? { ...blog, status: 'unpublished' } : blog));
          setFilteredBlogs(filteredBlogs.map(blog => blog.slug === slug ? { ...blog, status: 'unpublished' } : blog));
        } else {
          const errorData = await response.json();
          alert(`Error unpublishing blog post: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error unpublishing blog post:", error);
        alert("An error occurred while unpublishing the blog post.");
      }
    }
  };

  const handlePublish = async (slug: string) => {
    if (window.confirm("Are you sure you want to publish this blog post?")) {
      try {
        const response = await fetch(`/api/blogs?slug=${slug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'Published' }),
        });

        if (response.ok) {
          // Update the status in the local state
          setBlogs(blogs.map(blog => blog.slug === slug ? { ...blog, status: 'Published' } : blog));
          setFilteredBlogs(filteredBlogs.map(blog => blog.slug === slug ? { ...blog, status: 'Published' } : blog));
        } else {
          const errorData = await response.json();
          alert(`Error publishing blog post: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error publishing blog post:", error);
        alert("An error occurred while publishing the blog post.");
      }
    }
  };

  const handleDelete = async (slug: string) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        const response = await fetch(`/api/blogs?slug=${slug}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Remove the deleted blog from the state
          setBlogs(blogs.filter(blog => blog.slug !== slug));
          // Also update filteredBlogs
          setFilteredBlogs(filteredBlogs.filter(blog => blog.slug !== slug));
        } else {
          const errorData = await response.json();
          alert(`Error deleting blog post: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error deleting blog post:", error);
        alert("An error occurred while deleting the blog post.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        Loading blog posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-red-600">
        Error loading blog posts: {error.message}
      </div>
    );
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
          </Button> */}
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
      <div className="flex-1 flex flex-col">
         {/* Header - Reusing the header from the dashboard page */}
        <header className="flex items-center justify-between p-6 border-b bg-white">
          <div className="relative w-1/3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9" />
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Sun className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button>AD</Button> {/* Placeholder for AD */}
          </div>
        </header>

        {/* Posts List Content */}
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Posts</h1>
              <p className="text-muted-foreground">Manage your blog content</p>
            </div>
            <Button onClick={() => router.push('/blog/admin/create')}>
              <Plus className="mr-2 h-4 w-4" /> New Post
            </Button>
          </div>

          <div className="flex items-center justify-between space-x-4">
             <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-4">
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Filter className="h-4 w-4" />
                      <span>{selectedCategory || 'Filter'}</span> {/* Display selected category */}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {categories.map(category => (
                      <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                        {category}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                 {/* Posts per page dropdown */}
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {postsPerPage}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {[10, 20, 50].map(size => (
                      <DropdownMenuItem key={size} onSelect={() => setPostsPerPage(size)}>
                        {size}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Pagination */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    {'<'}
                  </Button>
                  <span>{currentPage} of {totalPages}</span>
                   <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    {'>'}
                  </Button>
                </div>
              </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox />
                  </TableHead><TableHead>Title</TableHead><TableHead className="text-center">Status</TableHead><TableHead>Category</TableHead><TableHead>Date</TableHead><TableHead>Views</TableHead>{/* Added Views header */}<TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPosts.map((blog) => (
                  <TableRow key={blog.id}><TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">{blog.title}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={blog.status.trim().toLowerCase() === 'published' ? 'success' : 'destructive'}>
                        {blog.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{blog.category}</TableCell>
                    <TableCell>{blog.date}</TableCell>
                    <TableCell>{blog.views || 0}</TableCell> {/* Display views, default to 0 */}
                    <TableCell className="text-center">
                      <div className="flex justify-center space-x-2">
                        <Link href={`/blog/admin/edit/${blog.slug}`}>
                          <Button variant="ghost" size="icon">
                            <FileEdit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/blog/${blog.slug}`}>
                           <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <Link href={`/blog/admin/edit/${blog.slug}`}>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                            </Link>
                            {blog.status.trim().toLowerCase() === 'published' ? (
                              <DropdownMenuItem onClick={() => handleUnpublish(blog.slug)}>Unpublish</DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => handlePublish(blog.slug)}>Publish</DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleDelete(blog.slug)} className="text-red-600">Delete</DropdownMenuItem>
                            {/* Add more actions as needed */}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}
