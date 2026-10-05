const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function createProgramPDF(imageFileName, outputFileName, title, subject) {
  const pdfDoc = await PDFDocument.create();
  
  // A4 size: 595.28 x 841.89 points
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  const imagePath = path.join(__dirname, '../assets/images', imageFileName);
  const imageBytes = fs.readFileSync(imagePath);
  const image = await pdfDoc.embedJpg(imageBytes);

  // Scale image to fit A4 page with 20pt margin
  const margin = 20;
  const maxWidth = width - margin * 2;
  const maxHeight = height - margin * 2;

  const imgDims = image.scaleToFit(maxWidth, maxHeight);

  const x = (width - imgDims.width) / 2;
  const y = (height - imgDims.height) / 2;

  page.drawImage(image, {
    x,
    y,
    width: imgDims.width,
    height: imgDims.height,
  });

  pdfDoc.setTitle(title);
  pdfDoc.setAuthor('Yeşilpelit Öğrenci Yurdu');
  pdfDoc.setSubject(subject);

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, '../assets/docs', outputFileName);
  fs.writeFileSync(outputPath, pdfBytes);

  console.log(`PDF başarıyla oluşturuldu: ${outputPath} (${pdfBytes.length} bayt)`);
}

async function main() {
  // 1. Haftasonu Programı
  if (fs.existsSync(path.join(__dirname, '../assets/images/haftasonu-programi.jpg'))) {
    await createProgramPDF(
      'haftasonu-programi.jpg',
      'haftasonu-programi.pdf',
      'Yeşilpelit Öğrenci Yurdu - Haftasonu Zaman Çizelgesi',
      'Haftasonu Programı ve Zaman Çizelgesi'
    );
  }

  // 2. Hafta İçi Programı
  if (fs.existsSync(path.join(__dirname, '../assets/images/haftaici-programi.jpg'))) {
    await createProgramPDF(
      'haftaici-programi.jpg',
      'haftaici-programi.pdf',
      'Yeşilpelit Öğrenci Yurdu - Hafta İçi Zaman Çizelgesi',
      'Hafta İçi Programı ve Zaman Çizelgesi'
    );
  }
}

main().catch(console.error);

