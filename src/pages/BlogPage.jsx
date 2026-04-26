/**
 * Blog page — list and detail view in one file.
 * Fetches from "posts" JSON DB collection.
 *
 * Example post record:
 *   name: "Getting started with APIEngine"
 *   description: "Learn how to ship your first endpoint in 5 minutes."
 *   category: "Tutorial"
 *   data: {
 *     slug: "getting-started",
 *     cover_image: "https://...",
 *     published_at: "2026-04-25",
 *     author: "Kunal",
 *     body: "<p>Welcome...</p>",
 *   }
 */

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BlogListPage, BlogDetailPage } from "@apiengine/react-sdk";

const APP_NAME = import.meta.env.VITE_APP_NAME || "My App";

export default function BlogPage() {
  const { slug }  = useParams();
  const navigate  = useNavigate();

  if (slug) {
    return (
      <BlogDetailPage
        collectionSlug="posts"
        recordId={slug}
        onBack={() => navigate("/blog")}
      />
    );
  }

  return (
    <BlogListPage
      collectionSlug="posts"
      title={`${APP_NAME} Blog`}
      subtitle="Updates, tutorials and announcements."
      onPostClick={(post) => navigate(`/blog/${post.slug || post.id}`)}
    />
  );
}
