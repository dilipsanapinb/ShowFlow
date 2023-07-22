import React from "react";
import {
  Box,
  Center,
  Container,
  Heading,
  Image,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";

const moviesData = [
  {
    id: 1,
    title: "Crimes of the Future",
    language: "English",
    imageUrl:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:oi-discovery-catalog@@icons@@bms_premiere_v1.png,oit-false,ofo-bottom_left:q-80/et00364411-rhefqkfntl-portrait.jpg",
  },
  {
    id: 2,
    title: "Peter Grill and the Phi...",
    language: "Japanese",
    imageUrl:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:oi-discovery-catalog@@icons@@bms_premiere_v1.png,oit-false,ofo-bottom_left:q-80/et00363045-nayvfcsjyu-portrait.jpg",
  },
  {
    id: 3,
    title: "I Love My Dad",
    language: "Spanish",
    imageUrl:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:oi-discovery-catalog@@icons@@bms_premiere_v1.png,oit-false,ofo-bottom_left:q-80/et00364628-yzqtxpwgfw-portrait.jpg",
  },
  {
    id: 4,
    title: "Victor Lessard Season 3",
    language: "French",
    imageUrl:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:oi-discovery-catalog@@icons@@bms_premiere_v1.png,oit-false,ofo-bottom_left:q-80/et00364443-bjdbyygefk-portrait.jpg",
  },
];

const Premiere = () => {
  return (
    <div
      style={{
        maxWidth: "90%",
        margin: "0 auto",
        backgroundColor: "#2b3149",
        borderRadius: "10px",
        marginBottom:"10px"
      }}
    >
      <Box p={4}>
        <Image
          src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120:q-80/premiere-banner-web-collection-202208191200.png"
          style={{ marginLeft: "7%", width:'80%' }}
        ></Image>
        <Heading as="h2" size="lg" textAlign="left" mb={4} color="white" marginLeft={'7%'} >
          Premieres
        </Heading>
        <p style={{ color: "white", marginTop: "-4px", marginLeft: "7%" }}>
          Brand new releases every Friady
        </p>
        <Container maxW="90%">
          <Flex justify="space-evenly" wrap="wrap">
            {moviesData.map((movie) => (
              <Box
                key={movie.id}
                maxW="90%" // Set maximum width for the box
                maxH="350px" // Set maximum height for the box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                flex="1"
                textAlign="left"
                mx={2}
                my={4}
                boxShadow="lg"
                _hover={{ boxShadow: "2xl", transform: "scale(1.05)" }}
                transition="0.3s"
              >
                <Image
                  src={movie.imageUrl}
                  alt={movie.title}
                  width="100%"
                  height="70%"
                  h="250px"
                  objectFit="fill"
                />
                <Box p={4}>
                  <Center>
                    {/* <Text
                      color="white"
                      fontWeight="bold"
                      fontSize="sm"
                      textTransform="uppercase"
                    >
                      PREMIERE
                    </Text> */}
                  </Center>
                  <Text
                    mt={2}
                    fontWeight="bold"
                    as="h4"
                    lineHeight="tight"
                    fontSize="xl"
                    color="white"
                  >
                    {movie.title}
                  </Text>
                  <Text
                    // color="gray.600"
                    textTransform="uppercase"
                    fontSize="medium"
                    color="white"
                  >
                    {movie.language}
                  </Text>
                </Box>
              </Box>
            ))}
          </Flex>
        </Container>
      </Box>
    </div>
  );
};

export default Premiere;
