import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Link as ChakraLink,
  Button,
  Box,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsSticky(scrollPosition > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      as="nav"
      alignItems="center"
      justifyContent="space-between"
      paddingY="1rem"
      width="90%"
      margin={"auto"}
      marginBottom={"10px"}
      bgColor={"#2e3147"}
      position={isSticky ? "sticky" : "static"}
      top="0"
      zIndex="999"
      borderRadius={"10px"}
    >
      <Flex className="navbar-left">
        <Link to="/" className="logo">
          <Box
            fontSize="3xl"
            fontWeight="bold"
            color="white"
            marginLeft={"20px"}
          >
            BookspotOn
          </Box>
        </Link>
      </Flex>

      <Flex className="navbar-middle" alignItems="center">
        <InputGroup maxW="400px" mr="2rem">
          <Input
            type="text"
            placeholder="Search"
            borderRadius="md"
            bg="white"
            size="md"
          />
          <InputRightElement pointerEvents="none">
            <BiSearch color="gray.500" />
          </InputRightElement>
        </InputGroup>

        <Select
          bg="white"
          size="md"
          maxWidth="180px"
          mr="2rem"
          defaultValue=""
          borderRadius="md"
        >
          <option value="" disabled>
            Select Your City
          </option>
          <option value="Nashik">Nashik</option>
          <option value="Pune">Pune</option>
          <option value="Mumbai">Mumbai</option>
        </Select>

        <Flex className="navigation">
          <ChakraLink
            as={Link}
            backgroundColor="#f84464"
            color={"white"}
            to="/movies"
            className="nav-button"
            mr="1rem"
            // fontWeight="bold"
            _hover={{ textDecoration: "underline" }}
          >
            Movies
          </ChakraLink>

          <ChakraLink
            as={Link}
            to="/shows"
            className="nav-button"
            backgroundColor="#f84464"
            color={"white"}
            mr="1rem"
            // fontWeight="bold"
            _hover={{ textDecoration: "underline" }}
          >
            Shows
          </ChakraLink>

          <ChakraLink
            as={Link}
            to="/events"
            className="nav-button"
            mr="1rem"
            backgroundColor="#f84464"
            color={"white"}
            // fontWeight="bold"
            _hover={{ textDecoration: "underline" }}
          >
            Events
          </ChakraLink>
        </Flex>
      </Flex>

      <Flex className="navbar-right">
        <IconButton
          as="button"
          className="hamburger"
          icon={<HamburgerIcon />}
          variant="unstyled"
          fontSize="1.5rem"
          marginRight={"10px"}
          backgroundColor={"#2e3147"}
          color={"white"}
          onClick={onOpen}
        />

        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <ChakraLink
                as={Link}
                to="/signin"
                className="dropdown-button"
                display="block"
                mb="0.5rem"
              >
                <Button className="dropdown-button" display="block" mb="0.5rem">
                 Sign In
                </Button>
              </ChakraLink>

              <Button className="dropdown-button" display="block" mb="0.5rem">
                Logout
              </Button>
              <Button className="dropdown-button" display="block">
                More
              </Button>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Flex>
  );
};

export default Navbar;
