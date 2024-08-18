const fetch = require("node-fetch")
const fs = require("fs")
const {createServer} = require("node:http")

const hostname = "127.0.0.1"
const port = 3000

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain")
    const url = req.url
    if (url.match(/^\/index.html/)) {
        res.writeHeader(200, {"Content-Type": "text/html"}) 
        res.write(fs.readFileSync("index.html"))
        res.end()
    } else if (url == "/data.json") {
        res.writeHeader(200, {"Content-Type": "json"}) 
        res.write(fs.readFileSync("data.json"))
        res.end()
    }
    else {
        res.end("404")
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})