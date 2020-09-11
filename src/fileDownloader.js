import jsPDF from 'jspdf'
const fabric = require('fabric').fabric

const printableWidth = 190 // 210mm (A4 paper) - 10mm margin * 2 = 190mm
const printableHeight = 277 // 277mm (A4 paper) - 10mm margin * 2 = 277mm
const format = 'a4'
const a4Proportion = 0.685

/**
 * Produce a static canvas representation from a fabricjs json object
 * @param {*} tabsData
 * @returns {Array<{id, div, image, proportion, width, height}>} images
 */
function makeSketchImagesFromTabs(tabsData) {
  const tabs = Object.values(tabsData)
  return Promise.all(
    tabs.map(async (tab) => {
      const { data, id } = tab
      const { canvasHeight: height, canvasWidth: width } = data
      const div = document.createElement('canvas')
      div.height = height
      div.width = width
      div.id = id
      const canvas = new fabric.StaticCanvas(div)
      return new Promise((resolve) => {
        canvas.loadFromJSON(data, () => {
          canvas.setWidth(width)
          canvas.setHeight(height)
          resolve({
            id,
            div,
            image: canvas.toDataURL({ format: 'jpeg', quality: 0.8 }),
            width,
            height,
            proportion: height / width,
          })
        })
      })
    })
  )
}

function fitContentInPaper(isLandscaped, width, height) {
  console.log('fitContentInPaper -> isLandscaped, width, height', isLandscaped, width, height)

  let correctionFactor = 1
  if (isLandscaped && (width > printableHeight || height > printableWidth)) {
    const shouldCorrectWidth = width - printableHeight > height - printableWidth
    if (shouldCorrectWidth) {
      correctionFactor -= (width - printableHeight) / printableHeight
    } else {
      correctionFactor -= (height - printableWidth) / printableWidth
    }
  } else if (!isLandscaped && (width > printableWidth || height > printableHeight)) {
    const shouldCorrectWidth = width - printableWidth > height - printableHeight
    if (shouldCorrectWidth) {
      correctionFactor -= (width - printableWidth) / printableWidth
    } else {
      correctionFactor -= (height - printableHeight) / printableHeight
    }
  }
  return { correctionFactor, correctedWidth: width * correctionFactor, correctedHeight: height * correctionFactor }
}

function getImagePrintSize(proportion) {
  const isLandscaped = proportion < a4Proportion
  const width = isLandscaped ? printableWidth / proportion : printableWidth
  const height = isLandscaped ? printableWidth : printableWidth * proportion
  const { correctedWidth, correctedHeight } = fitContentInPaper(isLandscaped, width, height)
  return { width: correctedWidth, height: correctedHeight }
}

export default async function download({ filename, tabs }) {
  const images = await makeSketchImagesFromTabs(tabs)
  const pdf = new jsPDF({
    orientation: images[0].proportion < a4Proportion ? 'l' : 'p',
    unit: 'mm',
    format,
    putOnlyUsedFonts: true,
    floatPrecision: 'smart',
  })
  images.map(({ image, proportion }, index) => {
    const { width, height } = getImagePrintSize(proportion)
    console.log('download - (proportion, width, height) ->', proportion, width, height)
    pdf.addImage(image, 'JPEG', 10, 10, width, height)
    if (index !== images.length - 1) {
      pdf.addPage(format, images[index + 1].proportion < a4Proportion ? 'l' : 'p')
    }
  })
  pdf.save(`${filename || 'exported digital note'}` + '.pdf')
}
