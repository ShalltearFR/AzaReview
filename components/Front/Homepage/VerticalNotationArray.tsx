const VerticalNotationArray = () => {
  return (
    <div className="mmd:hidden rounded-xl overflow-hidden border border-white">
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
            <td>Genial</td>
          </tr>
          <tr className="bg-gray">
            <td className="border-r border-white">A ou A+</td>
            <td>OK</td>
          </tr>
          <tr>
            <td className="border-r border-white"> &lt;A</td>
            <td>A améliorer</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VerticalNotationArray;
