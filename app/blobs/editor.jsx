'use client';

import { useState, useCallback } from 'react';
import { StoredBlobsList } from './list';
import { NewShape } from './new-shape';

export function ShapeEditor(props) {
    // Let’s keep track of the mutation time and trigger the reload when something happens—because we like things fast! ⚡
    const [lastMutationTime, setLastMutationTime] = useState(0);

    // This function updates the mutation timestamp so we can reload that list with lightning speed
    const handleMutation = useCallback(() => {
        setLastMutationTime(Date.now());
    }, []);

    return (
        <div className="flex w-full flex-col md:flex-row md:items-start gap-8">
            <div className="md:w-2/5 p-6 bg-gradient-to-r from-blue-400 via-pink-500 to-yellow-500 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300">
                {/* New shape editor with high-energy action */}
                <NewShape setLastMutationTime={handleMutation} />
                <p className="mt-4 text-white text-xl font-semibold text-center">Create, Shape, Innovate! 🎨🚀</p>
            </div>
            <div className='w-full'>
                {/* Stored blobs—constantly evolving, constantly exciting */}
                <StoredBlobsList lastMutationTime={lastMutationTime} />
            </div>
        </div>
    );
}
