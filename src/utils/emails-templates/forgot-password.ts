import { environmentVariables } from '../../common/environment'

export const forgotPassword = (name: string, code: string) => {
  const link = `${environmentVariables.frontend.baseUrl}/change-password/${code}`
  return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          margin-top: 20px;
        }
    
        h1 {
          color: #1665d8;
          text-align: center;
        }
    
        p {
          color: #333;
          line-height: 1.6;
        }
    
        .cta-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #1665d8;
          color: #fff;
          text-decoration: none;
          border-radius: 3px;
          margin-top: 20px;
        }
    
        .footer {
          margin-top: 20px;
          color: #555;
          text-align: center;
        }
      </style>
    </head>
    
    <body>
      <div class="container">
        <h1>Password Reset Request</h1>
        <p>
          Hello ${name},<br>
          We received a request to reset your password for your account at My Smart Wallet. If you did not make this
          request, you can safely ignore this email.
        </p>
        <p>
          To reset your password, click the button below:
        </p>
        <a href="" class="cta-button">Reset Password</a>
        <p>
          If the button above does not work, you can also copy and paste the following link into your browser's address
          bar:
          <br>
          ${link}
        </p>
      </div>
      <div class="footer">
        <p>If you have any questions, please contact our support team at support@mysmartwallet.com</p>
      </div>
    </body>
    
    </html>`
}
