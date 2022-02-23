import { useDonate } from "contexts/DonateContext";
import { DateTime } from "luxon";
import { ethers } from "ethers";

import { 
    TabPanels,
    Tab, 
    TabPanel,
    TabList,
    Tabs,
    Table,
    Tbody,
    Tr,
    Td,
    NumberInput,
  } from '@chakra-ui/react'

export const InfoTableComponent = () => { 
    const { donateData, dataCap, priceRange } = useDonate()
    let data = donateData;
    const genesisTimestamp = new DateTime(
      ethers.utils.formatEther(data.genesisTimestamp)
    ).toISODate();
    const cliffTimeStamp = new DateTime(
      data.genesisTimestamp + data.cliff
    ).toISODate();
    const tgeAmount = ethers.utils.formatEther(data.tgeAmountRatio.div(100));
    const endDuration = new DateTime(
      data.genesisTimestamp + data.cliff + data.duration
    ).toISODate();
    const eraBasis = ethers.utils.formatEther(data.eraBasis);
    const startTime = new DateTime(data.startTimestamp).toISODate();
    const endTime = new DateTime(data.endTimestamp).toISODate();
    const higest = ethers.utils.formatEther(data.highest);
    const lowest = ethers.utils.formatEther(data.lowest);
    const showCap = ethers.utils.formatEther(dataCap);
  
    return (
      <Table variant="simple">
        <Tbody>
          <Tr>
            <Td>Genesis:</Td>
            <Td>{genesisTimestamp}</Td>
          </Tr>
          <Tr>
            <Td>TGE Amount:</Td>
            <Td>{tgeAmount}</Td>
          </Tr>
          <Tr>
            <Td>Cliff:</Td>
            <Td>{`from: ${genesisTimestamp} to ${cliffTimeStamp}`}</Td>
          </Tr>
          <Tr>
            <Td>Duration:</Td>
            <Td>{`from: ${genesisTimestamp} to ${endDuration}`}</Td>
          </Tr>
          <Tr>
            <Td> Era Basis:</Td>
            <Td> {eraBasis}</Td>
          </Tr>
          <Tr>
            <Td> Start:</Td>
            <Td>{startTime}</Td>
          </Tr>
          <Tr>
            <Td> End:</Td>
            <Td>{endTime}</Td>
          </Tr>
          <Tr>
            <Td> Higest:</Td>
            <Td>{higest}</Td>
          </Tr>
          <Tr>
            <Td> Lowest:</Td>
            <Td>{lowest}</Td>
          </Tr>
          <Tr>
            <Td> Allow redeem:</Td>
            <Td>{data.allowRedeem ? "True" : "False"}</Td>
          </Tr>
          <Tr>
            <Td>Accept donation:</Td>
            <Td>{data.acceptOverCap ? "True" : "False"}</Td>
          </Tr>
          <Tr>
            <Td>Price table</Td>
            <Td>{priceRange ? <PriceRangeTable /> : "..."}</Td>
          </Tr>
          <Tr>
            <Td>Cap:</Td>
            <Td>{showCap}</Td>
          </Tr>
        </Tbody>
      </Table>
    );
  };


  const PriceRangeTable = () => {
    const { priceRange } = useDonate()
    return (
      <Table Table variant="simple">
        <Tbody>
          {priceRange
            ? priceRange.map((range, idx) => (
                <Tr id={idx}>
                  <Td>{ethers.utils.formatEther(range.fromAmount)}</Td>
                  <Td>{ethers.utils.formatEther(range.price)}</Td>
                </Tr>
              ))
            : "0.0"}
        </Tbody>
      </Table>
    );
  };