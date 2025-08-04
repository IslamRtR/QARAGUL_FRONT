"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, History, User, Leaf, Scan, TrendingUp, Clock, Star } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    totalScans: 24,
    thisWeek: 7,
    accuracy: 95,
  })
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
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    router.push("/")
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
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">PlantID</span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-green-600 font-medium">
                Басты бет
              </Link>
              <Link href="/scan" className="text-gray-600 hover:text-green-600">
                Сканерлеу
              </Link>
              <Link href="/history" className="text-gray-600 hover:text-green-600">
                Тарих
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-green-600">
                Профиль
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <span className="text-gray-600">Сәлем, {user.fullName}!</span>
              <Button variant="outline" onClick={handleLogout}>
                Шығу
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Қош келдіңіз, {user.fullName}!</h1>
          <p className="text-gray-600">Өсімдіктер әлемін зерттеуді жалғастырыңыз</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Жалпы сканерлеу</p>
                  <p className="text-3xl font-bold">{stats.totalScans}</p>
                </div>
                <Scan className="w-12 h-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Осы аптада</p>
                  <p className="text-3xl font-bold">{stats.thisWeek}</p>
                </div>
                <Clock className="w-12 h-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Дәлдік</p>
                  <p className="text-3xl font-bold">{stats.accuracy}%</p>
                </div>
                <Star className="w-12 h-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-md">
            <Link href="/scan">
              <CardContent className="p-6 text-center">
                <Camera className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Жаңа сканерлеу</h3>
                <p className="text-gray-600">Өсімдіктің суретін түсіріп анықтаңыз</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-md">
            <Link href="/history">
              <CardContent className="p-6 text-center">
                <History className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Тарих қарау</h3>
                <p className="text-gray-600">Бұрын сканерленген өсімдіктер</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-md">
            <Link href="/profile">
              <CardContent className="p-6 text-center">
                <User className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Профиль</h3>
                <p className="text-gray-600">Жеке ақпараттарды басқару</p>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Соңғы белсенділік
            </CardTitle>
            <CardDescription>Жақында сканерленген өсімдіктер</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Раушан гүлі", time: "2 сағат бұрын", accuracy: "98%" },
                { name: "Алма ағашы", time: "1 күн бұрын", accuracy: "95%" },
                { name: "Қызғалдақ", time: "2 күн бұрын", accuracy: "92%" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">{item.accuracy}</p>
                    <p className="text-xs text-gray-500">дәлдік</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/history">
                <Button variant="outline" className="w-full bg-transparent">
                  Барлық тарихты қарау
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 gap-1">
          <Link href="/dashboard" className="flex flex-col items-center py-3 text-green-600">
            <Leaf className="w-5 h-5" />
            <span className="text-xs mt-1">Басты</span>
          </Link>
          <Link href="/scan" className="flex flex-col items-center py-3 text-gray-600">
            <Camera className="w-5 h-5" />
            <span className="text-xs mt-1">Сканер</span>
          </Link>
          <Link href="/history" className="flex flex-col items-center py-3 text-gray-600">
            <History className="w-5 h-5" />
            <span className="text-xs mt-1">Тарих</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center py-3 text-gray-600">
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Профиль</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
