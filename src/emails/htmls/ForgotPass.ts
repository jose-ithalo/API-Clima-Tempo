/* eslint-disable prettier/prettier */
import * as crypto from 'crypto';

export class ForgotPass {
    public msgKey: string

    createCode() {
        this.msgKey = crypto.randomBytes(4).toString('hex');
    }

    createBody(): string {
        return `<!DOCTYPE html>
        <html lang="pt-br">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
            <title>Email</title>
        </head>
        
        <body>
            <div style="margin: auto; height: auto; max-width: 600px; text-align: center;">
                <h1 style="color: #00008b; font-family: Verdana, Geneva; font-size: 170%; margin-bottom: 30px;">
                    Clima Tempo
                </h1>
                <p style="font-size: 120%; font-family: Roboto, sans-serif; font-weight: 400;">
                    Você recebeu este email porque optou pela redefinição de senha.<br />
                </p>
                <span style="color: #a18181; font-size: 100%; font-family: Roboto, sans-serif; font-weight: 600;">
                    Use esta chave para redefinir
                </span>
                <div style="background-color: #ddcdcd; border-radius: 12px; margin: 10px auto; padding: 18px; width: 30%;">
                    <span style="font-family: sans-serif, monospace; font-size: 28px; letter-spacing: 3px;">
                        ${this.msgKey}
                    </span>
                </div>
                <p style="font-size: 120%; font-family: Roboto, sans-serif;">
                    Clique no botão abaixo para trocar a senha
                </p>
                <a href="https://clima-tempo-joseph.netlify.app/Reset" target="_blank" style="margin-bottom: 20px;">
                    <button style=" background-color: #0575E6; border: transparent; border-radius: 30px; 
                    color: #fff; cursor: pointer; font-family: Roboto, sans-serif; padding: 12px 50px;">
                        Trocar
                    </button>
                </a>
            </div>
        </body>
        
        </html>`;
    }

}