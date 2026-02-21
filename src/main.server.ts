// src/main.server.ts
import { enableProdMode } from '@angular/core';
import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config as serverConfig } from './app/app.config.server';

enableProdMode();

// Função default export
const bootstrap = (context: BootstrapContext) => bootstrapApplication(AppComponent, serverConfig, context);
export default bootstrap;