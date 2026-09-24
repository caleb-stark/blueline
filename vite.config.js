import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

console.log("VITE CONFIG LOADED")

export default defineConfig({
  plugins:[react()],
  server:{
    proxy:{
      "/nhl-api":{
        target:"https://api-web.nhle.com",
        changeOrigin:true,
        secure:false,
        rewrite:path => path.replace(/^\/nhl-api/, "")
      }
    }
  }
})