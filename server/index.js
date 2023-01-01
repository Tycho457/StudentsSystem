const express = require("express")

const app = express()
app.set('secret', 'dawd8a9d98aw231sd1')
app.use(require('cors')())
app.use(express.json())

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000,()=>{
    console.log("http://localhost:3000");
})