import { Metadata } from "next";
import NavBarEditor from "@/components/Editor/NavBarEditor";

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
    </div>
  );
}
