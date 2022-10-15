import { serve } from "https://deno.land/std@0.154.0/http/server.ts";


serve(async (req) => {
    const searchQuery = new URL(req.url).searchParams.get("q") || "h"
    const response = await fetch(`https://dorar.net/dorar_api.json?skey=${searchQuery}`)
    const jsonResponse = await response.json()
    const result = `${jsonResponse.ahadith.result}`.replace(new RegExp('<[^>]*>', 'g'), '').split(new RegExp('--------------', 'g'))
    if(result.length > 1){
        const ahadith = result.map((s)=> {
            const [hadith, rawi, mohadith, resource, page,isnad] = s.trim().split('\n').filter((sd)=> sd !== "")
            return {
                hadith: hadith?.split('-').at(-1)?.trim(),
                rawi: rawi?.split(":").at(-1)?.trim(),
                mohadith: mohadith?.split(":").at(-1)?.trim(),
                resource: resource?.split(":").at(-1)?.trim(),
                page: page?.split(":").at(-1)?.trim(),
                isnad: isnad?.split(":").at(-1)?.trim()
            }
            
        })
        return new Response(JSON.stringify({
            code: 200,
            count: ahadith.length,
            ahadith: ahadith.slice(0, ahadith.length - 1)
        }), {
            headers: { "content-type": "application/json" },
            status: 200,
        });
    }
    
  return new Response(JSON.stringify({
      code: 404,
      message: "no results for your input"
  }), {
    headers: { "content-type": "application/json" },
    status: 404
  });
});