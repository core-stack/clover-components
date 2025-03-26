import { cn } from '@/lib/utils';

type Props = {
  size?: number;
  color?: string;
  className?: string;
}
export const Ping = ({ color = "bg-blue-500", size = 3, className = "" }: Props) => {
  const getSize = (): string => {
    return `size-${size}`;
  }
  return (
    <span className={cn("relative", getSize(), className)}>
      <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", color)}></span>
      <span className={cn("relative inline-flex size-4 rounded-full", color, getSize())}></span>
    </span>
  )
}