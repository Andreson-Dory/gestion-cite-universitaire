import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  pixelBasedPreset,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import React from "react";

export const ConfirmationPaiement = ({ NomEtudiant, MontantPai }) => {
  const previewText = `Confirmation de Paiement`;

  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
        }}
      >
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Preview>{previewText}</Preview>
          <Container className="mx-auto my-10 max-w-116.25 rounded border border-[#eaeaea] border-solid p-5">
            <Section className="mt-8]">
              {/*  <Img
                src={``}
                width="40"
                height="37"
                alt="Vercel Logo"
                className="mx-auto my-0"
              /> */}
            </Section>
            <Heading className="mx-0 my-7.5 p-0 text-center font-normal text-[24px] text-black">
              Confirmation de paiement au nom de <strong>{NomEtudiant}</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-6">
              Bonjour {NomEtudiant},
            </Text>
            <Section className="mt-8 mb-8 text-center">
              <Text>
                Votre paiement de <b>{MontantPai} Ar</b> a été confirmé.
              </Text>
            </Section>
            <Hr className="mx-0 my-6.5 w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-6">
              Email automatique - merci,
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConfirmationPaiement;
