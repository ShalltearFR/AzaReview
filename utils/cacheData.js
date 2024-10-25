import NodeCache from "node-cache";

// Cache pour les données récupérées (Cache de 1h, verification toutes les 5 minutes)
const cacheData = new NodeCache({
  stdTTL: 3600,
  checkperiod: 300,
  deleteOnExpire: true,
});

export default cacheData;
