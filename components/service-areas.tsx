import { Check, MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"

export function ServiceAreas() {
  const areas = [
    {
      city: "Seattle",
      description: "Full mobile service coverage throughout Seattle and surrounding neighborhoods",
    },
    {
      city: "Burien",
      description: "Convenient mobile repair service for all Burien residents",
    },
    {
      city: "Kent",
      description: "Professional mobile automotive service across Kent area",
    },
  ]

  return (
    <section className="relative bg-[#09090a] py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-14 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <div className="mb-4 h-1 w-14 bg-primary" aria-hidden="true" />
            <h2 className="text-4xl font-black uppercase tracking-[-0.04em] text-white md:text-6xl">Service Areas</h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-zinc-400 md:justify-self-end">
            I provide mobile automotive repair services throughout the greater Seattle area
          </p>
        </div>

        <div className="mb-5 grid gap-4 md:grid-cols-3">
          {areas.map((area, index) => (
            <Card key={area.city} className="group relative overflow-hidden rounded-none border border-white/10 bg-[#121214] p-7 shadow-none transition-all hover:border-primary/60 md:p-8">
              <span className="absolute right-5 top-4 font-mono text-xs text-zinc-700">0{index + 1}</span>
              <div className="mb-6 flex h-12 w-12 items-center justify-center border border-primary/35 bg-primary/10 transition-colors group-hover:bg-primary">
                <MapPin className="h-5 w-5 text-primary transition-colors group-hover:text-white" aria-hidden="true" />
              </div>
              <h3 className="mb-3 text-2xl font-black uppercase tracking-tight text-white">{area.city}</h3>
              <p className="leading-relaxed text-zinc-400">{area.description}</p>
            </Card>
          ))}
        </div>

        <Card className="rounded-none border border-primary/35 bg-[linear-gradient(90deg,rgba(220,38,38,0.16),rgba(18,18,20,1)_38%)] p-7 shadow-none md:p-9">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-primary shadow-[0_0_28px_rgba(220,38,38,0.24)]">
              <Check className="h-7 w-7 text-white" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-2xl font-black uppercase text-white">Mobile Service Fee</h3>
              <p className="text-lg leading-relaxed text-zinc-300">
                A flat $35 mobile service fee applies to all on-location repairs. This covers my travel time and ensures
                I arrive fully equipped to handle your automotive needs wherever you are.
              </p>
            </div>
            <div className="border-l border-primary/40 pl-6 text-4xl font-black text-primary md:text-5xl">$35</div>
          </div>
        </Card>
      </div>
    </section>
  )
}
