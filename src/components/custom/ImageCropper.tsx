"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import type { AspectRatio } from "./types"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Maximize } from "lucide-react"

interface ImageCropperProps {
  aspectRatio: AspectRatio
  onBack: () => void
}

export default function ImageCropper({ aspectRatio, onBack }: ImageCropperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null)
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(0.33) // Display image at 1/3 of its original size
  const [isHoveringImage, setIsHoveringImage] = useState(false)

  const handleCrop = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !originalImage) return

    const cropWidth = Math.min(canvas.width * 0.8, canvas.height * 0.8 * (aspectRatio.width / aspectRatio.height))
    const cropHeight = cropWidth * (aspectRatio.height / aspectRatio.width)
    const cropX = (canvas.width - cropWidth) / 2
    const cropY = (canvas.height - cropHeight) / 2

    // Calculate the crop area in terms of the original image dimensions
    const originalCropX = (cropX - imagePosition.x) / scale
    const originalCropY = (cropY - imagePosition.y) / scale
    const originalCropWidth = cropWidth / scale
    const originalCropHeight = cropHeight / scale

    const cropCanvas = document.createElement("canvas")
    cropCanvas.width = originalCropWidth
    cropCanvas.height = originalCropHeight
    const cropCtx = cropCanvas.getContext("2d")

    if (cropCtx) {
      cropCtx.drawImage(
        originalImage,
        originalCropX,
        originalCropY,
        originalCropWidth,
        originalCropHeight,
        0,
        0,
        originalCropWidth,
        originalCropHeight,
      )

      const link = document.createElement("a")
      link.download = "cropped-image.png"
      link.href = cropCanvas.toDataURL("image/png")
      link.click()
    }
  }, [originalImage, imagePosition, scale, aspectRatio])

  const handleCenterImage = useCallback(() => {
    if (!image || !canvasRef.current) return

    const canvas = canvasRef.current
    const cropWidth = Math.min(canvas.width * 0.8, canvas.height * 0.8 * (aspectRatio.width / aspectRatio.height))
    const cropHeight = cropWidth * (aspectRatio.height / aspectRatio.width)
    const cropX = (canvas.width - cropWidth) / 2
    const cropY = (canvas.height - cropHeight) / 2

    const scaledWidth = image.width * scale
    const scaledHeight = image.height * scale

    const newX = cropX + (cropWidth - scaledWidth) / 2
    const newY = cropY + (cropHeight - scaledHeight) / 2

    setImagePosition({ x: newX, y: newY })
  }, [image, scale, aspectRatio])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawCanvas()
    }
  }, [image, imagePosition, scale]) // Removed unnecessary dependency: isHoveringImage

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "d" && image) {
        e.preventDefault()
        handleCrop()
      } else if (e.key === "c" && image) {
        e.preventDefault()
        handleCenterImage()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [image, handleCrop, handleCenterImage])

  const drawCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (image) {
      // Draw the scaled down image
      const scaledWidth = image.width * scale
      const scaledHeight = image.height * scale
      ctx.drawImage(image, imagePosition.x, imagePosition.y, scaledWidth, scaledHeight)
    }

    // Draw the crop frame
    const cropWidth = Math.min(canvas.width * 0.8, canvas.height * 0.8 * (aspectRatio.width / aspectRatio.height))
    const cropHeight = cropWidth * (aspectRatio.height / aspectRatio.width)
    const cropX = (canvas.width - cropWidth) / 2
    const cropY = (canvas.height - cropHeight) / 2

    ctx.strokeStyle = "rgba(200, 200, 200, 0.8)" // More visible gray
    ctx.lineWidth = 2
    ctx.setLineDash([10, 10])
    ctx.strokeRect(cropX, cropY, cropWidth, cropHeight)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          setImage(img)
          setOriginalImage(img)
          const scaledWidth = img.width * scale
          const scaledHeight = img.height * scale
          setImagePosition({
            x: e.clientX - scaledWidth / 2,
            y: e.clientY - scaledHeight / 2,
          })
        }
        img.src = event.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (image && isHoveringImage) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }

    if (image) {
      const scaledWidth = image.width * scale
      const scaledHeight = image.height * scale
      const isOverImage =
        e.clientX >= imagePosition.x &&
        e.clientX <= imagePosition.x + scaledWidth &&
        e.clientY >= imagePosition.y &&
        e.clientY <= imagePosition.y + scaledHeight
      setIsHoveringImage(isOverImage)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center">
        <h2 className="text-lg font-semibold">{aspectRatio.label}</h2>
        <p className="text-sm text-muted-foreground">
          Ratio: {aspectRatio.width}:{aspectRatio.height} • {aspectRatio.recommendedResolution}
        </p>
      </div>
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${isHoveringImage ? (isDragging ? "cursor-grabbing" : "cursor-grab") : ""}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      <div className="absolute top-4 left-4">
        <Button variant="ghost" onClick={onBack} className="text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        <Button variant="ghost" onClick={handleCenterImage} disabled={!image} className="text-foreground">
          <Maximize className="mr-2 h-4 w-4" /> Center Image (c)
        </Button>
        <Button variant="ghost" onClick={handleCrop} disabled={!image} className="text-foreground">
          <Download className="mr-2 h-4 w-4" /> Crop (d)
        </Button>
      </div>
    </div>
  )
}

