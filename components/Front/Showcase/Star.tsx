interface StarProps {
  number: number;
}
export const Star: React.FC<StarProps> = ({ number }) => {
  return (
    <>
      {Array.from({ length: number }, (_: any, i: number) => (
        <div key={i}>S</div>
      ))}
    </>
  );
};
