const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const sharp = require("sharp");

// Configuration
const outputDir = "downloads"; // Dossier pour les images téléchargées
const convertedDir = "../Review Express/public/img/portraits"; // Dossier pour les images converties
const staticDir = "static"; // Dossier pour les fichiers JSON
const apiURL =
  "https://api.github.com/repos/Mar-7th/StarRailRes/contents/image/character_portrait"; // URL de l'API pour lister les fichiers
const CDN =
  "https://raw.githubusercontent.com/Mar-7th/StarRailRes/refs/heads/master/"; // URL de base pour les fichiers JSON

// Liens des fichiers JSON
const jsonUrls = [
  `${CDN}index_min/fr/characters.json`,
  `${CDN}index_min/en/characters.json`,
  `${CDN}index_min/fr/properties.json`,
  `${CDN}index_min/en/properties.json`,
  `${CDN}index_min/fr/relic_sets.json`,
  `${CDN}index_min/en/relic_sets.json`,
  `${CDN}index_min/fr/light_cones.json`,
  `${CDN}index_min/en/light_cones.json`,
  `${CDN}index_min/fr/relics.json`,
  `${CDN}index_min/en/relics.json`,
  `${CDN}index_min/fr/character_ranks.json`,
  `${CDN}index_min/en/character_ranks.json`,
  `${CDN}index_min/fr/light_cone_ranks.json`,
  `${CDN}index_min/en/light_cone_ranks.json`,
];

// Fonction pour télécharger les images
async function downloadImages() {
  try {
    // Vérifier si le dossier de sortie pour les téléchargements existe, sinon le créer
    await fs.ensureDir(outputDir);

    // Récupérer la liste des fichiers dans le répertoire GitHub
    const response = await axios.get(apiURL, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    // Télécharger chaque image
    for (const file of response.data) {
      // Vérifier si c'est une image
      if (file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
        const fileURL = file.download_url; // URL de téléchargement direct
        const outputPath = path.join(outputDir, file.name);

        const imageResponse = await axios.get(fileURL, {
          responseType: "arraybuffer",
        });
        await fs.writeFile(outputPath, imageResponse.data);

        console.log(`Downloaded ${file.name} to ${outputPath}`);
      }
    }
  } catch (error) {
    console.error("Error downloading images:", error);
  }
}

// Fonction pour convertir les images
async function convertImages() {
  try {
    // Vérifier si le dossier de sortie pour les conversions existe, sinon le créer
    await fs.ensureDir(convertedDir);

    // Lire tous les fichiers du dossier d'entrée
    const files = await fs.readdir(outputDir);

    // Traiter chaque fichier
    for (const file of files) {
      const filePath = path.join(outputDir, file);
      const outputFilePath = path.join(
        convertedDir,
        path.parse(file).name + ".webp"
      );

      // Vérifier si le fichier est une image
      if (/\.(jpg|jpeg|png|gif)$/i.test(file)) {
        // Redimensionner et convertir en .webp
        await sharp(filePath)
          .resize({ height: 470 }) // Ajuster la hauteur selon vos besoins
          .toFile(outputFilePath); // Enregistrer le fichier converti

        console.log(`Converted ${file} to ${outputFilePath}`);
      } else {
        console.log(`${file} is not an image, skipping.`);
      }
    }
  } catch (error) {
    console.error("Error converting images:", error);
  }
}

// Fonction pour télécharger les fichiers JSON
async function downloadJSONFiles() {
  try {
    // Vérifier si le dossier pour les fichiers JSON existe, sinon le créer
    await fs.ensureDir(staticDir);

    // Télécharger chaque fichier JSON
    for (const url of jsonUrls) {
      const language = url.includes("/fr/") ? "FR" : "EN"; // Déterminer la langue
      const fileName = path.basename(url, ".json"); // Obtenir le nom de fichier sans extension
      const outputName = `${fileName}${language}.json`; // Nouveau nom de fichier
      const outputPath = path.join(staticDir, outputName); // Chemin complet du fichier de sortie

      const jsonResponse = await axios.get(url);
      await fs.writeFile(
        outputPath,
        JSON.stringify(jsonResponse.data, null, 2)
      );

      console.log(`Downloaded and renamed to ${outputName} in ${staticDir}`);
    }
  } catch (error) {
    console.error("Error downloading JSON files:", error);
  }
}

// Fonction principale pour télécharger et convertir les images et les JSON
async function main() {
  await downloadImages();
  await convertImages();
  await downloadJSONFiles();
}

// Lancer le traitement
main();
