import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server"; // დაამატეთ ეს

const f = createUploadthing();

const auth = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new UploadThingError("Unauthorized");
  return { userId: session.user.id };
};

export const uploadRouter = {
  itemImageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => await auth()) 
    .onUploadComplete(({ metadata, file }) => {
      console.log("Upload by user", metadata.userId);
      return { url: file.url };
    }),
    
  logoUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => await auth())
    .onUploadComplete(({ metadata, file }) => {
      return { url: file.url };
    }),
} satisfies FileRouter;