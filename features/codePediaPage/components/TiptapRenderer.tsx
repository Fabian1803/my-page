'use client'
import React from 'react'
import ImageCodepedia from './imageCodepediaP/ImageCodepedia'

interface TiptapRendererProps {
  htmlContent: string | any;
  textSize?: 'small' | 'medium' | 'large';
  baseId?: string;
  projectDescription?: string;
}

function renderTiptapNode(node: any, index: number, baseSize: number, baseId: string, projectDescription?: string): React.ReactNode {
  if (!node) return null;

  if (node.type === 'text') {
    let content: React.ReactNode = node.text || '';
    if (node.marks && Array.isArray(node.marks)) {
      node.marks.forEach((mark: any, mIdx: number) => {
        if (mark.type === 'bold') {
          content = <strong key={mIdx} className="font-bold highlight">{content}</strong>;
        } else if (mark.type === 'italic') {
          content = <em key={mIdx} className="italic underline">{content}</em>;
        } else if (mark.type === 'strike') {
          content = <s key={mIdx}>{content}</s>;
        } else if (mark.type === 'link') {
          content = (
            <a key={mIdx} href={mark.attrs?.href || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {content}
            </a>
          );
        }
      });
    }
    return <React.Fragment key={index}>{content}</React.Fragment>;
  }

  const children = node.content ? node.content.map((child: any, i: number) => renderTiptapNode(child, i, baseSize, baseId, projectDescription)) : null;

  switch (node.type) {
    case 'doc':
      return <div key={index} className="space-y-1 w-full">{children}</div>;
    case 'heading': {
      const level = node.attrs?.level || 1;
      if (level === 1) {
        return <h1 key={index} className="font-bold my-2 leading-tight" style={{ fontSize: baseSize + 12 }}>{children}</h1>;
      }
      if (level === 2) {
        return <h2 key={index} className="font-semibold my-2 leading-tight" style={{ fontSize: baseSize + 8 }}>{children}</h2>;
      }
      return <h3 key={index} className="font-medium my-1.5 leading-tight" style={{ fontSize: baseSize + 6 }}>{children}</h3>;
    }
    case 'paragraph': {
      if (!children || (Array.isArray(children) && children.length === 0)) {
        return <div key={index} className="h-1.5" />;
      }
      return (
        <p key={index} className="my-1 leading-relaxed text-justify" style={{ fontSize: baseSize }}>
          {children}
        </p>
      );
    }
    case 'bulletList':
      return (
        <ul key={index} className="list-disc pl-5 my-2 space-y-1" style={{ fontSize: baseSize }}>
          {children}
        </ul>
      );
    case 'orderedList':
      return (
        <ol key={index} className="list-decimal pl-5 my-2 space-y-1" style={{ fontSize: baseSize }}>
          {children}
        </ol>
      );
    case 'listItem':
      return (
        <li key={index} className="my-0.5">
          {children}
        </li>
      );
    case 'image': {
      const src = node.attrs?.src || '';
      const title = node.attrs?.title || node.attrs?.alt || 'Imagen del documento';
      const description = projectDescription || node.attrs?.title || node.attrs?.alt || '';
      if (!src) return null;
      return (
        <div key={index} className="my-2 w-full">
          <ImageCodepedia
            id={`${baseId}-img-${index}`}
            imageSrc={src}
            title={title}
            description={description}
          />
        </div>
      );
    }
    case 'video': {
      const src = node.attrs?.src || '';
      if (!src) return null;
      return (
        <div key={index} className="my-2 w-full">
          <video
            src={src}
            controls
            className="w-full max-h-96 rounded-md border border-gray-400 bg-black object-contain"
          />
        </div>
      );
    }
    case 'hardBreak':
      return <br key={index} />;
    default:
      return children ? <div key={index}>{children}</div> : null;
  }
}

export default function TiptapRenderer({ htmlContent, textSize = 'medium', baseId = 'doc', projectDescription = '' }: TiptapRendererProps) {
  const fontSizes = {
    small: 14,
    medium: 18,
    large: 20
  };

  const baseSize = fontSizes[textSize] || 18;

  if (!htmlContent) return null;

  // 1. Si es un objeto o string JSON de Tiptap / ProseMirror
  let tiptapJson: any = null;
  if (typeof htmlContent === 'object' && htmlContent !== null) {
    tiptapJson = htmlContent;
  } else if (typeof htmlContent === 'string' && htmlContent.trim().startsWith('{')) {
    try {
      const parsed = JSON.parse(htmlContent);
      if (parsed && parsed.type === 'doc') {
        tiptapJson = parsed;
      }
    } catch {
      // No es JSON válido, continúa como HTML
    }
  }

  if (tiptapJson) {
    return (
      <div className="tiptap-section-container space-y-2 w-full">
        {renderTiptapNode(tiptapJson, 0, baseSize, baseId, projectDescription)}
      </div>
    );
  }

  // 2. Si es HTML puro
  const rawHtml = String(htmlContent);
  const parts: React.ReactNode[] = [];
  const tagRegex = /(<img\b[^>]*\/?>|<video\b[^>]*>[\s\S]*?<\/video>|<video\b[^>]*\/>)/gi;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let partIndex = 0;

  while ((match = tagRegex.exec(rawHtml)) !== null) {
    const textBefore = rawHtml.substring(lastIndex, match.index).trim();
    if (textBefore) {
      parts.push(
        <div
          key={`html-${partIndex++}`}
          className="tiptap-rendered-content"
          style={{ fontSize: baseSize }}
          dangerouslySetInnerHTML={{ __html: textBefore }}
        />
      );
    }

    const matchedTag = match[0];
    if (matchedTag.startsWith('<img')) {
      const srcMatch = matchedTag.match(/src=["']([^"']*)["']/i);
      const altMatch = matchedTag.match(/alt=["']([^"']*)["']/i);
      const titleMatch = matchedTag.match(/title=["']([^"']*)["']/i);
      const src = srcMatch ? srcMatch[1] : '';
      const title = titleMatch ? titleMatch[1] : (altMatch ? altMatch[1] : 'Imagen del documento');
      const description = projectDescription || (titleMatch ? titleMatch[1] : (altMatch ? altMatch[1] : ''));

      if (src) {
        parts.push(
          <div key={`img-${partIndex++}`} className="my-2 w-full">
            <ImageCodepedia
              id={`${baseId}-img-${partIndex}`}
              imageSrc={src}
              title={title}
              description={description}
            />
          </div>
        );
      }
    } else if (matchedTag.startsWith('<video')) {
      const srcMatch = matchedTag.match(/src=["']([^"']*)["']/i);
      const src = srcMatch ? srcMatch[1] : '';
      if (src) {
        parts.push(
          <div key={`vid-${partIndex++}`} className="my-2 w-full">
            <video
              src={src}
              controls
              className="w-full max-h-96 rounded-md border border-gray-400 bg-black object-contain"
            />
          </div>
        );
      }
    }

    lastIndex = match.index + matchedTag.length;
  }

  const remaining = rawHtml.substring(lastIndex).trim();
  if (remaining) {
    parts.push(
      <div
        key={`html-${partIndex++}`}
        className="tiptap-rendered-content"
        style={{ fontSize: baseSize }}
        dangerouslySetInnerHTML={{ __html: remaining }}
      />
    );
  }

  return (
    <div className="tiptap-section-container space-y-2 w-full">
      <style>{`
        .tiptap-rendered-content h1 {
          font-size: 1.5em;
          font-weight: 700;
          margin-top: 0.5rem;
          margin-bottom: 0.25rem;
          line-height: 1.2;
        }
        .tiptap-rendered-content h2 {
          font-size: 1.25em;
          font-weight: 600;
          margin-top: 0.5rem;
          margin-bottom: 0.25rem;
          line-height: 1.3;
        }
        .tiptap-rendered-content h3 {
          font-size: 1.1em;
          font-weight: 500;
          margin-top: 0.35rem;
          margin-bottom: 0.2rem;
          line-height: 1.3;
        }
        .tiptap-rendered-content p {
          margin-top: 0.35rem;
          margin-bottom: 0.35rem;
          line-height: 1.5;
          text-align: justify;
        }
        .tiptap-rendered-content strong,
        .tiptap-rendered-content b {
          font-weight: 700;
        }
        .tiptap-rendered-content em,
        .tiptap-rendered-content i {
          font-style: italic;
          text-decoration: underline;
        }
        .tiptap-rendered-content ul {
          list-style-type: disc;
          padding-left: 1.25rem;
          margin-top: 0.35rem;
          margin-bottom: 0.35rem;
        }
        .tiptap-rendered-content ol {
          list-style-type: decimal;
          padding-left: 1.25rem;
          margin-top: 0.35rem;
          margin-bottom: 0.35rem;
        }
        .tiptap-rendered-content li {
          margin-top: 0.15rem;
          margin-bottom: 0.15rem;
        }
      `}</style>
      {parts}
    </div>
  );
}
