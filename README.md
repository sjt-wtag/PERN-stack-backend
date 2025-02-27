## Details

### nodemon runs server continuously

```
npm install nodemon
```

```
  "scripts": {
    "start": "nodemon server.js"
  }
```

## RATE LIMITER

```
npm i express-rate-limit

```

```
import rateLimit from "express-rate-limit";

const app = express();
let limiter = rateLimit({
  max:3,      // number of max attemp
  windowMs: 60*60*1000, // 1 hour in milisecond
  message: "we have received too many requests from this API. Please try again after one hour"
})

app.use('/books', limiter); //rate limiter will be applied to the  all API starts with /books 

```