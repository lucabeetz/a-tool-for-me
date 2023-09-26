"use client"

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Display() {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null)
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

  const numbers = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className="w-screen mx-auto h-screen bg-[#FCF6E5] p-4">
      <div className="grid grid-cols-5 gap-4">
        {posts.map((post, index) => (
          <div key={index} className="w-full h-0 pb-full bg-blue-300" style={{ backgroundImage: `url('${post.image}')`, backgroundSize: 'cover' }}></div>
        ))}
      </div>
    </div>
  )
}