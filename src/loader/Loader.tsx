import { Flex, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex h="100vh" justifyContent="center" alignItems="center">
      <Spinner />
    </Flex>
  );
};

export default Loader;
