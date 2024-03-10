/*
  source: https://codesandbox.io/s/element-snapping-scrollable-carousel-component-h5c80?file=/src/App.js:3120-3170
*/

'use client'
import Stack from '@mui/material/Stack';
import { useRef, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import Box from '@mui/system/Box';

export default function CardSlider(props){
  const { children, sx, ...otherProps } = props;
  const ref = useRef();

  const isVisible = (node, container) => {
    if (node === null) {
      return false;
    }

    return (
      node.offsetLeft + node.offsetWidth >= Math.round(container.scrollLeft) &&
      node.offsetLeft <=
        Math.round(container.scrollLeft) + container.offsetWidth
    );
  };

  const findLeftTarget = (container, leftIndex, rightIndex) => {
    if (rightIndex >= leftIndex) {
      const mid = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
      const element = container.children[mid];
      //console.log("left", element);

      if (
        isVisible(element, container) &&
        !isVisible(element.previousSibling, container)
      ) {
        return element.offsetLeft < Math.round(container.scrollLeft) &&
          element.offsetLeft + element.offsetWidth <
            Math.round(container.scrollLeft) + container.offsetWidth
          ? element
          : element.previousSibling;
      }

      if (
        element.offsetLeft + element.offsetWidth >=
        Math.round(container.scrollLeft)
      ) {
        return findLeftTarget(container, leftIndex, mid - 1);
      }
      return findLeftTarget(container, mid + 1, rightIndex);
    }

    return null;
  };

  const findRightTarget = (container, leftIndex, rightIndex) => {
    if (rightIndex >= leftIndex) {
      const mid = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
      const element = container.children[mid];

      if (
        isVisible(element, container) &&
        !isVisible(element.nextSibling, container)
      ) {
        return element.offsetLeft > Math.round(container.scrollLeft) &&
          element.offsetLeft + element.offsetWidth >
            Math.round(container.scrollLeft) + container.offsetWidth
          ? element
          : element.nextSibling;
      }

      if (element.offsetLeft <= container.scrollLeft + container.offsetWidth) {
        return findRightTarget(container, mid + 1, rightIndex);
      }

      return findRightTarget(container, leftIndex, mid - 1);
    }

    return null;
  };

  const findInitialTarget = (container) => {
    for (let i in container.children){
      if (container.children[i].id === "initial"){
        return container.children[i];
      }
    }
    return null;
  };

  const scrollToInitialTarget = () => {
    let element = findInitialTarget(ref.current);
    let nextScrollLeft = element ? element.offsetLeft - Math.round(element.offsetWidth / 2) : 0;
    ref.current.scrollTo({
      left: nextScrollLeft,
      behavior: "instant"
    });
  }

  useEffect(scrollToInitialTarget);

  const handleArrowClick = (direction) => {
    let nextScrollLeft;
    let nextElement;
    if (direction === "left") {
      nextElement = findLeftTarget(
        ref.current,
        0,
        ref.current.children.length - 1
      );
      nextScrollLeft = nextElement
        ? nextElement.offsetWidth +
          nextElement.offsetLeft -
          ref.current.offsetWidth
        : 0;
    } else {
      nextElement = findRightTarget(
        ref.current,
        0,
        ref.current.children.length - 1
      );
      nextScrollLeft = nextElement
        ? nextElement.offsetLeft
        : ref.current.scrollWidth;
    }

    ref.current.scrollTo({
      left: nextScrollLeft,
      behavior: "smooth"
    });
  };

  return(
    <Box sx={{position: 'relative', height:'auto', width: '100%', ...sx}} {...otherProps}>
      <Stack 
        direction="row" 
        spacing={1.5} 
        sx={{overflowX: "scroll", overflowY: "hidden", padding:'10px'}}
        ref={ref}
      >
        {children}
      </Stack>
      
      <ButtonGroup sx={{display : {xs:"none", md:"flex"}, justifyContent:"center"}}>
        <IconButton onClick={() => handleArrowClick("left")} aria-label="scroll left"><ArrowBackIosRoundedIcon/></IconButton>
        <IconButton onClick={() => handleArrowClick("right")} aria-label="scroll right"><ArrowForwardIosRoundedIcon/></IconButton>
      </ButtonGroup>
    </Box>
  );
}

/*
<div style={navButtonsStyle}>
        <div style={{...navButtonStyle, left:0}}>
          <i className="fa fa-chevron-left"></i>
        </div>
        <div style={{...navButtonStyle, right:0}}>
          <i className="fa fa-chevron-right"></i>
        </div>
      </div>

      const navButtonsStyle = {
    position: 'absolute',
    top: '50%',
    left: 0,
    width: '100%',
    height: '50px',
    display: flex,
    justifyContent: 'space-between',
    alignItems: 'center'
  };
  
  const navButtonStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '50px',
    height: '50px'
  };
  
  
      */