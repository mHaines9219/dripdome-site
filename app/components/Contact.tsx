import React from 'react';
import { Typography } from '@mui/material';

export default function Contact() {
  return (
    <div className="mx-8">
      <Typography
        variant="h2"
        component="h2"
        color="primary"
        sx={{
          fontSize: { xs: '50px', md: '80px', lg: '96px' }, // Define different font sizes for different breakpoints
          fontWeight: 'bold', // Optional: Adjust font weight
          marginBottom: '15px',
          justifyContent: 'center',
          display: 'flex',
          whiteSpace: 'nowrap',
        }}
      >
        CONTACT US{' '}
      </Typography>
      <Typography
        variant="body1"
        component="p"
        color="primary"
        sx={{
          fontSize: { sm: '20px', md: '25px', lg: '30px' }, // Define different font sizes for different breakpoints
          fontWeight: 'bold', // Optional: Adjust font weight
          display: 'flex',
          textAlign: 'center',
          marginBottom: '30px',
          fontFamily: 'Open Sans',
        }}
      >
        BIG OR SMALL, EVERY IDEA HAS THE POTENTITAL TO SHINE. TELL US ABOUT YOUR
        PROJECT AND LET`S BUILD SOMETHING AMAZING!
      </Typography>
      <form
        className="flex flex-col max-w-md mx-auto"
        onSubmit={async (e) => {
          e.preventDefault();

          // Form Data
          const formData = {
            name: (e.target as any).name.value,
            email: (e.target as any).email.value,
            message: (e.target as any).message.value,
          };

          try {
            const response = await fetch('/api/contact', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });

            if (response.ok) {
              alert('Thank you! Your message has been sent.');
              (e.target as any).reset(); // Clear the form
            } else {
              throw new Error('Failed to send message');
            }
          } catch (error) {
            alert('An error occurred. Please try again.');
          }
        }}
      >
        <input
          className="mb-4 p-3 rounded-md bg-white text-black font-nova"
          type="text"
          name="name"
          placeholder="NAME"
          required
        />
        <input
          className="mb-4 p-3 rounded-md bg-white text-black font-nova"
          type="email"
          name="email"
          placeholder="EMAIL"
          required
        />
        <textarea
          className="mb-4 p-3 rounded-md bg-white text-black font-nova"
          name="message"
          rows={4}
          placeholder="YOUR MESSAGE"
          required
        ></textarea>
        <button
          className="bg-green-600 font-nova hover:bg-blue-700 px-6 py-3 rounded-md font-semibold transition duration-200"
          type="submit"
        >
          SEND{' '}
        </button>
      </form>
    </div>
  );
}
