'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getBlogPosts } from '@/lib/getBlogPosts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from "next/image"; // Import Image component
import { Search, Bell, Sun, Plus, FileText, MessageSquare, Eye, TrendingUp, LayoutDashboard, Folder, Tags, BarChart, Users, Settings, FileEdit, List } from 'lucide-react'; // Added necessary icons, removed Image as it conflicts with next/image
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Assuming tabs are used for Overview/Analytics/Reports
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'; // Assuming a chart component is available
import { CartesianGrid, XAxis, Line, LineChart } from 'recharts'; // Assuming recharts for the chart
import { BlogPost } from '@/lib/blog-types'; // Import BlogPost type
import { Badge } from '@/components/ui/badge'; // Import Badge component
import { formatDistanceToNow } from 'date-fns'; // Import date-fns for time formatting
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"; // Import dropdown components
import AdminLogout from '@/components/AdminLogout'; // Import AdminLogout component

// Dummy data for the chart - replace with actual data fetching
const chartData = [
  { month: 'Jan', desktop: 186 },
  { month: 'Feb', desktop: 305 },
  { month: 'Mar', desktop: 237 },
  { month: 'Apr', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'Jun', desktop: 214 },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [publishedPostCount, setPublishedPostCount] = useState(0);
  const [totalPublishedViews, setTotalPublishedViews] = useState(0); // State for total published views
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]); // State for recent posts
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getBlogPosts();
      const publishedPosts = posts.filter(post => post.status.trim().toLowerCase() === 'published');
      setPublishedPostCount(publishedPosts.length);

      // Calculate total published views
      const totalViews = publishedPosts.reduce((sum, post) => sum + (post.views || 0), 0);
      setTotalPublishedViews(totalViews);

      // Sort and set recent posts (assuming 'date' property exists and is sortable)
      const sortedPosts = publishedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setRecentPosts(sortedPosts.slice(0, 4)); // Get the 4 most recent posts
    };

    fetchPosts();
  }, []);

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
          {/* <Button variant="ghost" className="w-full justify-start">
            <Folder className="mr-2 h-4 w-4" /> Categories
          </Button> */}
          {/* <Button variant="ghost" className="w-full justify-start">
            <Tags className="mr-2 h-4 w-4" /> Tags
          </Button> */}
          {/* <Button variant="ghost" className="w-full justify-start">
            <Image src="/placeholder.png" alt="Media Icon" width={16} height={16} className="mr-2 h-4 w-4" /> Media {/* Using next/image for Media icon */}
          {/* </Button> */}
          {/* <Button variant="ghost" className="w-full justify-start">
            <BarChart className="mr-2 h-4 w-4" /> Analytics
          </Button> */}
          {/* <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" /> Users
          </Button> */}
          {/* <Button variant="ghost" className="w-full justify-start">
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
        {/* Header */}
        <header className="flex items-center justify-between p-6 border-b bg-white">
          <div className="relative w-1/3">
            {/*<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9" />*/}
          </div>
          <div className="flex items-center space-x-4">
            {/*<Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>*/}
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger>
                <Button>Sign out</Button> {/* Placeholder for AD */}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => { /* Add sign out logic here */ }}>
                  <AdminLogout />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome to your blog management dashboard</p>
            </div>
            <Button onClick={() => router.push('/blog/admin/create')}>
              <Plus className="mr-2 h-4 w-4" /> New Post
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{publishedPostCount}</div>
                {/*<p className="text-xs text-muted-foreground">+2 from last week</p> */}{/* This will need to be updated with actual data */}
              </CardContent>
            </Card>
            {/* <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comments</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">148</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>*/}
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPublishedViews}</div> {/* Display total published views */}
                {/*<p className="text-xs text-muted-foreground">+20.1% from last month</p> */}{/* This will need to be updated with actual data */}
              </CardContent>
            </Card>
             {/*<Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Growth</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+22.5%</div>
                <p className="text-xs text-muted-foreground">Compared to last quarter</p>
              </CardContent>
            </Card>*/}
          </div>

          {/* Blog Performance Chart */}
          {/*<Card>
            <CardHeader>
              <CardTitle>Blog Performance</CardTitle>
              <p className="text-sm text-muted-foreground">Visitor statistics for the past 30 days</p>
            </CardHeader>
            <CardContent className="space-y-4">
               <Tabs defaultValue="1M">
                <TabsList>
                  <TabsTrigger value="1M">1M</TabsTrigger>
                  <TabsTrigger value="3M">3M</TabsTrigger>
                  <TabsTrigger value="6M">6M</TabsTrigger>
                  <TabsTrigger value="1Y">1Y</TabsTrigger>
                </TabsList>
                <TabsContent value="1M">
                   <ChartContainer config={{
                      desktop: {
                        label: 'Desktop',
                        color: 'hsl(var(--chart-1))',
                      },
                    }}>
                      <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                          left: 12,
                          right: 12,
                        }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Line
                          dataKey="desktop"
                          type="natural"
                          stroke="var(--color-desktop)"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ChartContainer>
                </TabsContent>
               
              </Tabs>
            </CardContent>
          </Card>*/}

          {/* Recent Posts Section */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
              <p className="text-sm text-muted-foreground">Your recently published content</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.slug} className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">{post.title}</h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      {post.category && <Badge variant="secondary">{post.category}</Badge>}
                      <span>Posted {formatDistanceToNow(new Date(post.date), { addSuffix: true })}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/blog/admin/edit/${post.slug}`)}>
                      <FileEdit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/blog/${post.slug}`)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" onClick={() => router.push('/blog/admin/list')}>
                View all posts
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
