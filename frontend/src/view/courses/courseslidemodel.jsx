import { Flex } from '@chakra-ui/react'
import React from 'react'

const Courseslidemodel = ({slide}) => {

  // let parsedcontent=slide?.content?.split("''") 
  // console.log(parsedcontent) 
   
  const splitparagrah = (paragraph) => {
    const regex = /'([^']+)'|(\b(?:[1-9]|10)\.\s)/g;
    
    let splitparts = [];
    let lastindex = 0;
    let match;
  
    while ((match = regex.exec(paragraph)) !== null) {
      if (match.index > lastindex) {
        splitparts.push(paragraph.substring(lastindex, match.index).trim());
      }
  
      if (match[1]) {
        splitparts.push(match[1]);
      } else if (match[2]) {
        let numberWithParagraph = match[2];
        lastindex = regex.lastIndex;
        let nextMatch = regex.exec(paragraph);
        if (nextMatch) {
          numberWithParagraph += paragraph.substring(lastindex, nextMatch.index).trim();
          regex.lastIndex = nextMatch.index;
        } else {
          numberWithParagraph += paragraph.substring(lastindex).trim();
          regex.lastIndex = paragraph.length;
        }
        splitparts.push(numberWithParagraph);
      }
  
      lastindex = regex.lastIndex;
    }
  
    if (lastindex < paragraph.length) {
      splitparts.push(paragraph.substring(lastindex).trim());
    }
  
    return splitparts;
  };

   const splitparagrah1=(paragraph)=>{
    const codeRegex = /'([^']+)'/g;
    let splitParts = [];
    let lastIndex = 0;
    let match;
  
    while ((match = codeRegex.exec(paragraph)) !== null) {
      if (match.index > lastIndex) {
        splitParts.push(paragraph.substring(lastIndex, match.index).trim());
      }
      splitParts.push(match[1]);
      lastIndex = codeRegex.lastIndex;
    }
  
    if (lastIndex < paragraph.length) {
      splitParts.push(paragraph.substring(lastIndex).trim());
    }
  
    let textParts = [];
    let combinedText = splitParts.filter((part) => !part.includes('=') && !part.includes(';')).join(' ');
    let splitText = combinedText.split('. ').filter(Boolean);
  
    const paragraphCount = 3;
    if (splitText.length > paragraphCount) {
      let adjustedTextParts = [];
      let sliceLength = Math.ceil(splitText.length / paragraphCount);
  
      for (let i = 0; i < paragraphCount - 1; i++) {
        adjustedTextParts.push(splitText.splice(0, sliceLength).join('. ') + '.');
      }
      adjustedTextParts.push(splitText.join('. ') + '.');
      textParts = adjustedTextParts;
    } else {
      textParts = splitText.map((sentence) => sentence.trim().endsWith('.') ? sentence : sentence + '.');
    }
  
    return [...textParts, ...splitParts.filter((part) => part.includes('=') || part.includes(';'))];
   }

   const cotentinfo=splitparagrah(slide?.content)
  console.log(cotentinfo)
  return (
     <Flex flexDir={'column'} 
     width={'full'}
     >
 <Flex 
       fontSize={'17px'}
       fontWeight={'650'}
       ml={'7'}
       mt={'5'}
       >
        {slide?.title}
       </Flex>
       <Flex flexDir={'column'}
       mx={{
        md:'40',
        lg:'40',
        sm:'40',
        base:'5'
       }}
       alignSelf={'center'}
       mt={'7'}
       gap={'5'}
       >

{
        cotentinfo?.map((info,i)=>(
          <Flex
          gap={'4'}
          key={i}
          >
          <Flex 
          width={'10px'}
          height={'10px'}
          bg={'blue.600'}
          mt={'7px'}
          alignSelf={'start'}
          borderRadius={'50px'}
          >
          </Flex>
          <Flex 
          fontSize={{
           md:'16px',
           lg:'16px',
           sm:'16px',
           base:'14px'
          }}
          fontWeight={'550'}
          width={'90%'}
          >
          {info}   
          </Flex>
         </Flex> 
        ))
      } 
     

       </Flex>
     </Flex>
  )
}

export default Courseslidemodel