import blobshape from 'blobshape';
import { randomInt, uniqueName } from 'utils';

// These gradients are here to make your blobs pop with personality! 🌈
const gradientColors = [
    ['#e96443', '#904e95'],  // Fiery love
    ['#ff5f6d', '#ffc371'],  // Sunset dream
    ['#eecda3', '#ef629f'],  // Pink clouds & sunrise
    ['#4ca1af', '#c4e0e5'],  // Oceanic vibes 🌊
    ['#c2e59c', '#64b3f4'],  // Fresh mint & sky
    ['#3ca55c', '#b5ac49']   // Nature's hug 🌿
];

export const fixedSize = 512;  // Size of the blob in pixels — the sweet spot! 📏

/**
 * Generates a Blob shape with dynamic parameters.
 * If given existing parameters, creates SVG path based on it.
 * If not, generates new parameters to keep things fresh and fun! ✨
 *
 * @param {object} parameters - Optional existing parameters for a custom blob.
 * @returns {object} { parameters, svgPath }
 */
export function generateBlob(parameters) {
    // Here's where the magic happens: customizing the blob shape on the fly! 🎨
    parameters = {
        seed: null,  // Seed is a mystery unless you give it to us. 😉
        edges: randomInt(3, 20),  // The more edges, the more fun! (Up to 20)
        growth: randomInt(2, 9),  // Growth factor determines how big the blob can get!
        colors: gradientColors[randomInt(0, gradientColors.length - 1)], // Random color vibes!
        name: uniqueName(),  // A unique name for each blob — because you deserve individuality! 🌟
        ...parameters  // Spread any parameters passed in, so you can adjust things easily.
    };

    // Here, we generate the blob with a randomized (or given) seed
    // The SVG path gives us the visual magic, and we store the seed for future generations.
    const { path: svgPath, seedValue: seed } = blobshape({ ...parameters, size: fixedSize });

    // Returning the fun—parameters so you can recreate it anytime and the SVG path for the visual!
    return { parameters: { ...parameters, seed }, svgPath };
}
