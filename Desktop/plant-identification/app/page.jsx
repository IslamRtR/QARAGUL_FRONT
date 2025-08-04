"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Camera, History, User, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export default function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      icon: <Leaf className="w-16 h-16 text-green-500" />,
      title: "Өсімдіктерді танып біліңіз",
      description: "Кез келген өсімдіктің суретін түсіріп, оның туралы толық ақпарат алыңыз",
    },
    {
      icon: <Camera className="w-16 h-16 text-blue-500" />,
      title: "Жылдам сканерлеу",
      description: "AI технологиясы арқылы өсімдіктерді дәл анықтаңыз",
    },
    {
      icon: <History className="w-16 h-16 text-purple-500" />,
      title: "Тарихты сақтаңыз",
      description: "Барлық сканерленген өсімдіктердің тарихын қараңыз",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Leaf className="w-8 h-8 text-green-600" />
          <span className="text-2xl font-bold text-gray-800">PlantID</span>
        </div>
        <div className="flex gap-2">
          <Link href="/login">
            <Button variant="ghost" className="text-gray-600">
              Кіру
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-green-600 hover:bg-green-700">Тіркелу</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 bg-[url('https://s15-kling.klingai.com/kimg/EMXN1y8qTQoGdXBsb2FkEg55bGFiLXN0dW50LXNncBoza2xpbmcvZG93bmxvYWQvTWpnMU5qYzFNVEV4TlRBNE1ERTJNVEUyTVRNMU56QTFNdz09.origin?x-kcdn-pid=112372')]">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Өсімдіктер әлемін
              <span className="text-green-600 block">ашыңыз</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              AI технологиясы арқылы кез келген өсімдікті танып біліп, оның туралы толық ақпарат алыңыз
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/register">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                  Бастау <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/scan">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  <Camera className="mr-2 w-4 h-4" />
                  Сканерлеу
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side - Animated Cards */}
          <div className="relative">
            <Card className="w-full h-80 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 h-full flex flex-col items-center justify-center text-center">
                <div className="mb-6 animate-bounce">{slides[currentSlide].icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{slides[currentSlide].title}</h3>
                <p className="text-gray-600 leading-relaxed">{slides[currentSlide].description}</p>
              </CardContent>
            </Card>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? "bg-green-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Неге PlantID таңдау керек?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <Sparkles className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">AI Технологиясы</h3>
                <p className="text-gray-600">Жоғары дәлдікпен өсімдіктерді анықтау</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <History className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Тарих сақтау</h3>
                <p className="text-gray-600">Барлық сканерлеулердің тарихы</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <User className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Жеке профиль</h3>
                <p className="text-gray-600">Өз ақпараттарыңызды басқарыңыз</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-800 text-white text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Leaf className="w-6 h-6 text-green-400" />
          <span className="text-xl font-bold">PlantID</span>
        </div>
        <p className="text-gray-400">© 2024 PlantID. Барлық құқықтар қорғалған.</p>
      </footer>
    </div>
  )
}
