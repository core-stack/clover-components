import * as React from 'react';

import { cn } from '@/lib/utils'; // Função utilitária para combinar classes (seguindo o padrão do shadcn-ui).

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Title({ level = 1, className, children, ...props }: TitleProps) {
  const Tag: React.ElementType = `h${level}`; // Dinamicamente define o elemento HTML.

  return (
    <Tag
      className={cn(
        "scroll-m-20 font-bold", // Classes padrão.
        level === 1 && "text-xl mb-2",
        level === 2 && "text-xl mb-2",
        level === 3 && "text-xl mb-2",
        level === 4 && "text-xl mb-2",
        level === 5 && "text-lg mb-2",
        level === 6 && "text-base mb-2",
        className // Permite sobrescrever ou adicionar classes.
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
