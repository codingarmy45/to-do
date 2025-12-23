import { useEffect, useState } from "react";
import axios from "axios";

const SearchwithDebounce = () => {
  const [data, setData] = useState([]);
  const [inputData, setInputdata] = useState("");

  const fetchData = async (query) => {
    if (!query) {
      setData([]);
      return;
    }

    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?s=${query}&apikey=7c8f4a84`
      );

      setData(res.data.Search || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(inputData);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputData]);


  return (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        value={inputData}
        onChange={(e) => setInputdata(e.target.value)}
      />

      {data.length > 0 ? (data.map((movie) => (
        <p key={movie.imdbID}>{movie.Title}</p>
      ))) : (<p>No movie found</p>)}

    </div>
  );
};

export default SearchwithDebounce;
