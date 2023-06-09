/*********************************************************************************
*  WEB422 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: __Vu Khanh Linh Nguyen___ Student ID: __125710210__ Date: __June 13, 2023___
*
*
********************************************************************************/ 


import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { Pagination, Accordion } from 'react-bootstrap';
import MovieDetails from '@/components/MovieDetails';
import PageHeader from '@/components/PageHeader';

export default function Home() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);

  const { data, error } = useSWR(`https://busy-plum-adder-fez.cyclic.app/api/movies?page=${page}&perPage=10`);

  useEffect(() => {
    if (data) {
      setPageData(data);
    }
  }, [data]);

  const previous = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const next = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <PageHeader text="Film Collection : Sorted by Date" />

      <Accordion>
        {pageData.map((movie) => (
          <Accordion.Item key={movie._id} eventKey={movie._id}>
            <Accordion.Header>
              <strong>{movie.title}</strong>&nbsp;({movie.year}) 
              Directors: {movie.directors.join(', ')}
            </Accordion.Header>
            <Accordion.Body>
              <MovieDetails movie={movie} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Pagination>
        <Pagination.Prev onClick={previous} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </div>
  );
}
