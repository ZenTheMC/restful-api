const express = require("express")
const app = express()

app.use(express.json())

let foods = [
    {
        id: 1,
        name: "Pizza Pie",
        calories: "2000 kcals",
        important: true
    },
    {
        id: 2,
        name: "Triple Cheesburger",
        calories: "1500 kcals",
        important: true
    },
    {
        id: 3,
        name: "Chicken, Broccoli, and Rice",
        calories: "6000 kcals",
        important: false
    },
    {
        id: 4,
        name: "Apple",
        calories: "3000 kcals",
        important: false
    },
    {
        id: 5,
        name: "Carrot",
        calories: "80 kcals",
        important: true
    }
]

app.get("/", (request, response) => {
    // response.sendFile(__dirname, "/index.html") // _dirname was giving CANNOT GET because _dirname is undefined, even though it shouldn't be since its a global variable
    response.send("<h1>This is the / route for this app. This page is fetched with the GET request on the root route(/)</h1><h2>This API contains foods and their calorie counts</h2><h3>To see the list of foods as JSON, type /api/foods at the end of the url</h3><h4>To see the singular food, try /api/foods/id where id is the value in the id property in the JSON</h4><h5>For example Pizza Pie would be fetched by itself if you did /api/foods/1</h5>")
})

app.get("/api/foods", (request, response) => {
    response.json(foods)
})

app.get("/api/foods/:id", (request, response) => {
    const id = Number(request.params.id)
    const food = foods.find(food => food.id === id)
    if (food) {
        response.json(food)
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    const maxId = foods.length > 0
    ? Math.max(...foods.map(n => n.id))
    : 0
    return maxId + 1
}

app.post("/api/foods", (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: "name missing"
        })
    }

    const food = {
        name: body.name,
        calories: body.calories,
        important: body.important || false,
        id: generateId(),
    }

    foods = foods.concat(food)

    response.json(food)
})

app.delete("/api/foods/:id", (request, response) => {
    const id = Number(request.params.id)
    foods = foods.filter(food => food.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})