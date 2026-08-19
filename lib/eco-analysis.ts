export type ExtractedActivity = {
  km_recorridos: number
  tipo_transporte: string | null
  kwh_electricidad: number
  resumen_actividad: string
}

export type AnalysisResult = {
  footprint: string
  transport: string
  electricity: string
  recycled: string
  impact: 'Bajo' | 'Medio' | 'Alto'
  recommendation: string
  category: 'transport' | 'electricity' | 'recycling' | 'general'
  summary: string
  transportType: string | null
}

const KG_CO2_PER_KM = 0.12
const KG_CO2_PER_KWH = 0.4

export function calculateAnalysis(data: ExtractedActivity): AnalysisResult {
  const transportKg = data.km_recorridos * KG_CO2_PER_KM
  const electricityKg = data.kwh_electricidad * KG_CO2_PER_KWH
  const footprintKg = transportKg + electricityKg
  const category = transportKg >= electricityKg && transportKg > 0 ? 'transport' : electricityKg > 0 ? 'electricity' : 'general'
  const impact = footprintKg >= 50 ? 'Alto' : footprintKg >= 15 ? 'Medio' : 'Bajo'

  return {
    footprint: `${footprintKg.toFixed(1)} kg`,
    transport: `${transportKg.toFixed(1)} kg`,
    electricity: `${electricityKg.toFixed(1)} kg`,
    recycled: '0.0 kg',
    impact,
    category,
    summary: data.resumen_actividad,
    transportType: data.tipo_transporte,
    recommendation: category === 'transport'
      ? 'Considera optimizar las rutas de entrega, consolidar envíos o probar alternativas de menor emisión.'
      : category === 'electricity'
        ? 'Revisa los equipos que permanecen encendidos y considera mejorar su eficiencia energética.'
        : 'Registra más actividades para identificar patrones y priorizar las acciones con mayor impacto.',
  }
}
