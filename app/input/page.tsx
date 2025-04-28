"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const EXAMPLE_SEQUENCES = [
  {
    name: "Insulin Fragment",
    sequence:
      "ATGGCCCTGTGGATGCGCCTCCTGCCCCTGCTGGCGCTGCTGGCCCTCTGGGGACCTGACCCAGCCGCAGCCTTTGTGAACCAACACCTGTGCGGCTCACACCTGGTGGAAGCTC",
  },
  {
    name: "Hemoglobin Fragment",
    sequence:
      "ATGGTGCACCTGACTCCTGAGGAGAAGTCTGCCGTTACTGCCCTGTGGGGCAAGGTGAACGTGGATGAAGTTGGTGGTGAGGCCCTGGGCAGGCTGCTGGTGGTCTACCCTTGGACCCAGAGGTTC",
  },
  {
    name: "BRCA1 Fragment",
    sequence:
      "ATGGATTTATCTGCTCTTCGCGTTGAAGAAGTACAAAATGTCATTAATGCTATGCAGAAAATCTTAGAGTGTCCCATCTGTCTGGAGTTGATCAAGGAACCTGTCTCCACAAAGTGTGACCACATATTTTGCAA",
  },
]

export default function InputPage() {
  const router = useRouter()
  const [dnaSequence, setDnaSequence] = useState("")
  const [error, setError] = useState("")

  const validateDNA = (sequence: string) => {
    const cleanSequence = sequence.toUpperCase().replace(/\s/g, "")
    const validDNA = /^[ATCG]+$/.test(cleanSequence)

    if (!validDNA) {
      setError("Invalid DNA sequence. Please use only A, T, C, and G nucleotides.")
      return false
    }

    if (cleanSequence.length < 3) {
      setError("DNA sequence must be at least 3 nucleotides long.")
      return false
    }

    setError("")
    return cleanSequence
  }

  const handleSubmit = () => {
    const validatedSequence = validateDNA(dnaSequence)
    if (validatedSequence) {
      // Store the sequence in sessionStorage to pass it to the next page
      sessionStorage.setItem("dnaSequence", validatedSequence)
      router.push("/translation")
    }
  }

  const useExampleSequence = useCallback(
    (sequence: string) => {
      setDnaSequence(sequence)
      setError("")
    },
    [setDnaSequence, setError],
  )

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Enter DNA Sequence</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>DNA Sequence Input</CardTitle>
          <CardDescription>Enter a DNA sequence using A, T, C, and G nucleotides.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="e.g., ATGCCCGTATGCTAGCTAGCTA..."
            className="min-h-[200px] font-mono"
            value={dnaSequence}
            onChange={(e) => setDnaSequence(e.target.value)}
          />

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between flex-wrap gap-4">
          <div>
            <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
              Translate Sequence
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setDnaSequence("")}>
              Clear
            </Button>
          </div>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Example Sequences</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {EXAMPLE_SEQUENCES.map((example, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:border-emerald-500 transition-colors"
              onClick={() => useExampleSequence(example.sequence)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{example.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs font-mono truncate">{example.sequence.substring(0, 30)}...</p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-emerald-600"
                  onClick={(e) => {
                    e.stopPropagation()
                    useExampleSequence(example.sequence)
                  }}
                >
                  Use This Sequence
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
