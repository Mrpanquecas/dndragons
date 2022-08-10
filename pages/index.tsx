import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import CharacterInfo, { PostProps } from '../components/CharacterInfo';
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
	const characters = await prisma.character.findMany({
		include: {
			owner: {
				select: {
					name: true,
				},
			},
		},
	});
	return {
		props: { characters },
		revalidate: 10,
	};
};

type Props = {
	characters: PostProps[];
};

const Characters: React.FC<Props> = (props) => {
	console.log(props);
	return (
		<Layout>
			<div className="page">
				<h1>Public Feed</h1>
				<main>
					{props.characters.map((char) => (
						<div key={char.id} className="post">
							<CharacterInfo character={char} />
						</div>
					))}
				</main>
			</div>
			<style jsx>{`
				.post {
					background: white;
					transition: box-shadow 0.1s ease-in;
				}

				.post:hover {
					box-shadow: 1px 1px 3px #aaa;
				}

				.post + .post {
					margin-top: 2rem;
				}
			`}</style>
		</Layout>
	);
};

export default Characters;
