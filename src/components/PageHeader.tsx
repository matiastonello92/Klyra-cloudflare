import React from 'react';
interface PageHeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}
export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-gray-50">{title}</h1>
        <p className="mt-1 text-lg text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      <div className="flex-shrink-0">{children}</div>
    </header>
  );
}