'use client';

import { useEffect, useRef } from 'react';

interface MDXContentProps {
  content: string;
}

export default function MDXContent({ content }: MDXContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Find all code blocks
    const preElements = contentRef.current.querySelectorAll('pre');
    
    preElements.forEach((pre) => {
      // Skip if already has a copy button
      if (pre.querySelector('.copy-button-wrapper')) return;

      // Create wrapper for button positioning
      const wrapper = document.createElement('div');
      wrapper.className = 'copy-button-wrapper';
      wrapper.style.cssText = 'position: relative;';

      // Wrap the pre element
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      // Create copy button
      const button = document.createElement('button');
      button.className = 'copy-code-button';
      button.innerHTML = `
        <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
      `;
      
      // Button styles
      Object.assign(button.style, {
        position: 'absolute',
        top: '8px',
        right: '8px',
        padding: '8px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '6px',
        cursor: 'pointer',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        fontSize: '12px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        zIndex: '10',
      });

      // Add hover effect
      button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        button.style.borderColor = 'rgba(255, 255, 255, 0.3)';
      });

      button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        button.style.borderColor = 'rgba(255, 255, 255, 0.2)';
      });

      // Copy functionality
      button.addEventListener('click', async () => {
        const code = pre.querySelector('code');
        if (!code) return;

        const text = code.textContent || '';
        
        try {
          await navigator.clipboard.writeText(text);
          
          // Show success feedback
          const originalHTML = button.innerHTML;
          button.innerHTML = `
            <svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          `;
          button.style.backgroundColor = 'rgba(34, 197, 94, 0.2)';
          button.style.borderColor = 'rgba(34, 197, 94, 0.3)';
          
          setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            button.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });

      wrapper.appendChild(button);
    });
  }, [content]);

  const contentStyle: React.CSSProperties = {
    maxWidth: 'none',
    fontSize: '16px',
    lineHeight: '1.75',
    color: '#1f2937',
  };

  return (
    <>
      <div
        ref={contentRef}
        style={contentStyle}
        className="mdx-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <style jsx global>{`
        .mdx-content h1, .mdx-content h2, .mdx-content h3, .mdx-content h4, .mdx-content h5, .mdx-content h6 {
          scroll-margin-top: 80px;
          font-weight: 600;
        }
        .mdx-content h1 {
          font-size: 2.25rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        .mdx-content h2 {
          font-size: 1.875rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .mdx-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .mdx-content p {
          line-height: 1.75;
          margin-bottom: 1rem;
        }
        .mdx-content a {
          color: #0070f3;
          text-decoration: none;
        }
        .mdx-content a:hover {
          text-decoration: underline;
        }
        .mdx-content code {
          background-color: #f3f4f6;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
        }
        .mdx-content pre {
          background-color: #1e293b;
          color: #f8fafc;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        .mdx-content pre code {
          background-color: transparent;
          padding: 0;
          border-radius: 0;
        }
        .mdx-content img {
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .mdx-content ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .mdx-content ol {
          list-style-type: decimal;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .mdx-content li {
          margin-bottom: 0.5rem;
        }
        .mdx-content blockquote {
          border-left: 4px solid #0070f3;
          padding-left: 1rem;
          font-style: italic;
          margin: 1rem 0;
          color: #6b7280;
        }
        .mdx-content table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
        }
        .mdx-content th {
          border: 1px solid #e5e7eb;
          padding: 0.5rem;
          background-color: #f3f4f6;
          font-weight: 600;
        }
        .mdx-content td {
          border: 1px solid #e5e7eb;
          padding: 0.5rem;
        }
      `}</style>
    </>
  );
}
