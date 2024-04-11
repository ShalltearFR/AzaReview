interface VerticalNotationArrayProps {
  translate: Array<string>;
}

const VerticalNotationArray: React.FC<VerticalNotationArrayProps> = ({
  translate,
}) => {
  return (
    <div className="my-5 mmd:hidden rounded-xl overflow-hidden border border-white">
      <table className="w-full [&_td]:p-3">
        <thead className="bg-[#5b0f00] text-lg ">
          <tr>
            <th className="border-r border-white p-5">Note</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-white">
            <td className="border-r border-white"> &gt;A+</td>
            <td>{translate[1] ?? ""}</td>
          </tr>
          <tr className="bg-blue">
            <td className="border-r border-white">{translate[0] ?? ""}</td>
            <td>OK</td>
          </tr>
          <tr>
            <td className="border-r border-white"> &lt;A</td>
            <td>{translate[2] ?? ""}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VerticalNotationArray;
