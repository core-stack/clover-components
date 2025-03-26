import { Title } from '../ui';

type Props = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}
export const Header = ({ children, title, description }: Props) => {
  return (
    <div className='flex items-center justify-between mb-5'>
      <div>
        <Title>{title}</Title>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  )
}