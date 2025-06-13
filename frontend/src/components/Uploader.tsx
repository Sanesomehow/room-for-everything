import React, { useState } from 'react';
import { uploadToCloudinary } from '../lib/CloudinaryConfig';
import { Button, FileInput, Spinner } from 'flowbite-react';

interface MediaUploaderProps {
    onUploadComplete: (url: string, type: 'image' | 'video') => void
    acceptedTypes?: string
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
    onUploadComplete,
    acceptedTypes = "image/*,video/*"
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;

        setIsUploading(true);
        setUploadProgress(0);

        try{
            const fileType = file.type.startsWith('image/') ? 'image' : 'video';

            const url = await uploadToCloudinary(file);

            onUploadComplete(url, fileType);
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <div>
            <FileInput
            id='media-upload'
            accept={acceptedTypes}
            onChange={handleFileChange}
            disabled={isUploading}
            />

            {isUploading && (
                <div>
                    <Spinner size='sm' />
                    <span>Uploading...</span>
                </div>
            )}
        </div>
    );
};