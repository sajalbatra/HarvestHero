import multer from "multer";
import { BlobServiceClient } from '@azure/storage-blob';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Set up multer storage configuration (local temporary storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('logo'); 

// Azure Blob Storage setup
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerName = 'images';

export async function uploadToAzureBlob(fileBuffer, originalName) {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobName = originalName + '-' + Date.now() + path.extname(originalName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadData(fileBuffer);
  return blockBlobClient.url;
}

export function handleFileUpload(req, res) {
  upload(req, res, async function(err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }
    try {
      const imageUrl = await uploadToAzureBlob(req.file.buffer, req.file.originalname);
      return imageUrl; // Store the file URL in the request object
      //next(); // Call the next middleware/controller
    } catch (uploadError) {
      console.error('Error uploading to Azure Blob:', uploadError);
      res.status(500).send({ message: 'Error uploading to Azure Blob Storage' });
    }
  });
}
