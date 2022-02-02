import 'dotenv/config';

import {app} from './modules/App';
import './database/database';

const main = async () => {
  const PORT = process.env.PORT || 4000;
  await app.listen(PORT);
  console.log('listening on port', PORT)
}

main();
