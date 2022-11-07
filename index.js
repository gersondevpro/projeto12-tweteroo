import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

/* 'Variáveis' Global */
const users = [
    {
        username: 'bobesponja',
        avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
    }
]

const tweets = [
    {
        username: "bobesponja",
        tweet: "eu amo o hub"
    }
]

/* POSTS */
app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body

    if(!username || !avatar) {
        res.status(422).send("Preencha todos os campos")
        return
    }

    const checkUsers = users.find(name => name.username === username)
    if(checkUsers) {
        res.status(409).send("Escolha outro 'username'")
        return
    }

    const newUser = {
        username,
        avatar
    }

    users.push(newUser)
    res.send("OK")
})

app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body

    if(!username || !tweet) {
        res.status(422).send("Preencha todos os campos")
        return
    }

    const newTweet = {
        username,
        tweet
    }

    tweets.push(newTweet)
    res.send("OK")

})


/* GET */
app.get("/tweets", (req, res) => {
    const preview = tweets.slice(-10)
    
    for(let i = 0; i < preview.length; i++) {
        const teste = users.find(item => item.username === preview[i].username)
        const a = teste.avatar
        
        preview[i] = {...preview[i], avatar: a}
    }

    res.send(preview)
})


app.listen(5000)