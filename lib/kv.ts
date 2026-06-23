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

function todayKey(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const WEEKDAY_ZH = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

export function last7DaysLabels(): string[] {
  const days: string[] = []
  const now = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(now.getDate() - i)
    days.push(WEEKDAY_ZH[d.getDay()])
  }
  return days
}

export async function incrViews(slug: string): Promise<number> {
  const day = todayKey()
  if (isKvAvailable) {
    const [articleViews, total] = await Promise.all([
      kv.incr(`views:${slug}`),
      kv.incr('views:total'),
      kv.incr(`views:daily:${day}`),
    ])
    return articleViews
  }
  const current = (memGet(`views:${slug}`) as number) ?? 0
  const total = (memGet('views:total') as number) ?? 0
  const daily = (memGet(`views:daily:${day}`) as number) ?? 0
  memSet(`views:${slug}`, current + 1)
  memSet('views:total', total + 1)
  memSet(`views:daily:${day}`, daily + 1)
  return current + 1
}

export async function getDailyViewsLast7Days(): Promise<
  { day: string; views: number }[]
> {
  const now = new Date()
  const keys: string[] = []
  const labels: string[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(now.getDate() - i)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    keys.push(`views:daily:${y}-${m}-${dd}`)
    labels.push(WEEKDAY_ZH[d.getDay()])
  }

  if (isKvAvailable) {
    const values = await kv.mget<number[]>(...keys)
    return labels.map((day, i) => ({ day, views: values[i] ?? 0 }))
  }
  return labels.map((day, i) => ({
    day,
    views: (memGet(keys[i]) as number) ?? 0,
  }))
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
    const [articleLikes] = await Promise.all([
      kv.incr(`likes:${slug}`),
      kv.incr('likes:total'),
    ])
    return articleLikes
  }
  const current = (memGet(`likes:${slug}`) as number) ?? 0
  const total = (memGet('likes:total') as number) ?? 0
  memSet(`likes:${slug}`, current + 1)
  memSet('likes:total', total + 1)
  return current + 1
}

export async function decrLikes(slug: string): Promise<number> {
  if (isKvAvailable) {
    const [articleLikes] = await Promise.all([
      kv.decr(`likes:${slug}`),
      kv.decr('likes:total'),
    ])
    return Math.max(0, articleLikes)
  }
  const current = (memGet(`likes:${slug}`) as number) ?? 0
  const next = Math.max(0, current - 1)
  const total = (memGet('likes:total') as number) ?? 0
  memSet(`likes:${slug}`, next)
  memSet('likes:total', Math.max(0, total - 1))
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
