import { Container, VStack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Header from "../components/Header";
import BuildingSites from "../features/building-sites/components/BuildingSites";

export default function Index() {
  return (
    <Container h="100vh" maxW="container.xl">
      <VStack spacing={6} align="normal">
        <Header />
        <BuildingSites />
      </VStack>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["token@lift"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
