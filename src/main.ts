import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent,  {
  ...appConfig, // Mantiene tu configuración existente
  providers: [
    provideHttpClient(), // Agrega HttpClient
    provideRouter(routes) // Agregar Rutas
  ],
}).catch((err) => console.error(err));
