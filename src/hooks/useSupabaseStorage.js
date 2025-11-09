import { useState, useEffect } from "react";
import { supabase } from "../supabase/config";

export const useSupabaseStorage = (bucketName = "logo") => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Fetch all files when the hook loads
  useEffect(() => {
    fetchFiles();
  }, []);

  // ✅ Fetch files from the bucket
  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase.storage.from(bucketName).list("", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });
      if (error) throw error;

      // Generate public URLs
      const filesWithUrls = data.map((file) => {
        const { data: publicUrlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(file.name);
        return { name: file.name, url: publicUrlData.publicUrl };
      });

      setFiles(filesWithUrls);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    }
  };

  // ✅ Upload file to Supabase
  const uploadFile = async (file) => {
    if (!file) return setError("Please select a file!");
    setUploading(true);
    setError("");

    try {
      const fileName = file.name;

      const { error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file);

      if (error) throw error;

      await fetchFiles(); // refresh files after upload
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // 🗑️ Optional: Delete file from bucket
  const deleteFile = async (fileName) => {
    try {
      const { error } = await supabase.storage
        .from(bucketName)
        .remove([fileName]);

      if (error) throw error;
      await fetchFiles();
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
    }
  };

  return {
    files,
    uploading,
    error,
    uploadFile,
    fetchFiles,
    deleteFile,
  };
};
