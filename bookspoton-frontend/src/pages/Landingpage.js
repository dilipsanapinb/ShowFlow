import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselPage from "../Components/Carousel/CarouselPage";
import EventsData from "../Components/Carousel/EventsData";
import Premiere from "../Components/Premier";
import Footer from "../Components/Footer/Footer";
import OnlineStreamingCarousel from "../Components/Carousel/OnlineStreamingCarousel";
import {Image, Heading, Flex, Button } from "@chakra-ui/react";

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

const Landingpage = () => {
  const [onlineStreamingPage, setOnlineStreamingPage] = useState(1);
  const [eventsDataPage, setEventsDataPage] = useState(1);

  // Calculate total pages for OnlineStreamingCarousel
  const eventsPerPageOnlineStreaming = 4;
  const totalOnlineStreamingPages = Math.ceil(
    eventsData.length / eventsPerPageOnlineStreaming
  );

  // Calculate total pages for EventsData
  const eventsPerPageEventsData = 4;
  const totalEventsDataPages = Math.ceil(
    eventsDataFor.length / eventsPerPageEventsData
  );

  const handleOnlineStreamingNext = () => {
    setOnlineStreamingPage((prevPage) =>
      Math.min(prevPage + 1, totalOnlineStreamingPages)
    );
  };

  const handleOnlineStreamingPrev = () => {
    setOnlineStreamingPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleEventsDataNext = () => {
    setEventsDataPage((prevPage) =>
      Math.min(prevPage + 1, totalEventsDataPages)
    );
  };

  const handleEventsDataPrev = () => {
    setEventsDataPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <Navbar />
      <CarouselPage />
      <div>
        <Heading
          as="h1"
          fontSize="24px"
          textAlign="left"
          mb={4}
          marginBottom={"10px"}
        ></Heading>
        <OnlineStreamingCarousel
          currentPage={onlineStreamingPage}
          setCurrentPage={setOnlineStreamingPage}
        />
        <Flex justify="center" mt={4}>
          <Button
            borderRadius="50%"
            onClick={handleOnlineStreamingPrev}
            fontSize="20px"
            background="grey"
            color="white"
            visibility={onlineStreamingPage > 1 ? "visible" : "hidden"}
            position="absolute"
            top="40%"
            left={0}
            transform="translateY(-50%)"
            zIndex={1}
          >
            &#8249;
          </Button>
          <Button
            borderRadius="50%"
            onClick={handleOnlineStreamingNext}
            fontSize="20px"
            background="grey"
            color="white"
            visibility={
              onlineStreamingPage < totalOnlineStreamingPages
                ? "visible"
                : "hidden"
            }
            position="absolute"
            top="40%"
            right={0}
            transform="translateY(-50%)"
            zIndex={1}
          >
            &#8250;
          </Button>
        </Flex>
      </div>

      <div>
        <Heading
          as="h1"
          fontSize="24px"
          textAlign="left"
          mb={4}
          marginBottom={"10px"}
        ></Heading>

        <EventsData
          currentPage={eventsDataPage}
          setCurrentPage={setEventsDataPage}
        />
        <Flex justify="center" mt={4}>
          <Button
            borderRadius="50%"
            onClick={handleEventsDataPrev}
            fontSize="20px"
            background="grey"
            color="white"
            visibility={eventsDataPage > 1 ? "visible" : "hidden"}
            position="absolute"
            top="60%"
            left={0}
            transform="translateY(-50%)"
            zIndex={1}
          >
            &#8249;
          </Button>
          <Button
            borderRadius="50%"
            onClick={handleEventsDataNext}
            fontSize="20px"
            background="grey"
            color="white"
            visibility={
              eventsDataPage < totalEventsDataPages ? "visible" : "hidden"
            }
            position="absolute"
            top="60%"
            right={0}
            transform="translateY(-50%)"
            zIndex={1}
          >
            &#8250;
          </Button>
        </Flex>
      </div>
      <Premiere />
      <Image src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120:q-80/stream-leadin-web-collection-202210241242.png" style={{width:'90%',margin:"auto", marginBottom:"10px"}} />
      <Footer />
    </div>
  );
};

export default Landingpage;
