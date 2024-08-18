import Redis from "ioredis";
import { PrismaClient } from '@prisma/client';
const redis_url = process.env.REDIS_URL;
const client = new Redis(redis_url);
const prisma = new PrismaClient();

const updateRedisCache = async () => {
  try {
    const allNgos = await prisma.ngo.findMany({
      include: {
        address: true,
        ngoProfile: true
      }
    });

    if (allNgos.length > 0) {
      await client.set("ngo", JSON.stringify(allNgos), "EX", 86400); // Set data in Redis with 1 day expiration
      console.log("Redis cache updated with all NGOs");
    } else {
      console.log("No NGOs found to update in Redis");
    }
  } catch (error) {
    console.error("Error updating Redis cache:", error);
  }
};

export default updateRedisCache;
