import Image from "next/image";
import Link from "next/link";
import { PaddingContainer } from "./components/layout/padding-container";

export default function Home() {
  return (
    <PaddingContainer>
      <main className="h-screen space-y-10">
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
      </main>
    </PaddingContainer>
  );
}
