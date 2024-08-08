import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import axios from 'axios';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { PUBLIC_API_URL } from '$env/static/public';

const schema = z.object({
	id: z.string().optional(),
	first_name: z.string().min(2),
	last_name: z.string().min(2),
	email: z.string().email().min(2),
	avatar: z.string().url()
});

export const load = async (event) => {
	const form = await superValidate(event, zod(schema), { errors: false });

	return { form };
};
export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const { data } = form;

		if (!data?.id)
			await axios.post(PUBLIC_API_URL + 'user', {
				first_name: data.first_name,
				last_name: data.last_name,
				email: data.email,
				avatar: data.avatar
			});
		else
			await axios.put(PUBLIC_API_URL + 'user/' + data.id, {
				first_name: data.first_name,
				last_name: data.last_name,
				email: data.email,
				avatar: data.avatar
			});

		return message(form, 'Form posted successfully!');
	}
};
