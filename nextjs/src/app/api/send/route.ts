import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const Email = z.object({
  fullName: z.string().min(2, "Full name is invalid!"),
  email: z.string().email({ message: "Email is invalid!" }),
  message: z.string().min(10, "Message is too short!"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received contact form submission:", body);

    // Validate the request body
    const {
      success: zodSuccess,
      data: zodData,
      error: zodError,
    } = Email.safeParse(body);

    if (!zodSuccess) {
      return NextResponse.json(
        { error: zodError?.errors[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    // Check if Gmail credentials are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("Gmail credentials not configured");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact the site administrator." },
        { status: 503 }
      );
    }

    // Create a transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: "ramjib2311@gmail.com",
      subject: `Portfolio Contact: Message from ${zodData.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 2px solid #4285f4; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong style="color: #555;">Name:</strong> ${zodData.fullName}</p>
            <p style="margin: 10px 0;"><strong style="color: #555;">Email:</strong> <a href="mailto:${zodData.email}" style="color: #4285f4;">${zodData.email}</a></p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong style="color: #555;">Message:</strong></p>
            <p style="margin: 0; color: #333; line-height: 1.6;">${zodData.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #888; font-size: 12px;">
            <p>This email was sent from your portfolio contact form.</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${zodData.fullName}
Email: ${zodData.email}

Message:
${zodData.message}

---
This email was sent from your portfolio contact form.
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully!",
        messageId: info.messageId
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
