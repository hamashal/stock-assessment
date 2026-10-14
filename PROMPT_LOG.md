# AI Prompt Log

## Entry 1: Starting the Backend
* **Prompt sent:** "I have basic-level knowledge of Node.js. How do I create an API that fetches data from a URL using Axios?"
* **Why I chose it:** I didn't know how to set up an Express server from scratch or how to make external HTTP requests.
* **What I kept/changed:** I kept the basic `app.get` structure and the Axios fetch command. I changed the port number to 3001 to ensure it wouldn't cause issues with my React app later.

## Entry 2: Understanding Data Formatting
* **Prompt sent:** "The Yahoo API gives me one array for timestamps, one for highs, and one for lows. How do I loop through these in JavaScript and group them by date?"
* **Why I chose it:** The parallel array structure was confusing, and I didn't know how to turn Unix timestamps into readable calendar dates.
* **What I kept/changed:** The AI suggested using complex array methods like `reduce`, but I asked it to rewrite it using a standard `for` loop because that was easier for me to read and understand. I kept the logic for converting the timestamp using `new Date()`.

## Entry 3: Connecting Frontend and Backend
* **Prompt sent:** "I am trying to fetch data from my Node.js backend using React, but my browser console says 'Blocked by CORS policy'. What does this mean and how do I fix it?"
* **Why I chose it:** My frontend code looked correct, but the data wasn't loading. I needed to understand what the error meant.
* **What I kept/changed:** The AI explained that browsers block requests between different ports for security. I followed its advice and installed the `cors` package on my backend and added `app.use(cors())`.

## Entry 4: Documenting the Code
* **Prompt sent:** "Can you add detailed comments throughout both the Node.js and React code explaining what each line does?"
* **Why I chose it:** I wanted to make sure I fully understood the code the AI helped me write, so I could better explain it to others.
* **What I kept/changed:** I kept most of the explanations but reviewed them to ensure they made sense to me. I used the comments to learn what things like `useState` and `e.preventDefault()` actually do.

## Entry 5: Choosing the Right Tools
* **Prompt sent:** "I'd like to use Node.js for the backend and React for the frontend, but what specific packages do I need to download and install to build an API and fetch data?"
* **Why I chose it:** I knew the general languages required by the assessment, but I didn't exactly know the terminal commands or specific libraries needed to create a web server or make HTTP requests.
* **What I kept/changed:** I followed the AI's recommendation to use Express for the backend server, Axios for fetching the data, and Vite to set up the React app quickly. These were presented as the standard tools to accomplish the task.