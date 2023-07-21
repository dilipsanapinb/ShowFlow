import { Box, Image, Badge, Button, Center } from "@chakra-ui/react";


import { StarIcon } from "@chakra-ui/icons";
import { Link} from "react-router-dom";
function MovieCard({ movie }) {

const handleBookNow = () => {
  // Add any necessary logic here before navigating
//   Navigate("/buytickets");
};

// ...

<Link to="/buytickets">
  <Button
    colorScheme="teal"
    w="40%"
    _hover={{ bgColor: "red.500", color: "white" }}
    onClick={handleBookNow}
  >
    Book Now
  </Button>
</Link>;

    return (
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Image
          src={movie.image}
          alt={movie.title}
          style={{ width: "100%", height: "70%" }}
        />

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              New
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {movie.genre}
            </Box>
          </Box>
          <Box
            mt="1"
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
            lineHeight="tight"
            noOfLines={1}
          >
            {movie.language}
          </Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {movie.title}
          </Box>

          {/* <Box>Rating: {movie.rating}</Box> */}

          <Box display="flex" mt="2" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={
                    i < Math.round(movie.rating / 2) ? "teal.500" : "gray.300"
                  }
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {movie.reviewCount} reviews
            </Box>
          </Box>
        </Box>
        <Link to="/buytickets">
          <Center mt={4}>
            <Button
              colorScheme="teal"
              w="40%"
              _hover={{ bgColor: "red.500", color: "white" }}
              onClick={handleBookNow}
            >
              Book tickets
            </Button>
          </Center>
        </Link>
      </Box>
    );
}

export default MovieCard;
