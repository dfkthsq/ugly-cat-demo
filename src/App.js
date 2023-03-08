import {
  ChakraProvider,
  Heading,
  Container,
  Text,
  Input,
  Button,
  Wrap,
  Stack, 
  Image,
  Link,
  extendTheme,
  Spinner,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

// Version 1: Using objects
const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: 'gray.600',
        color: 'white',
      },
      // styles for the `a`
      a: {
        color: 'teal.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
})

const App = () => {
  const [image, updateImage] = useState();
  const [prompt, updatePrompt] = useState();
  const [loading, updateLoading] = useState();

  const generate = async (prompt) => {
    updateLoading(true);
    const result = await axios.get(`https://phz8nx8jz7.execute-api.eu-west-2.amazonaws.com/Prod/hello?prompt=${prompt}`);
    updateImage(result.data);
    updateLoading(false);
  };

  return (
    <ChakraProvider theme={theme}> 
      <Container marginTop={"20px"} marginBottom={"20px"} width={{ base: '100%', md: '37%', sm: '20%' }}>
        <Heading>Ugly Cat Image Generator 🚀</Heading>
        <Text marginBottom={"15px"}>
          This react application is a wrapper for Images API by OPENAI
          which generates images using the DALL·E model from a description in natural language.
          But with a little tweak adding an ugly cat to images.
          More information can be found here{": "}
          <Link href={"https://platform.openai.com/docs/models/dall-e"} color={"pink"}>
            OPENAI
          </Link>
        </Text>

        <Wrap marginBottom={"15px"} >
          <Input
            value={prompt}
            onChange={(e) => updatePrompt(e.target.value)}
            width={"75%"}
            focusBorderColor={"blue.100"}
          ></Input>
          <Button onClick={(e) => generate(prompt)} colorScheme={"yellow"} textColor={"black"}>
            Generate
          </Button>
        </Wrap>

        {loading ? (
          <Stack>
            <Center>
              <Spinner
                thickness='5px'
                speed='0.75s'
                emptyColor='gray.200'
                color='green.300'
                size='xl'
                marginTop={"25px"}
              />
              </Center>
          </Stack>
        ) : image ? (
          <Image src={image} boxShadow="lg" border={"1px"} />
        ) : null}
      </Container>
    </ChakraProvider>
  );
};

export default App;
