import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Truck, Star } from 'lucide-react'

function HeroBanner() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.4
        this.speedY = -Math.random() * 0.6 - 0.2
        this.opacity = Math.random() * 0.5 + 0.1
        this.color = Math.random() > 0.6 ? '#D32F2F' : '#FFC107'
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.opacity -= 0.002
        if (this.opacity <= 0 || this.y < 0) this.reset()
      }
      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.shadowBlur = 6
        ctx.shadowColor = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    for (let i = 0; i < 80; i++) {
      particles.push(new Particle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.update()
        p.draw()
      })
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const stats = [
    { icon: Shield, label: '100% Authentic', sub: 'Genuine products only' },
    { icon: Truck, label: 'Same Day Delivery', sub: 'Within 5–10 km radius' },
    { icon: Star, label: 'Top Brands', sub: 'GNC · MuscleBlaze · Avvatar' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  }

  return (
    <section className="relative min-h-screen hero-bg noise overflow-hidden flex items-center">

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Radial glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium text-accent border border-accent/20">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Now delivering in Panvel & nearby areas
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6"
          >
            <span className="text-white">FUEL YOUR</span>
            <br />
            <span className="gradient-text text-glow">GRIND.</span>
            <br />
            <span className="text-white/90">OWN YOUR</span>
            <br />
            <span className="text-white">GAINS.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-white/60 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl"
          >
            Premium gym supplements from GNC, MuscleBlaze & Avvatar —
            delivered same day to your door. No fake products. No waiting.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary shine flex items-center gap-2 text-base"
              >
                Shop Now
                <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link to="/products?category=Whey Protein">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="glass px-7 py-3 rounded-lg font-semibold text-white/80 hover:text-white border border-white/10 hover:border-primary/50 transition-all duration-300 text-base"
              >
                Browse Whey Protein
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass rounded-xl p-4 flex items-center gap-3 border border-white/5 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <stat.icon size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{stat.label}</p>
                  <p className="text-white/40 text-xs">{stat.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#212121] to-transparent pointer-events-none" />
    </section>
  )
}

export default HeroBanner