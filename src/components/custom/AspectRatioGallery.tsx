import { aspectRatios, AspectRatio } from './types'

interface AspectRatioGalleryProps {
  onSelect: (ratio: AspectRatio) => void
}

export default function AspectRatioGallery({ onSelect }: AspectRatioGalleryProps) {
  return (
    <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
      {aspectRatios.map((ratio) => (
        <div
          key={ratio.id}
          className="relative cursor-pointer break-inside-avoid mb-4"
          onClick={() => onSelect(ratio)}
        >
          <div
            className="w-full bg-[#f5f5f5] border border-border overflow-hidden p-4"
            style={{ paddingBottom: `${(ratio.height / ratio.width) * 100}%` }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-sm font-medium text-foreground p-2">
              <span>{ratio.label}</span>
              <span className="text-xs text-muted-foreground mt-1">{ratio.recommendedResolution}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

