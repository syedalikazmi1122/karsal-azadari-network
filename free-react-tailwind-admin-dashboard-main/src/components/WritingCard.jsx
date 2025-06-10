import { Link } from 'react-router-dom';

function WritingCard({ writing }) {
  return (
    <Link to={`/writing/${writing._id}`} className="block">
      <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
        <h3 className="font-nastaleeq text-lg font-semibold">{writing.title}</h3>
        <p className="text-gray-600 capitalize">{writing.type}</p>
      </div>
    </Link>
  );
}

export default WritingCard;