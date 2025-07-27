// lib/getBlogPosts.ts
import { db } from "@/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { BlogPost } from "@/lib/blog-types";

export async function getBlogPosts(): Promise<BlogPost[]> {
  const q = query(collection(db, "blogs"), where("status", "!=", "draft"));
  const snapshot = await getDocs(q);

  const posts: BlogPost[] = snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<BlogPost, 'id'>;
    return {
      id: doc.id,
      ...data,
    };
  });

  return posts;
}
