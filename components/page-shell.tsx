import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { WhatsAppFloat } from "@/components/whatsapp-float";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>{children}</main>
      <FooterSection />
      <WhatsAppFloat />
    </div>
  );
}
