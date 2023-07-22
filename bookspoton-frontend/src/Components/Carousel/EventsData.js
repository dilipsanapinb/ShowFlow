import React, { useState } from "react";
import {
  Box,
  Heading,
  Flex,
  Button,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";

const eventsDataFor = [
  {
    id: 1,
    imageSrc:
      "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-NjUrIEV2ZW50cw%3D%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/workshop-and-more-web-collection-202211140440.png",
  },
  {
    id: 2,
    imageSrc:
      "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-NyBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/kids-zone-collection-202211140440.png",
  },
  {
    id: 3,
    imageSrc:
      "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MTUrIEV2ZW50cw%3D%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/comedy-shows-collection-202211140440.png",
  },
  {
    id: 4,
    imageSrc:
      "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-NyBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/music-shows-collection-202211140440.png",
  },
  {
    id: 5,
    imageSrc:
      "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-NCBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/esports-collection-202211140440.png",
  },
  {
    id: 6,

    imageSrc:
      "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MTAgRXZlbnRz,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/upskill-collection-202211140440.png",
  },
  {
    id: 7,

    imageSrc:
      "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-OSBFdmVudHM%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/arts-crafts-collection-202211140440.png",
  },
  {
    id: 8,
    imageSrc:
      "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:ote-MTArIEV2ZW50cw%3D%3D,otc-FFFFFF,otf-Roboto,ots-64,ox-48,oy-320,ott-b:w-300:q-80/theatre-shows-collection-202211140440.png",
  },
  // Add more event data here
];


const EventsData = ({ currentPage, setCurrentPage }) => {
  const eventsPerPage = 4;
  const totalPages = Math.ceil(eventsDataFor.length / eventsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const paginatedEvents = eventsDataFor.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  return (
    <div
      style={{
        //   border: "5px solid grey",
        borderRadius: "5px",
        width: "90%",
        height: "400px",
        margin: "auto",
      }}
    >
      <Box p={4} height={{ base: "500px", md: "600px", lg: "700px" }}>
        <Heading
          as="h1"
          fontSize="24px"
          textAlign="left"
          mb={4}
          // margin="0 auto"
          marginBottom={"10px"}
        >
          The Best Live Events
        </Heading>
        <SimpleGrid
          columns={4}
          spacing={4}
          // justifyContent="space-evenly"
        >
          {paginatedEvents.map((event, index) => (
            <Box
              key={event.id}
              maxW="350px"
              maxH="400px"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              mx={2}
              boxShadow="lg"
              _hover={{ boxShadow: "2xl", transform: "scale(1.05)" }}
              transition="0.3s"
              position="relative"
            >
              <Image
                src={event.imageSrc}
                alt={event.eventName}
                h="100%"
                w="100%"
                borderRadius="5px"
                //   objectFit="cover"
              />
            </Box>
          ))}
        </SimpleGrid>
        {/* <Flex justify="center" mt={4}>
          <Button
            onClick={handlePrevPage}
            fontSize="20px"
            background="black"
            color="white"
            visibility={currentPage > 1 ? "visible" : "hidden"}
            position="absolute"
            top="45%"
            left={0}
            transform="translateY(-50%)"
          >
            &#8249;
          </Button>
          <Button
            onClick={handleNextPage}
            fontSize="20px"
            background="black"
            color="white"
            visibility={currentPage < totalPages ? "visible" : "hidden"}
            position="absolute"
            top="45%"
            right={0}
            transform="translateY(-50%)"
          >
            &#8250;
          </Button>
        </Flex> */}
      </Box>
    </div>
  );
};

export default EventsData;