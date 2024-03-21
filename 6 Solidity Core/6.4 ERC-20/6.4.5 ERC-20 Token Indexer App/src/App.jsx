import {
  ChakraProvider,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  Text,
  IconButton,
  Spinner,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  useToast,
} from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useState } from 'react';
import { ethers } from 'ethers';

function App() {
  const accountPlaceholder = 'Connect your account or enter an address or ENS name';
  const [connectedAccount, setConnectedAccount] = useState(accountPlaceholder);
  const [input, setInput] = useState(''); // TO DELETE 0xF29Ff96aaEa6C9A1fBa851f74737f3c069d4f1a9
  const [results, setResults] = useState([]);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const isValidAddress = (address) => ethers.utils.isAddress(address);

  const isConnected = () => (connectedAccount !== accountPlaceholder);

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setConnectedAccount(accounts[0]);
    } catch (error) { }
  };

  const getTokenBalance = async () => {
    setIsLoading(true);
    // Create alchemy instance
    const apiKey = import.meta.env.VITE_API_KEY;
    const config = {
      apiKey,
      network: Network.ETH_MAINNET,
    };

    const alchemy = new Alchemy(config);

    // Get input
    let address;
    if (input) {
      address = isValidAddress(input) ? input : await alchemy.core.resolveName(input);
    } else if (isConnected() && isValidAddress(connectedAccount)) {
      address = connectedAccount;
    }

    if (!address) {
      toast({
        title: 'Invalid input.',
        description: 'The input is not a valid address or ENS name.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setHasQueried(false);
    } else {
      // Get token balances
      const data = await alchemy.core.getTokenBalances(address);

      setResults(data);

      // Get token metadata
      const tokenDataPromises = [];

      for (let i = 0; i < data.tokenBalances.length; i++) {
        const tokenData = alchemy.core.getTokenMetadata(
          data.tokenBalances[i].contractAddress
        );
        tokenDataPromises.push(tokenData);
      }

      const nullObject = {
        decimals: 0,
        logo: null,
        name: '--',
        symbol: '--',
      };
      const dataObjects = [];
      const settledPromises = await Promise.allSettled(tokenDataPromises);
      settledPromises.forEach(result => {
        if (result.status === 'fulfilled') {
          dataObjects.push(result.value);
        } else if (result.status === 'rejected') {
          dataObjects.push(nullObject);
          toast({
            title: 'Throughput limited.',
            description: 'The app has exceeded rate limits. Try again in a while.',
            status: 'warning',
            duration: 5000,
            isClosable: true,
          });
        }
      });

      setTokenDataObjects(dataObjects);
      setHasQueried(true);
    }
    setIsLoading(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      getTokenBalance();
    }
  };

  return (
    <ChakraProvider>
      <Flex h='100vh'>
        {/* Left panel */}
        <Box w='40vw' p='4' bg='gray.200'>
          <Flex justifyContent='flex-end'> {/* Align button to the right*/}
            <Button
              fontSize={16}
              colorScheme={isConnected() ? 'green' : 'purple'}
              onClick={() => connectWallet()}
            >
              {isConnected() ? 'Wallet connected!' : 'Connect Wallet'}
            </Button>
          </Flex>
          <Center h='100vh'>
            <Box>
              <Flex
                alignItems={'center'}
                justifyContent='center'
                flexDirection={'column'}
              >
                <Heading mb={0} fontSize={36} className='heading'>
                  ERC-20 Token Indexer
                </Heading>
                <Text mb={10} align='center'>
                  Plug in an ENS name, an address or use your own by connecting your wallet and
                  this page will return all of its ERC-20 token balances on the Ethereum network!
                </Text>
              </Flex>

              <Flex className='rainbow-outline'>
                <Input
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  textAlign='center'
                  p={4}
                  bgColor='white'
                  fontSize={18}
                  placeholder={connectedAccount}
                />
                <IconButton
                  isLoading={isLoading}
                  aria-label='Submit'
                  icon={<ArrowUpIcon />}
                  rounded='full'
                  colorScheme='purple'
                  ml={2}
                  onClick={() => getTokenBalance()}
                />
              </Flex>
            </Box>
          </Center>
        </Box>

        {/* Right panel */}
        <Box w='60vw' flex='1' overflowY='auto' p='4' bg='gray.100'>
          {isLoading ? (
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              height='100vh'
            >
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='purple.500'
                size='xl'
              />
            </Box>
          ) : hasQueried ? (
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
              {results.tokenBalances.map((e, i) => {
                const count = i + 1;
                return tokenDataObjects[i] ? (
                  <Card
                    borderRadius='md'
                    backgroundImage='linear-gradient(135deg, #30CFD0, #c43ad6)'
                    boxShadow='md'
                  >
                    <CardHeader>
                      <Flex justifyContent='space-between'>
                        <Box overflowWrap='break-word' wordBreak='break-word'>
                          <Heading size='md'>{count}. {tokenDataObjects[i].name}</Heading>
                        </Box>
                        <Image src={tokenDataObjects[i].logo} h='60px' w='60px' />
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Text><b>Symbol:</b> {tokenDataObjects[i].symbol}</Text>
                      <Text><b>Balance:</b>&nbsp;
                        {Utils.formatUnits(
                          e.tokenBalance,
                          tokenDataObjects[i].decimals
                        )}</Text>
                    </CardBody>
                  </Card>
                ) : (
                  <Flex></Flex>
                );
              })}
            </SimpleGrid>
          ) : (
            <Center h='100vh'>Please make a query! This may take a few seconds...</Center>
          )}
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
