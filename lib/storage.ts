import { storage } from "@/firebaseConfig"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"


async function upload(uri: string, name: string) {
  try {
    console.log("Starting upload process for:", uri)

    const response = await fetch(uri)
    console.log("Fetch response status:", response.status)

    const blob = await response.blob()
    console.log("Blob created, size:", blob.size)

    const imageRef =  ref(storage, `images/${name}`)
    console.log("Storage reference created:", imageRef.fullPath)

    const results = await uploadBytes(imageRef, blob)
    console.log("Upload completed, metadata:", results.metadata)

    const downloadUrl = await getDownloadURL(results.ref)
    console.log("Download URL obtained:", downloadUrl)

    return { downloadUrl, metadata: results.metadata }
  } catch (error: any) {
    console.error("Error in storage.upload:", error)
    if (error instanceof Error) {
      console.error("Error name:", error.name)
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }
    if ("serverResponse" in error) {
      console.error("Server response:", (error as any).serverResponse)
    }
    throw error
  }
}

export default {
  upload,
}

