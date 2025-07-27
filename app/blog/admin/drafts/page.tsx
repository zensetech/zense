'use client';

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from 'next/link'; // Import Link for navigation within table
import { LayoutDashboard, FileText, Plus, Folder, Tags, BarChart, Users, Settings, FileEdit, List, Eye, MoreHorizontal, Filter, Sun, Bell } from 'lucide-react'; // Added necessary icons
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BlogHeader from '@/components/blog/BlogHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'; // Import table components
import { Checkbox } from '@/components/ui/checkbox'; // Import checkbox
import { Badge } from '@/components/ui/badge'; // Import badge for status
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'; // Import dropdown components


interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  status: string;
  category: string; // Added category
  date: string; // Added date
  // Add other fields as necessary
}

export default function AdminDraftsPage() {
  const router = useRouter();
  const [draftPosts, setDraftPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDraftPosts = async () => {
      try {
        const response = await fetch('/api/blogs?status=draft');
        if (!response.ok) {
          if (response.status === 404) {
            // Treat 404 as no drafts found, not an error
            setDraftPosts([]);
          } else {
            throw new Error(`Error fetching drafts: ${response.statusText}`);
          }
        } else {
          const data: BlogPost[] = await response.json();
          setDraftPosts(data);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDraftPosts();
  }, []);

  const handleDelete = async (slug: string) => {
    if (window.confirm("Are you sure you want to delete this draft post?")) {
      try {
        const response = await fetch(`/api/blogs?slug=${slug}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Remove the deleted draft from the state
          setDraftPosts(draftPosts.filter(post => post.slug !== slug));
        } else {
          const errorData = await response.json();
          alert(`Error deleting draft post: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error deleting draft post:", error);
        alert("An error occurred while deleting the draft post.");
      }
    }
  };


  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6 space-y-6">
        <div className="flex items-center space-x-2">
           <Image alt="Zense Logo" src="/uploads/icon.png" width={30} height={30} />
          <h2 className="text-xl font-semibold">Zense</h2>
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
      <div className="flex-1 flex flex-col">
         {/* Header - Reusing the header from the dashboard page */}
        <header className="flex items-center justify-between p-6 border-b bg-white">
          <div className="relative w-1/3">
            {/* Search functionality can be added here if needed for drafts */}
            {/* <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9" /> */}
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

        {/* Draft Posts List Content */}
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Draft Posts</h1>
              <p className="text-muted-foreground">Manage your draft blog content</p>
            </div>
            <Button onClick={() => router.push('/blog/admin/create')}>
              <Plus className="mr-2 h-4 w-4" /> Create New Draft
            </Button>
          </div>

          {loading && <p>Loading drafts...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {!loading && !error && draftPosts.length === 0 && <p>No draft posts found.</p>}
          {!loading && !error && draftPosts.length > 0 && (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {draftPosts.map((post) => (
                    <TableRow key={post.id}><TableCell><Checkbox /></TableCell><TableCell className="font-medium">{post.title}</TableCell><TableCell><Badge variant="secondary">{post.status}</Badge></TableCell><TableCell>{post.category}</TableCell><TableCell>{post.date}</TableCell><TableCell className="text-center"><div className="flex justify-center space-x-2"><Link href={`/blog/admin/edit/${post.slug}`}><Button variant="ghost" size="icon"><FileEdit className="h-4 w-4" /></Button></Link>{/* Option to view draft if a preview route exists */}{/* <Link href={`/blog/drafts/${post.slug}`}> <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button> </Link> */}<DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuLabel>Actions</DropdownMenuLabel><Link href={`/blog/admin/edit/${post.slug}`}><DropdownMenuItem>Edit</DropdownMenuItem></Link><DropdownMenuItem onClick={() => handleDelete(post.slug)} className="text-red-600">Delete</DropdownMenuItem>{/* Add more actions as needed, e.g., Publish */}</DropdownMenuContent></DropdownMenu></div></TableCell></TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
