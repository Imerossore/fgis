"use server";

export async function uploadToCloudinary(
  imageFile: File
): Promise<string | null> {
  if (!imageFile?.size) return null;

  try {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const dataUrl = `data:${imageFile.type};base64,${buffer.toString(
      "base64"
    )}`;

    const formData = new FormData();
    formData.append("file", dataUrl);
    formData.append("upload_preset", "ml_default");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Cloudinary error:", error);
      return null;
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
}
