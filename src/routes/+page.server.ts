import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import axios from 'axios';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import toast from 'svelte-french-toast';
import { PUBLIC_API_URL } from '$env/static/public';

const schema = z.object({
	first_name: z.string(),
	last_name: z.string(),
	email_address: z.string(),
	avatar: z.string()
});

export const load = async (event) => {
	const form = await superValidate(event, zod(schema));

	// Always return { form } in load functions
	return { form };
};
export const actions = {
	default: async ({ request }) => {
		console.log(request);
		const form = await superValidate(request, zod(schema));

		// if (userData) {
		// await axios.put(PUBLIC_API_URL + 'user', {
		// 	first_name: $form.first_name,
		// 	last_name: $form.last_name,
		// 	email_address: form.email_address,
		// 	avatar: form.avatar
		// });
		// toast.success('User succesfully updated!');
		// }

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		console.log(form.data);
		await axios.post(PUBLIC_API_URL + 'user', {
			first_name: form.data.first_name,
			last_name: form.data.last_name,
			email_address: form.data.email_address,
			avatar: form.data.avatar
		});

		return message(form, 'Form posted successfully!');
	}
};
