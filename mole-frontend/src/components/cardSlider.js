/*
  source: https://codesandbox.io/s/element-snapping-scrollable-carousel-component-h5c80?file=/src/App.js:3120-3170
*/

'use client'
import react from 'react';
import MatchCard from '@/components/cards';
import Stack from '@mui/material/Stack';
import { useRef } from "react";



import matchImg from "@/components/static_media/match_placeholder.jpg";
import { Button } from '@mui/material';

export default function CardSlider(){
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
      console.log("left", element);

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
    <>
      <Stack direction="row" 
        spacing={1.5} 
        sx={{overflowX: "scroll", overflowY: "hidden", padding:'10px'}}
        ref={ref}
      >
        <MatchCard
          key={1}
          title = "Alf -Cat"
          description = "Questo è un esempio di partita"
          url = "/news"
          img = {matchImg}
          datetime = "20:30 12/10"
        />
        <MatchCard
          key={2}
          title = "Alf -Cat"
          description = "Questo è un esempio di partita"
          url = "/news"
          img = {matchImg}
          datetime = "20:30 12/10"
        />
        <MatchCard
          key={3}
          title = "Alf -Cat"
          description = "Questo è un esempio di partita"
          url = "/news"
          img = {matchImg}
          datetime = "20:30 12/10"
        />
        <MatchCard
          key={4}
          title = "Alf -Cat"
          description = "Questo è un esempio di partita"
          url = "/news"
          img = {matchImg}
          datetime = "20:30 12/10"
        />
        <MatchCard
          key={5}
          title = "Alf -Cat"
          description = "Questo è un esempio di partita"
          url = "/news"
          img = {matchImg}
          datetime = "20:30 12/10"
        />
      </Stack>
      <Stack direction='row' spacing={2}>
        <Button onClick={() => handleArrowClick("left")}>Left</Button>
        <Button onClick={() => handleArrowClick("right")}>Right</Button>
      </Stack>
    </>
  );
}