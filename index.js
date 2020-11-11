/** @format */

const fetch = require("node-fetch");
global.fetch = fetch;
const Unsplash = require("unsplash-js").default;
const toJson = require("unsplash-js").toJson;
const express = require("express");
const app = express();
var cors = require('cors')
 
app.use(cors())
app.get("/random", (req, res) => {
	let randomPage = Math.floor(Math.random() * 101);
	unsplash.photos
		.listPhotos(randomPage, 9, "latest")
		.then(toJson)
		.then(json => {
			let urlArr = [];
			for (let i = 0; i < json.length; i++) {
				urlArr.push(json[i].urls.small);
			}
			res.status(200).send({
				data:json,
				urls: urlArr,
			});
			// Your code
		});
});
app.get('/:keyword',(req,res)=>{

  unsplash.search.photos(  req.params.keyword, 1, 10, { orientation: "portrait", })
  .then(toJson)
  .then(json => {
    let urlArr=[]
    for(let i =0 ;i<json.results.length;i++){
     urlArr.push(json.results[i].urls.small);
    }
    res.status(200).send({
    	urls:urlArr,
    	data:json,
    });
  });

})
app.listen(8080,()=>console.log("the server is listening "))
const unsplash = new Unsplash({
	accessKey: "CmKWeZlhlXs9EhyHW1O1L4XoMh6g9--nPI3JMa-digg",
	// Optionally you can also configure a custom header to be sent with every request
	headers: {
		"X-Custom-Header": "foo",
	},
	// Optionally if using a node-fetch polyfill or a version of fetch which supports the timeout option, $
});
