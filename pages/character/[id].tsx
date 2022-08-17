import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import prisma from '../../lib/prisma';
import { Character } from '../../types/index.types';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const character = await prisma.character.findUnique({
		where: {
			id: String(params?.id),
		},
		include: {
			owner: {
				select: {
					name: true,
				},
			},
		},
	});

	return {
		props: { character },
	};
};

type Props = {
	character: Character;
};

const Character: React.FC<Props> = (props) => {
	console.log("props22 =========>",props)
	return (
		<Layout>
			<div className='bg-red-400'>
				<h2>{props.character.name}</h2>
				<p>race => {props?.character?.race || 'Unknown character'}</p>
			</div>
			<style jsx>{`
				.page {
					background: white;
					padding: 2rem;
				}

				.actions {
					margin-top: 2rem;
				}

				button {
					background: #ececec;
					border: 0;
					border-radius: 0.125rem;
					padding: 1rem 2rem;
				}

				button + button {
					margin-left: 1rem;
				}
			`}</style>
		</Layout>
	);
};

export default Character;
