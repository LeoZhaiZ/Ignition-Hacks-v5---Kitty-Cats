let page
let matches

page = document.documentElement.innerHTML
matches = [...page.matchAll(/class="petCard-link" href="(https:\/\/www\.petfinder\.com\/cat\/.+\/)"/g)]
for (let match of matches) {
    fetch(`http://127.0.0.1:3000/${match[1]}`)
}