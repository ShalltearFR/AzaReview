import NodeCache from "node-cache";

// Cache pour les données récupérées (TTL: 20 minutes)
const cacheData = new NodeCache({ stdTTL: 1200 });

export default cacheData;
