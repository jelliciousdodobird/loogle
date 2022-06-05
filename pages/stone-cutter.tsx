// styling:
import { css, jsx, Theme, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { chown } from "fs";

// state:
import { useState, useEffect } from "react";
import { RiXboxFill } from "react-icons/ri";

// components:
import Button from "../components/Button";
import SelectInput, { OptionType } from "../components/inputs/SelectInput";

// SVGS:
import { MdOutlineCheck } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";

import { MdSync } from "react-icons/md";
import { MdRotateLeft } from "react-icons/md";
import { MdRotateRight } from "react-icons/md";

// GENERAL CONTAINERS --------------------------------------------------------------------

const Container = styled.div`
  padding: 1rem 0;
`;

const Content = styled.div`
  width: 55%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Cutter = styled.section`
  background-color: grey;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1rem;
`;

// ENGRAVINGS ----------------------------------------------------------------

const Engravings = styled.section`
  background-color: white;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1rem;
`;

// includes malus
const Engraving = styled.div`
  background-color: black;

  display: flex;
  flex-direction: row;
  gap: 1rem;

  align-items: center;

  padding: 1rem;
`;

// NODES -----------------------------------------------------------------------

const Nodes = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 1rem;
`;

type Trial = { trial: boolean | null };
const Node = styled.div<Trial>`
  min-width: 1rem;
  height: 1rem;

  border: 1px solid white;
  background-color: ${(props) =>
    props.trial ? `blue` : props.trial === null ? `none` : `red`};

  transform: rotate(45deg);
`;

// GENERAL BUTTONS ---------------------------------------------------------------

const GeneralOptions = styled.section`
  background-color: white;

  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;

  gap: 1rem;
  padding: 0.5rem;
`;

// mining, maximise one, maximise two, maximise both
// later: probability specifics....
const CustomButton = styled(Button)`
  display: flex;

  justify-content: center;
  align-items: center;

  /* For Text Content */
  font-weight: 300;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.15rem;
`;

const CustomSvg = styled.span`
  width: 1.25rem;
  height: 1.25rem;

  display: flex;

  justify-content: center;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const CustomSelectInput = styled(SelectInput)`
  margin-left: auto;

  /* font-weight: 300; */
  /* font-size: 12px; */
  /* letter-spacing: 0.15rem; */
`;

const NodeInput = styled.div``;

// ADVANCED BUTTONS ---------------------------------------------------------------

const AdvancedOptions = styled.section`
  background-color: white;
`;

// MAIN COMPONENT -----------------------------------------------------------------
const nodeTypes = [
  { id: "10", label: "Relic" },
  { id: "9", label: "Legendary" },
  { id: "8", label: "Epic" },
  { id: "6", label: "Rare" },
];

// const ENGRAVING_NUM = 3;
const INITIAL_PROBABILITY = 0.75;

type trial = (boolean | null)[];
type stone = {
  ENGRAVING_ONE: { position: number; trials: trial };
  ENGRAVING_TWO: { position: number; trials: trial };
  MALUS: { position: number; trials: trial };
};
type x = keyof stone;
type t = { [k in x]: trial };

const StoneCutter = () => {
  const [nodes, setNodes] = useState<OptionType>(nodeTypes[0]);
  const [probability, setProbability] = useState<number>(INITIAL_PROBABILITY);

  const [engravings, setEngravings] = useState<stone>({
    ENGRAVING_ONE: {
      position: 0,
      trials: Array(parseInt(nodes.id)).fill(null),
    },
    ENGRAVING_TWO: {
      position: 0,
      trials: Array(parseInt(nodes.id)).fill(null),
    },
    MALUS: {
      position: 0,
      trials: Array(parseInt(nodes.id)).fill(null),
    },
  });

  // Update the amount of nodes in stone and reset values
  useEffect(() => {
    let newEngravings = { ...engravings };
    let k: keyof stone;
    for (k in newEngravings) {
      newEngravings[k].trials = Array(parseInt(nodes.id)).fill(null);
      newEngravings[k].position = engravings[k].position;
      setEngravings(newEngravings);
    }
  }, [nodes]);

  // const selectNodes = (newNodes: OptionType) => {
  //   let newEngravings = { ...engravings };
  //   let k: keyof stone;
  //   for (k in newEngravings) {
  //     newEngravings[k].trials = Array(parseInt(newNodes.id)).fill(null);
  //     newEngravings[k].position = engravings[k].position;
  //   }
  //   setNodes(newNodes);
  //   setEngravings(newEngravings);
  // };

  const maximise = (engraving: number) => {
    if (0 <= engraving && engraving <= 2) {
      console.log("Invalid engraving maximisation selection.");
      console.log("0 - Maximise engraving one.");
      console.log("1 - Maximise engraving two.");
      console.log("2 - Maxismise both engravings.");
      return;
    }
    // probability calculations here
  };

  // Update Stone to add Successful or Failed Trials on Cut
  const updateStone = (engraving: keyof stone, success: boolean) => {
    // Deep Clone State
    let deepEngravings = { ...engravings };
    let k: keyof stone;
    for (k in engravings) {
      let deepTrials = [...engravings[k].trials];
      deepEngravings[k].trials = deepTrials;
      deepEngravings[k].position = engravings[k].position;
    }
    // Update state through deep clone
    let updatedEngraving = deepEngravings[engraving];
    if (updatedEngraving.position < parseInt(nodes.id)) {
      success
        ? (updatedEngraving.trials[updatedEngraving.position] = true)
        : (updatedEngraving.trials[updatedEngraving.position] = false);
      updatedEngraving.position++;
    }
    setEngravings(deepEngravings);
  };

  const undo = () => {};
  const redo = () => {};
  const reset = () => {};

  return (
    <Container>
      <Content>
        <div
          onClick={() => {
            console.log(nodes);
            console.log(probability);
          }}
        >
          StoneCutter
        </div>
        <Cutter>
          <CustomButton
            onClick={() => {
              console.log("hewo");
            }}
          >
            Hewo
          </CustomButton>

          <GeneralOptions>
            <CustomButton title="Undo">
              <CustomSvg>
                <MdRotateLeft />
              </CustomSvg>
            </CustomButton>
            <CustomButton title="Redo">
              <CustomSvg>
                <MdRotateRight />
              </CustomSvg>
            </CustomButton>
            <CustomButton
              onClick={() => {
                console.log(engravings);
              }}
              title="Reset"
            >
              <CustomSvg>
                <MdSync />
              </CustomSvg>
            </CustomButton>
            <CustomSelectInput
              options={nodeTypes}
              value={{ id: nodes.id, label: nodes.label }}
              onChange={setNodes}
            />
          </GeneralOptions>

          <AdvancedOptions>
            <CustomButton>Maximise First</CustomButton>
            <CustomButton>Maximise Second</CustomButton>
            <CustomButton>Maximise Both</CustomButton>
          </AdvancedOptions>
          <Engravings>
            {(Object.keys(engravings) as (keyof stone)[]).map((e, index) => (
              // EACH ENGRAVING SECTION MAPPED
              <Engraving key={index}>
                {/* INDIVIDUAL NODES REPRESENTING TRIALS */}
                <Nodes>
                  {engravings[e].trials.map((trial, index) => (
                    <Node key={index} trial={trial} />
                  ))}
                </Nodes>

                {/* SUCCESS / FAIL BUTTONS */}
                <CustomButton
                  onClick={() => {
                    updateStone(e, true);
                  }}
                  title="Success"
                >
                  <CustomSvg>
                    <MdOutlineCheck />
                  </CustomSvg>
                </CustomButton>
                <CustomButton
                  onClick={() => {
                    updateStone(e, false);
                  }}
                  title="Fail"
                >
                  <CustomSvg>
                    <MdOutlineClose />
                  </CustomSvg>
                </CustomButton>
              </Engraving>
            ))}
          </Engravings>
        </Cutter>
      </Content>
    </Container>
  );
};

export default StoneCutter;
