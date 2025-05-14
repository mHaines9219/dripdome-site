type formData = {
  name: string;
  instagram: string;
  email: string;
  message: string;
};

export const sendData = async (data: formData) => {
  console.log(data);
  await fetch(
    "https://kingbird.app.n8n.cloud/webhook/653ffa9b-9b49-4ada-870d-f74a27ad2835",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        instagram: data.instagram,
        message: data.message,
      }),
    }
  );
};
