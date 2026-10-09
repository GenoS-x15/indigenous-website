import Link from "next/link";
import { Container } from "@/components/ui";
import { GoatSvg } from "@/components/Shapes";

export default function NotFound() {
  return (
    <Container className="py-28 text-center">
      <GoatSvg className="mx-auto w-28 text-forest-700" />
      <p className="mt-6 text-7xl font-extrabold text-forest-700">404</p>
      <h1 className="mt-4 text-2xl font-bold text-forest-950">Page not found</h1>
      <p className="mt-2 text-forest-900/75">This goat wandered off the path.</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-forest-700 px-7 py-3.5 font-bold text-white hover:bg-forest-800">
        Back to home
      </Link>
    </Container>
  );
}
