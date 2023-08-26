const fs = require('fs');
const archiver = require('archiver');


function createZipFileFromString(content,fileName) {
    return new Promise((resolve, reject) => {
      const buffer = Buffer.from(content);
  
      const archive = archiver('zip', {
        zlib: { level: 9 } // Compression level (optional)
      });
  
      const chunks = [];
  
      archive.on('data', function(chunk) {
        chunks.push(chunk);
      });
  
      archive.on('error', function(err) {
        reject(err);
      });
  
      archive.on('end', function() {
        const resultBuffer = Buffer.concat(chunks);
        resolve(resultBuffer);
      });
  
      archive.append(buffer, { name: fileName }); // Add the buffer as a file to the archive
      archive.finalize();
    });
  }


export const POST = async (req) => {
    

    //const base64String = await createZipFileFromString("content here...","test.py");
    return new Response(JSON.stringify({ data: base64String }), { status: 200 });
}