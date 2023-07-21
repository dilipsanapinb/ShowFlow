import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookMovie.css";
import {
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

const showsData = [
  {
    id: 1,
    title: "Baipan Bhari Deva",
    genre: "Action",
    image: "https://example.com/movie1.jpg",
    rating: 4.5,
    reviewCount: 100,
    date: new Date("2023-07-20"), // Add a valid date here
    timings: ["10:00 AM", "2:00 PM", "6:00 PM"],
  },
  {
    id: 2,
    title: "Baipan Bhari Deva",
    genre: "Comedy",
    image: "https://example.com/movie2.jpg",
    rating: 3.8,
    reviewCount: 85,
    date: new Date("2023-07-21"), // Add a valid date here
    timings: ["11:00 AM", "3:00 PM", "7:00 PM"],
  },
  {
    id: 3,
    title: "Baipan Bhari Deva",
    genre: "Drama",
    image: "https://example.com/movie3.jpg",
    rating: 4.2,
    reviewCount: 120,
    date: new Date("2023-07-22"), // Add a valid date here
    timings: ["12:00 PM", "4:00 PM", "8:00 PM"],
  },
];

const BookMoviePage = () => {
  const [selectedTheaterId, setSelectedTheaterId] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const handleShowClick = (show) => {
    setSelectedShow(show);
    setSelectedTickets(1);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/payment");
  };

  const handleSelectTickets = (value) => {
    setSelectedTickets(value);
  };
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/theaters")
      .then((response) => {
        setTheaters(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

    return (
        <div>
            {/* Dates section */}
            {/*  */}
            <Box mb={4}>
                <h2>Available Booking Dates:</h2>
                <div className="date-picker-container">
                    {showsData.map((show) => (
                        <div
                            key={show.id}
                            className={`date-picker-item ${selectedDate.toDateString() === show.date.toDateString()
                                    ? "active"
                                    : ""
                                }`}
                            onClick={() => setSelectedDate(show.date)}
                        >
                            {show.date.toDateString()}
                        </div>
                    ))}
                </div>
            </Box>
            <Flex>
                {/* Display theaters */}
                <Box>
                    <h2>Theaters</h2>
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
                        {showsData.map((show) => (
                            <Box
                                key={show.id}
                                maxW="sm"
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                cursor="pointer"
                                onClick={() => handleShowClick(show)}
                            >
                                {/* <Image
                  src={show.image}
                  alt={show.title}
                  h="200px"
                  objectFit="cover"
                /> */}

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
                                            {show.genre}
                                        </Box>
                                    </Box>

                                    <Box
                                        mt={1}
                                        fontWeight="semibold"
                                        as="h4"
                                        lineHeight="tight"
                                        noOfLines={1}
                                    >
                                        {show.title}
                                    </Box>

                                    <Box display="flex" mt={2} alignItems="center">
                                        {Array(5)
                                            .fill("")
                                            .map((_, i) => (
                                                <StarIcon
                                                    key={i}
                                                    color={
                                                        i < Math.round(show.rating / 2)
                                                            ? "teal.500"
                                                            : "gray.300"
                                                    }
                                                />
                                            ))}
                                        <Box as="span" ml="2" color="gray.600" fontSize="sm">
                                            {show.reviewCount} reviews
                                        </Box>
                                    </Box>

                                    <Box mt={4}>
                                        {show.timings.map((timing) => (
                                            <Box key={timing}>{timing}</Box>
                                        ))}
                                    </Box>
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
                                    onClick={() => handleModalClose()}
                                >
                                    Book Now ({selectedTickets} ticket
                                    {selectedTickets > 1 ? "s" : ""})
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
            </Flex>
        </div>
    );
};

export default BookMoviePage;