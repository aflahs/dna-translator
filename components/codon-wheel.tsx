"use client"

import { useEffect, useRef } from "react"

export function CodonWheel() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const size = 300
    canvas.width = size
    canvas.height = size

    // Center of the wheel
    const centerX = size / 2
    const centerY = size / 2
    const radius = size * 0.4

    // Define the codon wheel data
    const bases = ["U", "C", "A", "G"]
    const aminoAcids: Record<string, { name: string; color: string }> = {
      UUU: { name: "Phe", color: "#FF6B6B" },
      UUC: { name: "Phe", color: "#FF6B6B" },
      UUA: { name: "Leu", color: "#FF9E7A" },
      UUG: { name: "Leu", color: "#FF9E7A" },
      CUU: { name: "Leu", color: "#FF9E7A" },
      CUC: { name: "Leu", color: "#FF9E7A" },
      CUA: { name: "Leu", color: "#FF9E7A" },
      CUG: { name: "Leu", color: "#FF9E7A" },
      AUU: { name: "Ile", color: "#FFAA5E" },
      AUC: { name: "Ile", color: "#FFAA5E" },
      AUA: { name: "Ile", color: "#FFAA5E" },
      AUG: { name: "Met", color: "#FFD700" },
      GUU: { name: "Val", color: "#FFCF48" },
      GUC: { name: "Val", color: "#FFCF48" },
      GUA: { name: "Val", color: "#FFCF48" },
      GUG: { name: "Val", color: "#FFCF48" },
      UCU: { name: "Ser", color: "#43AA8B" },
      UCC: { name: "Ser", color: "#43AA8B" },
      UCA: { name: "Ser", color: "#43AA8B" },
      UCG: { name: "Ser", color: "#43AA8B" },
      CCU: { name: "Pro", color: "#90BE6D" },
      CCC: { name: "Pro", color: "#90BE6D" },
      CCA: { name: "Pro", color: "#90BE6D" },
      CCG: { name: "Pro", color: "#90BE6D" },
      ACU: { name: "Thr", color: "#577590" },
      ACC: { name: "Thr", color: "#577590" },
      ACA: { name: "Thr", color: "#577590" },
      ACG: { name: "Thr", color: "#577590" },
      GCU: { name: "Ala", color: "#4D908E" },
      GCC: { name: "Ala", color: "#4D908E" },
      GCA: { name: "Ala", color: "#4D908E" },
      GCG: { name: "Ala", color: "#4D908E" },
      UAU: { name: "Tyr", color: "#F94144" },
      UAC: { name: "Tyr", color: "#F94144" },
      UAA: { name: "Stop", color: "#000000" },
      UAG: { name: "Stop", color: "#000000" },
      CAU: { name: "His", color: "#F3722C" },
      CAC: { name: "His", color: "#F3722C" },
      CAA: { name: "Gln", color: "#F8961E" },
      CAG: { name: "Gln", color: "#F8961E" },
      AAU: { name: "Asn", color: "#F9C74F" },
      AAC: { name: "Asn", color: "#F9C74F" },
      AAA: { name: "Lys", color: "#90BE6D" },
      AAG: { name: "Lys", color: "#90BE6D" },
      GAU: { name: "Asp", color: "#43AA8B" },
      GAC: { name: "Asp", color: "#43AA8B" },
      GAA: { name: "Glu", color: "#4D908E" },
      GAG: { name: "Glu", color: "#4D908E" },
      UGU: { name: "Cys", color: "#277DA1" },
      UGC: { name: "Cys", color: "#277DA1" },
      UGA: { name: "Stop", color: "#000000" },
      UGG: { name: "Trp", color: "#577590" },
      CGU: { name: "Arg", color: "#F94144" },
      CGC: { name: "Arg", color: "#F94144" },
      CGA: { name: "Arg", color: "#F94144" },
      CGG: { name: "Arg", color: "#F94144" },
      AGU: { name: "Ser", color: "#43AA8B" },
      AGC: { name: "Ser", color: "#43AA8B" },
      AGA: { name: "Arg", color: "#F94144" },
      AGG: { name: "Arg", color: "#F94144" },
      GGU: { name: "Gly", color: "#277DA1" },
      GGC: { name: "Gly", color: "#277DA1" },
      GGA: { name: "Gly", color: "#277DA1" },
      GGG: { name: "Gly", color: "#277DA1" },
    }

    // Draw the wheel
    const drawWheel = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, size, size)

      // Draw the center circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 0.2, 0, Math.PI * 2)
      ctx.fillStyle = "#f0f0f0"
      ctx.fill()
      ctx.stroke()

      // Draw the first base ring
      const firstRingRadius = radius * 0.4
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2 - Math.PI / 4
        const sectorAngle = Math.PI / 2

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, firstRingRadius, angle, angle + sectorAngle)
        ctx.closePath()

        ctx.fillStyle = ["#ffcccc", "#ccffcc", "#ccccff", "#ffffcc"][i]
        ctx.fill()
        ctx.stroke()

        // Add the base text
        const textX = centerX + Math.cos(angle + sectorAngle / 2) * (firstRingRadius * 0.7)
        const textY = centerY + Math.sin(angle + sectorAngle / 2) * (firstRingRadius * 0.7)

        ctx.font = "bold 16px Arial"
        ctx.fillStyle = "#000"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(bases[i], textX, textY)
      }

      // Draw the second base ring
      const secondRingRadius = radius * 0.7
      for (let i = 0; i < 4; i++) {
        const firstAngle = (i * Math.PI) / 2 - Math.PI / 4
        const firstSectorAngle = Math.PI / 2

        for (let j = 0; j < 4; j++) {
          const angle = firstAngle + (j * firstSectorAngle) / 4
          const sectorAngle = firstSectorAngle / 4

          ctx.beginPath()
          ctx.moveTo(centerX, centerY)
          ctx.arc(centerX, centerY, secondRingRadius, angle, angle + sectorAngle)
          ctx.lineTo(centerX, centerY)
          ctx.closePath()

          ctx.fillStyle = ["#ffdddd", "#ddffdd", "#ddddff", "#ffffdd"][j]
          ctx.fill()
          ctx.stroke()

          // Add the base text
          const textX = centerX + Math.cos(angle + sectorAngle / 2) * (secondRingRadius * 0.85)
          const textY = centerY + Math.sin(angle + sectorAngle / 2) * (secondRingRadius * 0.85)

          ctx.font = "bold 14px Arial"
          ctx.fillStyle = "#000"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(bases[j], textX, textY)
        }
      }

      // Draw the third base ring
      const thirdRingRadius = radius
      for (let i = 0; i < 4; i++) {
        const firstAngle = (i * Math.PI) / 2 - Math.PI / 4

        for (let j = 0; j < 4; j++) {
          const secondAngle = firstAngle + (j * Math.PI) / 8

          for (let k = 0; k < 4; k++) {
            const angle = secondAngle + (k * Math.PI) / 32
            const sectorAngle = Math.PI / 32

            const codon = bases[i] + bases[j] + bases[k]
            const aminoAcid = aminoAcids[codon] || { name: "?", color: "#ccc" }

            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.arc(centerX, centerY, thirdRingRadius, angle, angle + sectorAngle)
            ctx.lineTo(centerX, centerY)
            ctx.closePath()

            ctx.fillStyle = aminoAcid.color + "80" // Add transparency
            ctx.fill()
            ctx.stroke()

            // Add the amino acid text
            const textX = centerX + Math.cos(angle + sectorAngle / 2) * (thirdRingRadius * 0.85)
            const textY = centerY + Math.sin(angle + sectorAngle / 2) * (thirdRingRadius * 0.85)

            // Only show text for certain positions to avoid overcrowding
            if (k % 2 === 0) {
              ctx.font = "10px Arial"
              ctx.fillStyle = "#000"
              ctx.textAlign = "center"
              ctx.textBaseline = "middle"
              ctx.fillText(bases[k], textX, textY)
            }
          }
        }
      }

      // Add title
      ctx.font = "bold 16px Arial"
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("Codon Wheel", centerX, centerY)
    }

    drawWheel()

    // Optional: Add animation
    let rotation = 0
    const animate = () => {
      rotation += 0.005
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(rotation)
      ctx.translate(-centerX, -centerY)
      drawWheel()
      ctx.restore()
      requestAnimationFrame(animate)
    }

    // Uncomment to enable animation
    // animate();
  }, [])

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} className="border rounded-md" style={{ maxWidth: "100%", height: "auto" }} />
    </div>
  )
}
