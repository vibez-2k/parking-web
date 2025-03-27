"use client"

import Image from "next/image"
import { useState } from "react"
import { Heart, ShoppingCart, Expand } from "lucide-react"

interface ProductCardProps {
  name: string
  price: number
  image: string
  colors: string[]
  sizes: string[]
}

export default function ProductCard({ name, price, image, colors, sizes }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedSize, setSelectedSize] = useState(sizes[0])
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <div
      className="relative w-64 bg-white overflow-hidden font-figtree"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 ease-in-out"
          style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
        />
        <div
          className={`absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 p-4 bg-white transition-transform duration-300 ease-in-out"
        style={{ transform: isHovered ? "translateY(0)" : "translateY(70%)" }}
      >
        <h2 className="text-lg font-medium text-gray-800 mb-2 truncate">{name}</h2>
        <p className="text-lg font-semibold text-gray-900 mb-4">${price.toFixed(2)}</p>
        <div className={`space-y-4 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-6 h-6 rounded-full transition-transform duration-300 ${
                    selectedColor === color ? "ring-2 ring-gray-400 scale-110" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
            <button
              className={`text-gray-600 hover:text-red-500 transition-colors duration-300 ${
                isWishlisted ? "text-red-500" : ""
              }`}
              onClick={() => setIsWishlisted(!isWishlisted)}
              aria-label="Add to wishlist"
            >
              <Heart className="w-6 h-6" fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm transition-colors duration-300 ${
                    selectedSize === size ? "bg-gray-900 text-white" : "bg-white text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
              aria-label="Quick view"
            >
              <Expand className="w-6 h-6" />
            </button>
          </div>
          <button className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  )
}

