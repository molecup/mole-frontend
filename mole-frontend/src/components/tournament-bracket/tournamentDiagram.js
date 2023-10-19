/*
    documentation: https://www.npmjs.com/package/@g-loot/react-tournament-brackets
*/
'use client'

import dynamic from "next/dynamic";
import React from "react";

if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
  import("@g-loot/react-tournament-brackets");
}
const SingleEliminationBracket = dynamic(
  () => {
    return import("@g-loot/react-tournament-brackets").then(
      mod => mod.SingleEliminationBracket
    );
  },
  { ssr: false }
);

const Match = dynamic(
  () => {
    return import("@g-loot/react-tournament-brackets").then(mod => mod.Match);
  },
  { ssr: false }
);
const MATCH_STATES = dynamic(
  () => {
    return import("@g-loot/react-tournament-brackets").then(
      mod => mod.MATCH_STATES
    );
  },
  { ssr: false }
);
const SVGViewer = dynamic(
  () => {
    return import("@g-loot/react-tournament-brackets").then(
      mod => mod.SVGViewer
    );
  },
  { ssr: false }
);

const createTheme = dynamic(
  () => {
    return import("@g-loot/react-tournament-brackets").then(
      mod => mod.createTheme
    );
  },
  { ssr: false }
);
import {matches} from './matches';

//import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';

const MyMatch = () => {
  return(
    <div>
      <h3>Team 1</h3>
      <h3>Team 2</h3>
    </div>
  );
}

export default function tournamentDiagram(props){
    return(
        <SingleEliminationBracket
            matches={matches}
            matchComponent={MyMatch}
            svgWrapper={({ children, ...props }) => (
              <SVGViewer
              width={10000}
              height={500000}
              background="rgb(11, 13, 19)"
              SVGBackground="rgb(11, 13, 19)"
              {...props}
            >
              {children}
            </SVGViewer>
            )}
        />
    );
}

//svgWrapper={function noRefCheck(){}}
