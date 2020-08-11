import jsPDF from 'jspdf'
// import(/* webpackChunkName: "jspdf", webpackPrefetch: -100  */ 'jspdf').then(({ default: jsPDF })=>{

export default function download({filename, images=[] }){
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      floatPrecision: 'smart',
    })

    for (let page = 0; page < images.length; page++) {
      const image = images[page]
      pdf.addImage(image, 'JPEG', 0, 43.5, 210, 210)
      if (images.length - 1 !== page) pdf.addPage()
    }
    
    pdf.save(filename+'.pdf')

}