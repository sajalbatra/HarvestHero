import client from "../utils/redisClient.js";

const redisngo = async (req, res, next) => {
  try {
    //console.log(`Connected to Redis successfully!`);
    const allngo = JSON.parse(await client.get("ngo"));
    if (allngo) {
      return res.json(allngo);
    } else {
      next();
    }
  } catch (e) {
    console.error(`Connection to Redis failed with error:`);
    console.error(e);
    next(e); // Ensure that errors are passed to the next error-handling middleware
  }
};

export default redisngo;
