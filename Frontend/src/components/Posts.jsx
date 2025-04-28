import React, { useEffect, useState } from 'react';

const Posts = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    useEffect(() => {
        const fetchposts = async () => {
            try {
                const My_response = await fetch('https://jsonplaceholder.typicode.com/posts');
                     if (!My_response.ok) 
                    {
                         console.log("Failed to fetch");

                    }
                         const json = await My_response.json();
                         setData(json);
                } catch (err) 
                  {
                       console.error('Error:', err);
                  } 
        };
        fetchposts();
    },[]);

    const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentData = data.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(data.length / recordsPerPage);

  const handlePageChange = (number) => {
    setCurrentPage(number);
  };

        return (
            <div className="p-6">
            <h1 style={{ fontSize: "40px" }} className="text-black mb-6">Dummy API</h1>
            <table className="min-w-full text-black border border-gray-700">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="border border-gray-700 px-4 py-2 text-left">ID</th>
                  <th className="border border-gray-700 px-4 py-2 text-left">User ID</th>
                  <th className="border border-gray-700 px-4 py-2 text-left">Title</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-700">
                    <td className="border border-gray-700 px-4 py-2">{e.id}</td>
                    <td className="border border-gray-700 px-4 py-2">{e.userId}</td>
                    <td className="border border-gray-700 px-4 py-2">{e.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? 'bg-fuchsia-600 text-white' : 'bg-gray-800 text-white'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
          </div>
          
        );
    };

    export default Posts;
