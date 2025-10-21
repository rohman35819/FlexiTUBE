import LayoutWrapper from "@/components/LayoutWrapper";
import PythonFungsiClient from "./PythonFungsiClient";

export const metadata = {
  title: "Fungsi di Python — FlexiTUBE",
  description: "Pengantar lengkap: apa itu fungsi di Python, parameter, return, contoh, dan best practice.",
};

export default function FungsiPage() {
  return (
    <LayoutWrapper>
      <PythonFungsiClient />
    </LayoutWrapper>
  );
}
