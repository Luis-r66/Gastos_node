require('dotenv').config()

let mongoose = require('mongoose')
const app = require('./app')

mongoose.Promise = global.Promise

if (!process.env.MONGO_URI) {
  console.error('Falta MONGO_URI: revisa el archivo .env')
  process.exit(1)
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database connected successfully')

    app.listen(app.get('port'), () => {
      console.log(`Server running at http://localhost:${app.get('port')}`)
    })
  })
  .catch(err => console.error(err))