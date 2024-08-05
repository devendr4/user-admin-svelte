import { z } from 'zod';
import { superForm, setMessage, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const schema = z.object({
	first_name: z.string(),
	last_name: z.string(),
	email_address: z.string(),
	avatar: z.string()
});

export const load = async () => {
	const form = await superValidate(zod(schema));

	// Always return { form } in load functions
	return { form };
};
