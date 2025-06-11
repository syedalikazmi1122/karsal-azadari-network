import { useState } from 'react';
import axios from 'axios';

function AdminDashboard({ token }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('noha');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedContent = content.replace(/\n/g, '<br />');

      await axios.post(
        `${import.meta.env.VITE_API_URL}/writings`,
        { title, type, content: formattedContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage('Writing added successfully');
      setTitle('');
      setType('noha');
      setContent('');
    } catch (err) {
      setMessage('Error adding writing');
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
            required
            dir="rtl"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AdminDashboard;
