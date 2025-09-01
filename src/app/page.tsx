'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Calendar, MapPin, Heart, Star, Music, Play, Pause, Volume2, VolumeX } from 'lucide-react'

export default function GaneshChaturthiPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [blessingReceived, setBlessingReceived] = useState(false)
  const [blessingAnimation, setBlessingAnimation] = useState(false)
  const [floatingBlessings, setFloatingBlessings] = useState<Array<{id: number, x: number, y: number, text: string}>>([])
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedStep, setSelectedStep] = useState<number | null>(null)
  const [currentSong, setCurrentSong] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const festivalInfo = {
    overview: {
      title: "Ganesh Chaturthi",
      subtitle: "The Festival of Lord Ganesha",
      description: "Ganesh Chaturthi, also known as Vinayaka Chaturthi, is a Hindu festival celebrating the birth of Lord Ganesha, the elephant-headed god of wisdom and prosperity.",
      duration: "10 days",
      month: "August-September",
      significance: "Removes obstacles, brings good fortune"
    },
    history: {
      title: "Historical Significance",
      description: "The festival was started by Maratha ruler Shivaji Maharaj to promote culture and nationalism. Later, Lokmanya Tilak transformed it into a large public event to unite people against British rule.",
      origin: "Ancient India",
      popularization: "17th century by Shivaji Maharaj",
      transformation: "1893 by Lokmanya Tilak"
    },
    rituals: {
      title: "Sacred Rituals",
      description: "The festival involves elaborate rituals including installation of clay idols, prayers, offerings, and finally immersion in water bodies.",
      keyRituals: [
        "Pranapratishtha - Infusing life into the idol",
        "Shhodashopachara - 16 forms of paying tribute",
        "Uttarpuja - Farewell ceremony",
        "Ganpati Visarjan - Immersion ceremony"
      ],
      timeline: [
        {
          day: "Day 1",
          title: "Ganesh Sthapana",
          description: "Installation of Lord Ganesha idol with sacred mantras",
          activities: ["Clay idol preparation", "Sacred space decoration", "Pranapratishtha ritual"],
          color: "from-orange-400 to-red-400"
        },
        {
          day: "Day 2-3",
          title: "Daily Worship",
          description: "Regular prayers and offerings to the deity",
          activities: ["Morning and evening aarti", "Offering modak and sweets", "Chanting of mantras"],
          color: "from-yellow-400 to-orange-400"
        },
        {
          day: "Day 4-6",
          title: "Special Pujas",
          description: "Elaborate ceremonies and community celebrations",
          activities: ["Shhodashopachara (16-step worship)", "Cultural programs", "Community feasts"],
          color: "from-red-400 to-pink-400"
        },
        {
          day: "Day 7-9",
          title: "Grand Celebrations",
          description: "Peak festivities with elaborate decorations",
          activities: ["Flower decorations", "Musical performances", "Public processions"],
          color: "from-purple-400 to-indigo-400"
        },
        {
          day: "Day 10",
          title: "Visarjan",
          description: "Immersion ceremony with grand farewells",
          activities: ["Uttarpuja (farewell ritual)", "Procession to water body", "Immersion with mantras"],
          color: "from-blue-400 to-cyan-400"
        }
      ],
      stepByStepGuide: [
        {
          step: 1,
          title: "Prepare the Sacred Space",
          description: "Clean and decorate the area where Ganesha will be placed",
          materials: ["Clean cloth", "Flowers", "Rangoli colors", "Incense sticks"],
          instructions: [
            "Clean the area thoroughly",
            "Spread a clean cloth",
            "Create a beautiful rangoli design",
            "Place fresh flowers around the space"
          ]
        },
        {
          step: 2,
          title: "Install the Idol",
          description: "Place the Ganesha idol in the prepared sacred space",
          materials: ["Clay Ganesha idol", "Rice grains", "Turmeric powder", "Kumkum"],
          instructions: [
            "Spread rice grains on the cloth",
            "Place the idol gently on the rice",
            "Apply kumkum on the idol's forehead",
            "Place turmeric powder around the base"
          ]
        },
        {
          step: 3,
          title: "Pranapratishtha",
          description: "Infuse life into the idol through sacred mantras",
          materials: ["Sacred water", "Flowers", "Betel leaves", "Durva grass"],
          instructions: [
            "Chant 'Om Gan Ganapataye Namah'",
            "Sprinkle sacred water on the idol",
            "Offer flowers and durva grass",
            "Place betel leaves as offering"
          ]
        },
        {
          step: 4,
          title: "Shhodashopachara",
          description: "Perform the 16-step worship ritual",
          materials: ["16 different items", "Lamp (diya)", "Incense", "Sweets (modak)"],
          instructions: [
            "Offer water for washing feet",
            "Present water for drinking",
            "Offer clothes and ornaments",
            "Perform aarti with lamp"
          ]
        },
        {
          step: 5,
          title: "Daily Prayers",
          description: "Maintain daily worship throughout the festival",
          materials: ["Flowers", "Incense", "Sweets", "Fruits"],
          instructions: [
            "Perform morning and evening aarti",
            "Offer fresh flowers daily",
            "Present modak as prasad",
            "Chant Ganesha mantras"
          ]
        }
      ]
    },
    celebrations: {
      title: "Celebrations Across India",
      description: "From grand public pandals to intimate home celebrations, Ganesh Chaturthi is celebrated with immense enthusiasm across India.",
      regions: [
        "Maharashtra - Elaborate pandals and processions",
        "Andhra Pradesh - Clay idols and cultural programs",
        "Tamil Nadu - Pillaiyar Chaturthi with kolam decorations",
        "Goa - Unique traditions and coconut offerings"
      ]
    },
    bhajans: {
      title: "Divine Bhajans",
      description: "Immerse yourself in the devotional songs of Lord Ganesha, featuring traditional and modern compositions that celebrate the remover of obstacles.",
      songs: [
        {
          id: 1,
          title: "Ganpati Bappa Moraya",
          artist: "Traditional",
          duration: "4:32",
          category: "traditional",
          language: "Marathi",
          description: "The most popular Ganesh aarti sung during the festival",
          lyrics: "Ganpati Bappa Morya\nMangalmurti Morya\nSukhkarta Dukhharta\nVarta Vighnachi\nSuryavanshi Gauravputra\nVinayak Bappa Morya",
          mood: "energetic",
          audioSrc: "/audio/Ganpati Bappa Moraya.mp3"
        },
        {
          id: 2,
          title: "Sukh Karta Dukh Harta",
          artist: "Anuradha Paudwal",
          duration: "6:15",
          category: "aarti",
          language: "Marathi",
          description: "Beautiful aarti describing Ganesha as the remover of sorrows",
          lyrics: "Sukh karta dukh harta\nVarta vighnachi\nNurvi purvi prem mora\nDeva Shree Ganesha\nDeva Shree Ganesha\nJai deva Jai deva\nGanpati Bappa Morya",
          mood: "peaceful",
          audioSrc: "/audio/Sukh Karta Dukh Harta.mp3"
        },
        {
          id: 3,
          title: "Jai Ganesh Deva",
          artist: "Lata Mangeshkar",
          duration: "5:45",
          category: "traditional",
          language: "Hindi",
          description: "Classic devotional song praising Lord Ganesha",
          lyrics: "Jai Ganesh, Jai Ganesh, Jai Ganesh deva\nMata Jaki Parvati, Pita Mahadeva\nJai Ganesh, Jai Ganesh, Jai Ganesh deva\nJai Ganesh, Jai Ganesh, Jai Ganesh deva",
          mood: "devotional",
          audioSrc: "/audio/Jai Ganesh Deva.mp3"
        },
        {
          id: 4,
          title: "Gajanana Shri Ganraya",
          artist: "Suresh Wadkar",
          duration: "7:20",
          category: "traditional",
          language: "Marathi",
          description: "Traditional Marathi bhajan describing Ganesha's divine form",
          lyrics: "Gajanan Shri Ganraya\nGajanan Shri Ganraya\nDukh hart Sukh karta\nVarta Vighnachi\nAarti Jai Ganesh Deva",
          mood: "peaceful",
          audioSrc: "/audio/Gajanana Shri Ganraya.mp3"
        },
        {
          id: 5,
          title: "Om Gan Ganapataye Namo Namah",
          artist: "Chorus",
          duration: "8:30",
          category: "mantra",
          language: "Sanskrit",
          description: "Sacred Ganesh mantra for meditation and spiritual growth",
          lyrics: "Om Gam Ganapataye Namaha\nOm Gam Ganapataye Namaha\nOm Gam Ganapataye Namaha\nRepeat 108 times for spiritual blessings",
          mood: "meditative",
          audioSrc: "/audio/Om Gan Ganapataye Namo Namah.mp3"
        },
        {
          id: 6,
          title: "Shendur Lal Chadhayo",
          artist: "Usha Mangeshkar",
          duration: "4:55",
          category: "traditional",
          language: "Marathi",
          description: "Vibrant song describing Ganesha's red vermilion adornment",
          lyrics: "Shendur lal chadyo\nGajmukh vighn vinashak\nSakal mangal moorthy\nDeva Shree Ganesha\nJai Jai Ganesha",
          mood: "celebratory",
          audioSrc: "/audio/Shendur Lal Chadhayo Aarti.mp3"
        },
        {
          id: 7,
          title: "Ganesh Vandana",
          artist: "Pandit Jasraj",
          duration: "9:10",
          category: "classical",
          language: "Hindi",
          description: "Classical rendition of Ganesh vandana in traditional ragas",
          lyrics: "Vakratunda Mahakaya\nSuryakoti Samaprabha\nNirvighnam Kuru Me Deva\nSarva Karyeshu Sarvada\nJai Ganesh Deva",
          mood: "classical",
          audioSrc: "/audio/Ganesh Vandana.mp3"
        },
        {
          id: 8,
          title: "Hey Gajanana",
          artist: "Anup Jalota",
          duration: "6:40",
          category: "bhajan",
          language: "Hindi",
          description: "Soulful bhajan calling upon Lord Ganesha",
          lyrics: "Hey Gajanana, Hey Gajanana\nSukh karta dukh harta\nDeva Shree Ganesha\nTumse badhkar kaun\nJag mein koi nahi",
          mood: "devotional",
          audioSrc: "/audio/Hey Gajanana.mp3"
        },
        {
          id: 9,
          title: "Ganapati Atharvashirsha",
          artist: "Traditional Scholars",
          duration: "12:00",
          category: "scripture",
          language: "Sanskrit",
          description: "Sacred scripture recitation dedicated to Lord Ganesha",
          lyrics: "Bhadram Karnebhih Shrunuyama Devaha\nBhadram Pashyemaakshabhiryajatraha\nSthirairangai Tushtuvaagumsastanubhih\nVyashema Devahita Yadayuhu",
          mood: "spiritual",
          audioSrc: "/audio/Ganapati Atharvashirsha.mp3"
        },
        {
          id: 10,
          title: "Morya Re Bappa Morya",
          artist: "Shankar Mahadevan",
          duration: "5:25",
          category: "modern",
          language: "Hindi",
          description: "Modern fusion bhajan with contemporary arrangements",
          lyrics: "Morya re Bappa Morya\nAala re aala Ganpati aala\nSada sukhi raho\nSabki manzil mila\nJai ho Ganpati Bappa",
          mood: "energetic",
          audioSrc: "/audio/Morya Re Bappa Morya.mp3"
        },
        {
          id: 11,
          title: "Ganpati Aarti",
          artist: "Various Artists",
          duration: "3:45",
          category: "aarti",
          language: "Hindi",
          description: "Complete Ganesh aarti for daily worship",
          lyrics: "Jai Ganesh Jai Ganesh\nJai Ganesh deva\nMata Jaki Parvati\nPita Mahadeva\nEk Dant Dayavant\nChar Bhuja Dhari\nMathe Sindur Shobhit\nJai Ganesh deva",
          mood: "ritualistic",
          audioSrc: "/audio/Ganpati Aarti.mp3"
        },
        {
          id: 12,
          title: "Vakratunda Mahakaya",
          artist: "Traditional",
          duration: "4:15",
          category: "mantra",
          language: "Sanskrit",
          description: "Powerful Ganesh mantra for removing obstacles",
          lyrics: "Vakratunda Mahakaya\nSuryakoti Samaprabha\nNirvighnam Kuru Me Deva\nSarva Karyeshu Sarvada\nOm Gam Ganapataye Namaha",
          mood: "powerful",
          audioSrc: "/audio/Vakratunda Mahakaya.mp3"
        }
      ],
      categories: [
        { id: 'all', name: 'All Songs', count: 12 },
        { id: 'traditional', name: 'Traditional', count: 4 },
        { id: 'aarti', name: 'Aarti', count: 3 },
        { id: 'mantra', name: 'Mantra', count: 3 },
        { id: 'bhajan', name: 'Bhajan', count: 1 },
        { id: 'classical', name: 'Classical', count: 1 },
        { id: 'modern', name: 'Modern', count: 1 },
        { id: 'scripture', name: 'Scripture', count: 1 }
      ]
    }
  }

  // Check if audio file is accessible
  const checkAudioAccessibility = async (audioSrc: string) => {
    try {
      const response = await fetch(audioSrc, { method: 'HEAD' })
      console.log(`Audio file ${audioSrc} accessible:`, response.ok, 'Status:', response.status)
      return response.ok
    } catch (error) {
      console.error(`Error checking audio file ${audioSrc}:`, error)
      return false
    }
  }

  // Check all audio files on component mount
  useEffect(() => {
    const checkAllAudioFiles = async () => {
      console.log('Checking all audio files...')
      for (const song of festivalInfo.bhajans.songs) {
        await checkAudioAccessibility(song.audioSrc)
      }
    }
    
    checkAllAudioFiles()
  }, [])

  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const handleSeekBlessings = () => {
    setBlessingAnimation(true)
    
    // Create floating blessing texts
    const blessings = ["🙏", "✨", "🌟", "💫", "🕉️"]
    const newBlessings = blessings.map((text, index) => ({
      id: Date.now() + index,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 50,
      text
    }))
    
    setFloatingBlessings(prev => [...prev, ...newBlessings])
    
    // Remove blessings after animation
    setTimeout(() => {
      setFloatingBlessings(prev => prev.filter(b => !newBlessings.some(nb => nb.id === b.id)))
    }, 5000)
    
    // Show blessing received message
    setTimeout(() => {
      setBlessingReceived(true)
      setBlessingAnimation(false)
    }, 1000)
  }

  const handlePlayPause = async (songId: number) => {
    const song = festivalInfo.bhajans.songs.find(s => s.id === songId)
    if (!song) return

    // Check if audio file is accessible
    const isAccessible = await checkAudioAccessibility(song.audioSrc)
    if (!isAccessible) {
      console.error('Audio file not accessible:', song.audioSrc)
      return
    }

    if (currentSong === songId) {
      // Toggle play/pause for current song
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause()
        } else {
          audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
      }
    } else {
      // Switch to new song
      if (audioRef.current) {
        audioRef.current.pause()
      }
      
      setCurrentSong(songId)
      setIsPlaying(true)
      
      // Create new audio element
      const audio = new Audio(song.audioSrc)
      console.log('Attempting to load audio:', song.audioSrc)
      audioRef.current = audio
      
      // Set up event listeners
      audio.addEventListener('loadedmetadata', () => {
        console.log('Audio loaded successfully:', song.audioSrc, 'Duration:', audio.duration)
        setDuration(audio.duration)
      })
      
      audio.addEventListener('error', (e) => {
        console.error('Audio loading error:', e, 'Source:', song.audioSrc)
        setIsPlaying(false)
      })
      
      audio.addEventListener('timeupdate', () => {
        setProgress((audio.currentTime / audio.duration) * 100)
      })
      
      audio.addEventListener('ended', () => {
        console.log('Audio ended:', song.audioSrc)
        setIsPlaying(false)
        setProgress(0)
      })
      
      // Play the audio
      audio.play().catch(error => {
        console.error('Audio playback failed:', error, 'Source:', song.audioSrc)
        setIsPlaying(false)
      })
    }
  }

  const handleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const getFilteredSongs = () => {
    let filtered = festivalInfo.bhajans.songs
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(song => song.category === selectedCategory)
    }
    
    if (searchQuery) {
      filtered = filtered.filter(song => 
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.language.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    return filtered
  }

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'energetic': return 'from-red-400 to-orange-400'
      case 'peaceful': return 'from-blue-400 to-cyan-400'
      case 'devotional': return 'from-purple-400 to-pink-400'
      case 'meditative': return 'from-green-400 to-teal-400'
      case 'celebratory': return 'from-yellow-400 to-orange-400'
      case 'classical': return 'from-indigo-400 to-purple-400'
      case 'spiritual': return 'from-violet-400 to-purple-400'
      case 'powerful': return 'from-red-500 to-purple-500'
      case 'ritualistic': return 'from-orange-400 to-red-400'
      default: return 'from-orange-400 to-red-400'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-orange-950 dark:via-yellow-950 dark:to-red-950 relative overflow-hidden">
      {/* Floating Blessings Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {floatingBlessings.map((blessing) => (
            <motion.div
              key={blessing.id}
              className="absolute text-2xl opacity-80"
              style={{ left: blessing.x, top: blessing.y }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                y: [-100, -window.innerHeight - 100],
                x: [0, (Math.random() - 0.5) * 200]
              }}
              transition={{ duration: 5, ease: "easeInOut" }}
            >
              {blessing.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12 px-4"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
            <img 
              src="/ganesha.png" 
              alt="Lord Ganesha" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-red-600 bg-clip-text text-transparent mb-4">
          Ganesh Chaturthi
        </h1>
        <p className="text-xl md:text-2xl text-orange-800 dark:text-orange-200 font-medium">
          Festival of Wisdom, Prosperity & New Beginnings
        </p>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pb-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-orange-100 dark:bg-orange-900">
            <TabsTrigger value="overview" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              History
            </TabsTrigger>
            <TabsTrigger value="rituals" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Rituals
            </TabsTrigger>
            <TabsTrigger value="celebrations" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Celebrations
            </TabsTrigger>
            <TabsTrigger value="bhajans" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Bhajans
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-white/80 dark:bg-orange-950/80 backdrop-blur-sm border-orange-200 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="text-2xl text-orange-800 dark:text-orange-200">
                  {festivalInfo.overview.title}
                </CardTitle>
                <CardDescription className="text-lg text-orange-600 dark:text-orange-300">
                  {festivalInfo.overview.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {festivalInfo.overview.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 bg-orange-50 dark:bg-orange-900 rounded-lg"
                  >
                    <Calendar className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <p className="font-semibold text-orange-800 dark:text-orange-200">
                      {festivalInfo.overview.duration}
                    </p>
                    <p className="text-sm text-orange-600 dark:text-orange-300">Duration</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 bg-orange-50 dark:bg-orange-900 rounded-lg"
                  >
                    <Star className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <p className="font-semibold text-orange-800 dark:text-orange-200">
                      {festivalInfo.overview.month}
                    </p>
                    <p className="text-sm text-orange-600 dark:text-orange-300">Month</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 bg-orange-50 dark:bg-orange-900 rounded-lg"
                  >
                    <Heart className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <p className="font-semibold text-orange-800 dark:text-orange-200">
                      {festivalInfo.overview.significance}
                    </p>
                    <p className="text-sm text-orange-600 dark:text-orange-300">Significance</p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="bg-white/80 dark:bg-orange-950/80 backdrop-blur-sm border-orange-200 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="text-2xl text-orange-800 dark:text-orange-200">
                  {festivalInfo.history.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {festivalInfo.history.description}
                </p>
                <div className="space-y-3 mt-6">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="border-orange-300 text-orange-700">
                      Origin
                    </Badge>
                    <span className="text-orange-800 dark:text-orange-200">
                      {festivalInfo.history.origin}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="border-orange-300 text-orange-700">
                      Popularization
                    </Badge>
                    <span className="text-orange-800 dark:text-orange-200">
                      {festivalInfo.history.popularization}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="border-orange-300 text-orange-700">
                      Transformation
                    </Badge>
                    <span className="text-orange-800 dark:text-orange-200">
                      {festivalInfo.history.transformation}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rituals" className="space-y-6">
            <Card className="bg-white/80 dark:bg-orange-950/80 backdrop-blur-sm border-orange-200 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="text-2xl text-orange-800 dark:text-orange-200">
                  {festivalInfo.rituals.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {festivalInfo.rituals.description}
                </p>

                {/* Interactive Ritual Timeline */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-200 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    10-Day Festival Timeline
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {festivalInfo.rituals.timeline.map((day, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="cursor-pointer"
                        onClick={() => setSelectedDay(selectedDay === index ? null : index)}
                      >
                        <div className={`bg-gradient-to-r ${day.color} p-4 rounded-lg text-white text-center shadow-lg ${selectedDay === index ? 'ring-4 ring-orange-300' : ''}`}>
                          <div className="text-sm font-semibold">{day.day}</div>
                          <div className="text-xs mt-1">{day.title}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Selected Day Details */}
                  <AnimatePresence>
                    {selectedDay !== null && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900 dark:to-yellow-900 p-6 rounded-lg border border-orange-200 dark:border-orange-700"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                              {festivalInfo.rituals.timeline[selectedDay].day}: {festivalInfo.rituals.timeline[selectedDay].title}
                            </h4>
                            <p className="text-orange-700 dark:text-orange-300 mt-1">
                              {festivalInfo.rituals.timeline[selectedDay].description}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedDay(null)}
                            className="text-orange-600 border-orange-300 hover:bg-orange-100"
                          >
                            Close
                          </Button>
                        </div>
                        <div>
                          <h5 className="font-medium text-orange-800 dark:text-orange-200 mb-2">Key Activities:</h5>
                          <ul className="space-y-1">
                            {festivalInfo.rituals.timeline[selectedDay].activities.map((activity, idx) => (
                              <li key={idx} className="flex items-center text-orange-700 dark:text-orange-300">
                                <Sparkles className="w-4 h-4 mr-2" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Step-by-Step Ritual Guide */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-200 flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Step-by-Step Ritual Guide
                  </h3>
                  <div className="space-y-4">
                    {festivalInfo.rituals.stepByStepGuide.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-orange-200 dark:border-orange-700 rounded-lg overflow-hidden"
                      >
                        <div
                          className="p-4 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900 cursor-pointer flex items-center justify-between"
                          onClick={() => setSelectedStep(selectedStep === index ? null : index)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold">
                              {step.step}
                            </div>
                            <div>
                              <h4 className="font-semibold text-orange-800 dark:text-orange-200">
                                {step.title}
                              </h4>
                              <p className="text-sm text-orange-700 dark:text-orange-300">
                                {step.description}
                              </p>
                            </div>
                          </div>
                          <div className="text-orange-600">
                            {selectedStep === index ? '▲' : '▼'}
                          </div>
                        </div>

                        <AnimatePresence>
                          {selectedStep === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="p-4 bg-white dark:bg-orange-950"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                                    Materials Needed:
                                  </h5>
                                  <ul className="space-y-1">
                                    {step.materials.map((material, idx) => (
                                      <li key={idx} className="flex items-center text-orange-700 dark:text-orange-300">
                                        <Heart className="w-4 h-4 mr-2 text-red-500" />
                                        {material}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                                    Instructions:
                                  </h5>
                                  <ol className="space-y-2">
                                    {step.instructions.map((instruction, idx) => (
                                      <li key={idx} className="flex items-start text-orange-700 dark:text-orange-300">
                                        <span className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                                          {idx + 1}
                                        </span>
                                        {instruction}
                                      </li>
                                    ))}
                                  </ol>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Original Key Rituals */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {festivalInfo.rituals.keyRituals.map((ritual, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900 dark:to-yellow-900 rounded-lg border border-orange-200 dark:border-orange-700"
                    >
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-5 h-5 text-orange-600" />
                        <span className="font-medium text-orange-800 dark:text-orange-200">
                          {ritual}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="celebrations" className="space-y-6">
            <Card className="bg-white/80 dark:bg-orange-950/80 backdrop-blur-sm border-orange-200 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="text-2xl text-orange-800 dark:text-orange-200">
                  {festivalInfo.celebrations.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {festivalInfo.celebrations.description}
                </p>
                <div className="space-y-4 mt-6">
                  {festivalInfo.celebrations.regions.map((region, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                      className="p-4 bg-white dark:bg-orange-900 rounded-lg shadow-sm border border-orange-100 dark:border-orange-800"
                    >
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-orange-600 mt-1" />
                        <span className="text-orange-800 dark:text-orange-200">
                          {region}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bhajans" className="space-y-6">
            <Card className="bg-white/80 dark:bg-orange-950/80 backdrop-blur-sm border-orange-200 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="text-2xl text-orange-800 dark:text-orange-200 flex items-center">
                  <Music className="w-6 h-6 mr-2" />
                  {festivalInfo.bhajans.title}
                </CardTitle>
                <CardDescription className="text-lg text-orange-600 dark:text-orange-300">
                  {festivalInfo.bhajans.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search and Filter */}
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Search songs, artists, or languages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-3 border border-orange-300 rounded-lg bg-white dark:bg-orange-950 text-orange-800 dark:text-orange-200 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  
                  {/* Category Filters */}
                  <div className="flex flex-wrap gap-2">
                    {festivalInfo.bhajans.categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                        className={selectedCategory === category.id 
                          ? "bg-orange-500 hover:bg-orange-600 text-white" 
                          : "border-orange-300 text-orange-700 hover:bg-orange-50"
                        }
                      >
                        {category.name} ({category.count})
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Current Song Player */}
                <AnimatePresence>
                  {currentSong !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900 p-6 rounded-lg border border-orange-200 dark:border-orange-700"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                            {festivalInfo.bhajans.songs.find(s => s.id === currentSong)?.title}
                          </h4>
                          <p className="text-orange-700 dark:text-orange-300">
                            {festivalInfo.bhajans.songs.find(s => s.id === currentSong)?.artist}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleMute}
                            className="border-orange-300 text-orange-700 hover:bg-orange-50"
                          >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handlePlayPause(currentSong)}
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-orange-200 dark:bg-orange-800 rounded-full h-2 mb-4">
                        <div className="bg-orange-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                      </div>
                      
                      {/* Lyrics */}
                      <div className="bg-white dark:bg-orange-950 p-4 rounded-lg">
                        <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Lyrics:</h5>
                        <p className="text-orange-700 dark:text-orange-300 whitespace-pre-line text-sm">
                          {festivalInfo.bhajans.songs.find(s => s.id === currentSong)?.lyrics}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Songs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getFilteredSongs().map((song, index) => (
                    <motion.div
                      key={song.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-700 overflow-hidden cursor-pointer"
                      onClick={() => handlePlayPause(song.id)}
                    >
                      <div className={`h-2 bg-gradient-to-r ${getMoodColor(song.mood)}`}></div>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-1">
                              {song.title}
                            </h4>
                            <p className="text-sm text-orange-600 dark:text-orange-300">
                              {song.artist}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-orange-600 hover:bg-orange-50"
                          >
                            {currentSong === song.id && isPlaying ? 
                              <Pause className="w-4 h-4" /> : 
                              <Play className="w-4 h-4" />
                            }
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-orange-500 dark:text-orange-400">
                          <span>{song.duration}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="border-orange-300 text-orange-700 text-xs">
                              {song.language}
                            </Badge>
                            <Badge variant="outline" className="border-orange-300 text-orange-700 text-xs">
                              {song.category}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-xs text-orange-600 dark:text-orange-300 mt-2">
                          {song.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* No Results */}
                {getFilteredSongs().length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <Music className="w-16 h-16 mx-auto mb-4 text-orange-400" />
                    <p className="text-orange-600 dark:text-orange-300">
                      No songs found matching your search criteria.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Interactive Elements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Card className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900 border-orange-200 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="text-xl text-orange-800 dark:text-orange-200">
                Experience the Divine Blessings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-700 dark:text-orange-300 mb-6">
                Join millions in celebrating the remover of obstacles and the harbinger of good fortune.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={handleSeekBlessings}
                  disabled={blessingAnimation}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg disabled:opacity-50"
                >
                  <span className="mr-2">🙏</span>
                  {blessingAnimation ? "Receiving Blessings..." : "Seek Blessings"}
                </Button>
              </motion.div>
              
              {/* Blessing Received Message */}
              <AnimatePresence>
                {blessingReceived && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 rounded-lg border border-yellow-300 dark:border-yellow-700"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">🕉️</div>
                      <p className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                        Divine Blessings Received!
                      </p>
                      <p className="text-orange-700 dark:text-orange-300 mt-2">
                        May Lord Ganesha remove all obstacles from your path and fill your life with wisdom and prosperity.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center py-8 px-4 border-t border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-orange-950/50 backdrop-blur-sm"
      >
        <p className="text-orange-600 dark:text-orange-300">
          🙏 May Lord Ganesha bless you with wisdom, prosperity, and happiness 🙏
        </p>
      </motion.footer>
    </div>
  )
}