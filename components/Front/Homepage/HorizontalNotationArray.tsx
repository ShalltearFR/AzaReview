const HorizontalNotationArray: React.FC = () => {
  return (
    <table className="hidden mmd:table w-[750px] text-center rounded-2xl overflow-hidden">
      <thead>
        <tr className="[&_th]:border-b [&_th]:border-white">
          <th className="w-2/5 bg-darkRed p-5 font-bold">Note</th>
          <th className="w-1/5 bg-black">&lt;A</th>
          <th className="w-1/5 bg-blue">A ou A+</th>
          <th className="w-1/5 bg-black">&gt;A+</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="bg-darkRed p-5 font-bold">Description</td>
          <td className="w-auto bg-black">A améliorer</td>
          <td className="w-auto bg-blue">Correct</td>
          <td className="w-auto bg-black">Génial</td>
        </tr>
      </tbody>
    </table>
  );
};

export default HorizontalNotationArray;
