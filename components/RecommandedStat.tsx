interface RecommandedStatProps {}

const RecommandedStat: React.FC<RecommandedStatProps> = ({}) => {
  return (
    <div className="w-1/2 mx-auto text-white text-sm font-bold">
      <div className="mt-2 text-center">
        <span>Disponible </span>
        <span>prochainement</span>
      </div>
    </div>
  );
};

export default RecommandedStat;
