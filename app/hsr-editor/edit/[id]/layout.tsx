import { Metadata } from "next";
import NavBarEditor from "@/components/Editor/NavBarEditor";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Edition personnage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-[calc(100vh-180px)]">
      <NavBarEditor />
      {children}
      <ToastContainer position="bottom-right" />
    </div>
  );
}
