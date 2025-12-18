import React, { useEffect, useState } from "react";
import axios from "axios";

const Movie = () => {
  const [movieName, setMovieName] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieName) return;

      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?t=${movieName}&apikey=7c8f4a84`
        );

        if (res.data.Response === "True") {
          setData((prev) => [
            ...prev,
            {
              name: res.data.Title,
              language: res.data.Language,
              genre: res.data.Genre,
              rating: res.data.Ratings?.[0]?.Value || "N/A",
              year: res.data.Year,
            },
          ]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const timerId = setTimeout(() => {
      fetchMovie();
    }, 800);

    return () => {
      clearTimeout(timerId);
    };
  }, [movieName]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search Movie"
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
      />
      {data.length > 0 &&
        data.map((d, index) => (
          <div key={index}>
            <p>{d.name}</p>
            <p>{d.language}</p>
            <p>{d.genre}</p>
            <p>{d.rating}</p>
            <p>{d.year}</p>
            <hr />
          </div>
        ))}
    </div>
  );
};

export default Movie;
