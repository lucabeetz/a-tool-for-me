"use client"

import Link from "next/link"
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Display() {
  const [posts, setPosts] = useState([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    const updateTexts = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from("text")
        .select()

      console.log(user)

      if (error) {
        console.log("error getting texts", error)
        return
      }

      for (const post of data) {
        const res = await supabase
          .storage
          .from('images')
          .getPublicUrl(`public/${post.id}.png`)

        if (res.error) {
          post.image = null
          continue
        }

        post.image = res.data.publicUrl
      }

      setPosts(data)
      console.log(data)
    }

    updateTexts()
  }, [])

  return (
    <div className="w-screen mx-auto h-screen bg-[#FCF6E5] p-4">
      <div className="grid grid-cols-5 gap-4">
        {posts.map((post, index) => (
          <Link key={index} href={`/text/${post.id}`}>
            <div key={index} className="w-full h-0 pb-full bg-blue-300 cursor-pointer" style={{ backgroundImage: `url('${post.image}')`, backgroundSize: 'cover' }}></div>
          </Link>
        ))}
        <div className="border border-dashed border-slate-400 w-full h-0 pb-full cursor-pointer border-inline"></div>
      </div>
    </div>
  )
}