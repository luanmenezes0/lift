import { Container, VStack } from "@chakra-ui/react";
import Header from "../components/Header";
import BuildingSites from "../features/building-sites/components/BuildingSites";

const Index = () => (
  <Container h="100vh" maxW="container.xl">
    <VStack spacing={6} align="normal">
      <Header />
      <BuildingSites />
    </VStack>
  </Container>
);

export default Index;
