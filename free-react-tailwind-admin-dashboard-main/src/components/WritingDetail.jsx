import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function WritingDetail() {
  const { id } = useParams();
  const [writing, setWriting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWriting = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/writings/${id}`);
        setWriting(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching writing');
        setLoading(false);
      }
    };
    fetchWriting();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!writing) return null;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="font-nastaleeq text-2xl font-bold mb-4">{writing.title}</h2>
      <p className="text-gray-600 capitalize mb-4">{writing.type}</p>
      <div
        className="font-nastaleeq text-lg leading-relaxed"
        dir="rtl"
        dangerouslySetInnerHTML={{ __html: writing.content }}
      />
    </div>
  );
}

export default WritingDetail;
