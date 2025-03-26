import React from 'react';

import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  children?: React.ReactNode;
}
export const Divider = ({ children, className }: Props) => {
  return (
    <div className={
      cn(
        "w-full flex items-center gap-4 text-sm text-muted-foreground",
        "before:w-full before:h-px before:bg-muted-foreground",
        "after:w-full after:h-px after:bg-muted-foreground",
        className
      )}>{children}</div>
  )
}