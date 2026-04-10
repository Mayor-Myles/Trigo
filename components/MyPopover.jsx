
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

console.log("This data "+data)
  return(

<Center>
            <Popover isOpen={data.length > 0}>
  
  <PopoverContent>
    <PopoverHeader>Results</PopoverHeader>
    <PopoverCloseButton />
    <PopoverBody>
      
      
      {
        
        data.map((item,i)=> (
<Box my={2} key={i} boxShadow="sm">

  <Text fontWeight={400}>{item.address_line1}</Text>
   <Text>{item.formatted}</Text>
</Box>
        ))}
      
    </PopoverBody>
  </PopoverContent>
              </Popover>
              </Center>


);

}
  
