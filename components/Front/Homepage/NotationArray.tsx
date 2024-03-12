const NotationArray = () => {
  return (
    <table className="border border-white">
      <thead className="bg-[#5b0f00] text-lg">
        <tr>
          <th className="border border-white p-5">Note</th>
          <th className="p-5">Description</th>
        </tr>
      </thead>
      <tbody className="border border-white">
        <tr className="border border-white">
          <td className="border border-white p-3 bg-black"> &gt;A+</td>
          <td className="p-3 bg-black">Genial</td>
        </tr>
        <tr className="border bg-gray">
          <td className="border border-white p-3">A ou A+</td>
          <td className="p-3">OK</td>
        </tr>
        <tr>
          <td className="border border-white p-3 bg-black"> &lt;A</td>
          <td className="p-3 bg-black">A améliorer</td>
        </tr>
      </tbody>
    </table>
  );
};

export default NotationArray;
