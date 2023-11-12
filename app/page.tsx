import Link from "next/link";
import ProductCard from "@/app/components/ProductCard";

export default function Home() {
  return (
    <main>
      <p>hello world</p>
      <Link href="/users">user</Link>
      <ProductCard />
    </main>
  );
}
