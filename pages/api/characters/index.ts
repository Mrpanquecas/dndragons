import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { name, race, cls } = req.body;

	const session = await getSession({ req });
	const result = await prisma.character.create({
		data: {
			name: name,
			race: race,
			cls: cls,
			owner: { connect: { email: session?.user?.email } },
		},
	});
	console.log(result);
	res.json(result);
}
