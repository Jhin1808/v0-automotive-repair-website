import { MapPin, Check } from "lucide-react"
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
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Service Areas</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I provide mobile automotive repair services throughout the greater Seattle area
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {areas.map((area) => (
            <Card key={area.city} className="p-8 border-2 hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">{area.city}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{area.description}</p>
            </Card>
          ))}
        </div>

        <Card className="p-8 bg-card/50 border-2">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="p-4 rounded-full bg-primary/10 shrink-0">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">Mobile Service Fee</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A flat $35 mobile service fee applies to all on-location repairs. This covers my travel time and ensures
                I arrive fully equipped to handle your automotive needs wherever you are.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
