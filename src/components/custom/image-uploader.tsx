"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/custom/use-toast"
import { Upload, X, ImageIcon } from "lucide-react"

interface ImageUploaderProps {
  value: string | string[]
  onChange: (value: string | string[]) => void
  maxSize?: number // in MB
  maxFiles?: number
  multiple?: boolean
  acceptedTypes?: string[]
  aspectRatio?: string
}

export function ImageUploader({
  value,
  onChange,
  maxSize = 5,
  maxFiles = 1,
  multiple = false,
  acceptedTypes = ["image/jpeg", "image/png", "image/webp"],
  aspectRatio,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)

  // Convert value to array for consistent handling
  const images = Array.isArray(value) ? value : value ? [value] : []

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    handleFiles(files)

    // Reset the input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (files: FileList) => {
    // Check if adding these files would exceed the max files limit
    if (multiple && images.length + files.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `You can only upload a maximum of ${maxFiles} files.`,
        variant: "destructive",
      })
      return
    }

    // Process each file
    Array.from(files).forEach((file) => {
      // Check file type
      if (!acceptedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `File "${file.name}" is not a supported image type.`,
          variant: "destructive",
        })
        return
      }

      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `File "${file.name}" exceeds the maximum size of ${maxSize}MB.`,
          variant: "destructive",
        })
        return
      }

      // Create a URL for the file
      const fileUrl = URL.createObjectURL(file)

      // Update the value
      if (multiple) {
        onChange([...images, fileUrl])
      } else {
        onChange(fileUrl)
      }
    })
  }

  const removeImage = (index: number) => {
    if (multiple) {
      const newImages = [...images]
      newImages.splice(index, 1)
      onChange(newImages)
    } else {
      onChange("")
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center ${
          dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/30"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <Input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(",")}
          multiple={multiple}
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex flex-col items-center justify-center py-4">
          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm font-medium mb-1">Drag & drop {multiple ? "images" : "an image"} here</p>
          <p className="text-xs text-muted-foreground mb-3">
            {acceptedTypes.map((type) => type.replace("image/", "")).join(", ")} files up to {maxSize}MB
            {aspectRatio && ` (${aspectRatio} aspect ratio recommended)`}
          </p>
          <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
            Select File{multiple && "s"}
          </Button>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-video bg-muted rounded-md overflow-hidden">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Uploaded image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          {multiple && images.length < maxFiles && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-video flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-md hover:border-primary/50 hover:bg-primary/5 transition-colors"
            >
              <div className="flex flex-col items-center">
                <ImageIcon className="h-6 w-6 text-muted-foreground mb-1" />
                <span className="text-xs text-muted-foreground">Add Image</span>
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

