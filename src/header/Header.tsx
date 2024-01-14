import MainLayout from "@/main-layout";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box bg="green.500">
      <MainLayout>
        <Flex direction="row" alignItems="center" gap="5" mb="10px">
          <Link href="/">
            <Heading as="h1" size="2xl">
              Coll
            </Heading>
          </Link>
          <Link href="/collection">All collections</Link>
          <Link href="/create-collection">Create a new collection</Link>
        </Flex>
      </MainLayout>
    </Box>
  );
};

export default Header;
