import { Flex, Heading, Link } from "@chakra-ui/react";

const Header = () => {
  return (
      <Flex direction="row" alignItems="center" gap="5" bg="green.500">
        <Link href="/">
          <Heading as="h1" size="2xl">
            Coll
          </Heading>
        </Link>
        <Link href="collection-list-page">Collections</Link>
      </Flex>
  );
};

export default Header;
