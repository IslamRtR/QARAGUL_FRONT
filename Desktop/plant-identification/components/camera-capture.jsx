"use client"

import React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, X, RotateCcw, Check } from "lucide-react"

interface CameraCaptureProps {
  onCapture: (file: File) => void
  onClose: () => void
}

export default function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment")

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Камераны іске қосу
  const startCamera = useCallback(async () => {
    try {
      setIsLoading(true)
      setError("")

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      console.error("Камера қатесі:", err)
      setError("Камераға қол жеткізу мүмкін емес. Рұқсат берілгенін тексеріңіз.")
    } finally {
      setIsLoading(false)
    }
  }, [facingMode])

  // Камераны тоқтату
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
  }, [stream])

  // Фото түсіру
  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (!context) return

    // Canvas өлшемін видео өлшеміне сәйкестендіру
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Видеодан кадр алу
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Canvas-тан blob алу
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const imageUrl = URL.createObjectURL(blob)
          setCapturedImage(imageUrl)
          stopCamera()
        }
      },
      "image/jpeg",
      0.8,
    )
  }, [stopCamera])

  // Фотоны растау
  const confirmPhoto = useCallback(() => {
    if (!canvasRef.current) return

    canvasRef.current.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `plant-photo-${Date.now()}.jpg`, {
            type: "image/jpeg",
          })
          onCapture(file)
          onClose()
        }
      },
      "image/jpeg",
      0.8,
    )
  }, [onCapture, onClose])

  // Қайта түсіру
  const retakePhoto = useCallback(() => {
    setCapturedImage(null)
    startCamera()
  }, [startCamera])

  // Камераны ауыстыру (алдыңғы/артқы)
  const switchCamera = useCallback(() => {
    stopCamera()
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"))
  }, [stopCamera])

  // Компонент жүктелгенде камераны іске қосу
  React.useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [startCamera, stopCamera])

  // Камера ауысқанда қайта іске қосу
  React.useEffect(() => {
    if (stream) {
      stopCamera()
      startCamera()
    }
  }, [facingMode])

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/50 text-white">
        <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
          <X className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-semibold">Фото түсіру</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={switchCamera}
          className="text-white hover:bg-white/20"
          disabled={isLoading || !!capturedImage}
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative overflow-hidden">
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <Card className="m-4">
              <CardContent className="p-6 text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={startCamera} disabled={isLoading}>
                  Қайталап көру
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Камера іске қосылуда...</p>
            </div>
          </div>
        )}

        {capturedImage ? (
          <img src={capturedImage || "/placeholder.svg"} alt="Captured" className="w-full h-full object-cover" />
        ) : (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        )}

        {/* Overlay Grid */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full border-2 border-white/30 relative">
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border border-white/20"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Capture Hint */}
        {!capturedImage && !isLoading && !error && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="text-white text-center bg-black/50 px-4 py-2 rounded-lg">
              <Camera className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Өсімдікті кадрға алып, фото түсіріңіз</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-6 bg-black/50">
        {capturedImage ? (
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={retakePhoto}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              Қайта түсіру
            </Button>
            <Button onClick={confirmPhoto} className="bg-green-600 hover:bg-green-700 text-white">
              <Check className="w-4 h-4 mr-2" />
              Пайдалану
            </Button>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button
              onClick={capturePhoto}
              disabled={isLoading || !!error}
              size="lg"
              className="w-16 h-16 rounded-full bg-white hover:bg-gray-100 text-black p-0"
            >
              <div className="w-12 h-12 rounded-full border-2 border-black"></div>
            </Button>
          </div>
        )}
      </div>

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
