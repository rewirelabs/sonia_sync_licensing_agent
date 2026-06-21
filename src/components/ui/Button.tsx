import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md";
  const variants = {
    primary: "bg-forest text-bg hover:bg-forest/90 focus:ring-forest",
    secondary: "bg-surface text-ink hover:bg-surface/90 border border-hairline focus:ring-ink",
    outline: "border border-forest text-forest hover:bg-forest/10 focus:ring-forest",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}
