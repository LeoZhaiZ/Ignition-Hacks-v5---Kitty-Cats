const fs = require("fs")
const dir = "./cats"

const files = fs.readdirSync(dir)
let spliced = {}

for (const file of files) {
    const decoded = JSON.parse(fs.readFileSync(`${dir}/${file}`))
    spliced[file] = decoded
    console.log(`done ${file}`)
}

fs.writeFileSync("data.json", JSON.stringify(spliced))