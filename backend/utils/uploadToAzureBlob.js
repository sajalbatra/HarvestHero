import multer from "multer";
import { BlobServiceClient } from '@azure/storage-blob';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './temp'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.originalname); // Keeping the original filename
  }
});

// File filter to accept only specific mimetypes (optional)
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') { // Example: Accept only JPEG and PNG images
//     cb(null, true);
//   } else {
//     cb(new Error('Only JPEG and PNG images are allowed'));
//   }
// };

// Configure multer with storage and file filter
const upload = multer({
  storage: storage,
});

// Azure Blob Storage setup
// const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
// const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
// const containerName = 'images';

// // Function to upload file to Azure Blob Storage
// export async function uploadToAzureBlob(fileBuffer, originalName) {
//   const containerClient = blobServiceClient.getContainerClient(containerName);
//   const blobName = originalName + '-' + Date.now() + path.extname(originalName);
//   const blockBlobClient = containerClient.getBlockBlobClient(blobName);
//   await blockBlobClient.uploadData(fileBuffer);
//   return blockBlobClient.url;
// }

const azureUrl = process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(azureUrl);

const containerName = 'images';
/**
 * Uploads a file to Azure Blob Storage using the provided file path and filename.
 * @param {string} filePath - The local file path to upload.
 * @param {string} originalName - The original filename (used to generate the blob name).
 * @returns {Promise<string>} - The URL of the uploaded blob.
 */
export async function uploadToAzureBlob(filePath, originalName) {
  try {
    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Generate a unique blob name
    const blobName = originalName + '-' + Date.now() + path.extname(originalName);

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload the file to Azure Blob Storage
    await blockBlobClient.uploadFile(filePath);

    // Return the URL of the uploaded blob
    return blockBlobClient.url;
  } catch (error) {
    console.error('Error uploading file to Azure Blob Storage:', error);
    throw error; // Throw the error to be handled by the caller
  }
}


export default upload;
