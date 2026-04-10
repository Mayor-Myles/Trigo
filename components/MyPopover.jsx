
import {
  Center,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Box
} from '@chakra-ui/react'


export default function MyPopover({data}){


  return(

<Center>
            <Popover isOpen={data.length > 0}>
  
  <PopoverContent>
    <PopoverHeader>Results</PopoverHeader>
    <PopoverCloseButton />
    <PopoverBody>
      
      
      {
        console.log(data);
        data.map((item,i)=> (
<Box my={2} key={i} boxShadow="sm">

  <Text fontWeight={400}>{item.display_place}</Text>
   <Text>{item.display_address}</Text>
</Box>
        ))}
      
    </PopoverBody>
  </PopoverContent>
              </Popover>
              </Center>


);

}
  
