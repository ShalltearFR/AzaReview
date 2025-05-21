import Page from "@/components/Editor/MultiEdit/Page";
import NavBarEditor from "@/components/Editor/NavBarEditor";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const page: React.FC = async () => {
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
