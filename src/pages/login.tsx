import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useAuth from "../features/auth/contexts/authContext";

type LoginForm = { email: string; password: string };

export default function Login() {
  const { signIn } = useAuth();

  const { register, handleSubmit, setError, formState } = useForm<LoginForm>();
  const { errors } = formState;

  return (
    <Container
      h="100vh"
      justifyContent="center"
      maxW="container.sm"
      p="10"
      centerContent
    >
      <VStack
        as="form"
        spacing="4"
        align="center"
        w="100%"
        p="10"
        onSubmit={handleSubmit(signIn)}
      >
        <FormControl isInvalid={Boolean(errors.email)}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Campo obrigatório",
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.email)}>
          <FormLabel htmlFor="password">Senha</FormLabel>
          <Input
            id="password"
            type="password"
            {...register("password", {
              required: "Campo obrigatório",
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <Button w="100%" type="submit" disabled={formState.isSubmitting}>
            Login
          </Button>
        </FormControl>
      </VStack>
    </Container>
  );
}
