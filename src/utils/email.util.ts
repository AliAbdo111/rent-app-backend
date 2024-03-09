import * as nodemailer from 'nodemailer';

// Create a transporter using your email service provider's settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nullifycomp@gmail.com',
    pass: 'fzrfqahwhcslzkea',
  },
});
// Function to send the email
export async function sendEmail(
  toEmail: string,
  subject: string,
  htmlContent?: string,
  name?: string,
) {
  try {
    // Define email options
    const mailOptions = {
      from: 'أيجاري',
      to: toEmail,
      subject: subject,
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap" rel="stylesheet">
        <style>
          * {
            padding: 0;
            margin: 0;
          }
          body {
            font-family: 'Open Sans', sans-serif;
            color: #757373;
          }
          .container {
            width: 90%;
            margin: auto;
          }
          .container_small {
            width: 70%;
            margin: auto;
          }
          @media (max-width: 768px) {
            .container_small {
              width: 100%;
              margin: auto;
            }
            .pragraph {
            font-size: 20px !important;
            }
            .logo {
              width: 80px !important;
            }
            .box_date {
              width: auto !important;
            }
          }
          .layout_title {
            position: relative;
          }
          .logo {
            width: 150px;
            position: absolute;
            left: 0;
            top: 0;
          }
          .logo img {
            width: 100%;
          }
          .pragraph {
            text-align: center;
            border-bottom: 1px solid #75737352;
            color: #000;
            font-size: 32px;
            font-weight: 600px;
            padding: 10px 0;
            height: 120px;
            line-height: 180px;
            text-transform: capitalize;
          }
          .center_hello {
            text-align: center;
            padding: 10px 0;
            margin: 30px 0;
          }
          .name_user {
            font-size: 18px;
            font-weight: 600;
          }
          .title_user {
            font-size: 18px;
            font-weight: 600;
            margin-top: 8px;
            line-height: 30px;
          }
          .box_date {
            width: 400px;
            background-color: #02BF0208;
            margin: auto;
            margin-top: 40px;
            margin-bottom: 40px;
            padding: 10px;
          }
          .line_date {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .parent_two {
            display: flex;
            justify-content: space-between;
          }
          .mt {
            margin-top: 15px;
          }
          .box_pragraph {
            text-align: center;
          }
          .buttonC {
            width: 200px;
            height: 48px;
            border-radius: 12px;
            margin-top: 20px;
            border:none;
            font-weight: 500;
            text-transform: capitalize;
            color: #333;
            cursor: pointer;
          }
        </style>
        <title>Hello</title>
      </head>
      <body>
        <div class="container">
          <!-- Start Logo And Title  -->
          <div class="layout_title">
            <div class="logo">
              <img src="https://www.creativefabrica.com/wp-content/uploads/2021/03/20/Mountain-logo-Design-Graphics-9785421-1-580x435.png" alt="">
            </div>
            <p class="pragraph">Confirm your account</p>
          </div>
          <!-- End Logo And Title  -->
          <div class="center_hello">
            <img src="https://i.ibb.co/GfZtXtS/Whats-App-Image-2023-08-29-at-5-55-01-PM.jpg" alt="">
          </div>
      
          <!-- Start Body Name User  -->
          <div class="container_small">
            <div>
              <h3 class="name_user">Hello ${name || 'Client'},</h3>
              <p class="title_user">Please confirm your account by clicking on button:</p>
              <a href="${htmlContent}" target="_blank">
      
              <button type="button" class="buttonC">confirmation account</button></a>
            </div>
          </div>
        </div>
      </body>
      </html>`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent resendmail:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
}
