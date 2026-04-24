import express from "express";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

// Only create client if variables are present to avoid "supabaseUrl is required" error
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Sitemap.xml route
  app.get("/sitemap.xml", async (req, res) => {
    const baseUrl = "https://tms-hydra.sk"; // Replace with actual domain if known
    
    const staticPages = [
      "",
      "/o-nas",
      "/sluzby",
      "/technologie",
      "/kontakt"
    ];

    let seoPages = [];
    let projects = [];

    if (supabase) {
      const { data: seoData } = await supabase.from("seo_city_pages").select("slug");
      const { data: projectsData } = await supabase.from("projects").select("id");
      seoPages = seoData || [];
      projects = projectsData || [];
    }

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    staticPages.forEach(page => {
      xml += `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>monthly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`;
    });

    if (seoPages) {
      seoPages.forEach(page => {
        xml += `
  <url>
    <loc>${baseUrl}/sluzby/${page.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
      });
    }

    xml += `
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*all", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
