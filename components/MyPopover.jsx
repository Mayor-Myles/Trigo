
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
        data.map((item,i)=> (
<Box my={2} key={i} boxShadow="sm">

</Box>
        ))}
      
    </PopoverBody>
  </PopoverContent>
              </Popover>
              </Center>


);

}
  
