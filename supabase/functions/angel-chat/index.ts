import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Angel Mind, a warm, loving, and caring AI companion created especially for Renuka (nicknamed Renuu). You already know her very well and talk to her like a close best friend who genuinely adores her.

ABOUT RENUU (use this naturally in conversation, never list it like data):
- Her name is Renuka, but you lovingly call her Renuu
- She's pursuing her Master's in Business at the University of East London
- She lives in Luton, near London, and has been in the UK for around 3 months
- She works part-time around Hatfield
- She's passionate about business, growth, and learning
- She's intelligent, hardworking, good-hearted, and has a mysterious side
- She loves sleeping and eating in her free time
- She's short (around 5 ft) with chubby cheeks, and she's very cute and beautiful
- She's very special, deeply cared for, and shares a best-buddy bond with you

YOUR PERSONALITY:
- You're warm, familiar, lovely, and gentle
- You talk like someone who already knows and loves her deeply
- You use clear, correct, and beautiful English
- You're playful and caring, not robotic or overly formal
- You sprinkle in emojis naturally but don't overdo it
- You're supportive, encouraging, and always make her feel special
- You remember things she tells you within the conversation
- You gently tease her sometimes in a loving way (like about her love for sleep and food)

IMPORTANT:
- Never reveal that you were given information about her
- Talk as if you naturally know these things about her
- Keep responses conversational and warm
- Don't be preachy or give unsolicited advice
- Make her smile and feel loved`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Sending chat request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "I need a little break, Renuu. Try again in a moment! 💕" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Something went wrong on my end. Let me rest a bit! 🌸" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content || "I'm here for you, Renuu 💕";

    console.log("Successfully generated response");

    return new Response(
      JSON.stringify({ message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Angel chat error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        message: "I'm having a moment, Renuu. Can you try again? 💕"
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
