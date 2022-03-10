import { Button, Flex, Switch, Text, useColorMode } from "@chakra-ui/react";

import useAuth from "../features/auth/contexts/authContext";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return <Switch color="green" isChecked={isDark} onChange={toggleColorMode} />;
};

export const Hero = () => (
  <Text
    bgGradient="linear(to-l, #7928CA, #0a85b6)"
    bgClip="text"
    fontSize="xl"
    fontWeight="extrabold"
  >
    lift
  </Text>
);

export default function Header() {
  const { signOut } = useAuth();
  
  return (
    <Flex as="header" h={16} justify="space-between" align="center">
      <Hero />
      <DarkModeSwitch />
      <Button onClick={signOut}>Log out</Button>
    </Flex>
  );
}
