"use strict";

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const fs = require("fs");
const { shuffleLayerConfigurations, debugLogs, rarityDelimiter } = require("./appConfig");
const {
  // format,
  // baseUri,
  // description,
  // background,
  // uniqueDnaTorrance,
  layerConfigurations,
  // rarityDelimiter,
  // shuffleLayerConfigurations,
  // debugLogs,
  // extraMetadata
} = require(path.join(basePath, "/src/appConfig.js"));
// const sha1 = require(path.join(basePath, "/node_modules/sha1"));
// const { createCanvas, loadImage } = require(path.join(
//   basePath,
//   "/node_modules/canvas"
// ));
const buildDir = path.join(basePath, "/buildApp");
const layersDir = path.join(basePath, "/appLayers");


/* ############################## functions definitions ##########################################*/

const getRarityWeight = str => {
  const nameWithoutExtension = str.slice(0, -4);
  let nameWithoutWeight = Number(
    nameWithoutExtension.split(rarityDelimiter).pop()
  );
  if (isNaN(nameWithoutWeight)) {
    nameWithoutWeight = 0;
  }
  console.log('getRarityWeightResult: ', nameWithoutWeight)
  return nameWithoutWeight;
}

const cleanName = str => {
  console.log('cleanNameStr: ', str)
  let nameWithoutExtension = str.slice(0, -4);
  let nameWithoutWeight = nameWithoutExtension.split(rarityDelimiter).shift();
  console.log('cleanNameResult: ', nameWithoutWeight)
  return nameWithoutWeight
}

const getElements = path => {
  console.log('getElementsPath => ', path);
  let res = fs
  let res = path
  // .readFileSync(path)
  .filter(item => !/(^|\/)\.[^\/\.]/g.test(item))
  // .map((i, index) => {
  //   return {
  //     id: index,
  //     name: cleanName(i),
  //     fileName: i,
  //     path: `${path}${i}`,
  //     weight: getRarityWeight(i)
  //   }
  // })

  console.log('getElementsResulst => ', res);
  return path

}

const layerSetup = layersOrder => {
  const layers = layersOrder.map((layerObj, index) => ({
    id: index,
    name: layerObj.name,
    elements: getElements(`${layersDir}/${layerObj.name}/`),
    blendMode: layerObj["blend"] != undefined ? layerObj["blend"]: "source-over",
    opacity: layerObj["opacity"] != undefined ? layerObj["opacity"]: 1
  }))
  // console.log('layers => ', layers)
  return layers
}
const shuffle = array => {
  let currentIndex = array.length, randomIndex;
  while(currentIndex != 0){
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }
  return array;
}

const buildSetup = () => {
  if(fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true, force: true})
  }
  fs.mkdirSync(buildDir);
  fs.mkdirSync(path.join(buildDir, "/json"));
  fs.mkdirSync(path.join(buildDir, "/images"));
}

const startCreating = async () => {
  let layerConfigIndex = 0;
  let editionCount = 1;
  let failedCount = 0;
  let abstractedIndexes = [];

  for(let i = 1; i <= layerConfigurations[layerConfigurations.length - 1].growEditionSizeTo; i++){
    abstractedIndexes.push(i)
  }
  if(shuffleLayerConfigurations){
    abstractedIndexes = shuffle(abstractedIndexes);
  }
  debugLogs && console.log("Editions left to create: ", abstractedIndexes)

  while(layerConfigIndex < layerConfigurations.length) {
    const layers = layerSetup(layerConfigurations[layerConfigIndex].layersOrder);
    console.log(`layer ${layerConfigIndex}: ${layers}`);
    layerConfigIndex ++
  }

}

module.exports = {
  buildSetup,
  startCreating,
  // getElements
}
