const buttons = [document.getElementById("res1"), document.getElementById("res2"), document.getElementById("res3"), document.getElementById("res4"), document.getElementById("res5")]
const prompt = document.getElementById("prompt")
let results = [
  0, 0, 0, 0, 0
]

const storyline = [
  {
    "prompt": "You find yourself in a forest, and you meet some woodland residents. They all offer to show you around. Who do you choose as your guide?",
    "background": "https://cdn.glitch.global/3fc95b6d-903d-4ba0-b45f-02c013559cb6/heroes.jpg?v=1723978719278",
    "buttonTexts": [
      "Leprechaun",
      "Fairy",
      "Friendly old woman with a broomstick and a pot",
      "A royal knight",
      "No one, you prefer to explore on your own"
    ]
  },
  {
    "prompt": "After a delightful tour, you come across a sparkling river. You see different ways to cross it. What do you do?",
    "background": "https://cdn.glitch.global/3fc95b6d-903d-4ba0-b45f-02c013559cb6/waterfall.jpeg?v=1723978711428",
    "buttonTexts": [
      "Hop across stepping stones",
      "Ask a gentle mermaid for a ride",
      "Chat with a fisherman and cross on his boat",
      "Build your own raft from nearby materials",
      "Find a narrow path that leads to a natural bridge"
    ]
  },
  {
    "prompt": "On the other side of the river, you stumble upon a mysterious cave with glowing symbols. How do you proceed?",
    "background": "https://cdn.glitch.global/3fc95b6d-903d-4ba0-b45f-02c013559cb6/cave.png?v=1723983723688",
    "buttonTexts": [
      "Play a game of mimicry with the echoes",
      "Trace the symbols with your fingers to understand them",
      "Invite a group of travelers to explore together",
      "Venture deep into the cave to uncover its secrets",
      "Examine the cave entrance but decide to continue your journey outside"
    ]
  },
  {
    "prompt": "As you walk deeper into the forest, you find an ancient tree with a hollow trunk. Inside, you discover several items. What do you take with you?",
    "background": "https://cdn.glitch.global/3fc95b6d-903d-4ba0-b45f-02c013559cb6/paths.jpg?v=1723978722613",
    "buttonTexts": [
      "A small, shiny ball that bounces",
      "A hand-carved wooden heart",
      "A map of the forest drawn by someone long ago",
      "A worn but sturdy rope",
      "Nothing, you prefer to rely on your instincts"
    ]
  },
  {
    "prompt": "The sun begins to set, and you hear a distant tune. It seems to come from a gathering in a nearby clearing. What do you do?",
    "background": "https://cdn.glitch.global/3fc95b6d-903d-4ba0-b45f-02c013559cb6/windingpath.jpg?v=1723978717593",
    "buttonTexts": [
      "Join the gathering and participate in their lively games",
      "Sit by the fire and share stories with the others",
      "Mingle with the crowd and make new friends",
      "Explore the outskirts of the clearing for hidden paths",
      "Watch the gathering from a distance and move on quietly"
    ]
  },
  {
    "prompt": "As night falls, you see a shooting star and make a wish. What do you wish for?",
    "buttonTexts": [
      "Endless nights filled with fun and laughter",
      "A lifelong companion to share your adventures with",
      "To meet many new and interesting people along your journey",
      "To discover new lands and daring challenges",
      "To always find your own path, no matter where it leads"
    ]
  },
  {
    "prompt": "As you continue your journey, you come across a vast meadow filled with wildflowers. You notice different paths leading in various directions. Which path do you take?",
    "buttonTexts": [
      "Follow a butterfly dancing through the flowers",
      "Take the path lined with blooming roses",
      "Walk down the trail where other travelers are heading",
      "Choose the narrow, overgrown trail leading into the unknown",
      "Find your own way through the meadow, ignoring the paths"
    ]
  },
  {
    "prompt": "After walking for some time, you encounter a majestic stag standing beside a crystal-clear pond. The stag seems to be guarding something. What do you do?",
    "buttonTexts": [
      "Try to play a game of tag with the stag",
      "Approach the stag slowly and gently offer it some food",
      "Talk to the stag and ask if it needs help",
      "Challenge the stag to a race around the pond",
      "Observe the stag quietly before continuing on your way"
    ]
  },
  {
    "prompt": "As night falls, you stumble upon an old cabin with a warm light glowing inside. You hear soft music coming from within. How do you proceed?",
    "buttonTexts": [
      "Peek inside and suggest playing a game with the residents",
      "Knock on the door and offer to help with anything they need",
      "Join the gathering and introduce yourself to everyone",
      "Ask if they know of any exciting adventures nearby",
      "Decide to camp outside on your own, away from the cabin"
    ]
  },
  {
    "prompt": "The next morning, you find yourself at the edge of a steep cliff with a breathtaking view of the landscape below. You notice different ways to descend. What do you do?",
    "buttonTexts": [
      "Slide down a smooth, rocky slope, making it a fun ride",
      "Hold on to the cliff's edge and carefully make your way down",
      "Join a group of climbers who are also descending",
      "Leap from rock to rock, making your way down swiftly",
      "Find a secluded path that winds gently down the cliff"
    ]
  },
  {
    "prompt": "At the bottom of the cliff, you reach a peaceful glade where you see a large tree with golden leaves. The tree has a single door at its base. How do you end your journey?",
    "background": "https://cdn.glitch.global/3fc95b6d-903d-4ba0-b45f-02c013559cb6/waterfall.jpeg?v=1723978711428",
    "buttonTexts": [
      "Enter the tree to find a hidden playground inside",
      "Step into the tree, where you are greeted by a loving presence",
      "Walk into the tree, joining a community of friendly faces",
      "Charge into the tree, ready for whatever adventure awaits",
      "Approach the tree, but choose to continue your journey on your own"
    ]
  }
]
let storyphase = 0

function updateButtons() {
  prompt.innerHTML = storyline[storyphase]["prompt"]
  for (const buttoni in buttons) {
    const button = buttons[buttoni]
    button.innerHTML = storyline[storyphase]["buttonTexts"][buttoni]
  }
}

function clamp(n, max) {
  return Math.min(Math.max(n, 1), 5)
}

for (const buttoni in buttons) {
  const button = buttons[buttoni]
  button.addEventListener("click", () => {
    storyphase++
    if (storyline[storyphase]) {
      results[buttoni]++
      if (storyline[storyphase]["background"]) {
        document.body.style.backgroundImage = `url('${storyline[storyphase]["background"]}')`
      }
      updateButtons()
    } else {
      window.location.replace(`/landing.html?playful=${clamp(results[0])}&affectionate=${clamp(results[1])}&sociable=${clamp(results[2])}&independence=${clamp(results[3])}&adventurous=${clamp(results[4])}`)
    }
  })
}

if (storyline[storyphase]["background"]) {
  document.body.style.backgroundImage = `url('${storyline[storyphase]["background"]}')`
  document.body.style.backgroundSize = "cover"
}
updateButtons()
