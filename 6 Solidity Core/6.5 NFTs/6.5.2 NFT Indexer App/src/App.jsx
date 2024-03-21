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
  CardBody,
  Stack,
  Link,
  Tag,
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
      // const data = await alchemy.core.getTokenBalances(address);
      const data = await alchemy.nft.getNftsForOwner(address);

      setResults(data);

      // Get token metadata
      const tokenDataPromises = [];

      for (let i = 0; i < data.ownedNfts.length; i++) {
        const tokenData = alchemy.nft.getNftMetadata(
          data.ownedNfts[i].contract.address,
          data.ownedNfts[i].tokenId,
        );
        tokenDataPromises.push(tokenData);
      }

      const dataObjects = [];
      const settledPromises = await Promise.allSettled(tokenDataPromises);
      settledPromises.forEach(result => {
        if (result.status === 'fulfilled') {
          dataObjects.push(result.value);
        } else if (result.status === 'rejected') {
          dataObjects.push({});
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
                  NFT Indexer
                </Heading>
                <Text mb={10} align='center'>
                  Plug in an ENS name, an address or use your own by connecting your wallet and
                  this page will return all of its NFTs on the Ethereum network!
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
          ) : hasQueried && results.ownedNfts.length > 0 ? (
            <Box>
              <Center mb='5'>Items found: {results.ownedNfts.length}</Center>
              <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
                {results.ownedNfts.map((e, i) => {
                  return tokenDataObjects[i] ? (
                    <Card borderRadius='md' boxShadow='md'>
                      <Image
                        src={tokenDataObjects[i].rawMetadata?.image}
                        alt={'No Image'}
                        borderRadius='md'
                        h='250px'
                      />
                      <CardBody>
                        <Stack spacing={1} mb='2'>
                          <Text fontSize='sm' as='b'>
                            {tokenDataObjects[i].title?.length === 0
                              ? 'No Name'
                              : tokenDataObjects[i].title}
                          </Text>
                          <Text fontSize='xs'>
                            <Link
                              href={`https://etherscan.io/address/${tokenDataObjects[i].contract?.address}`}
                              color='#6F4CFF'
                              isExternal
                            >
                              {tokenDataObjects[i].contract?.name}
                            </Link>
                          </Text>
                        </Stack>
                        <Tag size='sm'>{tokenDataObjects[i].tokenType}</Tag>
                      </CardBody>
                    </Card>
                  ) : (<Flex></Flex>)
                })}
              </SimpleGrid>
            </Box>
          ) : (
            <Center h='100vh'>No results. Please make a query! This may take a few seconds...</Center>
          )}
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
