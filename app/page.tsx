'use client'

import { useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  Leaf,
  Lightbulb,
  Menu,
  Recycle,
  Sparkles,
  Truck,
  X,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const exampleText = 'Enviamos 50 paquetes por paquetería nacional y usamos cajas de cartón reciclado.'

export default function Home() {
  const [activity, setActivity] = useState('')
  const [analyzed, setAnalyzed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const analyzeActivity = () => {
    if (activity.trim()) setAnalyzed(true)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a href="#inicio" className="flex items-center gap-2.5" aria-label="EcoTrack AI inicio">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Leaf className="size-5" strokeWidth={2.4} />
            </span>
            <span className="text-lg font-semibold tracking-tight">EcoTrack <span className="text-primary">AI</span></span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex" aria-label="Navegación principal">
            <a className="transition-colors hover:text-foreground" href="#como-funciona">Cómo funciona</a>
            <a className="transition-colors hover:text-foreground" href="#beneficios">Beneficios</a>
            <a className="transition-colors hover:text-foreground" href="#contacto">Contacto</a>
          </nav>
          <Button variant="outline" className="hidden rounded-full border-border bg-card px-5 md:flex">Iniciar sesión</Button>
          <button className="rounded-lg p-2 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {menuOpen && <nav className="flex flex-col gap-4 border-t border-border px-6 py-5 text-sm font-medium md:hidden"><a href="#como-funciona">Cómo funciona</a><a href="#beneficios">Beneficios</a><a href="#contacto">Contacto</a></nav>}
      </header>

      <section id="inicio" className="mx-auto max-w-7xl px-6 pb-16 pt-16 lg:px-10 lg:pb-24 lg:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3.5 py-1.5 text-xs font-semibold text-primary"><Sparkles className="size-3.5" /> Sostenibilidad, simplificada</div>
          <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-6xl">Mide el impacto de tu negocio. <span className="text-primary">Mejora el planeta.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">EcoTrack AI convierte tus actividades diarias en datos de impacto ambiental claros y accionables.</p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-border bg-card p-5 shadow-[0_20px_60px_-30px_rgba(25,70,45,0.22)] sm:p-8">
          <div className="flex items-center justify-between gap-4"><div><p className="font-semibold">Cuéntame sobre tu actividad</p><p className="mt-1 text-sm text-muted-foreground">Describe cualquier actividad de tu negocio y calcularemos su impacto.</p></div><div className="hidden rounded-xl bg-primary/10 p-3 text-primary sm:block"><BarChart3 className="size-5" /></div></div>
          <textarea value={activity} onChange={(e) => setActivity(e.target.value)} placeholder="Ej. Viajé 200 km en coche para visitar a un cliente..." className="mt-6 min-h-36 w-full resize-none rounded-2xl border border-input bg-background p-4 text-sm leading-6 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" aria-label="Describe tu actividad" />
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><button onClick={() => setActivity(exampleText)} className="flex items-center gap-2 text-left text-xs text-muted-foreground transition hover:text-foreground"><Lightbulb className="size-4 text-primary" /> Prueba con un ejemplo</button><Button onClick={analyzeActivity} disabled={!activity.trim()} className="rounded-xl bg-primary px-6 text-primary-foreground hover:bg-primary/90">Analizar impacto <ArrowRight className="ml-2 size-4" /></Button></div>
        </div>

        {analyzed && <section aria-live="polite" className="mx-auto mt-8 max-w-4xl rounded-3xl border border-primary/20 bg-primary/5 p-5 sm:p-8"><div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-sm font-semibold text-primary">Análisis completado</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">Tu actividad genera aproximadamente</h2></div><span className="flex items-center gap-2 rounded-full bg-card px-3 py-2 text-xs font-medium text-muted-foreground"><Check className="size-3.5 text-primary" /> Estimación verificada</span></div><div className="mt-6 grid gap-4 sm:grid-cols-3"><ResultCard icon={<Truck />} value="12.4 kg" label="CO₂ equivalente" /><ResultCard icon={<Recycle />} value="0.8 kg" label="Material reciclado" /><ResultCard icon={<Zap />} value="Bajo" label="Nivel de impacto" /></div><div className="mt-6 flex gap-3 rounded-2xl border border-primary/15 bg-card p-4"><Lightbulb className="mt-0.5 size-5 shrink-0 text-primary" /><div><p className="text-sm font-semibold">Una recomendación para ti</p><p className="mt-1 text-sm leading-6 text-muted-foreground">Consolida tus envíos semanales para reducir hasta un 18% las emisiones asociadas al transporte.</p></div></div></section>}
      </section>

      <section id="como-funciona" className="border-y border-border/70 bg-card/60 px-6 py-16 lg:px-10 lg:py-20"><div className="mx-auto max-w-7xl"><div className="max-w-xl"><p className="text-sm font-semibold text-primary">Cómo funciona</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Pequeños datos, grandes cambios.</h2><p className="mt-4 leading-7 text-muted-foreground">Empieza a tomar mejores decisiones ambientales sin hojas de cálculo complicadas.</p></div><div id="beneficios" className="mt-12 grid gap-8 md:grid-cols-3"><Step number="01" icon={<Sparkles />} title="Describe" text="Cuéntanos qué ocurre en tu operación con tus propias palabras." /><Step number="02" icon={<BarChart3 />} title="Entiende" text="Recibe una estimación clara y fácil de interpretar en segundos." /><Step number="03" icon={<Leaf />} title="Actúa" text="Aplica recomendaciones concretas para reducir tu impacto." /></div></div></section>
      <footer id="contacto" className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-10"><p>© 2026 EcoTrack AI</p><p>Decisiones más inteligentes para un futuro más verde.</p></footer>
    </main>
  )
}

function ResultCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) { return <div className="rounded-2xl border border-border bg-card p-4"><div className="flex items-center gap-2 text-primary">{icon && <span className="[&>svg]:size-4">{icon}</span>}<span className="text-xs font-medium text-muted-foreground">{label}</span></div><p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p></div> }
function Step({ number, icon, title, text }: { number: string; icon: React.ReactNode; title: string; text: string }) { return <div className="relative border-t border-border pt-5"><div className="flex items-center justify-between"><span className="font-mono text-xs text-muted-foreground">{number}</span><span className="text-primary [&>svg]:size-5">{icon}</span></div><h3 className="mt-8 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div> }
