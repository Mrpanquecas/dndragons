import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';

export type CharacterInfoProps = {
	id: String;
	name: String;
	race: String;
	class: String;
	gender: String;
	hitpoints: Number;
	armor: Number;
	alignment: String;
	xp: String;
};

const CharacterInfo: React.FC<{ character: CharacterInfoProps }> = ({
	character,
}) => {
	console.log('char info ========>', character);
	const characterName = character?.name ? character.name : 'Unknown author';
	return (
		<div onClick={() => Router.push('/char/[id]', `/char/${character.id}`)}>
			<h2>{character?.race}</h2>
			<small>By {characterName}</small>
			<ReactMarkdown children={character?.class} />
			<style jsx>{`
				div {
					color: inherit;
					padding: 2rem;
				}
			`}</style>
		</div>
	);
};

export default CharacterInfo;
