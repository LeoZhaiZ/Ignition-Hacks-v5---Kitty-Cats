const fetch = require("node-fetch")
const fs = require("fs")
const {createServer} = require("node:http")

const hostname = "127.0.0.1"
const port = 3000


const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain")
    const url = req.url
    if (url.match(/^\/https/)) {
        fetch(url.substring(1)).then((res) => {
            res.text().then((body) => {
                try {
                    const data = {}
                    data["id"] = url.match(/cat\/([\w+\-]+)\//)[1]
                    data["characteristics"] = body.match(/<dd class="txt u-vr4x">(.+)<\/dd>/)[1]
                    data["name"] = body.match(/petProfilePetName:'(.+)'/)[1]
                    data["desc"] = body.match(/<\/h2>\s+<div class="u\-vr4x">\s+(.+?)<\/div>/s)[1]
                    data["img"] = body.match(/<img src="(https:\/\/.+)" alt=/)[1]
                    data["url"] = url.substring(1)
                    if (data["desc"].length > 299) {
                        fs.writeFile(`cats/${data["id"]}.json`, JSON.stringify(data), () => {
                            console.log(`added ${data["name"]}`)
                        })
                    }
                } catch(err) {
                    console.log(err)
                }
            })
        })
    }
    res.end("Success")
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})