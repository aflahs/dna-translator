import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="flex flex-col items-center text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          DNA to Protein <span className="text-emerald-500">Translator</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Input a DNA sequence and see how it translates into an amino acid chain. Simulate mutations and observe how
          they affect the resulting protein.
        </p>

        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg border">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center">
                <img src="/dna-helix-abstract.png" alt="DNA icon" className="w-16 h-16" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-center">Start Translating DNA</h2>
            <p className="text-muted-foreground text-center">
              Enter a DNA sequence or use one of our examples to begin exploring protein synthesis.
            </p>
            <Link href="/input" className="block w-full">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-12">
          <FeatureCard
            title="DNA Translation"
            description="Visualize how DNA codons translate into amino acids with our interactive viewer."
            icon="🧬"
          />
          <FeatureCard
            title="Mutation Simulation"
            description="Introduce substitutions, insertions, or deletions and see how they affect the protein."
            icon="🔬"
          />
          <FeatureCard
            title="Mutation Analysis"
            description="Identify silent, missense, or nonsense mutations and understand their impact."
            icon="📊"
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
