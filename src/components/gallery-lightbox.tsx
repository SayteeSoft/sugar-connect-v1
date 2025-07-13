
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalleryLightboxProps {
    images: string[];
    renderThumbnails: (props: { openLightbox: (index: number) => void }) => React.ReactNode;
}

export function GalleryLightbox({ images, renderThumbnails }: GalleryLightboxProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const closeLightbox = () => {
        setIsOpen(false);
    };

    const goToPrevious = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'ArrowRight') {
                setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
            } else if (e.key === 'ArrowLeft') {
                 setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, images.length]);


    if (!images || images.length === 0) {
        return <>{renderThumbnails({ openLightbox: () => {} })}</>;
    }

    return (
        <div>
            {renderThumbnails({ openLightbox })}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent 
                    className="bg-black/80 border-none p-0 w-screen h-screen max-w-none flex items-center justify-center"
                    onInteractOutside={closeLightbox}
                >
                    <DialogTitle className="sr-only">Image Gallery</DialogTitle>
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 hover:text-white"
                            onClick={closeLightbox}
                        >
                            <X className="h-8 w-8" />
                        </Button>
                        
                         {images.length > 1 && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 hover:text-white h-12 w-12"
                                    onClick={goToPrevious}
                                >
                                    <ChevronLeft className="h-10 w-10" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 hover:text-white h-12 w-12"
                                    onClick={goToNext}
                                >
                                    <ChevronRight className="h-10 w-10" />
                                </Button>
                            </>
                         )}

                        <div className="relative max-w-[90vw] max-h-[90vh]">
                            <Image
                                src={images[currentIndex]}
                                alt={`Gallery image ${currentIndex + 1}`}
                                width={1200}
                                height={800}
                                className="object-contain w-auto h-auto max-w-full max-h-full"
                                priority
                            />
                        </div>
                        
                        {images.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
                                {currentIndex + 1} / {images.length}
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
