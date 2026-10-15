import { companyMetrics } from "@/lib/company";

export function CompanyNumbersSection() {
  return (
    <section aria-label="A Majestade em números" className="bg-brand-ink text-white">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-6 py-14 md:grid-cols-4 md:px-12 md:py-16 lg:px-20">
        {companyMetrics.map((metric) => (
          <div key={metric.label} className="border-t border-brand-gold pt-4 text-center">
            <dt className="text-4xl font-semibold tracking-tight text-brand-gold md:text-5xl">
              {metric.value}
            </dt>
            <dd className="mt-2 text-sm text-white/75 md:text-base">{metric.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
