import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const style = searchParams.get('style')
  const isPremium = searchParams.get('isPremium')

  try {
    const supabase = await createClient()
    let query = supabase
      .from('templates')
      .select('*')
      .order('sort_order', { ascending: true })

    if (category) query = query.eq('category', category)
    if (style) query = query.eq('style', style)
    if (isPremium !== null) query = query.eq('is_premium', isPremium === 'true')

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Templates fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 })
  }
}
