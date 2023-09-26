import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export const dynamic = 'force-dynamic'

export default async function Text({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.from('text').select().eq('id', Number(params.id))
  console.log(params)

  console.log(data)

  return (
    <div className="flex h-screen flex-col items-center justify-between p-8 bg-[#FCF6E5]">
      {data.length > 0 ?
        <p className="w-1/2  border-none outline-none bg-transparent">{data[0].content}</p>
        :
        <p>Not found</p>
      }
    </div>
  )
}