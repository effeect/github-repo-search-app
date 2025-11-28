// Discovered last minute but metadata descriptions are blank
// Need to be fixed

import { useEffect } from "react";

type metadata = {
  title: string;
  description: string;
};
export default function DynamicMeta({ title, description }: metadata) {
  useEffect(() => {
    // Update the document title
    if (title) {
      document.title = title;
    }

    // Update or create the meta description
    let meta = document.querySelector("meta[name='description']");
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, [title, description]);

  return null; // no UI, just side effects
}
