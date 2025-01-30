import EditorChange from "@/models/EditorChange.model";
import DetailsShow from "./DetailsShow";
import dbConnect from "@/lib/dbConnect";

interface EditorChangeJSON {
  author: string;
  comment: string;
  edit: any;
  createdAt: Date;
}

const page = async () => {
  try {
    await dbConnect();
    const log = await EditorChange.find({})
      .sort({ createdAt: -1 })
      .select("-__v -_id");

    return (
      <div className="flex flex-col gap-y-10  mt-5">
        {log.map((data: EditorChangeJSON, i: number) => (
          <div
            key={`dataCard+${i}`}
            className="bg-gray rounded-lg p-2 w-3/4 mx-auto"
          >
            <div className="flex font-bold items-center">
              <span className="text-xl">{data.author}</span>
              <span className="ml-auto text-sm">
                {data.createdAt.toLocaleDateString()}
              </span>
            </div>
            <p className="text-lg">{data.comment}</p>
            <DetailsShow data={data.edit} />
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Erreur de récuperation de l'editorChange</div>;
  }
};

export default page;
