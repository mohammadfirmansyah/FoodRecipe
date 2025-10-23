/**
 * Download Images Script for Offline Bundle
 * Downloads all recipe and category images for offline use
 * Images will be bundled into the APK
 */

const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

// Create directories if they don't exist
const categoriesDir = path.join(__dirname, '../assets/recipes/categories');
const recipesDir = path.join(__dirname, '../assets/recipes/meals');

if (!fs.existsSync(categoriesDir)) {
  fs.mkdirSync(categoriesDir, { recursive: true });
}

if (!fs.existsSync(recipesDir)) {
  fs.mkdirSync(recipesDir, { recursive: true });
}

// Category images to download
const categoryImages = [
  { name: 'beef', url: 'https://www.themealdb.com/images/category/beef.png' },
  { name: 'chicken', url: 'https://www.themealdb.com/images/category/chicken.png' },
  { name: 'dessert', url: 'https://www.themealdb.com/images/category/dessert.png' },
  { name: 'lamb', url: 'https://www.themealdb.com/images/category/lamb.png' },
  { name: 'miscellaneous', url: 'https://www.themealdb.com/images/category/miscellaneous.png' },
  { name: 'pasta', url: 'https://www.themealdb.com/images/category/pasta.png' },
  { name: 'pork', url: 'https://www.themealdb.com/images/category/pork.png' },
  { name: 'seafood', url: 'https://www.themealdb.com/images/category/seafood.png' },
  { name: 'side', url: 'https://www.themealdb.com/images/category/side.png' },
  { name: 'starter', url: 'https://www.themealdb.com/images/category/starter.png' },
  { name: 'vegan', url: 'https://www.themealdb.com/images/category/vegan.png' },
  { name: 'vegetarian', url: 'https://www.themealdb.com/images/category/vegetarian.png' },
  { name: 'breakfast', url: 'https://www.themealdb.com/images/category/breakfast.png' },
  { name: 'goat', url: 'https://www.themealdb.com/images/category/lamb.png' }, // Use lamb as placeholder for goat
];

// Recipe images to download - All 14 recipes
const recipeImages = [
  // Beef recipes
  { id: 'beef_01', url: 'https://images.unsplash.com/photo-1587248720327-8eb72564be1e?q=80&w=400' },
  { id: 'beef_02', url: 'https://images.unsplash.com/photo-1676300185292-e23bb3db50fa?q=80&w=400' },
  { id: 'beef_03', url: 'https://images.unsplash.com/photo-1622003184404-bc0c66144534?q=80&w=400' },
  { id: 'beef_04', url: 'https://images.unsplash.com/photo-1548869206-93b036288d7e?q=80&w=400' },
  { id: 'beef_05', url: 'https://images.unsplash.com/photo-1726677730666-fdc08a8da464?q=80&w=400' },
  { id: 'beef_06', url: 'https://images.unsplash.com/photo-1619221882161-95135fca04e4?q=80&w=400' },
  // Chicken recipes
  { id: 'chicken_01', url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=400' },
  { id: 'chicken_02', url: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=400' },
  { id: 'chicken_03', url: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?q=80&w=400' },
  { id: 'chicken_04', url: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=400' },
  { id: 'chicken_05', url: 'https://images.unsplash.com/photo-1689773976415-293dd893f77e?q=80&w=400' },
  { id: 'chicken_06', url: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=400' },
  { id: 'chicken_07', url: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?q=80&w=400' },
  { id: 'chicken_08', url: 'https://images.unsplash.com/photo-1617651523904-8768096faf40?q=80&w=400' },
];

/**
 * Download a single image
 */
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const file = fs.createWriteStream(filepath);
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded: ${path.basename(filepath)}`);
          resolve();
        });
      } else if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      } else {
        file.close();
        fs.unlink(filepath, () => {}); // Delete the file
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      fs.unlink(filepath, () => {}); // Delete the file
      reject(err);
    });
  });
}

/**
 * Main download function
 */
async function downloadAllImages() {
  console.log('📥 Starting image download for offline bundle...\n');
  
  // Download category images
  console.log('Downloading category images...');
  for (const category of categoryImages) {
    const filepath = path.join(categoriesDir, `${category.name}.png`);
    try {
      await downloadImage(category.url, filepath);
    } catch (error) {
      console.error(`✗ Error downloading ${category.name}: ${error.message}`);
    }
  }
  
  // Download recipe images
  console.log('\nDownloading recipe images...');
  for (const recipe of recipeImages) {
    const filepath = path.join(recipesDir, `${recipe.id}.jpg`);
    try {
      await downloadImage(recipe.url, filepath);
    } catch (error) {
      console.error(`✗ Error downloading ${recipe.id}: ${error.message}`);
    }
  }
  
  console.log('\n✅ Download complete!');
  console.log(`Category images: ${categoriesDir}`);
  console.log(`Recipe images: ${recipesDir}`);
}

// Run the download
downloadAllImages().catch(console.error);
