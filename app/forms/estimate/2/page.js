"use client"
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function MyEditor() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />
      <button onClick={() => console.log(content)}>Get HTML</button>
    </div>
  );
}
