"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowRight, AlertCircle } from "lucide-react"
import { translateDNA, type CodonData } from "@/lib/dna-utils"

export default function TranslationPage() {
  const router = useRouter()
  const [dnaSequence, setDnaSequence] = useState<string>("")
  const [codons, setCodons] = useState<CodonData[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Retrieve the DNA sequence from sessionStorage
    const storedSequence = sessionStorage.getItem("dnaSequence")

    if (!storedSequence) {
      router.push("/input")
      return
    }

    setDnaSequence(storedSequence)
    const translationResult = translateDNA(storedSequence)
    setCodons(translationResult)
    setLoading(false)
  }, [router])

  const handleContinue = () => {
    router.push("/mutation")
  }

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4 flex justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 w-full max-w-2xl bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">DNA Translation Results</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Original DNA Sequence</CardTitle>
          <CardDescription>
            The DNA sequence you provided has been split into codons (groups of 3 nucleotides).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-md overflow-x-auto">
            <pre className="font-mono text-sm whitespace-pre-wrap break-all">{dnaSequence}</pre>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Codon Translation</CardTitle>
          <CardDescription>Each codon translates to a specific amino acid in the protein chain.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="flex flex-wrap gap-2">
              {codons.map((codon, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center border rounded-md p-2 min-w-[80px]"
                  style={{ backgroundColor: codon.color + "20" }}
                >
                  <span className="font-mono text-sm font-bold">{codon.codon}</span>
                  <span className="text-xs text-gray-500">↓</span>
                  <span className="font-semibold" style={{ color: codon.color }}>
                    {codon.aminoAcid}
                  </span>
                  <span className="text-xs text-gray-500">{codon.fullName}</span>
                </div>
              ))}
            </div>
          </div>

          {codons.length > 0 && codons[codons.length - 1].aminoAcid === "STOP" && (
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                The sequence contains a stop codon, which signals the end of protein synthesis.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/input">
            <Button variant="outline">Back to Input</Button>
          </Link>
          <Button onClick={handleContinue} className="bg-emerald-600 hover:bg-emerald-700">
            Simulate Mutations <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Amino Acid Chain (Protein)</CardTitle>
          <CardDescription>The resulting protein sequence from your DNA.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-md overflow-x-auto">
            <div className="flex flex-wrap gap-1">
              {codons.map(
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
        </CardContent>
      </Card>
    </div>
  )
}
