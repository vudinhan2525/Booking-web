import { BlobServiceClient } from '@azure/storage-blob';

// Function to upload an image to Azure Blob Storage
async function uploadToAzureBlobStorage(
  imageBuffer: any,
  containerName: string,
  blobName: string,
  connectionString: string,
): Promise<string> {
  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlockBlobClient(blobName);

  await blobClient.upload(imageBuffer, imageBuffer.length);
  return blobClient.url;
}
async function deleteFromAzureBlobStorage(
  containerName: string,
  blobName: string,
  connectionString: string,
) {
  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlockBlobClient(blobName);

  await blobClient.delete();

  return true; // Return true to indicate successful deletion
}
export { deleteFromAzureBlobStorage };
export default uploadToAzureBlobStorage;
