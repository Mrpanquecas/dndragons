import Router from 'next/router';
import React from 'react';
import Layout from '../components/Layout';

const Characters: React.FC = () => {
	return (
		<Layout>
			<div className="page">
				<h1>Welcome to DNDragons</h1>
				<main></main>
				<div>
					visit the list of your chars here:
					<div
						className="hover:text-blue-400 cursor-pointer"
						onClick={() => Router.push('/characters')}
					>
						click meh
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Characters;
