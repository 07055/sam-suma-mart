import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Blog",
  description: "Health tips, product guides, and wellness insights from Sam's Suma Mart.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main style={{ minHeight: "80vh" }}>{children}</main>
      <Footer />
    </>
  );
}
