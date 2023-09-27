"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'

export const dynamic = 'force-dynamic'

export default function Home() {
  const supabase = createClientComponentClient()
  const [text, setText] = useState("")
  const handleTextChange = (event: any) => {
    setText(event.target.value)
  }

  const updateOrCreatePost = async () => {
    const { error } = await supabase
      .from("text")
      .insert({ "content": text })

    console.log("error creating new text", error)
  }

  return (
    <div className="flex h-screen flex-col items-center justify-between p-8 bg-[#FCF6E5]">
      <textarea className="w-1/2  border-none outline-none bg-transparent resize-none" autoFocus value={text} onChange={handleTextChange}></textarea>
      <button onClick={updateOrCreatePost}>Save</button>
    </div>
  )
}
