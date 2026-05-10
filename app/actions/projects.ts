'use server';
import { revalidatePath } from 'next/cache';

const API = 'http://localhost:3000/api/projects';

export async function addProject(formData: FormData) {
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;
  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, color }),
  });
  revalidatePath('/dashboard');
}

export async function deleteProject(formData: FormData) {
  const id = formData.get('id') as string;
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  revalidatePath('/dashboard');
}

export async function renameProject(formData: FormData) {
  const id = formData.get('id') as string;
  const newName = formData.get('newName') as string;
  const color = formData.get('color') as string;
  await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newName, color }),
  });
  revalidatePath('/dashboard');
}