"use client";

import { fileContents } from "@/lib/data";
import { useEffect, useRef, useState, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface FileViewProps {
  contentKey: string;
  filePath: string;
}

const markdownComponents = {
  h1: ({ children }: { children?: ReactNode }) => (
    <h1 className="text-terminal-accent font-bold text-xl mb-4 border-b border-terminal-border pb-2">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="text-terminal-accent font-bold text-lg mt-6 mb-3">{children}</h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="text-terminal-accent font-semibold text-base mt-4 mb-2">{children}</h3>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="list-disc list-inside space-y-1 my-4">{children}</ul>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="text-terminal-text ml-4">{children}</li>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="leading-relaxed mb-4 text-terminal-text">{children}</p>
  ),
  code: ({ children }: { children?: ReactNode }) => (
    <code className="bg-terminal-border/50 px-1 py-0.5 rounded text-terminal-executable">
      {children}
    </code>
  ),
  pre: ({ children }: { children?: ReactNode }) => (
    <pre className="bg-terminal-bg border border-terminal-border p-3 rounded-md overflow-x-auto my-4 text-xs">
      {children}
    </pre>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="border-l-2 border-terminal-quote pl-4 italic text-terminal-secondary my-4">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-terminal-border my-6" />,
  a: ({ children, href }: { children?: ReactNode; href?: string }) => (
    <a
      href={href}
      className="text-terminal-accent underline hover:text-white transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  table: ({ children }: { children?: ReactNode }) => (
    <table className="w-full table-fixed border border-terminal-border rounded-lg bg-terminal-bg text-terminal-text font-mono text-xs mb-4">
      {children}
    </table>
  ),
  thead: ({ children }: { children?: ReactNode }) => (
    <thead className="bg-terminal-border">{children}</thead>
  ),
  tbody: ({ children }: { children?: ReactNode }) => <tbody>{children}</tbody>,
  tr: ({ children }: { children?: ReactNode }) => (
    <tr className="odd:bg-terminal-bg even:bg-terminal-bg/60 border-b border-terminal-border">
      {children}
    </tr>
  ),
  th: ({ children }: { children?: ReactNode }) => (
    <th className="px-3 py-2 text-left font-bold text-terminal-accent border-b border-terminal-border bg-terminal-bg/70 w-1/3 truncate text-ellipsis overflow-hidden">
      {children}
    </th>
  ),
  td: ({ children }: { children?: ReactNode }) => (
    <td className="px-3 py-2 text-terminal-text border-b border-terminal-border w-1/3 truncate text-ellipsis overflow-hidden">
      {children}
    </td>
  ),
};

export default function FileView({ contentKey, filePath }: FileViewProps) {
  const content = fileContents[contentKey] ?? "// File not found";
  
  // State for the visual "typing" effect
  const [displayedContent, setDisplayedContent] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  
  // Refs for animation control
  const contentRef = useRef(content);
  const indexRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset state when file changes
    contentRef.current = content;
    indexRef.current = 0;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayedContent("");
    setIsComplete(false);
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayedContent(content);
      setIsComplete(true);
      return;
    }

    const typeCharacter = () => {
      const currentIndex = indexRef.current;
      const fullContent = contentRef.current;
      
      // Batch characters for performance (speed up long files)
      // Base speed: 2 chars per frame (~60 chars/sec at 30fps, or 120 at 60fps)
      // Adjust chunk size based on remaining length to ensure it finishes reasonably
      const remaining = fullContent.length - currentIndex;
      const chunkSize = Math.max(2, Math.floor(remaining / 50)); 
      
      if (currentIndex < fullContent.length) {
        const nextIndex = Math.min(currentIndex + chunkSize, fullContent.length);
        setDisplayedContent(fullContent.slice(0, nextIndex));
        indexRef.current = nextIndex;
        animationRef.current = requestAnimationFrame(typeCharacter);
      } else {
        setIsComplete(true);
      }
    };

    animationRef.current = requestAnimationFrame(typeCharacter);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [contentKey, content]);

  return (
    <article className="font-mono text-sm h-full flex flex-col">
      <p className="text-terminal-secondary mb-3 shrink-0">
        <span className="text-terminal-accent">$</span> cat {filePath}
      </p>

      {/* ACCESSIBILITY: Semantic markdown available immediately for screen readers */}
      <div className="sr-only" aria-live="polite">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>

      {/* VISUAL: Typing effect with Markdown parsing */}
      <section 
        className="bg-terminal-bg/50 border border-terminal-border rounded-md p-4 overflow-auto flex-1 min-h-0"
        aria-hidden="true"
      >
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {displayedContent}
          </ReactMarkdown>
          
          {/* Cursor blink at the end while typing */}
          {!isComplete && (
            <span className="inline-block w-2 h-4 bg-terminal-accent animate-cursor-blink ml-1 align-middle" />
          )}
        </div>
      </section>
    </article>
  );
}
