import { useState } from 'react';
import axios from 'axios';
import { uploadImage } from '../utils/imageUpload';

function AdminDashboard({ token }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('noha');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setMessage('');

    try {
      let imageUrl = null;
      
      // Upload image if selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const formattedContent = content.replace(/\n/g, '<br />');

      await axios.post(
        `${import.meta.env.VITE_API_URL}/writings`,
        { title, type, content: formattedContent, imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage('Writing added successfully');
      setTitle('');
      setType('noha');
      setContent('');
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      setMessage('Error adding writing: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Writing</h2>
      {message && <p className={message.includes('Error') ? 'text-red-500' : 'text-green-500'}>{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="noha">Noha</option>
            <option value="kaseeda">Kaseeda</option>
            <option value="bain">Bain</option>
            <option value="band">Band</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Content (Arabic)</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-nastaleeq"
            rows="6"
            
            dir="rtl"
          />
        </div>
        
        {/* Image Upload Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Image (Optional)</label>
          <div className="space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imagePreview && (
              <div className="mt-2">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-32 object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="mt-2 text-sm text-red-500 hover:text-red-700"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className={`w-full p-2 rounded-md ${
            isUploading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {isUploading ? 'Uploading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default AdminDashboard;
