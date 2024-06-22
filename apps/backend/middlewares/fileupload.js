import upload from '../utils/uploadToAzureBlob.js'; // Replace with the path to your updated multer configuration file
import { uploadToAzureBlob } from '../utils/uploadToAzureBlob.js'; // Adjust path as per your utility functions
import fs from 'fs';

// Middleware to handle file upload for logo
// export const handleLogoUpload = async (req, res, next) => {
//   try {
//     upload.single('logo')(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({ message: err.message });
//       }
//       if (!req.file) {
//         return res.status(400).json({ message: 'No file uploaded for logo' });
//       }
//       console.log(req.file.path)
//       req.logoUrl = await uploadToAzureBlob(req.file.path, req.file.originalname);
//       next();
//     });
//   } catch (error) {
//     console.error('Error uploading logo:', error);
//     return res.status(500).json({ message: 'Error uploading logo to Azure Blob Storage' });
//   }
// };

// // Middleware to handle file upload for legaldoc
// export const handleLegalDocUpload = async (req, res, next) => {
//   try {
//     upload.single('legaldoc')(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({ message: err.message });
//       }
//       if (!req.file) {
//         return res.status(400).json({ message: 'No file uploaded for legaldoc' });
//       }
//       req.legaldocUrl = await uploadToAzureBlob(req.file.path, req.file.originalname);
//       next();
//     });
//   } catch (error) {
//     console.error('Error uploading legaldoc:', error);
//     return res.status(500).json({ message: 'Error uploading legaldoc to Azure Blob Storage' });
//   }
// };
function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    } else {
      console.log('Temporary file deleted:', filePath);
    }
  });
}

export const handleFileUpload = async (req, res, next) => {
  try {
    upload.fields([
      { name: 'logo', maxCount: 1 },
      { name: 'legaldoc', maxCount: 1 }
    ])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      // Check if the 'logo' field was uploaded
      if (!req.files['logo'] || req.files['logo'].length === 0) {
        return res.status(400).json({ message: 'No file uploaded for logo' });
      }

      // Check if the 'legaldoc' field was uploaded
      if (!req.files['legaldoc'] || req.files['legaldoc'].length === 0) {
        return res.status(400).json({ message: 'No file uploaded for legaldoc' });
      }

      // Assuming req.files['logo'][0].path and req.files['legaldoc'][0].path contain the file paths on the server
      const logoFilePath = req.files['logo'][0].path;
      const legaldocFilePath = req.files['legaldoc'][0].path;
      const logoOriginalName = req.files['logo'][0].originalname;
      const legaldocOriginalName = req.files['legaldoc'][0].originalname;

      req.logoUrl = await uploadToAzureBlob(logoFilePath, logoOriginalName);
      req.legaldocUrl = await uploadToAzureBlob(legaldocFilePath, legaldocOriginalName);

      deleteFile(logoFilePath);
      deleteFile(legaldocFilePath);

      next();
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    return res.status(500).json({ message: 'Error uploading files to Azure Blob Storage' });
  }
};