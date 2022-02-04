import React from "react";
import ToggleTheme from "utils/ToggleTheme";
import Logo from 'assets/logo.png'

import {
  chakra, Box, Flex, useColorModeValue, VisuallyHidden, HStack, Button,
  useDisclosure, VStack, IconButton, CloseButton, Image,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function NavBar() {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Chat Puppy Home Page"
              display="flex"
              alignItems="center"
            >
              <VisuallyHidden>ChatPuppy</VisuallyHidden>
            </chakra.a>
            <Image src={Logo} h="35px"/>
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
              ChatPuppy
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              <Button variant="ghost">Mint</Button>
              <Button variant="ghost">Marketplace</Button>
              <ToggleTheme />
            </HStack>
            <Button size="md">
              Go To App
            </Button>
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.800", "inherit")}
                variant="ghost"
                icon={<HamburgerIcon />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="md"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                <Button w="full" variant="ghost">
                  Mint
                </Button>
                <Button w="full" variant="ghost">
                  Marketplace
                </Button>
                <ToggleTheme />
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}