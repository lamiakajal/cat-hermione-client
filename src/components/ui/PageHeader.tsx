import React from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  action,
}) => (
  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-800 mb-10">
    <div>
      {eyebrow && (
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#00897B] dark:text-[#34d399]">
          {eyebrow}
        </span>
      )}
      <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
        {title}
      </h1>
      {description && (
        <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
          {description}
        </p>
      )}
    </div>
    {action}
  </div>
);

export default PageHeader;
