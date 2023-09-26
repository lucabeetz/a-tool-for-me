import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// import { Database } from "./types"

console.log("Hello from text-to-image edge function")

const hf = new HfInference(Deno.env.get('HUGGING_FACE_ACCESS_TOKEN'))

// type SoRecord = Database['public']['Tables']['text']['Row']
// interface WebhookPayload {
//   type: 'INSERT' | 'UPDATE' | 'DELETE'
//   table: string
//   record: SoRecord
//   schema: 'public'
//   old_record: null | SoRecord
// }

serve(async (req) => {
  const payload = await req.json()
  const soRecord = payload.record

  const supabaseAdminClient = createClient(
    // Supabase API URL - env var exported by default when deployed.
    Deno.env.get('SUPABASE_URL') ?? '',
    // Supabase API SERVICE ROLE KEY - env var exported by default when deployed.
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  console.log("Generating image")
  const image = await hf.textToImage(
    {
      inputs: soRecord.content,
      model: 'stabilityai/stable-diffusion-2',
    },
    {
      use_cache: false,
    }
  )

  console.log("Uploading image")
  const { data, error } = await supabaseAdminClient
    .storage
    .from("images")
    .upload(`public/${soRecord.id}.png`, image, {
      cacheControl: "3600"
    })

  return new Response("ok")
})
