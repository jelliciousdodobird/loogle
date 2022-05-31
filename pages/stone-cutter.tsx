// styling:
import { css, jsx, Theme, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { chown } from "fs";

// state:
import { useState } from "react";
import { RiXboxFill } from "react-icons/ri";

// components:
import Button from "../components/Button";
import SelectInput from "../components/inputs/SelectInput";

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

type trials = {
  position: number;
  trials: (boolean | null)[];
};

const StoneCutter = () => {
  const [nodes, setNodes] = useState<number>(6);
  const [probability, setProbability] = useState<number>(0.75);
  // Array(3) for Engraving 1, Engraving 2, and Malus
  const [engravings, setEngravings] = useState<trials[]>(
    Array(3).fill({ position: 0, trials: Array(nodes).fill(null) })
  );

  const selectNodes = (nodes: number) => {
    let newTrials = Array(nodes).fill(null);
    setNodes(nodes);
    setEngravings(Array(3).fill({ position: 0, trials: newTrials }));
    console.log(nodes);
    console.log(engravings);
  };

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

  const succeed = (engraving: number, succeed: boolean) => {
    let updatedSuccess = { ...engravings[engraving] };
    updatedSuccess.trials = [...engravings[engraving].trials];
    if (updatedSuccess.position < nodes) {
      succeed
        ? (updatedSuccess.trials[updatedSuccess.position] = true)
        : (updatedSuccess.trials[updatedSuccess.position] = false);
      updatedSuccess.position++;
      let updatedEngravings: trials[] = [];
      engravings.map((x, index) => {
        updatedEngravings[index] = {
          position: x.position,
          trials: [...x.trials],
        };
      });
      console.log(updatedEngravings);
      updatedEngravings[engraving] = updatedSuccess;
      console.log(updatedSuccess);
      setEngravings(updatedEngravings);
    }
  };

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
              items={["6", "8", "9", "10"]}
              selected={nodes.toString()}
              handleChange={(value: string) => {
                selectNodes(parseInt(value));
              }}
            />
          </GeneralOptions>

          <AdvancedOptions>
            <CustomButton>Maximise First</CustomButton>
            <CustomButton>Maximise Second</CustomButton>
            <CustomButton>Maximise Both</CustomButton>
          </AdvancedOptions>
          <Engravings>
            {engravings.map((engraving, index) => (
              // EACH ENGRAVING SECTION MAPPED
              <Engraving key={index}>
                {/* INDIVIDUAL NODES REPRESENTING TRIALS */}
                <Nodes>
                  {engraving.trials.map((trial, index) => (
                    <Node key={index} trial={trial} />
                  ))}
                </Nodes>

                {/* SUCCESS / FAIL BUTTONS */}
                <CustomButton
                  onClick={() => {
                    succeed(index, true);
                  }}
                  title="Success"
                >
                  <CustomSvg>
                    <MdOutlineCheck />
                  </CustomSvg>
                </CustomButton>
                <CustomButton
                  onClick={() => {
                    succeed(index, false);
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
