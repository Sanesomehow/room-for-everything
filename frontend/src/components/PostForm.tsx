import React, { useState } from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';
import { MediaUploader } from '../components/Uploader';

interface PostFormData {
    title: string;
    text?: string;
    imageURL?: string;
    videoURL?: string;
    externalURL?: string
}

interface PostFormProps {
    onSubmit: (data: PostFormData) => void;
    initialData?: Partial<PostFormData>;
}

export const PostForm: React.FC<PostFormProps> = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState<PostFormData>({
    title: initialData.title || '',
    text: initialData.text || '',
    imageURL: initialData.imageURL || '',
    videoURL: initialData.videoURL || '',
    externalURL: initialData.externalURL || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleMediaUpload = (url: string, type: 'image' | 'video') => {
    if (type === 'image') {
        setFormData(prev => ({...prev, imageURL: url}));
    } else {
        setFormData(prev => ({...prev, videoURl: url}));
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <TextInput
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="text">Description</Label>
        <Textarea
          id="text"
          name="text"
          value={formData.text || ''}
          onChange={handleChange}
          rows={4}
        />
      </div>
      
      <div>
        <Label>Upload Media</Label>
        <MediaUploader onUploadComplete={handleMediaUpload} />
        
        {formData.imageURL && (
          <div className="mt-2">
            <img 
              src={formData.imageURL} 
              alt="Preview" 
              className="max-h-40 rounded-md"
            />
          </div>
        )}
        
        {formData.videoURL && (
          <div className="mt-2">
            <video 
              src={formData.videoURL}
              controls
              className="max-h-40 rounded-md"
            />
          </div>
        )}
      </div>
      
      <div>
        <Label htmlFor="externalURl">External URL (Optional)</Label>
        <TextInput
          id="externalURl"
          name="externalURl"
          value={formData.externalURL || ''}
          onChange={handleChange}
        />
      </div>
      
      <Button type="submit">Save Post</Button>
    </form>
  );
}
