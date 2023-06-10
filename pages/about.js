import React from 'react';
import { Card } from 'react-bootstrap';
import MovieDetails from '@/components/MovieDetails';
import PageHeader from '@/components/PageHeader';
import { ErrorBoundary } from 'react-error-boundary';
import Link from 'next/link';

const ErrorFallback = ({ error }) => (
  <div>
    <h2>Something went wrong</h2>
    <p>{error.toString()}</p>
  </div>
);

// This function gets called at build time
export function getStaticProps() {
  // Call an external API endpoint to get posts
  return new Promise((resolve,reject)=>{
      fetch("https://busy-plum-adder-fez.cyclic.app/api/movies/573a139af29313caabcf075d")
          .then(res => res.json())
          .then(data => {
              // Assign the data to props that we could use later in our function
              resolve({ props: { staticPost: data } })
          })
          .catch(err => {
              reject(err);
          })
  })
}

export default function About({ staticPost }) {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div>
        <PageHeader text="About the Developer: Vu Khanh Linh Nguyen" />

        <Card>
          <Card.Body>
            <p>
              Hi, my name is Linh, a student of CPA semester 5. I like listening to music and reading books in my free time.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris auctor, arcu sit amet pharetra faucibus,
              lorem lectus posuere purus, id rutrum nulla neque vel metus. Donec efficitur venenatis justo, vel tempus
              dolor. Phasellus tristique, erat vitae cursus pellentesque, justo nunc iaculis lectus, a aliquet nulla
              nunc vitae mi. Quisque a efficitur dui. Vivamus nec enim at mi pharetra fermentum. Nunc ut aliquam elit.

              It&apos;s difficult to choose a favourite, but{' '}
              <Link href="/movies/The Avengers" legacyBehavior>
                  <a>&quot;The Avengers&quot;</a>
              </Link>{' '}
              is one that I like. <br /><br />
            </p>
          </Card.Body>
        </Card>

        <MovieDetails movie={staticPost} />
      </div>
    </ErrorBoundary>
  );
}
