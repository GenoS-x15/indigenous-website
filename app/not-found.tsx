import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="text-6xl font-extrabold text-forest-700">404</p>
      <h1 className="mt-4 text-2xl font-bold text-forest-950">Page not found</h1>
      <Link href="/" className="mt-8 inline-block rounded-full bg-forest-700 px-6 py-3 font-semibold text-white hover:bg-forest-800">
        Back to home
      </Link>
    </Container>
  );
}
