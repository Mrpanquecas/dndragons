import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Router from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Race } from '../../enums/races.enum';
import { Class } from '../../enums/classes.enum';

type Inputs = {
	race: Race;
	cls: Class;
	name?: String;
};

const Draft: React.FC = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => submitData(data);

	const submitData = async (data: Inputs) => {
		try {
			const { race, name, cls } = data;
			const body = {
				race,
				name,
				cls: cls,
			};
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
	console.log('errors ======>', errors);

	return (
		<Layout>
			<div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<h1>New Char</h1>
					<input
						className="w-full p-2 rounded-sm border-2 my-1 border-gray-400"
						autoFocus
						placeholder="Race"
						{...(register('race'), { required: true })}
					/>
					{errors.race && (
						<span className="text-red-400">this field is required</span>
					)}
					<input
						className="w-full p-2 rounded-sm border-2 my-1 border-gray-400"
						autoFocus
						placeholder="Class"
						{...(register('cls'), { required: true })}
					/>
					{errors.cls && (
						<span className="text-red-400">this field is required</span>
					)}
					<input
						className="w-full p-2 rounded-sm border-2 my-1 border-gray-400"
						autoFocus
						placeholder="Name"
						{...(register('name'), { required: true })}
					/>
					{errors.name && (
						<span className="text-red-400">this field is required</span>
					)}
					<input
						className="bg-gray-200 px-6 py-4"
						type="submit"
						value="Create"
					/>
					<a className="ml-4" href="#" onClick={() => Router.push('/')}>
						or Cancel
					</a>
				</form>
			</div>
		</Layout>
	);
};

export default Draft;
