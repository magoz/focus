import { Redis } from '@upstash/redis'

import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({
  path: path.join(process.cwd(), './.env.local')
})

export const redis = Redis.fromEnv()
