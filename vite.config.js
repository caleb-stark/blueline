import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

const nhlApiProxy = {
  "/nhl-api":{
    target:"https://api-web.nhle.com",
    changeOrigin:true,
    secure:false,
    rewrite:path => path.replace(/^\/nhl-api/, "")
  }
}

export default defineConfig({
  plugins:[react()],
  server:{
    proxy:nhlApiProxy
  },
  preview:{
    proxy:nhlApiProxy
  },
  test:{
    environment:"jsdom",
    setupFiles:"./src/test/setup.js"
  }
})
