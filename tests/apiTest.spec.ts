import { test, expect } from '@playwright/test';

test.describe('TaskFlow IA - Tests de API', () => {

  test('Debería crear una tarea exitosamente', async ({ request }) => {
    const response = await request.post('http://127.0.0.1:3000/tasks', {
      data: {
        title: 'Prueba desde Playwright',
        description: 'Validando el funcionamiento de la API'
      }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.title).toBe('Prueba desde Playwright');
    expect(body.id).toBeDefined();
  });

});