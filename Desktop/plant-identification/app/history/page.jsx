"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Calendar, Leaf, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface HistoryItem {
  id: number
  image: string
  plantInfo: {
    commonName: string
    scientificName: string
    description: string
  }
  date: string
  accuracy: number
}

export default function HistoryPage() {
  const [user, setUser] = useState<any>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [filteredHistory, setFilteredHistory] = useState<HistoryItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null)
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

    // Load history from localStorage
    const savedHistory = localStorage.getItem("scanHistory")
    if (savedHistory) {
      const historyData = JSON.parse(savedHistory)
      setHistory(historyData)
      setFilteredHistory(historyData)
    } else {
      // Mock data for demo
      const mockHistory: HistoryItem[] = [
        {
          id: 1,
          image: "/placeholder.svg?height=200&width=200",
          plantInfo: {
            commonName: "Раушан гүлі",
            scientificName: "Rosa rubiginosa",
            description: "Әдемі хош иісті гүл, махаббат пен сұлулықтың символы",
          },
          date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          accuracy: 98,
        },
        {
          id: 2,
          image: "/placeholder.svg?height=200&width=200",
          plantInfo: {
            commonName: "Алма ағашы",
            scientificName: "Malus domestica",
            description: "Дәмді жемістер беретін ағаш",
          },
          date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          accuracy: 95,
        },
        {
          id: 3,
          image: "/placeholder.svg?height=200&width=200",
          plantInfo: {
            commonName: "Қызғалдақ",
            scientificName: "Tulipa gesneriana",
            description: "Көктемгі әдемі гүл",
          },
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          accuracy: 92,
        },
        {
          id: 4,
          image: "/placeholder.svg?height=200&width=200",
          plantInfo: {
            commonName: "Күнбағыс",
            scientificName: "Helianthus annuus",
            description: "Үлкен сары гүлі бар биік өсімдік",
          },
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          accuracy: 97,
        },
        {
          id: 5,
          image: "/placeholder.svg?height=200&width=200",
          plantInfo: {
            commonName: "Лаванда",
            scientificName: "Lavandula angustifolia",
            description: "Хош иісті көк гүлдері бар дәрілік өсімдік",
          },
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          accuracy: 94,
        },
      ]
      setHistory(mockHistory)
      setFilteredHistory(mockHistory)
      localStorage.setItem("scanHistory", JSON.stringify(mockHistory))
    }
  }, [router])

  useEffect(() => {
    const filtered = history.filter(
      (item) =>
        item.plantInfo.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.plantInfo.scientificName.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredHistory(filtered)
  }, [searchTerm, history])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Жаңа ғана"
    if (diffInHours < 24) return `${diffInHours} сағат бұрын`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return "Кеше"
    if (diffInDays < 7) return `${diffInDays} күн бұрын`

    return date.toLocaleDateString("kk-KZ")
  }

  const deleteItem = (id: number) => {
    if (confirm("Бұл сканерлеуді өшіруді қалайсыз ба?")) {
      const updatedHistory = history.filter((item) => item.id !== id)
      setHistory(updatedHistory)
      setFilteredHistory(
        updatedHistory.filter(
          (item) =>
            item.plantInfo.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.plantInfo.scientificName.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
      localStorage.setItem("scanHistory", JSON.stringify(updatedHistory))
      setSelectedItem(null)
    }
  }

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 95) return "bg-green-100 text-green-800"
    if (accuracy >= 90) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-green-600 hover:text-green-700">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-green-600" />
                <span className="text-xl font-bold text-gray-800">Сканерлеу тарихы</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Stats */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Сканерлеу тарихы</h1>
              <p className="text-gray-600">Барлық сканерленген өсімдіктер: {history.length}</p>
            </div>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Өсімдік атын іздеу..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Leaf className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {searchTerm ? "Ештеңе табылмады" : "Тарих бос"}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm ? "Іздеу сөзіңізді өзгертіп көріңіз" : "Алғашқы өсімдікті сканерлеп, тарих жасаңыз"}
              </p>
              <Link href="/scan">
                <Button className="bg-green-600 hover:bg-green-700">Жаңа сканерлеу</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredHistory.map((item) => (
              <Card key={item.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-6 items-center">
                    <div className="relative h-32 w-full rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.plantInfo.commonName}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-xl font-semibold text-gray-800">{item.plantInfo.commonName}</h3>
                        <Badge className={getAccuracyColor(item.accuracy)}>{item.accuracy}% дәлдік</Badge>
                      </div>
                      <p className="text-gray-600 italic">{item.plantInfo.scientificName}</p>
                      <p className="text-gray-700 line-clamp-2">{item.plantInfo.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {formatDate(item.date)}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedItem(item)} className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        Қарау
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteItem(item.id)}
                        className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Өшіру
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Detailed View Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{selectedItem.plantInfo.commonName}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedItem(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </Button>
                </div>
                <CardDescription className="italic">{selectedItem.plantInfo.scientificName}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative h-64 w-full rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={selectedItem.image || "/placeholder.svg"}
                    alt={selectedItem.plantInfo.commonName}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={getAccuracyColor(selectedItem.accuracy)}>{selectedItem.accuracy}% дәлдік</Badge>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedItem.date)}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Сипаттама</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedItem.plantInfo.description}</p>
                </div>

                <div className="flex gap-4">
                  <Button onClick={() => setSelectedItem(null)} variant="outline" className="flex-1">
                    Жабу
                  </Button>
                  <Button onClick={() => deleteItem(selectedItem.id)} className="flex-1 bg-red-600 hover:bg-red-700">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Өшіру
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
