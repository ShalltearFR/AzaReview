const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const sharp = require("sharp");

// Configuration
const outputDir = "imgTemp"; // Dossier pour les images téléchargées
const convertedDir = "public/img/portraits"; // Dossier pour les images converties
const apiURL =
  "https://api.github.com/repos/Mar-7th/StarRailRes/contents/image/character_portrait"; // URL de l'API pour lister les fichiers

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

// Fonction principale pour télécharger et convertir les images
async function main() {
  await downloadImages();
  await convertImages();
}

// Lancer le traitement
main();
