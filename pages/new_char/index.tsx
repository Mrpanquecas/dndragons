// pages/create.tsx

import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Router from 'next/router';

const Draft: React.FC = () => {
	const [race, setRace] = useState('');
	const [cls, setCls] = useState('');
	const [name, setName] = useState('');

	const submitData = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		try {
			const body = { race, name, cls };
			await fetch('/api/characters', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			await Router.push('/');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Layout>
			<div>
				<form onSubmit={submitData}>
					<h1>New Char</h1>
					<input
						autoFocus
						onChange={(e) => setRace(e.target.value)}
						placeholder="Title"
						type="text"
						value={race}
					/>
					<input
						autoFocus
						onChange={(e) => setCls(e.target.value)}
						placeholder="Title"
						type="text"
						value={cls}
					/>
					<input
						autoFocus
						onChange={(e) => setName(e.target.value)}
						placeholder="Title"
						type="text"
						value={name}
					/>
					<input
						disabled={!race || !cls || !name}
						type="submit"
						value="Create"
					/>
					<a className="back" href="#" onClick={() => Router.push('/')}>
						or Cancel
					</a>
				</form>
			</div>
			<style jsx>{`
				.page {
					background: var(--geist-background);
					padding: 3rem;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				input[type='text'],
				textarea {
					width: 100%;
					padding: 0.5rem;
					margin: 0.5rem 0;
					border-radius: 0.25rem;
					border: 0.125rem solid rgba(0, 0, 0, 0.2);
				}

				input[type='submit'] {
					background: #ececec;
					border: 0;
					padding: 1rem 2rem;
				}

				.back {
					margin-left: 1rem;
				}
			`}</style>
		</Layout>
	);
};

export default Draft;
