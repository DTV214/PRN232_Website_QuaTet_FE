// src/feature/blog/pages/BlogDetailPage.tsx
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { mockBlogs } from "../data/mockBlogs";

import BlogSidebar from "../components/BlogSidebar";
import BlogContent from "@/feature/blog/components/BlogContent";

export default function BlogDetailPage() {
  const { id } = useParams();
  const blog = mockBlogs.find((b) => b.id === Number(id)) || mockBlogs[0];

  return (
    <div className="bg-[#FBF5E8]/30 min-h-screen py-10">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Nút Back phía trên */}
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-tet-primary font-bold hover:text-tet-accent transition-colors mb-8 group"
        >
          <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
            <ChevronLeft size={20} />
          </div>
          <span>Quay lại danh sách tin tức</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* PHẦN 1: NỘI DUNG CHI TIẾT (70%) */}
          <main className="w-full lg:w-2/3">
            <BlogContent blog={blog} />
          </main>

          {/* PHẦN 2: SIDEBAR (30%) */}
          <aside className="w-full lg:w-1/3 space-y-8">
            <BlogSidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}
