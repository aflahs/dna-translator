export interface CodonData {
  codon: string
  aminoAcid: string
  fullName: string
  color: string
}

// Codon to amino acid mapping
const codonTable: Record<string, { aminoAcid: string; fullName: string; color: string }> = {
  // Phenylalanine (Phe/F)
  TTT: { aminoAcid: "F", fullName: "Phenylalanine", color: "#FF6B6B" },
  TTC: { aminoAcid: "F", fullName: "Phenylalanine", color: "#FF6B6B" },

  // Leucine (Leu/L)
  TTA: { aminoAcid: "L", fullName: "Leucine", color: "#FF9E7A" },
  TTG: { aminoAcid: "L", fullName: "Leucine", color: "#FF9E7A" },
  CTT: { aminoAcid: "L", fullName: "Leucine", color: "#FF9E7A" },
  CTC: { aminoAcid: "L", fullName: "Leucine", color: "#FF9E7A" },
  CTA: { aminoAcid: "L", fullName: "Leucine", color: "#FF9E7A" },
  CTG: { aminoAcid: "L", fullName: "Leucine", color: "#FF9E7A" },

  // Isoleucine (Ile/I)
  ATT: { aminoAcid: "I", fullName: "Isoleucine", color: "#FFAA5E" },
  ATC: { aminoAcid: "I", fullName: "Isoleucine", color: "#FFAA5E" },
  ATA: { aminoAcid: "I", fullName: "Isoleucine", color: "#FFAA5E" },

  // Methionine (Met/M) - Start codon
  ATG: { aminoAcid: "M", fullName: "Methionine", color: "#FFD700" },

  // Valine (Val/V)
  GTT: { aminoAcid: "V", fullName: "Valine", color: "#FFCF48" },
  GTC: { aminoAcid: "V", fullName: "Valine", color: "#FFCF48" },
  GTA: { aminoAcid: "V", fullName: "Valine", color: "#FFCF48" },
  GTG: { aminoAcid: "V", fullName: "Valine", color: "#FFCF48" },

  // Serine (Ser/S)
  TCT: { aminoAcid: "S", fullName: "Serine", color: "#43AA8B" },
  TCC: { aminoAcid: "S", fullName: "Serine", color: "#43AA8B" },
  TCA: { aminoAcid: "S", fullName: "Serine", color: "#43AA8B" },
  TCG: { aminoAcid: "S", fullName: "Serine", color: "#43AA8B" },
  AGT: { aminoAcid: "S", fullName: "Serine", color: "#43AA8B" },
  AGC: { aminoAcid: "S", fullName: "Serine", color: "#43AA8B" },

  // Proline (Pro/P)
  CCT: { aminoAcid: "P", fullName: "Proline", color: "#90BE6D" },
  CCC: { aminoAcid: "P", fullName: "Proline", color: "#90BE6D" },
  CCA: { aminoAcid: "P", fullName: "Proline", color: "#90BE6D" },
  CCG: { aminoAcid: "P", fullName: "Proline", color: "#90BE6D" },

  // Threonine (Thr/T)
  ACT: { aminoAcid: "T", fullName: "Threonine", color: "#577590" },
  ACC: { aminoAcid: "T", fullName: "Threonine", color: "#577590" },
  ACA: { aminoAcid: "T", fullName: "Threonine", color: "#577590" },
  ACG: { aminoAcid: "T", fullName: "Threonine", color: "#577590" },

  // Alanine (Ala/A)
  GCT: { aminoAcid: "A", fullName: "Alanine", color: "#4D908E" },
  GCC: { aminoAcid: "A", fullName: "Alanine", color: "#4D908E" },
  GCA: { aminoAcid: "A", fullName: "Alanine", color: "#4D908E" },
  GCG: { aminoAcid: "A", fullName: "Alanine", color: "#4D908E" },

  // Tyrosine (Tyr/Y)
  TAT: { aminoAcid: "Y", fullName: "Tyrosine", color: "#F94144" },
  TAC: { aminoAcid: "Y", fullName: "Tyrosine", color: "#F94144" },

  // Histidine (His/H)
  CAT: { aminoAcid: "H", fullName: "Histidine", color: "#F3722C" },
  CAC: { aminoAcid: "H", fullName: "Histidine", color: "#F3722C" },

  // Glutamine (Gln/Q)
  CAA: { aminoAcid: "Q", fullName: "Glutamine", color: "#F8961E" },
  CAG: { aminoAcid: "Q", fullName: "Glutamine", color: "#F8961E" },

  // Asparagine (Asn/N)
  AAT: { aminoAcid: "N", fullName: "Asparagine", color: "#F9C74F" },
  AAC: { aminoAcid: "N", fullName: "Asparagine", color: "#F9C74F" },

  // Lysine (Lys/K)
  AAA: { aminoAcid: "K", fullName: "Lysine", color: "#90BE6D" },
  AAG: { aminoAcid: "K", fullName: "Lysine", color: "#90BE6D" },

  // Aspartic Acid (Asp/D)
  GAT: { aminoAcid: "D", fullName: "Aspartic Acid", color: "#43AA8B" },
  GAC: { aminoAcid: "D", fullName: "Aspartic Acid", color: "#43AA8B" },

  // Glutamic Acid (Glu/E)
  GAA: { aminoAcid: "E", fullName: "Glutamic Acid", color: "#4D908E" },
  GAG: { aminoAcid: "E", fullName: "Glutamic Acid", color: "#4D908E" },

  // Cysteine (Cys/C)
  TGT: { aminoAcid: "C", fullName: "Cysteine", color: "#277DA1" },
  TGC: { aminoAcid: "C", fullName: "Cysteine", color: "#277DA1" },

  // Tryptophan (Trp/W)
  TGG: { aminoAcid: "W", fullName: "Tryptophan", color: "#577590" },

  // Arginine (Arg/R)
  CGT: { aminoAcid: "R", fullName: "Arginine", color: "#F94144" },
  CGC: { aminoAcid: "R", fullName: "Arginine", color: "#F94144" },
  CGA: { aminoAcid: "R", fullName: "Arginine", color: "#F94144" },
  CGG: { aminoAcid: "R", fullName: "Arginine", color: "#F94144" },
  AGA: { aminoAcid: "R", fullName: "Arginine", color: "#F94144" },
  AGG: { aminoAcid: "R", fullName: "Arginine", color: "#F94144" },

  // Glycine (Gly/G)
  GGT: { aminoAcid: "G", fullName: "Glycine", color: "#277DA1" },
  GGC: { aminoAcid: "G", fullName: "Glycine", color: "#277DA1" },
  GGA: { aminoAcid: "G", fullName: "Glycine", color: "#277DA1" },
  GGG: { aminoAcid: "G", fullName: "Glycine", color: "#277DA1" },

  // Stop codons
  TAA: { aminoAcid: "STOP", fullName: "Stop", color: "#000000" },
  TAG: { aminoAcid: "STOP", fullName: "Stop", color: "#000000" },
  TGA: { aminoAcid: "STOP", fullName: "Stop", color: "#000000" },
}

/**
 * Translates a DNA sequence into codons and amino acids
 */
export function translateDNA(dnaSequence: string): CodonData[] {
  const result: CodonData[] = []

  // Process the DNA sequence in groups of 3 (codons)
  for (let i = 0; i < dnaSequence.length; i += 3) {
    if (i + 2 < dnaSequence.length) {
      const codon = dnaSequence.substring(i, i + 3).toUpperCase()

      if (codonTable[codon]) {
        result.push({
          codon,
          aminoAcid: codonTable[codon].aminoAcid,
          fullName: codonTable[codon].fullName,
          color: codonTable[codon].color,
        })
      } else {
        // Handle unknown codons
        result.push({
          codon,
          aminoAcid: "?",
          fullName: "Unknown",
          color: "#cccccc",
        })
      }
    } else {
      // Handle incomplete codons at the end
      const partialCodon = dnaSequence.substring(i).toUpperCase()
      result.push({
        codon: partialCodon,
        aminoAcid: "INC",
        fullName: "Incomplete",
        color: "#cccccc",
      })
    }
  }

  return result
}

/**
 * Determines the type of mutation by comparing original and mutated codons
 */
export function getMutationType(
  originalCodons: CodonData[],
  mutatedCodons: CodonData[],
): { type: string; description: string } {
  // Check if the sequences are identical
  if (originalCodons.length === mutatedCodons.length) {
    let identical = true
    let missenseFound = false
    let nonsenseFound = false

    for (let i = 0; i < originalCodons.length; i++) {
      if (originalCodons[i].aminoAcid !== mutatedCodons[i].aminoAcid) {
        identical = false

        // Check for nonsense mutation (amino acid to stop codon)
        if (originalCodons[i].aminoAcid !== "STOP" && mutatedCodons[i].aminoAcid === "STOP") {
          nonsenseFound = true
          break
        }

        // Check for missense mutation (amino acid to different amino acid)
        if (originalCodons[i].aminoAcid !== mutatedCodons[i].aminoAcid) {
          missenseFound = true
        }
      }
    }

    if (identical) {
      return {
        type: "Silent",
        description: "The mutation did not change the amino acid sequence of the protein.",
      }
    } else if (nonsenseFound) {
      return {
        type: "Nonsense",
        description: "The mutation introduced a premature stop codon, resulting in a truncated protein.",
      }
    } else if (missenseFound) {
      return {
        type: "Missense",
        description: "The mutation changed one or more amino acids in the protein sequence.",
      }
    }
  }

  // Check for frameshift (insertion or deletion not divisible by 3)
  const originalLength = originalCodons.reduce((sum, codon) => sum + codon.codon.length, 0)
  const mutatedLength = mutatedCodons.reduce((sum, codon) => sum + codon.codon.length, 0)

  if (originalLength !== mutatedLength) {
    const diff = Math.abs(originalLength - mutatedLength)

    if (diff % 3 !== 0) {
      return {
        type: "Frameshift",
        description: "The mutation shifted the reading frame, completely changing the amino acid sequence downstream.",
      }
    } else {
      return {
        type: "In-frame",
        description: "The mutation added or removed amino acids without shifting the reading frame.",
      }
    }
  }

  // Default case
  return {
    type: "Complex",
    description: "The mutation resulted in complex changes to the protein sequence.",
  }
}
