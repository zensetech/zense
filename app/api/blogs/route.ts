import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc, // Import doc
  getDoc, // Import getDoc
} from "firebase/firestore";

interface BlogPost {
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: string;
  authorName: string;
  authorImage: string;
  date: string;
  slug: string; // Added slug field
  status: string; // Added status field
}

// POST: Create a new blog post (can be draft or published)
export async function POST(req: NextRequest) {
  try {
    const newBlogPost = (await req.json()) as Omit<BlogPost, "slug">;

    // Determine status, default to published if not provided
    const status = newBlogPost.status || 'published';

    // Validation
    if (
      !newBlogPost.title ||
      !newBlogPost.content ||
      !newBlogPost.category ||
      !newBlogPost.authorName
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = newBlogPost.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove special chars
      .replace(/\s+/g, "-"); // Replace spaces with hyphens

    // Save blog to Firestore
    const docRef = await addDoc(collection(db, "blogs"), {
      ...newBlogPost,
      slug,
      status, // Save the status
    });

    return NextResponse.json(
      { message: "Blog post created successfully", id: docRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

import { deleteDoc } from "firebase/firestore";

// DELETE: Delete a blog post by slug
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { message: "Missing slug parameter" },
        { status: 400 }
      );
    }

    // Find the document with the matching slug
    const blogsRef = collection(db, "blogs");
    const q = query(blogsRef, where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return NextResponse.json(
        { message: "Blog post not found" },
        { status: 404 }
      );
    }

    // Assuming slugs are unique, get the first matching document
    const docToDelete = snapshot.docs[0];
    await deleteDoc(doc(db, "blogs", docToDelete.id));

    return NextResponse.json(
      { message: "Blog post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

import { updateDoc, increment } from "firebase/firestore"; // Import increment

// PUT: Update a blog post by slug or increment view count
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const updateData = await req.json(); // Use updateData for clarity

    if (!slug) {
      return NextResponse.json(
        { message: "Missing slug parameter" },
        { status: 400 }
      );
    }

    // Find the document with the matching slug
    const blogsRef = collection(db, "blogs");
    const q = query(blogsRef, where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return NextResponse.json(
        { message: "Blog post not found" },
        { status: 404 }
      );
    }

    // Assuming slugs are unique, get the first matching document
    const docToUpdate = snapshot.docs[0];
    const docRef = doc(db, "blogs", docToUpdate.id);

    if (updateData.incrementView) {
      // Increment the view count
      await updateDoc(docRef, {
        views: increment(1),
      });
      return NextResponse.json(
        { message: "View count incremented successfully" },
        { status: 200 }
      );
    } else if (updateData.status) { // Check if status is provided for update
      // Update the document with the provided data, including status
      await updateDoc(docRef, { status: updateData.status });
      return NextResponse.json(
        { message: "Blog post status updated successfully" },
        { status: 200 }
      );
    }
    else {
       return NextResponse.json(
        { message: "No valid update data provided" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


// GET: Fetch blog posts by slug or status
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const statusFilter = searchParams.get("status"); // Get status query parameter

    console.log("Received slug:", slug); // Log the received slug

    const blogsRef = collection(db, "blogs");
    let q = query(blogsRef); // Start with a base query

    if (slug) {
      // Fetch single blog post by slug, regardless of status
      q = query(blogsRef, where("slug", "==", slug));
    } else {
      // Fetch posts based on status filter, default to published
      const statusToFetch = statusFilter || 'published';
      q = query(blogsRef, where("status", "==", statusToFetch));
    }

    const snapshot = await getDocs(q);

    console.log("Snapshot empty:", snapshot.empty); // Log if snapshot is empty
    if (!snapshot.empty) {
      console.log("Found document ID:", snapshot.docs[0].id); // Log found document ID
      console.log("Found document data:", snapshot.docs[0].data()); // Log found document data
    }


    if (snapshot.empty) {
      return NextResponse.json(
        { message: slug ? "Post not found" : "No posts found" },
        { status: 404 }
      );
    }

    if (slug) {
      // Return single post
      const docSnap = snapshot.docs[0];
      const post = { id: docSnap.id, ...docSnap.data() };
      return NextResponse.json(post, { status: 200 });
    } else {
      // Return list of posts
      const posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          slug: data.slug,
          ...data,
        };
      });
      return NextResponse.json(posts, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching blog post(s):", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
