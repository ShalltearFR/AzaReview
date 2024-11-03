import Page from "@/components/Editor/MultiEdit/Page";
import NavBarEditor from "@/components/Editor/NavBarEditor";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// async function getData(url: string, revalidationValue: number) {
//   const data = await fetch(url, {
//     next: { revalidate: revalidationValue },
//   });
//   const dataJson = await data.json();
//   return dataJson;
// }

const page: React.FC = async () => {
  // const json = await getData(`${process.env.WWW}/api/characters/all`, 5);
  // console.log("json", json);
  return (
    <>
      <title>Editions multiples</title>
      <NavBarEditor />
      <Page />
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default page;
