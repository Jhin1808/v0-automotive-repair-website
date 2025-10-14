import { Shield, Clock, Award, DollarSign } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Warranty Protected",
    description: "12-month/12,000-mile warranty on all repairs and parts.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Most repairs completed same-day with no appointment needed.",
  },
  {
    icon: Award,
    title: "Certified Technicians",
    description: "ASE-certified mechanics with ongoing training and expertise.",
  },
  {
    icon: DollarSign,
    title: "Honest Pricing",
    description: "Transparent estimates with no hidden fees or surprises.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose DQ Automotive</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We go beyond basic repairs to deliver exceptional service and peace of mind.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="text-center">
                <div className="inline-flex h-16 w-16 rounded-full bg-primary/10 items-center justify-center mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
