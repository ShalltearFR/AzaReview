import NodeCache from "node-cache";

// Utilisation de `global` pour vérifier ou initialiser l'instance de cache unique
const cacheData =
  (global as any).cacheData ||
  new NodeCache({
    stdTTL: 300, // TTL de 5 minutes
    checkperiod: 150, // Vérification toutes les 2 minutes 30
    deleteOnExpire: true,
  });

// Assigner au global si l'instance n'existait pas
if (!(global as any).cacheData) {
  (global as any).cacheData = cacheData;
}

export default cacheData;
