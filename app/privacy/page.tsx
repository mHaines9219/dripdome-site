import { Metadata } from "next";
import { Box, Container, Typography } from "@mui/material";

export const metadata: Metadata = {
  title: "Privacy Policy | DripDome",
  description:
    "Read DripDome's privacy policy. Learn how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "https://www.dripdome.com/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy | DripDome",
    description:
      "Read DripDome's privacy policy. Learn how we collect, use, and protect your personal information.",
    url: "https://www.dripdome.com/privacy",
    type: "website",
    locale: "en_US",
    siteName: "DripDome",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | DripDome",
    description:
      "Read DripDome's privacy policy. Learn how we collect, use, and protect your personal information.",
  },
};

export default function PrivacyPolicy() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "black",
        minHeight: "100vh",
        pt: { xs: 12, md: 16 },
        pb: 8,
      }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 2, md: 4 } }}>
        <Typography
          variant="h1"
          component="h1"
          color="white"
          sx={{
            fontSize: { xs: "36px", sm: "48px", md: "56px" },
            fontWeight: "bold",
            mb: 4,
            textAlign: "center",
          }}
        >
          Privacy Policy
        </Typography>

        <Box sx={{ color: "grey.300", "& > p": { mb: 3 } }}>
          <Typography variant="body1" component="p">
            Your privacy is important to us. It is our policy to respect your
            privacy regarding any information we may collect from you across our
            website, dripdome.com, and other sites we own and operate.
          </Typography>

          <Typography variant="body1" component="p">
            We only ask for personal information when we truly need it to
            provide a service to you. We collect it by fair and lawful means,
            with your knowledge and consent. We also let you know why we&apos;re
            collecting it and how it will be used.
          </Typography>

          <Typography variant="body1" component="p">
            We only retain collected information for as long as necessary to
            provide you with your requested service. What data we store,
            we&apos;ll protect within commercially acceptable means to prevent
            loss and theft, as well as unauthorized access, disclosure, copying,
            use, or modification.
          </Typography>

          <Typography variant="body1" component="p">
            We don&apos;t share any personally identifying information publicly
            or with third parties, except when required to by law.
          </Typography>

          <Typography variant="body1" component="p">
            Our website may link to external sites that are not operated by us.
            Please be aware that we have no control over the content and
            practices of these sites, and cannot accept responsibility or
            liability for their respective privacy policies.
          </Typography>

          <Typography variant="body1" component="p">
            You are free to refuse our request for your personal information,
            with the understanding that we may be unable to provide you with
            some of your desired services.
          </Typography>

          <Typography variant="body1" component="p">
            Your continued use of our website will be regarded as acceptance of
            our practices around privacy and personal information. If you have
            any questions about how we handle user data and personal
            information, feel free to contact us.
          </Typography>

          <Typography
            variant="body1"
            component="p"
            sx={{ fontStyle: "italic" }}
          >
            This policy is effective as of January 1, 2025.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
