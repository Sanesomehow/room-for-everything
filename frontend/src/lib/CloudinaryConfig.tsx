import { Cloudinary } from "@cloudinary/url-gen";

export const cloudinary = new Cloudinary({
    cloud: {
        cloudName: import.meta.env.CLOUDINARY_CLOUD_NAME
    }
})

export const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.CLOUDINARY_CLOUD_NAME}/auto/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary: ', error);
        throw error;
    }
}