"use client";

import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { useTranslations } from "next-intl";

interface LogoUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
}

export default function LogoUpload({ value, onChange }: LogoUploadProps) {
  const t = useTranslations("logo");

  return (
    <div className="space-y-3">
      {/* LABEL */}
      <label className="block text-sm font-medium text-white">
        {t("label")}{" "}
        <span className="text-white/40">({t("optional")})</span>
      </label>

      {value ? (
        <div className="relative w-28 h-28 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <Image
            src={value}
            alt={t("alt")}
            fill
            className="object-contain p-3"
          />

          <button
            type="button"
            onClick={() => onChange(null)}
            className="
              absolute bottom-2 right-2
              bg-gray-950/80 text-xs px-2 py-1
              rounded-md border border-white/20
              text-white/70
              hover:text-white
              hover:border-white/50
              transition
            "
          >
            {t("remove")}
          </button>
        </div>
      ) : (
        <UploadDropzone
          endpoint="logoUploader"
          appearance={{
            container:
              "border border-dashed border-white/20 rounded-2xl p-6 bg-white/5 text-center backdrop-blur",
           button:
          "bg-gray-950 text-white hover:bg-gray-900 transition rounded-md px-4 py-2 text-sm font-medium border border-white/20",
            label: "text-white/70 text-sm",
            allowedContent: "text-white/40 text-xs",
            uploadIcon: "text-white/40",
          }}
          content={{
            label: t("label"),
            allowedContent: t("allowed"),
            button: t("button"),
          }}
          onClientUploadComplete={(res) => {
            const url = res?.[0]?.url;
            if (url) onChange(url);
          }}
        />
      )}
    </div>
  );
}
