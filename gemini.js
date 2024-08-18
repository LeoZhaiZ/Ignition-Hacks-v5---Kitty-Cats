const { GoogleGenerativeAI } = require("@google/generative-ai")
const fs = require("fs")
const dir = "./cats"
const decodedfiles = {}
const SECRET = fs.readFileSync("secret")


const genAI = new GoogleGenerativeAI(SECRET)
const model = genAI.getGenerativeModel({model: "gemini-pro"})
const baseprompt = "Rate these cat descriptions based on the following traits from a scale of 1 to 5 whole numbers only: playful, affectionate, sociable, independent, adventurous. Output in json as a dictionary with keys corresponding to each cat ID."

function parsePrompt(prompt) {
  const trimmed = prompt.replaceAll("```json", "").replaceAll("```", "")
  const content = JSON.parse(trimmed)
  return content
}

async function sendPrompt(prompt) {
  const result = await model.generateContent(prompt)
  const text = result.response.text()
  return text
}

async function updateData(prompt) {
  const result = await sendPrompt(prompt)
  const parsed = parsePrompt(result)
  for (const [filename, traits] of Object.entries(parsed)) {
    decodedfiles[filename]["traits"] = traits
    console.log(decodedfiles[filename])
    fs.writeFile(`${dir}/${filename}`, JSON.stringify(decodedfiles[filename]), () => {
      console.log(`updated ${filename}`)
    })
  }
}

async function main() {
  const files = fs.readdirSync(dir)
  let current = baseprompt
  console.log(files)
  //let started = false
  for (let file of files) {
    //if (file != "millie-bonded-with-abbie-72031152.json" && !started) {
    //  continue
    //}
    started = true
    const content = fs.readFileSync(`${dir}/${file}`)
    const decoded = JSON.parse(content)
    decodedfiles[file] = decoded
    const thisprompt = ` START DESCRIPTION Cat ID: "${file}" Cat traits: ${decoded.traits} ${decoded.desc} END DESCRIPTION`
    if (thisprompt.length + current.length > 30000) {
      await updateData(current, decodedfiles)
      current = baseprompt + thisprompt
    } else {
      current += thisprompt
    }
  }
  await updateData(current, decodedfiles)
}

main()