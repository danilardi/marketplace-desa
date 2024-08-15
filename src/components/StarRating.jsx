import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';

const StarRating = ({ rating, setUserRating, onClick = false, size = "6" }) => {
    const [rat, setRat] = useState(rating)
    const [fullStars, setFullStars] = useState(Math.floor(rat))
    const [quarterStars, setQuarterStars] = useState(Math.round((rat - fullStars) * 4));

    useEffect(() => {
        // console.log('rating', rating, rat)
    }, [])
    useEffect(() => {
        setFullStars(Math.floor(rat))
    }, [rat])

    const getStar = (type, index) => {
        switch (type) {
            case 'full':
                return (
                    <button
                        key={index}
                        onClick={() => {
                            let newIndex = index + 1
                            // console.log('clicked', newIndex)
                            if (onClick) {
                                setUserRating(newIndex)
                                setRat(newIndex)
                            }
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`h-${size} text-yellow-500`}
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.3 4.004a1 1 0 00.95.69h4.212c.969 0 1.371 1.24.588 1.81l-3.406 2.455a1 1 0 00-.364 1.118l1.3 4.004c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.406 2.455c-.784.57-1.839-.197-1.539-1.118l1.3-4.004a1 1 0 00-.364-1.118L2.585 9.431c-.783-.57-.38-1.81.588-1.81h4.212a1 1 0 00.95-.69l1.3-4.004z" />
                        </svg>
                    </button>
                );
            case 'three-quarter':
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`h-${size} text-yellow-500`}
                    >
                        <defs>
                            <linearGradient id="threeQuarterGradient">
                                <stop offset="75%" stopColor="currentColor" />
                                <stop offset="75%" stopColor="d1d5db" />
                            </linearGradient>
                        </defs>
                        <path
                            fill="url(#threeQuarterGradient)"
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.3 4.004a1 1 0 00.95.69h4.212c.969 0 1.371 1.24.588 1.81l-3.406 2.455a1 1 0 00-.364 1.118l1.3 4.004c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.406 2.455c-.784.57-1.839-.197-1.539-1.118l1.3-4.004a1 1 0 00-.364-1.118L2.585 9.431c-.783-.57-.38-1.81.588-1.81h4.212a1 1 0 00.95-.69l1.3-4.004z"
                        />
                    </svg>
                );
            case 'half':
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`h-${size} text-yellow-500`}
                    >
                        <defs>
                            <linearGradient id="halfGradient">
                                <stop offset="50%" stopColor="currentColor" />
                                <stop offset="50%" stopColor="#d1d5db" />
                            </linearGradient>
                        </defs>
                        <path
                            fill="url(#halfGradient)"
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.3 4.004a1 1 0 00.95.69h4.212c.969 0 1.371 1.24.588 1.81l-3.406 2.455a1 1 0 00-.364 1.118l1.3 4.004c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.406 2.455c-.784.57-1.839-.197-1.539-1.118l1.3-4.004a1 1 0 00-.364-1.118L2.585 9.431c-.783-.57-.38-1.81.588-1.81h4.212a1 1 0 00.95-.69l1.3-4.004z"
                        />
                    </svg>
                );
            case 'quarter':
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`h-${size} text-yellow-500`}
                    >
                        <defs>
                            <linearGradient id="quarterGradient">
                                <stop offset="25%" stopColor="currentColor" />
                                <stop offset="25%" stopColor="#d1d5db" />
                            </linearGradient>
                        </defs>
                        <path
                            fill="url(#quarterGradient)"
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.3 4.004a1 1 0 00.95.69h4.212c.969 0 1.371 1.24.588 1.81l-3.406 2.455a1 1 0 00-.364 1.118l1.3 4.004c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.406 2.455c-.784.57-1.839-.197-1.539-1.118l1.3-4.004a1 1 0 00-.364-1.118L2.585 9.431c-.783-.57-.38-1.81.588-1.81h4.212a1 1 0 00.95-.69l1.3-4.004z"
                        />
                    </svg>
                );
            case 'empty':
            default:
                return (
                    <button
                        key={index}
                        onClick={() => {
                            let newIndex = fullStars + index + 1
                            // console.log('clicked', newIndex)
                            if (onClick) {
                                setUserRating(newIndex)
                                setRat(newIndex)
                            }
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`h-${size} text-gray-300`}
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.3 4.004a1 1 0 00.95.69h4.212c.969 0 1.371 1.24.588 1.81l-3.406 2.455a1 1 0 00-.364 1.118l1.3 4.004c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.406 2.455c-.784.57-1.839-.197-1.539-1.118l1.3-4.004a1 1 0 00-.364-1.118L2.585 9.431c-.783-.57-.38-1.81.588-1.81h4.212a1 1 0 00.95-.69l1.3-4.004z" />
                        </svg>
                    </button>
                );
        }
    };

    return (
        <div className={`flex items-center h-${size}`}>
            {Array(fullStars)
                .fill('full')
                .map((type, index) => getStar(type, index))}
            {quarterStars >= 3 && getStar('three-quarter')}
            {quarterStars === 2 && getStar('half')}
            {quarterStars === 1 && getStar('quarter')}
            {Array(5 - fullStars - (quarterStars > 0 ? 1 : 0))
                .fill('empty')
                .map((type, index) => getStar(type, index))}
        </div>
    );
};

export default StarRating;
