import React, { useState, useRef } from "react";
import { chakra, Box, Image, Flex, useColorModeValue, Button,
  AlertDialog, AlertDialogBody, AlertDialogFooter,
  AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useToast, Center
} from "@chakra-ui/react";
import nft_manager_abi from "abi/nft_manager_abi.json";
import { useAuth } from "contexts/AuthContext";
import { ethers } from "ethers";
import ListNFT from "./ListNFT";

const NFTCard = (props) => {

  const NFT_manager_contract_address = "0x0528E41841b8BEdD4293463FAa061DdFCC5E41bd";
  const [ isLoading, setIsLoading ] = useState(false);

  const toast = useToast()

  const { currentAccount } = useAuth()

  const { src, number, unboxed } = props;
  const bg = useColorModeValue("gray.700", "gray.200")
  const buttonbg = useColorModeValue("white", "gray.900")

  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef()

  const unboxNFT = async() => {
    setIsLoading(true);
    if(!currentAccount) return;
    try {
      const { ethereum } = window; //injected by metamask
      //connect to an ethereum node
      const provider = new ethers.providers.Web3Provider(ethereum); 
      //gets the account
      const signer = provider.getSigner(); 
      //connects with the contract
      const NFTManagerConnectedContract = new ethers.Contract(NFT_manager_contract_address, nft_manager_abi, signer);
      const _type = await NFTManagerConnectedContract.boxStatus(number);
      if(_type===2) {
        toast({
          title: 'In Progress',
          description: "Refresh page after a few minutes",
          status: 'warning',
          duration: 2000,
          isClosable: true,
        })
        setIsLoading(false);
      } else if(_type===0) {
        try {
          await NFTManagerConnectedContract.unbox(number);
          toast({
            title: 'Transaction Succesful',
            description: "Unboxed your NFT",
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
          setTimeout(()=>{
            window.location.reload();
          }, 3000)
        } catch(err) {
          setIsLoading(false)
        }
      } else if(_type===1) {
        toast({
          title: 'Error',
          description: "NFT already unboxed",
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
        setIsLoading(false);
      }
    } catch(err) {
      console.log(err)
    }
  }
  console.log(src)
  return (
  <Flex
    bg={useColorModeValue("white", "gray.800")}
    p={50}
    w="full"
    alignItems="center"
    justifyContent="center"
  >
    <Box
      maxW="xs"
      mx="auto"
      bg={useColorModeValue("gray.700", "gray.200")}
      shadow="lg"
      rounded="lg"
    >
      <Image
        w="full"
        fit="cover"
        h="40vh"
        roundedTop="lg"
        src={src}
        alt="TITLE"
      />
      <Box px={4} py={2}>
        <chakra.h1
          color={useColorModeValue("white", "gray.800")}
          fontWeight="bold"
          fontSize="3xl"
          textTransform="uppercase"
        >
          ID #{number}
        </chakra.h1>
      </Box>
      {unboxed ? 
      <Center my="2"
      >
        <ListNFT number={number}/>
      </Center>
      :
      <Flex
          alignItems="center"
          justifyContent="space-between"
          px={4}
          py={2}
          bg={bg}
          roundedBottom="lg"
      >
        <Button size="md" bg={buttonbg} color={bg}
          fontWeight="bold" rounded="lg" textTransform="uppercase"
          _hover={{
            bg: "gray.500",
          }}
          _focus={{
            bg: "gray.600",
          }}
          onClick={() => setIsOpen(true)}
        >
          Unbox
        </Button>
        <ListNFT number={number}/>
      </Flex>
      }
      
    </Box>
    <AlertDialog
      isCentered={true}
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Reveal Mystery Box
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button isLoading={isLoading} ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button isLoading={isLoading} onClick={unboxNFT} colorScheme='blue' ml={3}>
              Unbox
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  </Flex>
  );
};

export default NFTCard;