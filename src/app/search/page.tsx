"use client";

import Button from "@/components/ui/flowbite/form/button";
import { useState } from "react";

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
    label: "All BlogUsers sorted by username",
    endpoint: "/api/queries/usersSorted",
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
  },
  {
    label: "2 newest comments on a user's posts",
    endpoint: "/api/queries/newestCommentsByUser",
  },
];

export default function SearchPage() {
  const [result, setResult] = useState(null);

  const runQuery = async (endpoint: string) => {
    const res = await fetch(endpoint);
    const data = await res.json();
    console.log(res);
    setResult(data);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Run Blog Queries</h2>
      <div className="flex gap-2">
        {queryOptions.map((query, index) => (
          <Button key={index} onClick={() => runQuery(query.endpoint)}>
            {query.label}
          </Button>
        ))}
      </div>
      {result && (
        <pre className="mt-4 bg-gray-100 p-2 rounded text-sm overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}