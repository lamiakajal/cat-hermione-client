import React from "react";

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

// Label + control + inline error, so every form reads the same way
export const Field: React.FC<FieldProps> = ({
  label,
  htmlFor,
  error,
  hint,
  children,
}) => (
  <div>
    <label
      htmlFor={htmlFor}
      className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
    >
      {label}
    </label>
    {children}
    {error ? (
      <p role="alert" className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
        {error}
      </p>
    ) : hint ? (
      <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{hint}</p>
    ) : null}
  </div>
);

export default Field;
