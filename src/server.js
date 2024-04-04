const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./database/connection.js");
const router = require("./routes/allRoutes.js");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require("swagger-jsdoc");
const path = require('path');
const uploadRoute = require('./controller/routeuploads.js')

dotenv.config();
const _dirname = path.dirname(__filename);

const app = express();
connectDB();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use("/api/v1", router);
app.post('/api/upload',(req,res) => {
  upload(req,res,(err)=>{
    if (err){
      console.log(err)
    }
    else {
      const newImage = new imageModel({
        name :req.body.name ,
        image:{
          data:req.file.file,
          contentType:"image/png"
        }
      })
      newImage.save()
        .then(() => res.send('successfully upload'))
        .catch(err=>console.log(err))
    }
  })
  })

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'venuste',
      version: '1.0.0'
    },
    servers: [{
      url: 'http://localhost:3005',
      description: 'local server'
    },
    {
      url: 'https://my-brand-backend-155.onrender.com/',
      description: 'deployed server'
    }
  ],
  },
  apis:[
    path.resolve(_dirname, 'routes', 'messageRoutes.js'),
    path.resolve(_dirname, 'routes', 'blogRoutes.js'),
    path.resolve(_dirname, 'routes', 'routes.js'),
    path.resolve(_dirname, 'routes', 'commentRoutes.js')
  ]
}

const swaggerSpecs = swaggerJSDoc(swaggerOptions)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to my API");
});

app.get("*", (req, res) => {
  res.status(404).send("Page is not found");
});

const port = 3005;
app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});

module.exports = app;
