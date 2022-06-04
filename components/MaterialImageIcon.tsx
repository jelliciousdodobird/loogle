import Image, { StaticImageData } from "next/image";

// images:
import T1Leapstone from "../assets/materials/t1-leapstone.png";
import T1Shard from "../assets/materials/t1-shard.png";
import T1Destruction from "../assets/materials/t1-destruction.png";
import T1Guardian from "../assets/materials/t1-guardian.png";

import T2Leapstone from "../assets/materials/t2-leapstone.png";
import T2Shard from "../assets/materials/t2-shard.png";
import T2Destruction from "../assets/materials/t2-destruction.png";
import T2Guardian from "../assets/materials/t2-guardian.png";
import T2Fusion from "../assets/materials/t2-fusion.png";

import T3Leapstone from "../assets/materials/t3-leapstone.png";
import T3Gleapstone from "../assets/materials/t3-gleapstone.png";
import T3Shard from "../assets/materials/t3-shard.png";
import T3Destruction from "../assets/materials/t3-destruction.png";
import T3Guardian from "../assets/materials/t3-guardian.png";
import T3BasicFusion from "../assets/materials/t3-basic-fusion.png";
import T3SimpleFusion from "../assets/materials/t3-basic-fusion.png";

import Gold from "../assets/materials/gold.png";
import Silver from "../assets/materials/silver.png";
import { GiMaterialsScience } from "react-icons/gi";
import { SetTier } from "../utils/honing-calculations";
import styled from "@emotion/styled";

type ImgProps = {
  img: StaticImageData;
  size: number;
};

type Materials = {
  leapstone: ImgProps;
  shard: ImgProps;
  destruction: ImgProps;
  guardian: ImgProps;
  fusion: ImgProps;
  silver: ImgProps;
  gold: ImgProps;
};

export type MaterialTypes = keyof Materials;

type MatMap = Record<SetTier, Materials>;

const materialMap: MatMap = {
  "t1 302": {
    leapstone: { img: T1Leapstone, size: 32 },
    shard: { img: T1Shard, size: 28 },
    destruction: { img: T1Destruction, size: 32 },
    guardian: { img: T1Guardian, size: 32 },
    fusion: { img: T2Fusion, size: 32 },
    silver: { img: Silver, size: 28 },
    gold: { img: Gold, size: 28 },
  },
  "t2 802": {
    leapstone: { img: T2Leapstone, size: 32 },
    shard: { img: T2Shard, size: 28 },
    destruction: { img: T2Destruction, size: 32 },
    guardian: { img: T2Guardian, size: 32 },
    fusion: { img: T2Fusion, size: 32 },
    silver: { img: Silver, size: 28 },
    gold: { img: Gold, size: 28 },
  },
  "t3 1302": {
    leapstone: { img: T3Leapstone, size: 32 },
    shard: { img: T3Shard, size: 28 },
    destruction: { img: T3Destruction, size: 32 },
    guardian: { img: T3Guardian, size: 32 },
    fusion: { img: T3SimpleFusion, size: 32 },
    silver: { img: Silver, size: 28 },
    gold: { img: Gold, size: 28 },
  },
  "t3 1340": {
    leapstone: { img: T3Gleapstone, size: 32 },
    shard: { img: T3Shard, size: 28 },
    destruction: { img: T3Destruction, size: 32 },
    guardian: { img: T3Guardian, size: 32 },
    fusion: { img: T3BasicFusion, size: 32 },
    silver: { img: Silver, size: 28 },
    gold: { img: Gold, size: 28 },
  },
};

const Img = styled.img`
  /* image-rendering: pixelated; */
`;

type Props = {
  tier: SetTier;
  material: MaterialTypes;
  size?: number;
};

const MaterialImageIcon = ({
  tier = "t1 302",
  material = "leapstone",
  size,
}: Props) => {
  const materialData = materialMap[tier][material];
  const x = size ?? materialData.size;
  const img = materialData.img;

  return <Image src={img} width={x} height={x} />;
  return <Img src={img.src} width={x} height={x} />;
};

export default MaterialImageIcon;
