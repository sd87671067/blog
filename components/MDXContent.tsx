interface MDXContentProps {
  content: string;
}

export default function MDXContent({ content }: MDXContentProps) {
  return (
    <div
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
