require("babel-register")({
    presets: ["es2015", "react"]
  });


  const router = require("./sitemap-routes").default;
  const Sitemap = require("react-router-sitemap").default;

const axios = require("axios");

let posts = [];

axios.get('/list/')
    .then((res)=>{
        posts = res.data
    })
    .catch((err)=>{console.log(err)})

  function generateSitemap() {
      let idMap = [];
      for(var i = 0; i < posts.length; i++) {
        idMap.push({ slug: posts[i].slug });
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