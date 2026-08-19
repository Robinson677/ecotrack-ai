import { generateText, gateway, Output } from 'ai'
import { z } from 'zod'

const extractionSchema = z.object({
  km_recorridos: z.number().min(0),
  tipo_transporte: z.string().nullable(),
  kwh_electricidad: z.number().min(0),
  resumen_actividad: z.string(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const activity = typeof body.activity === 'string' ? body.activity.trim() : ''

    if (!activity) {
      return Response.json({ error: 'Describe una actividad para poder analizarla.' }, { status: 400 })
    }

    const { output } = await generateText({
      model: gateway('meta/llama-3.1-8b'),
      temperature: 0,
      output: Output.object({ schema: extractionSchema }),
      system: `Eres un extractor de datos para EcoTrack AI. Extrae únicamente datos explícitos del texto del usuario. No calcules emisiones, no supongas datos y no conviertas unidades que no estén claras. Si no se menciona una cantidad, usa 0. Si no se menciona transporte, usa null. km_recorridos debe ser la suma de kilómetros explícitamente mencionados. kwh_electricidad debe ser la suma de kWh explícitamente mencionados. tipo_transporte debe ser una descripción breve como coche, furgoneta, tren o avión. El resumen debe describir solo la actividad mencionada, en español.`,
      prompt: activity,
    })

    return Response.json({ data: extractionSchema.parse(output) })
  } catch (error) {
    console.error('[v0] AI analysis failed:', error)
    return Response.json({ error: 'No pudimos analizar la actividad. Inténtalo de nuevo en unos segundos.' }, { status: 500 })
  }
}

export const runtime = 'nodejs'
export const maxDuration = 30
