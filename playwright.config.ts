import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    // Desactiva las capturas de pantalla totalmente
    screenshot: 'off', 
    // Desactiva la grabación de video (también pesa mucho)
    video: 'off',
    // Desactiva los traces (archivos zip con todo el historial, pesan muchísimo)
    trace: 'off', 
    // Asegúrate de que corra en modo headless (sin interfaz gráfica visible)
    headless: true,
  },
});
