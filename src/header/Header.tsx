"use client";

import MainLayout from "@/main-layout";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  useColorMode,
} from "@chakra-ui/react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg="green.500">
      <MainLayout>
        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          p="10px"
        >
          <Link href="/">
            <Heading as="h1" size="2xl">
              Coll
            </Heading>
          </Link>
          <Link href="/collection">All collections</Link>
          <Link href="/create-collection">Create a new collection</Link>
          <Link href="/authentication">Sign in</Link>
          <Button onClick={toggleColorMode}>
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button>
        </Flex>
      </MainLayout>
    </Box>
  );
};

export default Header;
