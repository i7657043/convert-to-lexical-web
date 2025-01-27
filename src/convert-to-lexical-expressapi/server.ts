import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { logger } from './src/logger';
import { convertHtmlToLexical } from './src/convertHtmlToLexical';
import 'dotenv/config';
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

app.post('/', (req: Request, res: Response) => {
    const convertKey = req.headers['x-convert-key'];
    const expectedKey = process.env.CONVERT_KEY;
      if (convertKey !== expectedKey) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    
    var htmlString = req.body.htmlString;
    var fieldName = req.body.fieldName;

    var json = convertHtmlToLexical(htmlString, fieldName)

    res.json(json);
    return;
  });

app.listen(port, () => {
  if (process.env.NODE_ENV === 'development') {
    logger.info(`Server running in dev mode at http://localhost:${port}`);
  }
  else
  {
    logger.info(`Server running on port: ${port}`);
  }
});