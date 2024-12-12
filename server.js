const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')
const path = require('path')

dotenv.config()

connectDB()


const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//routes


app.use('/api/v1/test',require('./routes/testRoutes'))
app.use('/api/v1/auth',require('./routes/authRoutes'))
app.use('/api/v1/inventory', require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));


app.use(express.static(path.join(__dirname,'./frontend/build/')))

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,"./frontend/build/index.html"))
})


const PORT = process.env.PORT || 9870

app.listen(PORT, ()=>{
    console.log(`node server running in ${process.env.DEV_MODE} on port ${process.env.PORT}`.bgBlue.white)
})