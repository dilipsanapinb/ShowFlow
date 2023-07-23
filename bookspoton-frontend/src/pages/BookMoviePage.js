import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookMovie.css";
import {
    Image,
  Text,
  Box,
  Button,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  ModalFooter,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import PaymentModel from "../Components/PaymentModel/PaymentModel";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer/Footer";



const BookMoviePage = () => {
  const [selectedTheaterId, setSelectedTheaterId] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
const selectedMovieData = JSON.parse(localStorage.getItem("bookedMovie"));
  const handleShowClick = (show) => {
    setSelectedShow(show);
    setSelectedTickets(1);
    setIsModalOpen(true);
    };
    
    const handlesaveFunction = () => {
       
   }
    //  const convertTo12HourFormat = (isoTime) => {
    //    const date = new Date(isoTime);
    //    const hours = date.getHours();
    //    const minutes = date.getMinutes();

    //    // Determine AM/PM
    //    const amOrPm = hours >= 12 ? "PM" : "AM";

    //    // Convert hours to 12-hour format
    //    const hours12Format = hours % 12 || 12;

    //    // Add leading zero for single-digit minutes
    //    const minutesWithLeadingZero = minutes < 10 ? `0${minutes}` : minutes;

    //    return `${hours12Format}:${minutesWithLeadingZero} ${amOrPm}`;
    //  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/payment");
  };

  const handleSelectTickets = (value) => {
    setSelectedTickets(value);
  };
    const [theaters, setTheaters] = useState([]);
    const [showsData,setShowsdata]=useState([])

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/theaters")
      .then((response) => {
        setTheaters(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
       axios
         .get("http://127.0.0.1:5000/api/shows")
         .then((response) => {
           setShowsdata(response.data);
         })
         .catch((error) => {
           console.log(error);
         });
  }, []);
    
    const filterTheater = showsData.filter(
      (theater) => theater.movie_id === selectedMovieData.id
    );
     const filteredShows = showsData.filter(
       (show) => show.movie_id === selectedMovieData.id
     );
    return (
      <div>
        <Navbar />
        {/* Display movie image, description, genre, and cast */}
        <Box p={4} textAlign="center" width={"90%"} margin={"auto"}>
          <Image
            src={selectedMovieData.image}
            alt={selectedMovieData.title}
            maxW="500px"
            mx="auto"
            borderRadius="lg"
          />
          <Box mt={4}>
            <Text fontSize="xl" fontWeight="bold">
              {selectedMovieData.title}
            </Text>
            <Text color="gray.500">{selectedMovieData.description}</Text>
            <Text mt={2} color="teal.500" fontWeight="bold">
              Genre: {selectedMovieData.genre}
            </Text>
            <Text mt={2}>Cast: {selectedMovieData.cast}</Text>
          </Box>
        </Box>
        {/* Dates section */}
        {/*  */}

        <Flex width={"90%"} margin={"auto"}>
          {/* Display theaters */}
          <Box>
            <Text fontSize="2xl" fontWeight="bold">
              Theaters
            </Text>
            {theaters.map((theater) => (
              <Box
                key={theater.id}
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                onClick={() => setSelectedTheaterId(theater.id)} // Set the selected theater ID
                cursor="pointer"
              >
                <Box p="6">
                  <Box display="flex" alignItems="baseline">
                    <Box
                      color="gray.500"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                      ml="2"
                    >
                      {theater.address}
                    </Box>
                  </Box>

                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    noOfLines={1}
                  >
                    {theater.name}
                  </Box>

                  <Center mt={4}>
                    <Button colorScheme="teal" w="40%">
                      View Showtimes
                    </Button>
                  </Center>
                </Box>
              </Box>
            ))}
          </Box>

          <Box p={4}>
            <Center mb={4}>
              <Text fontSize="2xl" fontWeight="bold">
                Available Shows
              </Text>
            </Center>
            <Stack direction="row" spacing={4} wrap="wrap">
              {filteredShows.map((show) => (
                <Box
                  key={show.id}
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  cursor="pointer"
                  onClick={() => handleShowClick(show)}
                >
                  <Box p={4}>
                    <Box display="flex" alignItems="baseline">
                      <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        flex="1"
                      >
                        {show.category}
                      </Box>
                    </Box>

                    <Box
                      mt={1}
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      noOfLines={1}
                    >
                      {selectedMovieData.title}
                    </Box>
                    <Box>
                      <Box mt={4}>Start: {show.start_time}</Box>
                      <Box mt={4}>End: {show.end_time}</Box>
                    </Box>
                    <Box mt={4}>price: {show.price}</Box>
                  </Box>
                </Box>
              ))}
            </Stack>
            {/* Modal for selecting number of tickets */}
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              size="sm"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Select Number of Tickets</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Center>
                    <Stack direction="row" spacing={4}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <Button
                          key={num}
                          colorScheme={selectedTickets === num ? "red" : "teal"}
                          onClick={() => setSelectedTickets(num)}
                        >
                          {num}
                        </Button>
                      ))}
                    </Stack>
                  </Center>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="teal"
                    w="full"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="teal"
                    w="full"
                    onClick={() => {
                      handleModalClose();
                      handlesaveFunction();
                    }}
                  >
                    Book Now ({selectedTickets} ticket
                    {selectedTickets > 1 ? "s" : ""})
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
            </Flex>
            <Footer/>
      </div>
    );
};

export default BookMoviePage;