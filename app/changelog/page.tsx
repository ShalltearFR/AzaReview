import { CommitData } from "@/types/GitHubCommit";

const getData = async (url: string) => {
  const res = await fetch(url, {
    next: { revalidate: 300 },
  });
  const json = await res.json();
  return json;
};

const Changelog: React.FC = async () => {
  const json: CommitData = await getData(`${process.env.WWW}/api/changelog`);

  return (
    <div className="bg-white overflow-hidden">
      {json.data.map((el) => {
        const date = new Date(el.date);
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "long" });
        const formattedDate = `${day} ${month}`;

        return (
          <div key={el.date} className="mb-5">
            <p>{formattedDate}</p>
            <ul className="list-disc">
              {el.message.map((message, i) => (
                <li className="ml-5" key={`${message}+${i}`}>
                  {message}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Changelog;
