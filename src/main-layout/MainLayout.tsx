import { Box } from "@chakra-ui/react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      width="100%"
      padding={{ base: "0 1rem", xl: "0" }}
      margin="0 auto"
      maxWidth={{ xl: "1400px" }}
    >
      {children}
    </Box>
  );
};

export default MainLayout;
