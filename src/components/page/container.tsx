
type Props = {
  children: React.ReactNode;
}
export const Container = ({ children }: Props) => {
  return (
      <section className='container mx-auto p-5'>{children}</section>
  )
}