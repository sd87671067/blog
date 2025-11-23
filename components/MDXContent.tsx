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

  return (
    <div
      ref={contentRef}
      className="prose prose-slate dark:prose-invert max-w-none
        prose-headings:scroll-mt-20
        prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-4
        prose-h2:text-3xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4
        prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
        prose-p:leading-7 prose-p:mb-4
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-slate-900 prose-pre:text-slate-50
        prose-img:rounded-lg prose-img:shadow-lg
        prose-ul:list-disc prose-ul:ml-6
        prose-ol:list-decimal prose-ol:ml-6
        prose-li:mb-2
        prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
        prose-table:border-collapse prose-table:w-full
        prose-th:border prose-th:border-border prose-th:p-2 prose-th:bg-muted
        prose-td:border prose-td:border-border prose-td:p-2"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
