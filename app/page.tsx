import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'
import SupabaseLogo from '../components/SupabaseLogo'
import NextJsLogo from '../components/NextJsLogo'
import Editor from '@/components/editor'

export const dynamic = 'force-dynamic'


export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex h-screen flex-col items-center justify-between p-8 bg-[#FCF6E5]">
      <textarea className="w-1/2 h-full border-none outline-none bg-transparent resize-none" autoFocus></textarea>
    </div>
  )
}
