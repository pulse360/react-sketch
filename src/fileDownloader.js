import jsPDF from 'jspdf'

const printableWidth = 190 // 210mm (A4 paper) - 10mm margin * 2 = 190mm 
const printableHeight = 277 // 277mm (A4 paper) - 10mm margin * 2 = 277mm
const format = 'a4'
  
function getImagePrintSize(proportion){
  const isLandscaped = proportion < 1
  const width = isLandscaped? printableWidth / proportion: printableWidth 
  const height = isLandscaped? printableWidth: printableWidth * proportion 

  let correctionFactor = 1
  if((isLandscaped && width>printableHeight) || (!isLandscaped && width>printableWidth)){
    correctionFactor = (1-((width-printableWidth)/printableWidth));
  } else if ((isLandscaped && height>printableWidth) || (!isLandscaped && height>printableHeight)){
    correctionFactor = (1-((height-printableHeight)/printableHeight));
  }
  
  return {width: width * correctionFactor, height: height * correctionFactor, correctionFactor}  
}


export default function download({filename, data, proportion}){ 
    const pdf = new jsPDF({
      orientation: proportion<1?'l':'p',
      unit: 'mm',
      format,
      putOnlyUsedFonts: true,
      floatPrecision: 'smart',
    })
    
    const {width, height} = getImagePrintSize(proportion)
    console.log("download -> getImagePrintSize() ", getImagePrintSize(proportion))
    pdf.addImage(data, 'JPEG', 10, 10, width, height)
    
    pdf.save(`${filename||"exported digital note"}`+'.pdf')

}