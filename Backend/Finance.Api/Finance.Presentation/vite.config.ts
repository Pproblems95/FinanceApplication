import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// @ts-ignore
import appsettings from "./appsettings.json"
// @ts-ignore
import appsettingsDev from "./appsettings.Development.json"

import * as process from "process"
import { spawn } from 'child_process'

const baseFolder =
    process.env.APPDATA !== undefined && process.env.APPDATA !== ''
        ? `${process.env.APPDATA}/ASP.NET/https`
        : `${process.env.HOME}/.aspnet/https`;

const certificateName = process.env.npm_package_name;
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

// Pattern for CSS files
const cssPattern = /\.css$/;
// Pattern for image files
const imagePattern = /\.(png|jpe?g|gif|svg|webp|avif)$/;


export default defineConfig(async () => {
    // busca si no existen el certificado y la llave 
    // para HTTPS
    if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
        // si no existe espera a que se genere el certificado
        // espera a que se genere el certificado
        await new Promise<void>((resolve) => {
                //spawn lo que hace es ejecutar el comando especificado entre ''
                //creo que llo que hace es correr el proyecto con las credenciales
                spawn('dotnet', [
                    'devcerts',
                    'https',
                    '--export-path',
                    certFilePath,
                    '--format',
                    'Pem',
                    '--no-password'
                ], { stdio: 'inherit', })
                    //el on creo que checa cuando se termina de ejecutar el comando que se paso
                    .on('exit', (code: any) => {
                        resolve();
                        if (code) {
                            // esto termina el proceso de ejecucion de node 
                            // con el resultado que obtenga de buscar los certificados
                            process.exit(code);
                        }
                    });
        });
    };
    const config: UserConfig = {
        // react lel
        plugins: [react()],
        clearScreen: true,
        appType: 'spa',
        root: 'Client',
        publicDir: 'public',
        build: {
            manifest: appsettings.Vite.Manifest,
            emptyOutDir: true,
            // donde va a scar la pagina yum yum
            outDir: './wwwroot',
            assetsDir: '',
            rollupOptions: {
                input: ['Client/main.ts', "Client/scss/site.scss"],

                // remove hashing??, viene en la guia pero no se que haga, pero lo dejare por si acaso :]
                output: {
                    entryFileNames: 'js/[name].js',
                    chunkFileNames: 'js/[name]-chunk.js',
                    assetFileNames: (info) => {
                        if (info.name) {
                            // If the file is a CSS file, save it to the css folder
                            if (cssPattern.test(info.name)) {
                                return 'css/[name][extname]';
                            }
                            // Image file on images folder
                            if (imagePattern.test(info.name)) {
                                return 'image/[name][extname]';
                            }
                            // any other type
                            return 'assets/[name][extname]';
                        } else {
                            // lo salva en laprimera carpeta del output
                            return '[name][extname]'
                        }
                    },
                }
            },
        },
        server: {
            //se especifia el puerto en el que se ejecuta Vite en appsettings.Development.json,
            // se puede acceder si expandes appsettings.json en VS
            port: appsettingsDev.Vite.Server.Port,
            // solo acceso al puerto especificado, por si tienen error
            // quizas un puerto ocupe el que Vite quiere
            strictPort: true,
            https: {
                cert: certFilePath,
                key: keyFilePath
            },
            hmr: {
                host: 'localhost',
                clientPort: appsettingsDev.Vite.Server.Port
            }
        }
    }
    return config;
});

// https://vite.dev/config/
// esto es lo que viene por defecto
// lo dejeo por si acaso aaa
//export default defineConfig({
//  plugins: [react()],
//})
