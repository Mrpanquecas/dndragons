import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';
import { CharacterInfo as CharacterInfoProps } from './index.types';

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
		</div>
	);
};

export default CharacterInfo;
