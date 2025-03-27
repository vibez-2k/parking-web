'use client'

import { useState } from 'react'
import AspectRatioGallery from '@/components/custom/AspectRatioGallery'
import ImageCropper from '@/components/custom/ImageCropper'
import { AspectRatio } from '@/components/custom/types'

export default function Home() {
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio | null>(null)

  const handleRatioSelect = (ratio: AspectRatio) => {
    setSelectedRatio(ratio)
  }

  return (
    <main className="min-h-screen p-4 bg-background text-foreground">
      {!selectedRatio ? (
        <AspectRatioGallery onSelect={handleRatioSelect} />
      ) : (
        <ImageCropper
          aspectRatio={selectedRatio}
          onBack={() => setSelectedRatio(null)}
        />
      )}
    </main>
  )
}

