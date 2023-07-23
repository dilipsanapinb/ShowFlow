import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Box,
  VStack,
  Spacer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import{useNavigate} from 'react-router-dom'
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";

const PaymentModel = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

  const handleCardNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    const formattedInput = input.substr(0, 16).replace(/(\d{4})(?=\d)/g, "$1-");
    setCardNumber(formattedInput);
  };

  const handleExpiryDateChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    const formattedInput = input.substr(0, 4).replace(/(\d{2})(?=\d)/g, "$1/");
    setExpiryDate(formattedInput);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
        onOpen(); 
      setCardNumber("");
      setCardHolder("");
      setExpiryDate("");
      setCvv("");
    }, 3000);
  };

  return (
    <div>
      <Navbar />
      <div style={{width:'90%', margin:'auto',marginBottom:'10px',marginTop:'10px'}}>
        <Box
          bg="white"
          p="4"
          rounded="md"
          boxShadow="lg"
          w={{ base: "90%", md: "600px" }}
          mx="auto"
        >
          <form className="payment-form" onSubmit={handleSubmit}>
            <VStack spacing="4">
              <FormControl isRequired>
                <FormLabel>Card Number</FormLabel>
                <Input
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="**** **** **** ****"
                  _placeholder={{ color: "gray.500" }}
                  fontSize="lg"
                  borderColor="gray.300"
                  _focus={{ borderColor: "blue.400", boxShadow: "outline" }}
                  rounded="md"
                  px="3"
                  py="2"
                  maxLength={19}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Card Holder</FormLabel>
                <Input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  placeholder="Card Holder's Name"
                  _placeholder={{ color: "gray.500" }}
                  fontSize="lg"
                  borderColor="gray.300"
                  _focus={{ borderColor: "blue.400", boxShadow: "outline" }}
                  rounded="md"
                  px="3"
                  py="2"
                />
              </FormControl>
              <Flex justify="space-between">
                <FormControl isRequired>
                  <FormLabel>Expiry Date</FormLabel>
                  <Input
                    type="text"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    placeholder="MM/YY"
                    _placeholder={{ color: "gray.500" }}
                    fontSize="lg"
                    borderColor="gray.300"
                    _focus={{ borderColor: "blue.400", boxShadow: "outline" }}
                    rounded="md"
                    px="3"
                    py="2"
                    w="100px"
                    maxLength={5}
                  />
                </FormControl>
                <Spacer />
                <FormControl isRequired>
                  <FormLabel>CVV</FormLabel>
                  <Input
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="CVV"
                    _placeholder={{ color: "gray.500" }}
                    fontSize="lg"
                    borderColor="gray.300"
                    _focus={{ borderColor: "blue.400", boxShadow: "outline" }}
                    rounded="md"
                    px="3"
                    py="2"
                    w="100px"
                    maxLength={3}
                  />
                </FormControl>
              </Flex>
              <Button
                type="submit"
                colorScheme="blue"
                width="100%"
                _hover={{ bg: "blue.600" }}
                _active={{ bg: "blue.700" }}
                fontSize="lg"
                fontWeight="bold"
                rounded="md"
                boxShadow="lg"
                py="3"
              >
                Submit Payment
              </Button>
            </VStack>
          </form>
          {/* Modal for payment success */}
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent p="4" bg="white" rounded="md" boxShadow="lg">
              <ModalHeader fontSize="2xl">Payment Completed</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text fontSize="lg">
                  Your payment has been successfully processed.
                </Text>
                <Text fontSize="lg">Thank you for your purchase!</Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentModel;
