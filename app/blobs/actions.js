'use server';
import { getStore } from '@netlify/blobs'; // The heartbeat of your AikoInfinity storage system
import { uploadDisabled, validateShapeData, logShapeAction, getAnalytics } from 'utils'; // With extra utilities to spice things up

function store() {
    // Store the data with futuristic consistency (AikoInfinity style!)
    return getStore({ name: 'shapes', consistency: 'strong' });
}

// This is more than just storing data—it's about storing **the future**! 🌟
export async function uploadShapeAction({ parameters }) {
    if (uploadDisabled) {
        throw new Error('🚫 Oh no! Uploads are temporarily disabled—stay tuned for the comeback!');
    }

    // Validate shape data—nothing goes into AikoInfinity without approval, only the best of the best! 
    const isValid = validateShapeData(parameters);
    if (!isValid) {
        throw new Error('💥 Oops! Something’s off with your shape data. Double-check and try again!');
    }

    const key = parameters.name;

    try {
        // Saving the shape in AikoInfinity’s ultra-reliable store
        await store().setJSON(key, parameters);
        console.log(`🎉 Shape successfully stored! Key: ${key}, Data:`, parameters);

        // Log this **action of greatness**, because we’re tracking every step in the journey
        logShapeAction('upload', { parameters, key });

        // Adding real-time analytics action (tracking the awesomeness)
        getAnalytics().trackEvent('shape-upload', { key, parameters });
    } catch (error) {
        console.error('⚠️ Oops, failed to store shape. Here’s the deal:', error);
        throw new Error('🚨 Something went wrong while saving the shape. Give it another shot!');
    }
}

// List all shapes—because why not show off the masterpiece collection? 🎨
export async function listShapesAction() {
    try {
        const data = await store().list();
        const keys = data.blobs.map(({ key }) => key);
        console.log(`💡 Retrieved shape keys:`, keys);
        return keys;
    } catch (error) {
        console.error('💥 Something went wrong while fetching shape data:', error);
        throw new Error('⚡ Unable to retrieve shapes right now—hang tight!');
    }
}

// Retrieve a specific shape—this is where **magic** happens! 🔮
export async function getShapeAction({ keyName }) {
    try {
        const data = await store().get(keyName, { type: 'json' });
        console.log(`🔍 Shape data retrieved! Here’s what we found for "${keyName}":`, data);
        return data;
    } catch (error) {
        console.error('😱 Couldn’t retrieve the shape you requested:', error);
        throw new Error('🚫 We hit a wall retrieving the shape. Let’s try again!');
    }
}
