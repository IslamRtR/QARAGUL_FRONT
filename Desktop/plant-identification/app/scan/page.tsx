"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Camera,
  Upload,
  Loader2,
  ArrowLeft,
  Leaf,
  Sun,
  Droplets,
  TrendingUp,
  MapPin,
  BookOpen,
  Smartphone,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import PhoneCamera from "@/components/phone-camera"

interface PlantInfo {
  commonName: string
  scientificName: string
  description: string
  origin: string
  sunlight: string
  water: string
  growthRate: string
}

export default function ScanPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null)
  const [error, setError] = useState("")
  const [user, setUser] = useState<any>(null)
  const [showCamera, setShowCamera] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem("isAuthenticated")
    const userData = localStorage.getItem("user")

    if (!isAuth || !userData) {
      router.push("/login")
      return
    }

    setUser(JSON.parse(userData))

    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth <= 768 ||
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      )
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [router])

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleCameraCapture = (file: File) => {
    processFile(file)
    setShowCamera(false)
  }

  const processFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setError("Файл өлшемі 5MB-тан аспауы керек")
      return
    }

    if (!file.type.startsWith("image/")) {
      setError("Тек сурет файлдары ғана қабылданады")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string)
      setSelectedFile(file)
      setError("")
      setPlantInfo(null)
    }
    reader.readAsDataURL(file)
  }

  const handleScan = async () => {
    if (!selectedFile) return

    setIsScanning(true)
    setError("")

    try {
      // Simulate API call to your backend
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock response - replace with actual API call
      const mockPlantInfo: PlantInfo = {
        commonName: "Раушан гүлі",
        scientificName: "Rosa rubiginosa",
        description:
          "Раушан гүлі - бұл әдемі хош иісті гүл. Ол көптеген түрлі түстерде болады және бақша мен үй безендіруде кеңінен қолданылады. Раушан гүлі махаббат пен сұлулықтың символы болып табылады.",
        origin: "Орта Азия мен Еуропа",
        sunlight: "Толық күн сәулесі (6-8 сағат)",
        water: "Орташа, топырақ кепкенде суару",
        growthRate: "Орташа өсу қарқыны",
      }

      setPlantInfo(mockPlantInfo)

      // Save to history (in real app, save to backend)
      const history = JSON.parse(localStorage.getItem("scanHistory") || "[]")
      history.unshift({
        id: Date.now(),
        image: selectedImage,
        plantInfo: mockPlantInfo,
        date: new Date().toISOString(),
        accuracy: Math.floor(Math.random() * 10) + 90, // Random accuracy 90-99%
      })
      localStorage.setItem("scanHistory", JSON.stringify(history.slice(0, 50))) // Keep last 50
    } catch (error) {
      setError("Өсімдікті анықтау кезінде қате орын алды. Қайталап көріңіз.")
    } finally {
      setIsScanning(false)
    }
  }

  const handleNewScan = () => {
    setSelectedImage(null)
    setSelectedFile(null)
    setPlantInfo(null)
    setError("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      processFile(file)
    }
  }

  if (showCamera) {
    return <PhoneCamera onCapture={handleCameraCapture} onClose={() => setShowCamera(false)} />
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-green-600 hover:text-green-700">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="flex items-center gap-2">
                <Leaf className="w-6 h-6 text-green-600" />
                <span className="text-xl font-bold text-gray-800">Өсімдік сканері</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!plantInfo ? (
          <div className="space-y-6">
            {/* Upload Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Өсімдік суретін жүктеңіз</CardTitle>
                <CardDescription>Өсімдіктің анық суретін таңдаңыз, түсіріңіз немесе жүктеңіз</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-600">{error}</AlertDescription>
                  </Alert>
                )}

                {selectedImage ? (
                  <div className="space-y-4">
                    <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={selectedImage || "/placeholder.svg"}
                        alt="Selected plant"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex gap-4 justify-center flex-wrap">
                      <Button onClick={handleScan} disabled={isScanning} className="bg-green-600 hover:bg-green-700">
                        {isScanning ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Анықталуда...
                          </>
                        ) : (
                          <>
                            <Camera className="mr-2 h-4 w-4" />
                            Өсімдікті анықтау
                          </>
                        )}
                      </Button>
                      <Button variant="outline" onClick={handleNewScan}>
                        Басқа сурет таңдау
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Телефон камерасы батырмасы */}
                    <div className="mb-6">
                      <Button
                        onClick={() => setShowCamera(true)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold"
                        size="lg"
                      >
                        <Camera className="mr-3 h-6 w-6" />📱 Телефон камерасынан түсіру
                      </Button>
                      <p className="text-center text-sm text-gray-500 mt-2">Тікелей камерадан жылдам фото түсіру</p>
                    </div>
                    {/* Camera and Upload Options */}
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Camera Option */}
                      <Card
                        className="cursor-pointer hover:shadow-md transition-shadow border-2 border-dashed border-green-300 hover:border-green-400"
                        onClick={() => setShowCamera(true)}
                      >
                        <CardContent className="p-6 text-center">
                          <Camera className="w-12 h-12 text-green-600 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">Камерадан түсіру</h3>
                          <p className="text-gray-600 text-sm">
                            {isMobile ? "Телефон камерасынан" : "Веб-камерадан"} тікелей фото түсіріңіз
                          </p>
                          {isMobile && (
                            <div className="mt-2 flex items-center justify-center gap-1 text-green-600">
                              <Smartphone className="w-4 h-4" />
                              <span className="text-xs">Мобильді үшін ыңғайлы</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* File Upload Option */}
                      <Card
                        className="cursor-pointer hover:shadow-md transition-shadow border-2 border-dashed border-blue-300 hover:border-blue-400"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <CardContent className="p-6 text-center">
                          <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">Файл жүктеу</h3>
                          <p className="text-gray-600 text-sm">Галереядан немесе компьютерден сурет таңдаңыз</p>
                          <p className="text-xs text-gray-400 mt-2">PNG, JPG, JPEG (макс. 5MB)</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Drag & Drop Area */}
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-600 mb-2">Суретті осы жерге тартып апарыңыз</p>
                      <p className="text-gray-500">немесе жоғарыдағы опцияларды пайдаланыңыз</p>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Жақсы нәтиже алу үшін кеңестер</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Camera className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Анық сурет</h4>
                      <p className="text-sm text-gray-600">Өсімдік анық көрінетін сурет түсіріңіз</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sun className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Жақсы жарық</h4>
                      <p className="text-sm text-gray-600">Табиғи жарықта сурет түсіру дұрысырақ</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Жапырақтар көрінсін</h4>
                      <p className="text-sm text-gray-600">Жапырақтар мен гүлдер анық көрінуі керек</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Камера режимі</h4>
                      <p className="text-sm text-gray-600">Тікелей камерадан түсіру жылдамырақ</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Results Section */
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-green-600">Өсімдік анықталды!</CardTitle>
                <CardDescription>AI арқылы анықталған ақпарат</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative h-64 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={selectedImage! || "/placeholder.svg"}
                      alt="Scanned plant"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{plantInfo.commonName}</h3>
                      <p className="text-lg text-gray-600 italic">{plantInfo.scientificName}</p>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{plantInfo.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Plant Care Information */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-800">Шығу тегі</h4>
                  </div>
                  <p className="text-gray-600">{plantInfo.origin}</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Sun className="w-5 h-5 text-yellow-600" />
                    <h4 className="font-semibold text-gray-800">Жарық</h4>
                  </div>
                  <p className="text-gray-600">{plantInfo.sunlight}</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Droplets className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-800">Суару</h4>
                  </div>
                  <p className="text-gray-600">{plantInfo.water}</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <h4 className="font-semibold text-gray-800">Өсу қарқыны</h4>
                  </div>
                  <p className="text-gray-600">{plantInfo.growthRate}</p>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleNewScan} className="bg-green-600 hover:bg-green-700">
                <Camera className="mr-2 h-4 w-4" />
                Жаңа сканерлеу
              </Button>
              <Link href="/history">
                <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Тарихты қарау
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
