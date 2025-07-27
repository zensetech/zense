import { NextRequest, NextResponse } from "next/server";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Adjust the import based on the actual export from your firebase file.
// If it's a default export:
import { app } from "@/firebaseConfig"; // Assuming firebase initialization is in utils/firebase.js

// Or, if it's a named export with a different name, e.g. 'firebaseApp':
// import { firebaseApp as app } from "@/utils/firebase";

const storage = getStorage(app);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("coverImage") as File | null;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const filename = file.name.replace(/\s+/g, "_"); // Replace spaces with underscores for filename safety
    const storageRef = ref(storage, `blogs/${filename}`); // Create a reference to 'uploads/filename'

    console.log("Starting upload to Firebase Storage:", `blogs/${filename}`);

    // Upload the file
    const snapshot = await uploadBytes(storageRef, uint8Array);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log("File uploaded successfully:", downloadURL);

    return NextResponse.json({
      message: "File uploaded successfully",
      filename: downloadURL,
    });
  } catch (error: any) {
    // Add type annotation for better error handling
    console.error("Error handling file upload:", error.message || error); // Log error message or the error object
    return NextResponse.json(
      {
        message: "Error processing file upload",
        error: error.message || "Unknown error",
      }, // Include error message in response
      { status: 500 }
    );
  }
}
