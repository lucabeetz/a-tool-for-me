import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export const dynamic = 'force-dynamic'

export default async function Text({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.from('text').select().eq('id', Number(params.id))

  const imageRes = await supabase
    .storage
    .from("images")
    .getPublicUrl(`public/${params.id}.png`)
  const imageUrl = imageRes.data.publicUrl

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-8 bg-[#FCF6E5]">
      {data.length > 0 ?
        <div className="flex flex-col w-full items-center justify-between">
          <img src={imageUrl} className="w-80 pb-8"></img>
          <p className="w-1/2  border-none outline-none bg-transparent whitespace-pre-line">{data[0].content}</p>
        </div>
        :
        <p>Not found</p>
      }
    </div>
  )
}