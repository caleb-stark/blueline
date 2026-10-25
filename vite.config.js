import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

const nhlApiProxy = {
  "/nhl-api":{
    target:"https://api-web.nhle.com",
    changeOrigin:true,
    secure:false,
    followRedirects:true,
    rewrite:path => path.replace(/^\/nhl-api/, "")
  }
}

function createYouTubeProxy(env){
  return {
    "/youtube-api":{
      target:"https://www.googleapis.com",
      changeOrigin:true,
      secure:true,
      rewrite:path => {
        const url = new URL(path, "http://localhost")

        if(env.YOUTUBE_API_KEY){
          url.searchParams.set("key", env.YOUTUBE_API_KEY)
        }

        url.pathname = url.pathname.replace(/^\/youtube-api/, "")
        return `${url.pathname}${url.search}`
      }
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "")
  const proxy = { ...nhlApiProxy, ...createYouTubeProxy(env) }

  return {
    plugins:[react()],
    server:{ proxy },
    preview:{ proxy },
    test:{
      environment:"jsdom",
      setupFiles:"./src/test/setup.js"
    }
  }
})
