import React, { useState } from "react";
import {
  Box,
  Heading,
  Flex,
  Button,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";

const eventsData = [
  {
    id: 1,
    eventName: "Art and Craft Online Workshop",
    channelName: "Watch on Zoom",
    imageSrc:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-U2F0LCAxMiBBdWcgb253YXJkcw%3D%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00131211-edwmrltndu-portrait.jpg",
  },
  {
    id: 2,
    eventName: "Smart Photography: Unleash the proMode",
    channelName: "Watch on Zoom",
    imageSrc:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-U2F0LCAyMiBKdWwgb253YXJkcw%3D%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00307978-zghvczcrde-portrait.jpg",
  },
  {
    id: 3,
    eventName: "Kids Sudoku Championship",
    channelName: "Watch on Zoom",
    imageSrc:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-U2F0LCAyMCBKYW4%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00357347-aqnnkhulam-portrait.jpg",
  },
  {
    id: 4,
    eventName: "Energy Fitness Workshop!",
    channelName: "Watch on Zoom",
    imageSrc:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-U3VuLCAyMyBKdWwgb253YXJkcw%3D%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00363742-mgfctfqwvj-portrait.jpg",
  },
  {
    id: 5,
    eventName: "Child Favorite Moral Story",
    channelName: "Watch on Zoom",
    imageSrc:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-U3VuLCAyMyBKdWw%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00357082-husfhevsam-portrait.jpg",
  },
  {
    id: 6,
    eventName: "Online Open Mice by Kasa kai",
    channelName: "Watch on Zoom",
    imageSrc:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-U3VuLCAyMyBKdWw%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00357082-husfhevsam-portrait.jpg",
  },
  {
    id: 7,
    eventName: "Monali Thakur Teaches Music",
    channelName: "Watch on Zoom",
    imageSrc:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-U3VuLCAyMyBKdWwgb253YXJkcw%3D%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00309320-tlklzqwjdr-portrait.jpg",
  },
  {
    id: 8,
    eventName: "Weekly Workshop with rooftop",
    channelName: "Watch on Zoom",
    imageSrc:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-RnJpLCAyNSBBdWc%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00364755-suxthfxmjn-portrait.jpg",
  },
  // Add more event data here
];

const OnlineStreamingCarousel = ({ currentPage, setCurrentPage }) => {
  const eventsPerPage = 4;
  const totalPages = Math.ceil(eventsData.length / eventsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleViewAll = () => {
    setCurrentPage(totalPages);
  };

  const paginatedEvents = eventsData.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  return (
    <div
      style={{
        //   border: "5px solid grey",
        borderRadius: "5px",
        width: "90%",
        height: "600px",
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
          Online Streaming Events
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
              maxH="520px"
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
                h="80%"
                w="100%"
                borderRadius="5px"
                //   objectFit="cover"
              />
              <Box p={4} textAlign="center">
                <Heading as="h2" fontSize="18px" mb={2}>
                  {event.eventName}
                </Heading>
                <Box color="gray.600" textTransform="uppercase" fontSize="14px">
                  {event.channelName}
                </Box>
              </Box>
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

export default OnlineStreamingCarousel;
