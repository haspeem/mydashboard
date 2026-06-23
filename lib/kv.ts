import { kv } from '@vercel/kv'

const isKvAvailable = Boolean(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN,
)

const memoryStore = new Map<string, number | string[]>()

function memGet(key: string): number | string[] | null {
  const val = memoryStore.get(key)
  if (val === undefined) return null
  return val
}

function memSet(key: string, value: number | string[]): void {
  memoryStore.set(key, value)
}

export async function incrViews(slug: string): Promise<number> {
  if (isKvAvailable) {
    const [articleViews, total] = await Promise.all([
      kv.incr(`views:${slug}`),
      kv.incr('views:total'),
    ])
    return articleViews
  }
  const current = (memGet(`views:${slug}`) as number) ?? 0
  const total = (memGet('views:total') as number) ?? 0
  memSet(`views:${slug}`, current + 1)
  memSet('views:total', total + 1)
  return current + 1
}

export async function getViews(slug: string): Promise<number> {
  if (isKvAvailable) {
    const v = await kv.get<number>(`views:${slug}`)
    return v ?? 0
  }
  return (memGet(`views:${slug}`) as number) ?? 0
}

export async function getTotalViews(): Promise<number> {
  if (isKvAvailable) {
    const v = await kv.get<number>('views:total')
    return v ?? 0
  }
  return (memGet('views:total') as number) ?? 0
}

export async function getAllViews(
  slugs: string[],
): Promise<Record<string, number>> {
  if (isKvAvailable) {
    const keys = slugs.map((s) => `views:${s}`)
    const values = await kv.mget<number[]>(...keys)
    return Object.fromEntries(slugs.map((s, i) => [s, values[i] ?? 0]))
  }
  return Object.fromEntries(
    slugs.map((s) => [s, (memGet(`views:${s}`) as number) ?? 0]),
  )
}

export async function incrLikes(slug: string): Promise<number> {
  if (isKvAvailable) {
    return kv.incr(`likes:${slug}`)
  }
  const current = (memGet(`likes:${slug}`) as number) ?? 0
  memSet(`likes:${slug}`, current + 1)
  return current + 1
}

export async function decrLikes(slug: string): Promise<number> {
  if (isKvAvailable) {
    return kv.decr(`likes:${slug}`)
  }
  const current = (memGet(`likes:${slug}`) as number) ?? 0
  const next = Math.max(0, current - 1)
  memSet(`likes:${slug}`, next)
  return next
}

export async function getLikes(slug: string): Promise<number> {
  if (isKvAvailable) {
    const v = await kv.get<number>(`likes:${slug}`)
    return v ?? 0
  }
  return (memGet(`likes:${slug}`) as number) ?? 0
}

export async function getTotalLikes(): Promise<number> {
  if (isKvAvailable) {
    const v = await kv.get<number>('likes:total')
    return v ?? 0
  }
  return (memGet('likes:total') as number) ?? 0
}

export async function trackUV(visitorId: string): Promise<number> {
  if (isKvAvailable) {
    const added = await kv.sadd('uv:visitors', visitorId)
    if (added) await kv.incr('uv:total')
    const total = await kv.get<number>('uv:total')
    return total ?? 1
  }
  let visitors = (memGet('uv:visitors') as string[]) ?? []
  if (!visitors.includes(visitorId)) {
    visitors = [...visitors, visitorId]
    memSet('uv:visitors', visitors)
    memSet('uv:total', visitors.length)
  }
  return visitors.length
}

export async function getTotalUV(): Promise<number> {
  if (isKvAvailable) {
    const v = await kv.get<number>('uv:total')
    return v ?? 0
  }
  const visitors = (memGet('uv:visitors') as string[]) ?? []
  return visitors.length
}
