import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      {children}
      <FooterSection />
    </main>
  );
}
