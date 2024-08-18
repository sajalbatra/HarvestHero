import client from '../utils/redisClient.js';
import prisma from '../utils/prismaclientstr.js';

const updateRedisCachedonor = async () => {
  try {
    const allDonors = await prisma.donor.findMany({
      include: {
        address: true,
      }
    });
    if (allDonors.length > 0) {
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
