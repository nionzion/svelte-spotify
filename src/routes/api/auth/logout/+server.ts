import type { RequestHandler } from '@sveltejs/kit';
import { json, redirect } from '@sveltejs/kit';

export const POST: RequestHandler = ({ cookies, request }) => {
	cookies.delete('refresh-token', { path: '/' });
	cookies.delete('access-token', { path: '/' });

	if (request.headers.get('accept') === 'application/json') {
		return json({ success: true });
	}

	throw redirect(303, '/login');
};