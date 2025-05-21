import NavBar from "@/components/Front/NavBar";
import StarBGAnimation from "@/components/Front/StarBGAnimation";
import LoadingSpin from "@/components/LoadingSpin";

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-230px)] overflow-hidden">
      <StarBGAnimation />
      <NavBar />
      <div
        className="flex justify-center items-center mt-10"
        data-aos="fade-down"
      >
        <LoadingSpin width="w-24" height="h-24" />
      </div>
    </div>
  );
}
