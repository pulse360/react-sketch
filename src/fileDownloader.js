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

// based of https://stackoverflow.com/a/14731922/6569950
function calculateAspectRatioFit(proportion, srcWidth, srcHeight) {
  const maxHeight = proportion < a4Proportion ? printableWidth : printableHeight
  const maxWidth = proportion < a4Proportion ? printableHeight : printableWidth
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight)
  return { width: srcWidth * ratio, height: srcHeight * ratio }
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
  images.map(({ image, proportion, width: imageWidth, height: imageHeight }, index) => {
    const { width, height } = calculateAspectRatioFit(proportion, imageWidth, imageHeight)
    console.log('download - (proportion, width, height) ->', proportion, width, height, imageWidth, imageHeight)
    pdf.addImage(image, 'JPEG', 10, 10, width, height)
    if (index !== images.length - 1) {
      pdf.addPage(format, images[index + 1].proportion < a4Proportion ? 'l' : 'p')
    }
  })
  pdf.save(`${filename || 'exported digital note'}` + '.pdf')
}
