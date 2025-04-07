import Redis  from "ioredis";
const redis_url=process.env.REDIS_URL
const client = new Redis(redis_url);

export default client