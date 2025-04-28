"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { translateDNA, type CodonData, getMutationType } from "@/lib/dna-utils"
import { ArrowRight } from "lucide-react"

type MutationType = "substitution" | "insertion" | "deletion"

export default function MutationPage() {
  const router = useRouter()
  const [originalDNA, setOriginalDNA] = useState<string>("")
  const [mutatedDNA, setMutatedDNA] = useState<string>("")
  const [originalCodons, setOriginalCodons] = useState<CodonData[]>([])
  const [mutatedCodons, setMutatedCodons] = useState<CodonData[]>([])

  const [mutationType, setMutationType] = useState<MutationType>("substitution")
  const [position, setPosition] = useState<number>(0)
  const [newBase, setNewBase] = useState<string>("A")

  const [mutationHistory, setMutationHistory] = useState<Array<{ type: string; description: string; dna: string }>>([])
  const [currentMutationIndex, setCurrentMutationIndex] = useState<number>(-1)

  useEffect(() => {
    // Retrieve the DNA sequence from sessionStorage
    const storedSequence = sessionStorage.getItem("dnaSequence")

    if (!storedSequence) {
      router.push("/input")
      return
    }

    setOriginalDNA(storedSequence)
    setMutatedDNA(storedSequence)

    const translationResult = translateDNA(storedSequence)
    setOriginalCodons(translationResult)
    setMutatedCodons(translationResult)

    // Initialize mutation history with original sequence
    setMutationHistory([
      {
        type: "Original",
        description: "Original DNA sequence",
        dna: storedSequence,
      },
    ])
    setCurrentMutationIndex(0)

    // Set default position to middle of sequence
    setPosition(Math.floor(storedSequence.length / 2))
  }, [router])

  const applyMutation = () => {
    let newDNA = ""
    let mutationDescription = ""

    switch (mutationType) {
      case "substitution":
        newDNA = originalDNA.substring(0, position) + newBase + originalDNA.substring(position + 1)
        mutationDescription = `Substitution at position ${position + 1}: ${originalDNA[position]} → ${newBase}`
        break
      case "insertion":
        newDNA = originalDNA.substring(0, position) + newBase + originalDNA.substring(position)
        mutationDescription = `Insertion at position ${position + 1}: ${newBase}`
        break
      case "deletion":
        newDNA = originalDNA.substring(0, position) + originalDNA.substring(position + 1)
        mutationDescription = `Deletion at position ${position + 1}: ${originalDNA[position]}`
        break
    }

    setMutatedDNA(newDNA)
    const newCodons = translateDNA(newDNA)
    setMutatedCodons(newCodons)

    // Add to mutation history
    const newHistory = mutationHistory.slice(0, currentMutationIndex + 1)
    newHistory.push({
      type: mutationType.charAt(0).toUpperCase() + mutationType.slice(1),
      description: mutationDescription,
      dna: newDNA,
    })

    setMutationHistory(newHistory)
    setCurrentMutationIndex(newHistory.length - 1)

    // Store the mutated sequence for the results page
    sessionStorage.setItem("mutatedDNA", newDNA)
    sessionStorage.setItem("originalDNA", originalDNA)
  }

  const navigateHistory = (index: number) => {
    if (index >= 0 && index < mutationHistory.length) {
      const historyItem = mutationHistory[index]
      setMutatedDNA(historyItem.dna)
      setMutatedCodons(translateDNA(historyItem.dna))
      setCurrentMutationIndex(index)
    }
  }

  const handleContinue = () => {
    router.push("/results")
  }

  // Get mutation type (silent, missense, nonsense)
  const mutationTypeResult = getMutationType(originalCodons, mutatedCodons)

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Mutation Simulator</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Mutation Controls</CardTitle>
            <CardDescription>Choose a mutation type and parameters.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="substitution" onValueChange={(value) => setMutationType(value as MutationType)}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="substitution">Substitute</TabsTrigger>
                <TabsTrigger value="insertion">Insert</TabsTrigger>
                <TabsTrigger value="deletion">Delete</TabsTrigger>
              </TabsList>

              <TabsContent value="substitution" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position (0-{originalDNA.length - 1})</Label>
                  <Input
                    id="position"
                    type="number"
                    min={0}
                    max={originalDNA.length - 1}
                    value={position}
                    onChange={(e) => setPosition(Number.parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>New Base</Label>
                  <RadioGroup defaultValue="A" onValueChange={setNewBase} className="flex space-x-2">
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="A" id="A" />
                      <Label htmlFor="A">A</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="T" id="T" />
                      <Label htmlFor="T">T</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="C" id="C" />
                      <Label htmlFor="C">C</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="G" id="G" />
                      <Label htmlFor="G">G</Label>
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>

              <TabsContent value="insertion" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ins-position">Position (0-{originalDNA.length})</Label>
                  <Input
                    id="ins-position"
                    type="number"
                    min={0}
                    max={originalDNA.length}
                    value={position}
                    onChange={(e) => setPosition(Number.parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Base to Insert</Label>
                  <RadioGroup defaultValue="A" onValueChange={setNewBase} className="flex space-x-2">
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="A" id="ins-A" />
                      <Label htmlFor="ins-A">A</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="T" id="ins-T" />
                      <Label htmlFor="ins-T">T</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="C" id="ins-C" />
                      <Label htmlFor="ins-C">C</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="G" id="ins-G" />
                      <Label htmlFor="ins-G">G</Label>
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>

              <TabsContent value="deletion" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="del-position">Position (0-{originalDNA.length - 1})</Label>
                  <Input
                    id="del-position"
                    type="number"
                    min={0}
                    max={originalDNA.length - 1}
                    value={position}
                    onChange={(e) => setPosition(Number.parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  Base to delete: <span className="font-mono font-bold">{originalDNA[position] || ""}</span>
                </div>
              </TabsContent>
            </Tabs>

            <Button onClick={applyMutation} className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700">
              Apply Mutation
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>DNA Sequence Comparison</CardTitle>
            <CardDescription>Compare the original and mutated DNA sequences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Original DNA:</h3>
              <div className="bg-gray-50 p-3 rounded-md overflow-x-auto">
                <pre className="font-mono text-sm whitespace-pre-wrap break-all">{originalDNA}</pre>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Mutated DNA:</h3>
              <div className="bg-gray-50 p-3 rounded-md overflow-x-auto">
                <pre className="font-mono text-sm whitespace-pre-wrap break-all">{mutatedDNA}</pre>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Mutation Type:</h3>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex items-center">
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
                  <span className="ml-2 text-sm">{mutationTypeResult.description}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Original Protein</CardTitle>
            <CardDescription>Amino acid sequence from the original DNA.</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mutated Protein</CardTitle>
            <CardDescription>Amino acid sequence after mutation.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {mutatedCodons.map((codon, index) => {
                const isChanged = index < originalCodons.length && originalCodons[index].aminoAcid !== codon.aminoAcid

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
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Mutation Timeline</CardTitle>
          <CardDescription>History of mutations applied to the DNA sequence.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex overflow-x-auto space-x-2 pb-2">
            {mutationHistory.map((mutation, index) => (
              <Button
                key={index}
                variant={index === currentMutationIndex ? "default" : "outline"}
                className={index === currentMutationIndex ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                onClick={() => navigateHistory(index)}
              >
                {mutation.type}
              </Button>
            ))}
          </div>

          {currentMutationIndex >= 0 && (
            <div className="mt-4 text-sm">{mutationHistory[currentMutationIndex].description}</div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/translation">
            <Button variant="outline">Back to Translation</Button>
          </Link>
          <Button onClick={handleContinue} className="bg-emerald-600 hover:bg-emerald-700">
            View Results <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
