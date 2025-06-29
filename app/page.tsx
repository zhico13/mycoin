"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Head from "next/head"

const DRAG_THRESHOLD = 5 // pixels

// Rapper isimleri listesi
const RAPPER_NAMES = [
  "Lil Crypto",
  "Young Hodler",
  "Chief Pump",
  "Lil Diamond",
  "Big Gains",
  "Yung Moon",
  "Lil Rocket",
  "Chief Lambo",
  "Young Ape",
  "Lil Degen",
  "Big Stack",
  "Yung Whale",
  "Lil Bull",
  "Chief Bag",
  "Young Profit",
  "Lil Mint",
  "Big Flex",
  "Yung Rich",
  "Lil Gem",
  "Chief Money",
  "Young Fire",
  "Lil Sauce",
  "Big Drip",
  "Yung Blessed",
  "Lil King",
]

const getRandomRapperName = () => {
  return RAPPER_NAMES[Math.floor(Math.random() * RAPPER_NAMES.length)]
}

export default function MyCoinWebsite() {
  const [activeWindows, setActiveWindows] = useState<string[]>([])
  const [showWelcomePopup, setShowWelcomePopup] = useState(false)
  const [folderPosition, setFolderPosition] = useState({ x: 20, y: 20 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [hasDragged, setHasDragged] = useState(false)
  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 })
  const [isOrbOrbiting, setIsOrbOrbiting] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Window positions
  const [windowPositions, setWindowPositions] = useState({
    about: { x: 50, y: 50 },
    tokenomics: { x: 70, y: 70 },
    roadmap: { x: 90, y: 90 },
    chat: { x: 110, y: 110 },
  })

  // Window dragging states
  const [windowDragging, setWindowDragging] = useState({
    about: false,
    tokenomics: false,
    roadmap: false,
    chat: false,
  })

  const [windowDragOffset, setWindowDragOffset] = useState({
    about: { x: 0, y: 0 },
    tokenomics: { x: 0, y: 0 },
    roadmap: { x: 0, y: 0 },
    chat: { x: 0, y: 0 },
  })

  // Desktop icon pozisyonlarını hizala
  const [iconPositions, setIconPositions] = useState({
    tokenomics: { x: 110, y: 20 },
    roadmap: { x: 200, y: 20 },
    chat: { x: 290, y: 20 },
  })

  // Desktop icon dragging states
  const [iconDragging, setIconDragging] = useState({
    tokenomics: false,
    roadmap: false,
    chat: false,
  })

  const [iconDragOffset, setIconDragOffset] = useState({
    tokenomics: { x: 0, y: 0 },
    roadmap: { x: 0, y: 0 },
    chat: { x: 0, y: 0 },
  })

  const [hasDraggedIcon, setHasDraggedIcon] = useState({
    tokenomics: false,
    roadmap: false,
    chat: false,
  })

  const [iconDragStartPosition, setIconDragStartPosition] = useState({
    tokenomics: { x: 0, y: 0 },
    roadmap: { x: 0, y: 0 },
    chat: { x: 0, y: 0 },
  })

  // Chat sistemi - geliştirilmiş
  const [chatMessages, setChatMessages] = useState([
    { user: "system", message: "🔥 MYCOIN LIVE CHAT - Welcome to the pump! 💰", time: "12:00", isSystem: true },
    {
      user: "Chief Pump",
      message: "yo this folder just appeared on my desktop wtf 😂",
      time: "12:01",
      isSystem: false,
    },
    { user: "Lil Diamond", message: "same bro! this some next level marketing 💎", time: "12:02", isSystem: false },
    { user: "Young Hodler", message: "already bought the dip 🚀 LFG!", time: "12:03", isSystem: false },
    { user: "Big Gains", message: "this about to moon fr 🌙", time: "12:04", isSystem: false },
  ])
  const [chatInput, setChatInput] = useState("")
  const [userRapperName, setUserRapperName] = useState("")
  const [onlineUsers, setOnlineUsers] = useState([
    "Chief Pump",
    "Lil Diamond",
    "Young Hodler",
    "Big Gains",
    "Yung Moon",
    "Lil Rocket",
  ])

  const folderRef = useRef<HTMLDivElement>(null)

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)

      // Mobile için icon pozisyonlarını ayarla
      if (window.innerWidth <= 768) {
        setIconPositions({
          tokenomics: { x: 20, y: 100 },
          roadmap: { x: 20, y: 180 },
          chat: { x: 20, y: 260 },
        })
        setFolderPosition({ x: 20, y: 20 })
      } else {
        setIconPositions({
          tokenomics: { x: 110, y: 20 },
          roadmap: { x: 200, y: 20 },
          chat: { x: 290, y: 20 },
        })
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Kullanıcıya random rapper ismi ver
  useEffect(() => {
    if (!userRapperName) {
      setUserRapperName(getRandomRapperName())
    }
  }, [userRapperName])

  // Otomatik mesajlar için timer
  useEffect(() => {
    const interval = setInterval(() => {
      const randomResponses = [
        "this coin different 💯",
        "pump it up! 🔥",
        "diamond hands only 💎🙌",
        "to the moon! 🚀",
        "wen lambo? 🏎️",
        "hodl strong fam 💪",
        "this the one! 🎯",
        "early gang 👑",
        "let's gooo! 🔥",
        "bag secured 💰",
        "next 100x 📈",
        "hidden gem found 💎",
        "pump squad assemble! 🚀",
        "no cap this fire 🔥",
        "bullish af 📊",
      ]

      const randomUser = onlineUsers[Math.floor(Math.random() * onlineUsers.length)]
      const randomMessage = randomResponses[Math.floor(Math.random() * randomResponses.length)]
      const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

      // %30 şans ile otomatik mesaj gönder
      if (Math.random() < 0.3) {
        setChatMessages((prev) => [
          ...prev,
          {
            user: randomUser,
            message: randomMessage,
            time: currentTime,
            isSystem: false,
          },
        ])
      }
    }, 8000) // Her 8 saniyede bir kontrol et

    return () => clearInterval(interval)
  }, [onlineUsers])

  // Show welcome popup on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomePopup(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (folderRef.current) {
      const touch = e.touches[0]
      const rect = folderRef.current.getBoundingClientRect()
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      })
      setDragStartPosition({ x: touch.clientX, y: touch.clientY })
      setIsDragging(true)
      setHasDragged(false)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    if (isDragging) {
      const touch = e.touches[0]
      const distance = Math.sqrt(
        Math.pow(touch.clientX - dragStartPosition.x, 2) + Math.pow(touch.clientY - dragStartPosition.y, 2),
      )

      if (distance > DRAG_THRESHOLD) {
        setHasDragged(true)
        const newX = Math.max(0, Math.min(window.innerWidth - 80, touch.clientX - dragOffset.x))
        const newY = Math.max(0, Math.min(window.innerHeight - 120, touch.clientY - dragOffset.y))
        setFolderPosition({ x: newX, y: newY })
      }
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (folderRef.current) {
      const rect = folderRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setDragStartPosition({ x: e.clientX, y: e.clientY })
      setIsDragging(true)
      setHasDragged(false)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const distance = Math.sqrt(
        Math.pow(e.clientX - dragStartPosition.x, 2) + Math.pow(e.clientY - dragStartPosition.y, 2),
      )

      if (distance > DRAG_THRESHOLD) {
        setHasDragged(true)
        const newX = Math.max(0, Math.min(window.innerWidth - 80, e.clientX - dragOffset.x))
        const newY = Math.max(0, Math.min(window.innerHeight - 120, e.clientY - dragOffset.y))
        setFolderPosition({ x: newX, y: newY })
      }
    }

    // Handle icon dragging with threshold
    Object.keys(iconDragging).forEach((iconType) => {
      if (iconDragging[iconType as keyof typeof iconDragging]) {
        const startPos = iconDragStartPosition[iconType as keyof typeof iconDragStartPosition]
        const distance = Math.sqrt(Math.pow(e.clientX - startPos.x, 2) + Math.pow(e.clientY - startPos.y, 2))

        if (distance > DRAG_THRESHOLD) {
          setHasDraggedIcon((prev) => ({
            ...prev,
            [iconType]: true,
          }))
          const newX = Math.max(
            0,
            Math.min(window.innerWidth - 80, e.clientX - iconDragOffset[iconType as keyof typeof iconDragOffset].x),
          )
          const newY = Math.max(
            0,
            Math.min(window.innerHeight - 120, e.clientY - iconDragOffset[iconType as keyof typeof iconDragOffset].y),
          )
          setIconPositions((prev) => ({
            ...prev,
            [iconType]: { x: newX, y: newY },
          }))
        }
      }
    })

    // Handle window dragging (keep existing code)
    Object.keys(windowDragging).forEach((windowType) => {
      if (windowDragging[windowType as keyof typeof windowDragging]) {
        const maxWidth = isMobile ? window.innerWidth - 20 : window.innerWidth - 400
        const maxHeight = isMobile ? window.innerHeight - 100 : window.innerHeight - 300
        const newX = Math.max(
          0,
          Math.min(maxWidth, e.clientX - windowDragOffset[windowType as keyof typeof windowDragOffset].x),
        )
        const newY = Math.max(
          0,
          Math.min(maxHeight, e.clientY - windowDragOffset[windowType as keyof typeof windowDragOffset].y),
        )
        setWindowPositions((prev) => ({
          ...prev,
          [windowType]: { x: newX, y: newY },
        }))
      }
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setWindowDragging({
      about: false,
      tokenomics: false,
      roadmap: false,
      chat: false,
    })
    setIconDragging({
      tokenomics: false,
      roadmap: false,
      chat: false,
    })
    setHasDraggedIcon({
      tokenomics: false,
      roadmap: false,
      chat: false,
    })
  }

  const handleClick = () => {
    if (!hasDragged) {
      if (!activeWindows.includes("about")) {
        setActiveWindows((prev) => [...prev, "about"])
      }
    }
  }

  const openWindow = (windowType: string) => {
    if (!activeWindows.includes(windowType)) {
      setActiveWindows((prev) => [...prev, windowType])
    }
  }

  const closeWindow = (windowType: string) => {
    setActiveWindows((prev) => prev.filter((w) => w !== windowType))
  }

  const handleWindowMouseDown = (e: React.MouseEvent, windowType: string) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setWindowDragOffset((prev) => ({
      ...prev,
      [windowType]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }))
    setWindowDragging((prev) => ({
      ...prev,
      [windowType]: true,
    }))
  }

  const handleIconMouseDown = (e: React.MouseEvent, iconType: string) => {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    setIconDragOffset((prev) => ({
      ...prev,
      [iconType]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }))
    setIconDragStartPosition((prev) => ({
      ...prev,
      [iconType]: { x: e.clientX, y: e.clientY },
    }))
    setIconDragging((prev) => ({
      ...prev,
      [iconType]: true,
    }))
    setHasDraggedIcon((prev) => ({
      ...prev,
      [iconType]: false,
    }))
  }

  const handleIconClick = (e: React.MouseEvent, windowType: string) => {
    e.stopPropagation()
    if (!hasDraggedIcon[windowType as keyof typeof hasDraggedIcon]) {
      openWindow(windowType)
    }
  }

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      const newMessage = {
        user: userRapperName,
        message: chatInput,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isSystem: false,
      }
      setChatMessages((prev) => [...prev, newMessage])
      setChatInput("")

      // Kullanıcı mesaj gönderdiğinde online kullanıcılar listesine ekle
      if (!onlineUsers.includes(userRapperName)) {
        setOnlineUsers((prev) => [...prev, userRapperName])
      }

      // Otomatik cevap ver (bazen)
      setTimeout(
        () => {
          if (Math.random() < 0.7) {
            // %70 şans ile cevap ver
            const responses = [
              "facts! 💯",
              "this it chief 🔥",
              "W take 📈",
              "based 💎",
              "no cap 🚀",
              "real one ✨",
              "big mood 💰",
              "say less 👑",
              "periodt 💅",
              "vibes 🌙",
            ]
            const randomResponse = responses[Math.floor(Math.random() * responses.length)]
            const randomUser = onlineUsers[Math.floor(Math.random() * onlineUsers.length)]

            setChatMessages((prev) => [
              ...prev,
              {
                user: randomUser,
                message: randomResponse,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                isSystem: false,
              },
            ])
          }
        },
        1000 + Math.random() * 3000,
      ) // 1-4 saniye arası bekle
    }
  }

  const handleOrbClick = () => {
    setIsOrbOrbiting(!isOrbOrbiting)
  }

  return (
    <>
      <Head>
        <title>MYCOIN</title>
        <link rel="stylesheet" href="/98.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>

      <div
        style={{
          background: "linear-gradient(45deg, #008080, #20b2aa)",
          minHeight: "100vh",
          fontFamily: "MS Sans Serif, sans-serif",
          fontWeight: "bold",
          padding: "0",
          overflow: "hidden",
          touchAction: "none",
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* Social Media Buttons - Top Right - Mobile Responsive */}
        <div
          style={{
            position: "fixed",
            top: isMobile ? "10px" : "20px",
            right: isMobile ? "10px" : "20px",
            zIndex: 1001,
            display: "flex",
            gap: isMobile ? "5px" : "10px",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <button
            className="btn"
            style={{
              padding: isMobile ? "6px 8px" : "8px 12px",
              fontSize: isMobile ? "10px" : "11px",
              fontWeight: "bold",
              backgroundColor: "#c0c0c0",
              color: "#000000",
              border: "2px outset #c0c0c0",
              cursor: "pointer",
              fontFamily: "MS Sans Serif, sans-serif",
              minWidth: isMobile ? "50px" : "70px",
            }}
            onClick={() => window.open("https://x.com/mycoinfun", "_blank")}
            title="Follow us on Twitter"
          >
            Twitter
          </button>

          <button
            className="btn"
            style={{
              padding: isMobile ? "6px 8px" : "8px 12px",
              fontSize: isMobile ? "10px" : "11px",
              fontWeight: "bold",
              backgroundColor: "#c0c0c0",
              color: "#000000",
              border: "2px outset #c0c0c0",
              cursor: "pointer",
              fontFamily: "MS Sans Serif, sans-serif",
              minWidth: isMobile ? "50px" : "70px",
            }}
            onClick={() => window.open("https://t.me/mycoinfun", "_blank")}
            title="Join our Telegram"
          >
            Telegram
          </button>
        </div>

        {/* Welcome Popup - Mobile Responsive */}
        {showWelcomePopup && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: isMobile ? "10px" : "0",
            }}
          >
            <div
              className="window"
              style={{
                width: isMobile ? "95%" : "400px",
                maxWidth: "90vw",
                animation: "popupSlide 0.5s ease-out",
              }}
            >
              <div className="title-bar">
                <div className="title-bar-text" style={{ fontSize: isMobile ? "10px" : "11px" }}>
                  💰 MYCOIN - Welcome!
                </div>
                <div className="title-bar-controls">
                  <button aria-label="Close" onClick={() => setShowWelcomePopup(false)}></button>
                </div>
              </div>
              <div className="window-body" style={{ padding: isMobile ? "15px" : "20px", textAlign: "center" }}>
                <div style={{ marginBottom: isMobile ? "15px" : "20px" }}>
                  <div
                    style={{
                      width: isMobile ? "48px" : "64px",
                      height: isMobile ? "48px" : "64px",
                      margin: "0 auto 15px auto",
                      position: "relative",
                      boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                      imageRendering: "pixelated",
                    }}
                  >
                    <img
                      src="/images/mycoin-folder.png"
                      alt="MYCOIN Folder"
                      style={{
                        width: "100%",
                        height: "100%",
                        imageRendering: "pixelated",
                        animation: "pulse 2s infinite",
                      }}
                    />
                  </div>
                  <h2
                    style={{
                      color: "#000080",
                      fontWeight: "900",
                      margin: "0 0 10px 0",
                      fontSize: isMobile ? "16px" : "18px",
                    }}
                  >
                    Welcome to MYCOIN!
                  </h2>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "12px" : "14px",
                      margin: "0 0 20px 0",
                    }}
                  >
                    The forgotten desktop treasure has been discovered.
                  </p>
                </div>

                <div className="sunken-panel" style={{ padding: "15px", marginBottom: "20px" }}>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "11px" : "12px",
                      margin: "0",
                    }}
                  >
                    🚀 Ready to join the pump? <br />
                    {isMobile ? "Tap" : "Click"} below to explore the hidden folder!
                  </p>
                </div>

                <div style={{ display: "flex", gap: "10px", flexDirection: isMobile ? "column" : "row" }}>
                  <button
                    className="btn"
                    style={{
                      padding: isMobile ? "10px 15px" : "12px 20px",
                      fontSize: isMobile ? "11px" : "12px",
                      fontWeight: "bold",
                      backgroundColor: "#00ff00",
                      color: "#000",
                      marginBottom: "10px",
                      width: "100%",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onClick={() => {
                      setShowWelcomePopup(false)
                      if (!activeWindows.includes("about")) {
                        setActiveWindows((prev) => [...prev, "about"])
                      }
                    }}
                  >
                    🔍 Explore
                  </button>
                  <button
                    className="btn"
                    style={{
                      padding: isMobile ? "10px 15px" : "12px 20px",
                      fontSize: isMobile ? "11px" : "12px",
                      fontWeight: "bold",
                      flex: 1,
                    }}
                    onClick={() => setShowWelcomePopup(false)}
                  >
                    Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Taskbar - Mobile Responsive */}
        <div
          className="window"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: isMobile ? "35px" : "40px",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            padding: isMobile ? "0 5px" : "0 10px",
          }}
        >
          <button
            className="btn"
            style={{
              marginRight: isMobile ? "5px" : "10px",
              fontWeight: "bold",
              fontSize: isMobile ? "10px" : "11px",
              padding: isMobile ? "3px 6px" : "4px 8px",
            }}
          >
            📁 start
          </button>
          <div style={{ flex: 1 }}></div>
          <div
            style={{
              padding: isMobile ? "0 5px" : "0 10px",
              fontSize: isMobile ? "9px" : "11px",
              fontWeight: "bold",
            }}
          >
            {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Draggable MYCOIN Folder - Mobile Enhanced */}
        <div
          ref={folderRef}
          style={{
            position: "absolute",
            top: folderPosition.y,
            left: folderPosition.x,
            textAlign: "center",
            cursor: isDragging ? "grabbing" : "grab",
            color: "white",
            textShadow: "1px 1px 2px black",
            userSelect: "none",
            zIndex: 100,
            touchAction: "none",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onClick={handleClick}
        >
          <div
            style={{
              width: isMobile ? "48px" : "64px",
              height: isMobile ? "48px" : "64px",
              marginBottom: "5px",
              position: "relative",
              imageRendering: "pixelated",
            }}
          >
            <img
              src="/images/mycoin-folder.png"
              alt="MYCOIN Folder"
              style={{
                width: "100%",
                height: "100%",
                imageRendering: "pixelated",
              }}
            />
          </div>
          <div
            style={{
              fontSize: isMobile ? "10px" : "11px",
              fontWeight: "bold",
              maxWidth: isMobile ? "60px" : "80px",
              animation: "textGlow 2s ease-in-out infinite",
            }}
          >
            mycoin folder
          </div>
        </div>

        {/* Static Desktop Icons - Mobile Responsive */}
        <div
          style={{
            position: "absolute",
            top: iconPositions.tokenomics.y,
            left: iconPositions.tokenomics.x,
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: isMobile ? "20px" : "30px",
              cursor: iconDragging.tokenomics ? "grabbing" : "grab",
              color: "white",
              textShadow: "1px 1px 2px black",
              userSelect: "none",
              touchAction: "none",
            }}
            onMouseDown={(e) => handleIconMouseDown(e, "tokenomics")}
            onClick={(e) => handleIconClick(e, "tokenomics")}
          >
            <div
              style={{
                width: isMobile ? "32px" : "40px",
                height: isMobile ? "32px" : "40px",
                backgroundColor: "#c0c0c0",
                border: "2px outset #c0c0c0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "16px" : "20px",
                marginBottom: "5px",
                margin: "0 auto 5px auto",
                boxShadow: iconDragging.tokenomics ? "4px 4px 8px rgba(0,0,0,0.3)" : "2px 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              📊
            </div>
            <div
              style={{
                fontSize: isMobile ? "9px" : "11px",
                fontWeight: "bold",
                maxWidth: isMobile ? "50px" : "60px",
              }}
            >
              hidden stats
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: iconPositions.roadmap.y,
            left: iconPositions.roadmap.x,
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: isMobile ? "20px" : "30px",
              cursor: iconDragging.roadmap ? "grabbing" : "grab",
              color: "white",
              textShadow: "1px 1px 2px black",
              userSelect: "none",
              touchAction: "none",
            }}
            onMouseDown={(e) => handleIconMouseDown(e, "roadmap")}
            onClick={(e) => handleIconClick(e, "roadmap")}
          >
            <div
              style={{
                width: isMobile ? "32px" : "40px",
                height: isMobile ? "32px" : "40px",
                backgroundColor: "#c0c0c0",
                border: "2px outset #c0c0c0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "16px" : "20px",
                marginBottom: "5px",
                margin: "0 auto 5px auto",
                boxShadow: iconDragging.roadmap ? "4px 4px 8px rgba(0,0,0,0.3)" : "2px 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              🗺️
            </div>
            <div
              style={{
                fontSize: isMobile ? "9px" : "11px",
                fontWeight: "bold",
                maxWidth: isMobile ? "50px" : "60px",
              }}
            >
              secret map
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: iconPositions.chat.y,
            left: iconPositions.chat.x,
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: isMobile ? "20px" : "30px",
              cursor: iconDragging.chat ? "grabbing" : "grab",
              color: "white",
              textShadow: "1px 1px 2px black",
              userSelect: "none",
              touchAction: "none",
            }}
            onMouseDown={(e) => handleIconMouseDown(e, "chat")}
            onClick={(e) => handleIconClick(e, "chat")}
          >
            <div
              style={{
                width: isMobile ? "32px" : "40px",
                height: isMobile ? "32px" : "40px",
                backgroundColor: "#c0c0c0",
                border: "2px outset #c0c0c0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "16px" : "20px",
                marginBottom: "5px",
                margin: "0 auto 5px auto",
                boxShadow: iconDragging.chat ? "4px 4px 8px rgba(0,0,0,0.3)" : "2px 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              💬
            </div>
            <div
              style={{
                fontSize: isMobile ? "9px" : "11px",
                fontWeight: "bold",
                maxWidth: isMobile ? "50px" : "60px",
              }}
            >
              chat.exe
            </div>
          </div>
        </div>

        {/* Windows - Mobile Responsive */}

        {/* Main Window - About */}
        {activeWindows.includes("about") && (
          <div
            className="window"
            style={{
              position: "absolute",
              top: windowPositions.about.y,
              left: windowPositions.about.x,
              width: isMobile ? "95%" : "350px",
              maxWidth: "95vw",
              zIndex: 200,
              cursor: windowDragging.about ? "grabbing" : "default",
            }}
          >
            <div
              className="title-bar"
              style={{ cursor: "grab" }}
              onMouseDown={(e) => handleWindowMouseDown(e, "about")}
            >
              <div className="title-bar-text" style={{ fontSize: isMobile ? "10px" : "11px" }}>
                mycoin - hidden file opened
              </div>
              <div className="title-bar-controls">
                <button aria-label="Minimize"></button>
                <button aria-label="Maximize"></button>
                <button aria-label="Close" onClick={() => closeWindow("about")}></button>
              </div>
            </div>
            <div className="window-body" style={{ padding: isMobile ? "10px" : "15px" }}>
              <div style={{ textAlign: "center", marginBottom: isMobile ? "10px" : "15px" }}>
                <div
                  style={{
                    width: isMobile ? "32px" : "48px",
                    height: isMobile ? "32px" : "48px",
                    marginBottom: "8px",
                    margin: "0 auto 8px auto",
                    position: "relative",
                    boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                    imageRendering: "pixelated",
                  }}
                >
                  <img
                    src="/images/mycoin-folder.png"
                    alt="MYCOIN Folder"
                    style={{
                      width: "100%",
                      height: "100%",
                      imageRendering: "pixelated",
                    }}
                  />
                </div>
                <h1
                  style={{
                    margin: "0",
                    fontSize: isMobile ? "16px" : "18px",
                    color: "#000080",
                    fontWeight: "900",
                  }}
                >
                  mycoin (mine)
                </h1>
                <p
                  style={{
                    margin: "3px 0",
                    fontStyle: "italic",
                    fontWeight: "bold",
                    color: "#800080",
                    fontSize: isMobile ? "11px" : "12px",
                  }}
                >
                  "you clicked, fate changed."
                </p>
              </div>

              <div className="sunken-panel" style={{ padding: "10px", marginBottom: "10px" }}>
                <h3
                  style={{
                    fontWeight: "900",
                    color: "#000080",
                    fontSize: isMobile ? "12px" : "14px",
                    margin: "0 0 8px 0",
                  }}
                >
                  📂 forgotten desktop treasure
                </h3>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: isMobile ? "10px" : "11px",
                    margin: "0",
                  }}
                >
                  hidden for years like a classic folder icon. until you opened it...
                </p>
              </div>

              <div className="sunken-panel" style={{ padding: "10px", marginBottom: "10px" }}>
                <h3
                  style={{
                    fontWeight: "900",
                    color: "#800000",
                    fontSize: isMobile ? "12px" : "14px",
                    margin: "0 0 8px 0",
                  }}
                >
                  🔓 pump started
                </h3>
                <ul style={{ margin: "0", paddingLeft: "15px", fontSize: isMobile ? "10px" : "11px" }}>
                  <li style={{ fontWeight: "bold", marginBottom: "3px" }}>
                    <span style={{ color: "#008000" }}>✓</span> folder opened
                  </li>
                  <li style={{ fontWeight: "bold", marginBottom: "3px" }}>
                    <span style={{ color: "#008000" }}>✓</span> fate changed
                  </li>
                  <li style={{ fontWeight: "bold" }}>
                    <span style={{ color: "#008000" }}>✓</span> pump activated
                  </li>
                </ul>
              </div>

              <div
                className="sunken-panel"
                style={{ padding: "10px", marginBottom: "15px", backgroundColor: "#ffffcc" }}
              >
                <h4
                  style={{
                    fontWeight: "900",
                    color: "#ff0000",
                    textAlign: "center",
                    fontSize: isMobile ? "11px" : "12px",
                    margin: "0 0 5px 0",
                  }}
                >
                  ⚠️ HIDDEN FILE DETECTED ⚠️
                </h4>
                <p
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#000080",
                    fontSize: isMobile ? "9px" : "10px",
                    margin: "0",
                  }}
                >
                  no going back. the pump has started...
                </p>
              </div>

              <div style={{ textAlign: "center" }}>
                <button
                  className="btn flashing-buy-button"
                  style={{
                    padding: isMobile ? "10px 15px" : "12px 20px",
                    fontSize: isMobile ? "11px" : "12px",
                    fontWeight: "bold",
                    backgroundColor: "#00ff00",
                    color: "#000",
                    marginBottom: "10px",
                    width: "100%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onClick={() => window.open("https://pump.fun", "_blank")}
                >
                  🚀 BUY ON PUMP.FUN
                </button>
                <button
                  className="btn"
                  style={{
                    padding: isMobile ? "6px 12px" : "8px 15px",
                    fontSize: isMobile ? "10px" : "11px",
                    fontWeight: "bold",
                    width: "100%",
                  }}
                >
                  📂 view folder contents
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tokenomics Window - Mobile Responsive */}
        {activeWindows.includes("tokenomics") && (
          <div
            className="window"
            style={{
              position: "absolute",
              top: windowPositions.tokenomics.y,
              left: windowPositions.tokenomics.x,
              width: isMobile ? "95%" : "500px",
              maxWidth: "95vw",
              zIndex: 200,
              cursor: windowDragging.tokenomics ? "grabbing" : "default",
            }}
          >
            <div
              className="title-bar"
              style={{ cursor: "grab" }}
              onMouseDown={(e) => handleWindowMouseDown(e, "tokenomics")}
            >
              <div className="title-bar-text" style={{ fontSize: isMobile ? "10px" : "11px" }}>
                mycoin - hidden statistics
              </div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={() => closeWindow("tokenomics")}></button>
              </div>
            </div>
            <div className="window-body" style={{ padding: isMobile ? "15px" : "20px" }}>
              <h2
                style={{
                  textAlign: "center",
                  color: "#000080",
                  fontWeight: "900",
                  fontSize: isMobile ? "16px" : "18px",
                }}
              >
                📊 hidden file contents
              </h2>

              <div className="sunken-panel" style={{ padding: "15px", marginBottom: "15px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          fontWeight: "bold",
                          padding: "5px",
                          fontSize: isMobile ? "10px" : "11px",
                        }}
                      >
                        <strong>file name:</strong>
                      </td>
                      <td
                        style={{
                          fontWeight: "bold",
                          padding: "5px",
                          fontSize: isMobile ? "10px" : "11px",
                        }}
                      >
                        mycoin.exe
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          fontWeight: "bold",
                          padding: "5px",
                          fontSize: isMobile ? "10px" : "11px",
                        }}
                      >
                        <strong>secret code:</strong>
                      </td>
                      <td
                        style={{
                          fontWeight: "bold",
                          padding: "5px",
                          fontSize: isMobile ? "10px" : "11px",
                        }}
                      >
                        mine
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          fontWeight: "bold",
                          padding: "5px",
                          fontSize: isMobile ? "10px" : "11px",
                        }}
                      >
                        <strong>hidden platform:</strong>
                      </td>
                      <td
                        style={{
                          fontWeight: "bold",
                          padding: "5px",
                          fontSize: isMobile ? "10px" : "11px",
                        }}
                      >
                        pump.fun (solana)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="sunken-panel" style={{ padding: "15px" }}>
                <h4
                  style={{
                    fontWeight: "900",
                    fontSize: isMobile ? "12px" : "14px",
                  }}
                >
                  💎 treasure distribution:
                </h4>
                <div style={{ marginLeft: "20px" }}>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "10px" : "11px",
                    }}
                  >
                    <span style={{ color: "#ff8000" }}>🔓</span> 100% fair launch
                  </p>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "10px" : "11px",
                    }}
                  >
                    <span style={{ color: "#ff0000" }}>❌</span> no presale
                  </p>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "10px" : "11px",
                    }}
                  >
                    <span style={{ color: "#ff0000" }}>❌</span> no team tokens
                  </p>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "10px" : "11px",
                    }}
                  >
                    <span style={{ color: "#008000" }}>✅</span> community ownership
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Roadmap Window - Mobile Responsive */}
        {activeWindows.includes("roadmap") && (
          <div
            className="window"
            style={{
              position: "absolute",
              top: windowPositions.roadmap.y,
              left: windowPositions.roadmap.x,
              width: isMobile ? "95%" : "550px",
              maxWidth: "95vw",
              maxHeight: isMobile ? "80vh" : "auto",
              overflow: isMobile ? "auto" : "visible",
              zIndex: 200,
              cursor: windowDragging.roadmap ? "grabbing" : "default",
            }}
          >
            <div
              className="title-bar"
              style={{ cursor: "grab" }}
              onMouseDown={(e) => handleWindowMouseDown(e, "roadmap")}
            >
              <div className="title-bar-text" style={{ fontSize: isMobile ? "10px" : "11px" }}>
                mycoin - secret map
              </div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={() => closeWindow("roadmap")}></button>
              </div>
            </div>
            <div className="window-body" style={{ padding: isMobile ? "15px" : "20px" }}>
              <h2
                style={{
                  textAlign: "center",
                  color: "#000080",
                  fontWeight: "900",
                  fontSize: isMobile ? "16px" : "18px",
                }}
              >
                🗺️ treasure map
              </h2>

              <div className="sunken-panel" style={{ padding: "15px", marginBottom: "10px" }}>
                <h4
                  style={{
                    fontWeight: "900",
                    fontSize: isMobile ? "12px" : "14px",
                  }}
                >
                  <span style={{ marginRight: "5px", color: "#008000" }}>✅</span>
                  phase 1 - discovery (completed)
                </h4>
                <ul>
                  <li
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "10px" : "11px",
                    }}
                  >
                    <span style={{ color: "#008000" }}>✓</span> hidden file created
                  </li>
                  <li
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "10px" : "11px",
                    }}
                  >
                    <span style={{ color: "#008000" }}>✓</span> placed on desktop
                  </li>
                  <li
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "10px" : "11px",
                    }}
                  >
                    <span style={{ color: "#008000" }}>✓</span> hidden on pump.fun
                  </li>
                </ul>
              </div>

              <div className="sunken-panel" style={{ padding: "15px", marginBottom: "10px" }}>
                <h4
                  style={{
                    fontWeight: "900",
                    fontSize: isMobile ? "12px" : "14px",
                  }}
                >
                  <span style={{ marginRight: "5px", color: "#ff8000" }}>🔄</span>
                  phase 2 - spreading (in progress)
                </h4>
                <ul>
                  <li
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "10px" : "11px",
                    }}
                  >
                    <span style={{ color: "#ff8000" }}>⟳</span> secret telegram group
                  </li>
                  <li
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "10px" : "11px",
                    }}
                  >
                    <span style={{ color: "#ff8000" }}>⟳</span> encrypted twitter account
                  </li>
                  <li
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "10px" : "11px",
                    }}
                  >
                    <span style={{ color: "#ff8000" }}>⟳</span> viral desktop campaign
                  </li>
                </ul>
              </div>

              <div className="sunken-panel" style={{ padding: "15px", marginBottom: "10px" }}>
                <h4
                  style={{
                    fontWeight: "900",
                    fontSize: isMobile ? "12px" : "14px",
                  }}
                >
                  <span style={{ marginRight: "5px", color: "#808080" }}>⏳</span>
                  phase 3 - explosion (coming soon)
                </h4>
                <ul>
                  <li
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "10px" : "11px",
                    }}
                  >
                    <span style={{ color: "#808080" }}>⧖</span> major exchange listings
                  </li>
                  <li
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "10px" : "11px",
                    }}
                  >
                    <span style={{ color: "#808080" }}>⧖</span> desktop nft collection
                  </li>
                  <li
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "10px" : "11px",
                    }}
                  >
                    <span style={{ color: "#808080" }}>⧖</span> retro game development
                  </li>
                </ul>
              </div>

              <div className="sunken-panel" style={{ padding: "15px" }}>
                <h4
                  style={{
                    fontWeight: "900",
                    fontSize: isMobile ? "12px" : "14px",
                  }}
                >
                  <span style={{ marginRight: "5px", color: "#800080" }}>🚀</span>
                  phase 4 - legend (target)
                </h4>
                <ul>
                  <li
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "10px" : "11px",
                    }}
                  >
                    <span style={{ color: "#800080" }}>☽</span> mycoin on everyone's desktop
                  </li>
                  <li
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "10px" : "11px",
                    }}
                  >
                    <span style={{ color: "#800080" }}>☽</span> worldwide partnerships
                  </li>
                  <li
                    style={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "10px" : "11px",
                    }}
                  >
                    <span style={{ color: "#800080" }}>☽</span> metaverse desktop integration
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Chat Window - Mobile Responsive */}
        {activeWindows.includes("chat") && (
          <div
            className="window"
            style={{
              position: "absolute",
              top: windowPositions.chat.y,
              left: windowPositions.chat.x,
              width: isMobile ? "95%" : "450px",
              height: isMobile ? "70vh" : "400px",
              maxWidth: "95vw",
              zIndex: 200,
              cursor: windowDragging.chat ? "grabbing" : "default",
            }}
          >
            <div className="title-bar" style={{ cursor: "grab" }} onMouseDown={(e) => handleWindowMouseDown(e, "chat")}>
              <div className="title-bar-text" style={{ fontSize: isMobile ? "10px" : "11px" }}>
                🔥 MYCOIN LIVE CHAT - {onlineUsers.length} online
              </div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={() => closeWindow("chat")}></button>
              </div>
            </div>
            <div
              className="window-body"
              style={{ padding: "5px", height: "calc(100% - 30px)", display: "flex", flexDirection: "column" }}
            >
              {/* Online kullanıcılar */}
              <div
                className="sunken-panel"
                style={{
                  padding: "5px",
                  marginBottom: "5px",
                  maxHeight: isMobile ? "50px" : "60px",
                  overflow: "auto",
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? "9px" : "10px",
                    fontWeight: "bold",
                    color: "#008000",
                    marginBottom: "3px",
                  }}
                >
                  🟢 ONLINE ({onlineUsers.length}):
                </div>
                <div
                  style={{
                    fontSize: isMobile ? "8px" : "9px",
                    color: "#000080",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "5px",
                  }}
                >
                  {onlineUsers.map((user, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: user === userRapperName ? "#ffff00" : "#e0e0e0",
                        padding: "1px 4px",
                        borderRadius: "3px",
                        fontWeight: user === userRapperName ? "bold" : "normal",
                      }}
                    >
                      {user === userRapperName ? `${user} (you)` : user}
                    </span>
                  ))}
                </div>
              </div>

              {/* Chat mesajları */}
              <div
                className="sunken-panel"
                style={{
                  flex: 1,
                  padding: "5px",
                  marginBottom: "5px",
                  overflow: "auto",
                  backgroundColor: "#000000",
                  color: "#00ff00",
                  fontFamily: "Courier New, monospace",
                  fontSize: isMobile ? "10px" : "11px",
                }}
              >
                {chatMessages.map((msg, index) => (
                  <div key={index} style={{ marginBottom: "3px" }}>
                    <span
                      style={{
                        color: msg.isSystem ? "#ffff00" : msg.user === userRapperName ? "#00ffff" : "#00ff00",
                      }}
                    >
                      [{msg.time}] {msg.user}:
                    </span>{" "}
                    <span style={{ color: "#ffffff" }}>{msg.message}</span>
                  </div>
                ))}
              </div>

              {/* Mesaj gönderme */}
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={`Type as ${userRapperName}...`}
                  style={{
                    flex: 1,
                    padding: "3px",
                    fontSize: isMobile ? "10px" : "11px",
                    fontFamily: "MS Sans Serif, sans-serif",
                  }}
                />
                <button
                  className="btn"
                  onClick={handleSendMessage}
                  style={{
                    padding: "3px 8px",
                    fontSize: isMobile ? "10px" : "11px",
                    fontWeight: "bold",
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Glowing Folder Orb - Mobile Responsive */}
        <div
          style={{
            position: "fixed",
            bottom: isMobile ? "45px" : "60px",
            right: isMobile ? "10px" : "20px",
            zIndex: 50,
            cursor: "pointer",
            animation: isOrbOrbiting ? "orbitAroundScreen 10s linear infinite" : "orbFloat 3s ease-in-out infinite",
            touchAction: "none",
          }}
          onClick={handleOrbClick}
        >
          <div
            style={{
              width: isMobile ? "36px" : "48px",
              height: isMobile ? "36px" : "48px",
              borderRadius: "50%",
              position: "relative",
              overflow: "hidden",
              imageRendering: "pixelated",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "radial-gradient(circle, rgba(0,255,255,0.2) 0%, rgba(0,128,128,0.4) 100%)",
            }}
          >
            <img
              src="/images/mycoin-folder.png"
              alt="MYCOIN Orb"
              style={{
                width: "100%",
                height: "100%",
                imageRendering: "pixelated",
                filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))",
              }}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        @keyframes flashingGlow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.3), 0 0 10px rgba(255, 255, 255, 0.2), 0 0 15px rgba(255, 255, 255, 0.1);
            background-color: #00ff00;
            opacity: 1;
          }
          25% {
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.9), 0 0 25px rgba(255, 255, 255, 0.7), 0 0 35px rgba(255, 255, 255, 0.5);
            background-color: #80ff80;
            opacity: 0.8;
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6);
            background-color: #ffffff;
            opacity: 0.3;
          }
          75% {
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.9), 0 0 25px rgba(255, 255, 255, 0.7), 0 0 35px rgba(255, 255, 255, 0.5);
            background-color: #80ff80;
            opacity: 0.8;
          }
        }
        @keyframes popupSlide {
          0% {
            transform: scale(0.8) translateY(-20px);
            opacity: 0;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        .flashing-buy-button {
          animation: flashingGlow 0.8s ease-in-out infinite;
        }
        .flashing-buy-button:hover {
          animation-duration: 0.4s;
        }
        @keyframes folderGlow {
          0%, 100% {
            box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 15px rgba(255, 255, 0, 0.6), 2px 2px 4px rgba(0,0,0,0.2);
            transform: scale(1.05);
          }
        }
        @keyframes coinSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes notificationBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes textGlow {
          0%, 100% {
            text-shadow: 1px 1px 2px black;
          }
          50% {
            text-shadow: 1px 1px 2px black, 0 0 8px rgba(255, 255, 255, 0.8);
          }
        }
        @keyframes orbGlow {
          0% {
            box-shadow: 
              0 0 20px rgba(255, 255, 0, 0.8),
              0 0 40px rgba(255, 128, 0, 0.6),
              0 0 60px rgba(255, 0, 128, 0.4),
              inset 0 0 20px rgba(255, 255, 255, 0.3);
          }
          100% {
            box-shadow: 
              0 0 30px rgba(255, 255, 0, 1),
              0 0 60px rgba(255, 128, 0, 0.8),
              0 0 90px rgba(255, 0, 128, 0.6),
              inset 0 0 30px rgba(255, 255, 255, 0.5);
          }
        }
        @keyframes orbFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes orbitAroundScreen {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(-80vw, 0);
          }
          50% {
            transform: translate(-80vw, -80vh);
          }
          75% {
            transform: translate(0, -80vh);
          }
          100% {
            transform: translate(0, 0);
          }
        }
        @keyframes sparkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .window {
            min-width: 280px !important;
          }
          
          .title-bar-text {
            font-size: 10px !important;
          }
          
          .btn {
            min-height: 24px;
            font-size: 10px !important;
          }
          
          .window-body {
            font-size: 10px !important;
          }
          
          /* Prevent zoom on input focus */
          input[type="text"] {
            font-size: 16px !important;
          }
        }

        @media (max-width: 480px) {
          .window {
            min-width: 260px !important;
          }
          
          .title-bar-text {
            font-size: 9px !important;
          }
          
          .btn {
            font-size: 9px !important;
            padding: 2px 4px !important;
          }
        }
      `}</style>
    </>
  )
}
