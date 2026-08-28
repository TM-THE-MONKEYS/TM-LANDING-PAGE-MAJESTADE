import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { WhatsAppFloat } from "@/components/whatsapp-float";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      {children}
      <FooterSection />
      <WhatsAppFloat />
    </main>
  );
}
