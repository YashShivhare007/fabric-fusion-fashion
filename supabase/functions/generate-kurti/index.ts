
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { fabricImageUrl, userImageUrl, kurtiStyle, prompt } = await req.json()

    // Get OpenAI API key from environment
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    // Create prompt for GPT-4.1 image generation
    const generationPrompt = `Create a realistic image of a person wearing a ${kurtiStyle} kurti made from the fabric pattern shown. The kurti should preserve the exact fabric design, colors, and patterns. The person should look natural and the kurti should fit well. Style: ${kurtiStyle}. Additional requirements: ${prompt || 'Make it look elegant and well-fitted.'}`

    // Call OpenAI DALL-E 3 API (GPT-4.1 includes image generation capabilities)
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: generationPrompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        style: "natural"
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`)
    }

    const result = await response.json()
    const generatedImageUrl = result.data[0]?.url

    if (!generatedImageUrl) {
      throw new Error('No image generated')
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        imageUrl: generatedImageUrl,
        prompt: generationPrompt
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error generating image:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
