"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { translateDNA, type CodonData, getMutationType } from "@/lib/dna-utils"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import { CodonWheel } from "@/components/codon-wheel"

export default function ResultsPage() {
  const router = useRouter()
  const [originalDNA, setOriginalDNA] = useState<string>("")
  const [mutatedDNA, setMutatedDNA] = useState<string>("")
  const [originalCodons, setOriginalCodons] = useState<CodonData[]>([])
  const [mutatedCodons, setMutatedCodons] = useState<CodonData[]>([])
  const [mutationTypeResult, setMutationTypeResult] = useState<{ type: string; description: string }>({
    type: "",
    description: "",
  })

  useEffect(() => {
    // Retrieve the DNA sequences from sessionStorage
    const storedOriginal = sessionStorage.getItem("originalDNA")
    const storedMutated = sessionStorage.getItem("mutatedDNA")

    if (!storedOriginal || !storedMutated) {
      router.push("/input")
      return
    }

    setOriginalDNA(storedOriginal)
    setMutatedDNA(storedMutated)

    const originalTranslation = translateDNA(storedOriginal)
    const mutatedTranslation = translateDNA(storedMutated)

    setOriginalCodons(originalTranslation)
    setMutatedCodons(mutatedTranslation)

    setMutationTypeResult(getMutationType(originalTranslation, mutatedTranslation))
  }, [router])

  const downloadResults = () => {
    const originalProtein = originalCodons.map((c) => (c.aminoAcid !== "STOP" ? c.aminoAcid : "")).join("")
    const mutatedProtein = mutatedCodons.map((c) => (c.aminoAcid !== "STOP" ? c.aminoAcid : "")).join("")

    const resultsText = `DNA to Protein Translation Results
    
Original DNA:
${originalDNA}

Mutated DNA:
${mutatedDNA}

Original Protein:
${originalProtein}

Mutated Protein:
${mutatedProtein}

Mutation Type: ${mutationTypeResult.type}
${mutationTypeResult.description}
`

    const blob = new Blob([resultsText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "dna-mutation-results.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Mutation Analysis Results</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Mutation Summary</CardTitle>
          <CardDescription>Analysis of the mutation and its effects on the protein.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Mutation Type</h3>
              <div
                className={`p-4 rounded-md ${
                  mutationTypeResult.type === "Silent"
                    ? "bg-green-50 border border-green-200"
                    : mutationTypeResult.type === "Missense"
                      ? "bg-yellow-50 border border-yellow-200"
                      : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-center mb-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      mutationTypeResult.type === "Silent"
                        ? "bg-green-100 text-green-800"
                        : mutationTypeResult.type === "Missense"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {mutationTypeResult.type}
                  </span>
                </div>
                <p className="text-sm">{mutationTypeResult.description}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Sequence Changes</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>DNA Length:</span>
                  <span className="font-mono">
                    {originalDNA.length} → {mutatedDNA.length}
                    {originalDNA.length !== mutatedDNA.length &&
                      (originalDNA.length < mutatedDNA.length
                        ? ` (+${mutatedDNA.length - originalDNA.length})`
                        : ` (-${originalDNA.length - mutatedDNA.length})`)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Protein Length:</span>
                  <span className="font-mono">
                    {originalCodons.filter((c) => c.aminoAcid !== "STOP").length} →
                    {mutatedCodons.filter((c) => c.aminoAcid !== "STOP").length}
                    {originalCodons.filter((c) => c.aminoAcid !== "STOP").length !==
                      mutatedCodons.filter((c) => c.aminoAcid !== "STOP").length &&
                      (originalCodons.filter((c) => c.aminoAcid !== "STOP").length <
                      mutatedCodons.filter((c) => c.aminoAcid !== "STOP").length
                        ? ` (+${
                            mutatedCodons.filter((c) => c.aminoAcid !== "STOP").length -
                            originalCodons.filter((c) => c.aminoAcid !== "STOP").length
                          })`
                        : ` (-${
                            originalCodons.filter((c) => c.aminoAcid !== "STOP").length -
                            mutatedCodons.filter((c) => c.aminoAcid !== "STOP").length
                          })`)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Reading Frame:</span>
                  <span className="font-mono">
                    {mutatedDNA.length % 3 === originalDNA.length % 3 ? "Maintained" : "Shifted"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Original Protein</h3>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex flex-wrap gap-1">
                  {originalCodons.map(
                    (codon, index) =>
                      codon.aminoAcid !== "STOP" && (
                        <span
                          key={index}
                          className="font-mono px-1 py-0.5 rounded"
                          style={{ backgroundColor: codon.color + "30", color: codon.color }}
                        >
                          {codon.aminoAcid}
                        </span>
                      ),
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Mutated Protein</h3>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex flex-wrap gap-1">
                  {mutatedCodons.map((codon, index) => {
                    const isChanged =
                      index < originalCodons.length && originalCodons[index].aminoAcid !== codon.aminoAcid

                    return (
                      codon.aminoAcid !== "STOP" && (
                        <span
                          key={index}
                          className={`font-mono px-1 py-0.5 rounded ${isChanged ? "ring-2 ring-red-500" : ""}`}
                          style={{ backgroundColor: codon.color + "30", color: codon.color }}
                        >
                          {codon.aminoAcid}
                        </span>
                      )
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Codon Wheel</h3>
            <div className="flex justify-center">
              <CodonWheel />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between flex-wrap gap-4">
          <Link href="/mutation">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Mutation
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" onClick={downloadResults}>
              <Download className="mr-2 h-4 w-4" /> Download Results
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Share2 className="mr-2 h-4 w-4" /> Share Results
            </Button>
          </div>
        </CardFooter>
      </Card>

      <div className="flex justify-center">
        <Link href="/input">
          <Button variant="outline" size="lg">
            Start New Analysis
          </Button>
        </Link>
      </div>
    </div>
  )
}
