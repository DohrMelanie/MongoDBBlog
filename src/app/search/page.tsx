"use client";

import PostList from "@/components/posts/list/list";
import Button from "@/components/ui/flowbite/form/button";
import { useEffect, useState } from "react";

const queryOptions = [
  {
    label: "Blog entries missing additional field",
    endpoint: "/api/queries/missingContentField",
  },
  {
    label: "Blog entries with more than 1 image",
    endpoint: "/api/queries/multipleImages",
  },
  {
    label: "Blog entries with at least one image",
    endpoint: "/api/queries/containsImages",
  },
  {
    label: "Blog entries by author with specific lastname or 'admin' but not 'Guest'",
    endpoint: "/api/queries/authorNameFilter",
  },
  {
    label: "Blog entries where title appears in content",
    endpoint: "/api/queries/titleInContent",
  },
  {
    label: "Newest 2 blog entries",
    endpoint: "/api/queries/newestTwo",
  },
  {
    label: "Second oldest blog entry",
    endpoint: "/api/queries/secondOldest",
  },
  {
    label: "Entries from last week with links",
    endpoint: "/api/queries/lastWeekWithLink",
  }
];

export default function SearchPage() {
  const [result, setResult] = useState(null);

  const runQuery = async (endpoint: string) => {
    const res = await fetch(endpoint);
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="p-4 space-y-4 flex-col">
      <h2 className="text-xl font-bold">Run Blog Queries</h2>
  
      <div className="flex flex-wrap gap-2">
        {queryOptions.map((query, index) => (
          <Button key={index} onClick={() => runQuery(query.endpoint)}>
            {query.label}
          </Button>
        ))}
      </div>
  
      {result && (
        <div className="p-2 rounded bg-gray-100">
          <PostList posts={result} isLoading={false} isPaging className="w-full" />
        </div>
      )}
    </div>
  );
}