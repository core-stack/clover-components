import * as React from 'react';

import { cn } from '@/lib/utils';

type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>

export function Paragraph({ className, children, ...props }: ParagraphProps) {
  return (
    <p
      className={cn(
        "text-sm",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
