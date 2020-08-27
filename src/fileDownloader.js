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


export default function download({filename, images=[] }){ 
    const pdf = new jsPDF({
      orientation: images[0].proportion<1?'l':'p',
      unit: 'mm',
      format,
      putOnlyUsedFonts: true,
      floatPrecision: 'smart',
    })
    
    for (let page = 0; page < images.length; page++) {
      const {data, proportion} = images[page]
      const {width, height} = getImagePrintSize(proportion)
      console.log("download -> getImagePrintSize() ", getImagePrintSize(proportion))

      pdf.addImage(data, 'JPEG', 10, 10, width, height)
      if (images.length - 1 !== page) { 
        pdf.addPage(format, images[page+1].proportion<1?'l':'p')
      }
    }
    
    pdf.save(`${filename||"exported digital note"}`+'.pdf')

}