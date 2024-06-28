import Redis from "ioredis";
import { PrismaClient } from '@prisma/client';
const redis_url = process.env.REDIS_URL;
const client = new Redis(redis_url);
const prisma = new PrismaClient();

const updateRedisCachedonor = async () => {
  try {
    const allDonors = await prisma.ngo.findMany({
      include: {
        address: true,
      }
    });

    if (allNgos.length > 0) {
      await client.set("donor", JSON.stringify(allDonors), "EX", 86400); // Set data in Redis with 1 day expiration
      console.log("Redis cache updated with all Donors");
    } else {
      console.log("No Donor's found to update in Redis");
    }
  } catch (error) {
    console.error("Error updating Redis cache:", error);
  }
};

export default updateRedisCachedonor;
