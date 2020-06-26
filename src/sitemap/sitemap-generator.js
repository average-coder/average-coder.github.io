require("babel-register")({
    presets: ["es2015", "react"]
  });


  const router = require("./sitemap-routes").default;
  const Sitemap = require("react-router-sitemap").default;

const axios = require("axios");

async function generateSitemap() {
    const res = await axios.get('/list/');
    const data = res.data;  
      let idMap = [];
      for(var i = 0; i < data.length; i++) {
        idMap.push({ slug: data[i].slug });
      }
      const paramsConfig = {
        "/post/:slug": idMap
      };
  
      return (
        new Sitemap(router)
            .applyParams(paramsConfig)
            .build("https://avgcdr.com")
            .save("./public/sitemap.xml")
      );
  }
  
  generateSitemap();