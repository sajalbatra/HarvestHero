import Redis  from "ioredis";
const redis_url=process.env.Redis_url
const client = new Redis(redis_url);

export default client