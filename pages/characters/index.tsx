import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import { Character } from '../../types/index.types';
import Layout from '../../components/Layout';
import { CharacterInfo } from '../../components';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const session = await getSession({ req });
	if (!session) {
		res.statusCode = 403;
		return { props: { characters: [] } };
	}
	const characters = await prisma.character.findMany({
		where: {
			owner: { email: session.user.email },
		},
	});
	return {
		props: { characters },
	};
};

type Props = {
	characters: Character[];
};

const Characters: React.FC<Props> = (props) => {
	const { data: session } = useSession();

	if (!session) {
		return (
			<Layout>
				<h1>My Characters</h1> <div>please login</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="page">
				<h1>My Characters</h1>
				<main>
					{props.characters.map((char) => (
						<div key={char.id} className="char">
							<CharacterInfo character={char} />
						</div>
					))}
				</main>
			</div>
			<style jsx>{`
				.char {
					background: var(--geist-background);
					transition: box-shadow 0.1s ease-in;
				}

				.char:hover {
					box-shadow: 1px 1px 3px #aaa;
				}

				.char + .char {
					margin-top: 2rem;
				}
			`}</style>
		</Layout>
	);
};

export default Characters;
