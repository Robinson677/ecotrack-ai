export type AnalysisResult = {
  footprint: string
  transport: string
  electricity: string
  recycled: string
  impact: 'Bajo' | 'Medio' | 'Alto'
  recommendation: string
  category: 'transport' | 'electricity' | 'recycling' | 'general'
}

export function simulateAnalysis(activity: string): AnalysisResult {
  const text = activity.toLowerCase()
  const hasTransport = /transporte|viaj|coche|auto|camion|paqueter|env[ií]o|entrega|kil[oó]metro|km/.test(text)
  const hasElectricity = /electricidad|eléctric|electric|kwh|energ[ií]a|luz|equipos|consumo/.test(text)
  const hasRecycling = /recicl|cart[oó]n|material|residuo|pl[aá]stico|papel/.test(text)

  if (hasTransport) {
    return {
      footprint: '18.6 kg', transport: '14.2 kg', electricity: '2.1 kg', recycled: hasRecycling ? '1.4 kg' : '0.3 kg', impact: 'Medio', category: 'transport',
      recommendation: 'Considera optimizar las rutas de entrega para reducir desplazamientos innecesarios y consolidar tus envíos semanales.',
    }
  }
  if (hasElectricity) {
    return {
      footprint: '16.8 kg', transport: '1.2 kg', electricity: '13.7 kg', recycled: hasRecycling ? '0.9 kg' : '0.2 kg', impact: 'Medio', category: 'electricity',
      recommendation: 'Revisa los equipos que permanecen encendidos durante periodos sin actividad y considera mejorar su eficiencia energética.',
    }
  }
  if (hasRecycling) {
    return {
      footprint: '8.4 kg', transport: '2.8 kg', electricity: '1.7 kg', recycled: '3.2 kg', impact: 'Bajo', category: 'recycling',
      recommendation: 'Mantén la separación de materiales y busca proveedores que utilicen empaques reciclados o reutilizables.',
    }
  }
  return {
    footprint: '12.4 kg', transport: '4.8 kg', electricity: '5.1 kg', recycled: '0.8 kg', impact: 'Bajo', category: 'general',
    recommendation: 'Registra esta actividad con frecuencia para identificar patrones y priorizar las acciones con mayor impacto.',
  }
}
