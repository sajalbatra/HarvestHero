import React from 'react';
import Link from 'next/link'

const Card = ({ name, mission }) => {
  //const router = useRouter();
  console.log('Card component props:', { name, mission });
  // const handleClick = () => {
  //   router.push(`/ngo/${name}`);
  // };

  return (
    <div className="w-[20%] m-4 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
      <div className="px-6 py-4">
        <h1 className="mb-2 text-xl font-bold">{name}</h1>
        <p className="text-base text-gray-700 dark:text-gray-300">{mission}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <Link href={`/ngo/${name}`}>
        <button
            className="px-4 py-2 font-bold text-white transition duration-300 rounded-full bg-primary hover:bg-primary-dark"
        >
          Donate Now
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
