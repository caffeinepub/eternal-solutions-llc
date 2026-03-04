import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  CheckCircle2,
  FileVideo,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitIntakeForm } from "../../hooks/useQueries";
import { ExternalBlob } from "../../utils/blobStorage";

interface UploadedPhoto {
  id: string;
  file: File;
  preview: string;
  fileId: string | null;
  progress: number;
  error?: string;
}

interface UploadedVideo {
  file: File;
  fileId: string | null;
  progress: number;
  error?: string;
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <div
        className="flex items-center gap-3 mb-4 pb-2 border-b"
        style={{ borderColor: "oklch(0.90 0.012 240)" }}
      >
        <div
          className="w-1 h-4 rounded-full flex-shrink-0"
          style={{ backgroundColor: "oklch(0.38 0.07 210)" }}
        />
        <h3
          className="font-display font-semibold text-sm uppercase tracking-widest"
          style={{ color: "oklch(0.27 0.06 252)" }}
        >
          {title}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function FieldGroup({
  label,
  required,
  fullWidth,
  children,
  error,
}: {
  label: string;
  required?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className={fullWidth ? "sm:col-span-2" : ""}>
      <Label
        className="font-body text-sm font-medium mb-1.5 block"
        style={{ color: "oklch(0.32 0.04 270)" }}
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-hidden>
            *
          </span>
        )}
      </Label>
      {children}
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
}

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  propertyAddress: string;
  preferredContact: string;
  insuranceCompany: string;
  policyNumber: string;
  propertyType: string;
  dateOfLoss: string;
  causeOfLoss: string;
  damageDescription: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function IntakeFormSection() {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    propertyAddress: "",
    preferredContact: "",
    insuranceCompany: "",
    policyNumber: "",
    propertyType: "",
    dateOfLoss: "",
    causeOfLoss: "",
    damageDescription: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [video, setVideo] = useState<UploadedVideo | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: submitForm, isPending } = useSubmitIntakeForm();

  const setField = <K extends keyof FormData>(key: K, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email address";
    if (!form.propertyAddress.trim())
      newErrors.propertyAddress = "Property address is required";
    if (!form.preferredContact)
      newErrors.preferredContact = "Select a preferred contact method";
    if (!form.insuranceCompany.trim())
      newErrors.insuranceCompany = "Insurance company name is required";
    if (!form.propertyType) newErrors.propertyType = "Select a property type";
    if (!form.dateOfLoss) newErrors.dateOfLoss = "Date of loss is required";
    if (!form.causeOfLoss) newErrors.causeOfLoss = "Select cause of loss";
    if (!form.damageDescription.trim())
      newErrors.damageDescription = "Please describe the damage";
    else if (form.damageDescription.trim().length < 50)
      newErrors.damageDescription =
        "Description must be at least 50 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newPhotos: UploadedPhoto[] = files.map((file) => ({
      id: `${Date.now()}-${file.name}`,
      file,
      preview: URL.createObjectURL(file),
      fileId: null,
      progress: 0,
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);

    // Upload each photo
    for (let i = 0; i < newPhotos.length; i++) {
      const photo = newPhotos[i];
      const startIndex = photos.length + i;
      try {
        const arrayBuffer = await photo.file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(
          (pct: number) => {
            setPhotos((prev) => {
              const updated = [...prev];
              if (updated[startIndex]) {
                updated[startIndex] = { ...updated[startIndex], progress: pct };
              }
              return updated;
            });
          },
        );
        const directUrl = blob.getDirectURL();
        setPhotos((prev) => {
          const updated = [...prev];
          if (updated[startIndex]) {
            updated[startIndex] = {
              ...updated[startIndex],
              fileId: directUrl,
              progress: 100,
            };
          }
          return updated;
        });
      } catch (_err) {
        setPhotos((prev) => {
          const updated = [...prev];
          if (updated[startIndex]) {
            updated[startIndex] = {
              ...updated[startIndex],
              error: "Upload failed",
            };
          }
          return updated;
        });
      }
    }

    if (photoInputRef.current) photoInputRef.current.value = "";
  };

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setVideo({ file, fileId: null, progress: 0 });

    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(
        (pct: number) => {
          setVideo((prev) => (prev ? { ...prev, progress: pct } : null));
        },
      );
      const directUrl = blob.getDirectURL();
      setVideo((prev) =>
        prev ? { ...prev, fileId: directUrl, progress: 100 } : null,
      );
    } catch (_err) {
      setVideo((prev) => (prev ? { ...prev, error: "Upload failed" } : null));
    }

    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => {
      const p = prev[index];
      if (p?.preview) URL.revokeObjectURL(p.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const pendingUploads = [
      ...photos.filter((p) => p.progress < 100 && !p.error),
      ...(video && video.progress < 100 && !video.error ? [video] : []),
    ];
    if (pendingUploads.length > 0) {
      toast.error("Please wait for all uploads to complete.");
      return;
    }

    setIsUploading(true);
    try {
      const fileIds = [
        ...photos.filter((p) => p.fileId).map((p) => p.fileId as string),
        ...(video?.fileId ? [video.fileId] : []),
      ];

      await submitForm({
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        propertyAddress: form.propertyAddress,
        preferredContact: form.preferredContact,
        insuranceCompany: form.insuranceCompany,
        policyNumber: form.policyNumber,
        propertyType: form.propertyType,
        dateOfLoss: form.dateOfLoss,
        causeOfLoss: form.causeOfLoss,
        damageDescription: form.damageDescription,
        fileIds,
      });

      setSubmitted(true);
      toast.success(
        "Submission received! We'll be in touch within 1-2 business days.",
      );
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  if (submitted) {
    return (
      <section
        id="intake-form"
        data-ocid="intake_form.section"
        className="section-cream py-20 lg:py-28"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            data-ocid="intake_form.success_state"
            className="bg-white rounded-2xl shadow-card-lg p-10 text-center"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "oklch(0.55 0.09 210 / 0.15)" }}
            >
              <CheckCircle2
                className="w-9 h-9"
                style={{ color: "oklch(0.38 0.07 210)" }}
              />
            </div>
            <h2
              className="font-display text-2xl font-semibold mb-3"
              style={{ color: "oklch(0.27 0.06 252)" }}
            >
              Thank You!
            </h2>
            <p
              className="font-body text-base leading-relaxed"
              style={{ color: "oklch(0.40 0.03 270)" }}
            >
              Your submission has been received. We'll review your information
              and contact you within <strong>1–2 business days</strong>.
            </p>
            <p
              className="font-body text-sm mt-4"
              style={{ color: "oklch(0.55 0.04 270)" }}
            >
              Questions? Email us at{" "}
              <a
                href="mailto:info@eternalsolutionspa.com"
                className="underline"
                style={{ color: "oklch(0.38 0.07 210)" }}
              >
                info@eternalsolutionspa.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="intake-form"
      data-ocid="intake_form.section"
      className="section-cream py-20 lg:py-28"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p
            className="font-body text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "oklch(0.38 0.07 210)" }}
          >
            Get Started
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-navy mb-3">
            Submit Your Damage for Free Review
          </h2>
          <p
            className="font-body text-base"
            style={{ color: "oklch(0.45 0.04 270)" }}
          >
            Complete the form below and our team will review your situation
            within 1–2 business days.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-card-lg p-6 sm:p-10"
        >
          <form onSubmit={handleSubmit} noValidate>
            {/* Contact Info */}
            <FormSection title="Contact Information">
              <FieldGroup label="Full Name" required error={errors.fullName}>
                <Input
                  type="text"
                  placeholder="Jane Smith"
                  value={form.fullName}
                  onChange={(e) => setField("fullName", e.target.value)}
                  className="font-body"
                  data-ocid="intake_form.input"
                  aria-required="true"
                  autoComplete="name"
                />
              </FieldGroup>

              <FieldGroup label="Phone Number" required error={errors.phone}>
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  className="font-body"
                  data-ocid="intake_form.input"
                  aria-required="true"
                  autoComplete="tel"
                />
              </FieldGroup>

              <FieldGroup label="Email Address" required error={errors.email}>
                <Input
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className="font-body"
                  data-ocid="intake_form.input"
                  aria-required="true"
                  autoComplete="email"
                />
              </FieldGroup>

              <FieldGroup
                label="Property Address"
                required
                error={errors.propertyAddress}
              >
                <Input
                  type="text"
                  placeholder="123 Main St, Philadelphia, PA"
                  value={form.propertyAddress}
                  onChange={(e) => setField("propertyAddress", e.target.value)}
                  className="font-body"
                  data-ocid="intake_form.input"
                  aria-required="true"
                  autoComplete="street-address"
                />
              </FieldGroup>

              <FieldGroup
                label="Preferred Contact Method"
                required
                error={errors.preferredContact}
              >
                <Select
                  value={form.preferredContact}
                  onValueChange={(v) => setField("preferredContact", v)}
                >
                  <SelectTrigger
                    className="font-body"
                    data-ocid="intake_form.select"
                  >
                    <SelectValue placeholder="Select method..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Phone">Phone</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Text">Text</SelectItem>
                  </SelectContent>
                </Select>
              </FieldGroup>
            </FormSection>

            {/* Insurance Info */}
            <FormSection title="Insurance Information">
              <FieldGroup
                label="Insurance Company Name"
                required
                error={errors.insuranceCompany}
              >
                <Input
                  type="text"
                  placeholder="State Farm, Allstate, etc."
                  value={form.insuranceCompany}
                  onChange={(e) => setField("insuranceCompany", e.target.value)}
                  className="font-body"
                  data-ocid="intake_form.input"
                  aria-required="true"
                />
              </FieldGroup>

              <FieldGroup label="Policy Number (Optional)">
                <Input
                  type="text"
                  placeholder="Policy number if available"
                  value={form.policyNumber}
                  onChange={(e) => setField("policyNumber", e.target.value)}
                  className="font-body"
                  data-ocid="intake_form.input"
                />
              </FieldGroup>

              <FieldGroup
                label="Property Type"
                required
                error={errors.propertyType}
              >
                <Select
                  value={form.propertyType}
                  onValueChange={(v) => setField("propertyType", v)}
                >
                  <SelectTrigger
                    className="font-body"
                    data-ocid="intake_form.select"
                  >
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single Family">Single Family</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                    <SelectItem value="Multi-Family">Multi-Family</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </FieldGroup>
            </FormSection>

            {/* Damage Info */}
            <FormSection title="Damage Information">
              <FieldGroup
                label="Date of Loss"
                required
                error={errors.dateOfLoss}
              >
                <Input
                  type="date"
                  value={form.dateOfLoss}
                  onChange={(e) => setField("dateOfLoss", e.target.value)}
                  className="font-body"
                  data-ocid="intake_form.input"
                  aria-required="true"
                  max={new Date().toISOString().split("T")[0]}
                />
              </FieldGroup>

              <FieldGroup
                label="Cause of Loss"
                required
                error={errors.causeOfLoss}
              >
                <Select
                  value={form.causeOfLoss}
                  onValueChange={(v) => setField("causeOfLoss", v)}
                >
                  <SelectTrigger
                    className="font-body"
                    data-ocid="intake_form.select"
                  >
                    <SelectValue placeholder="Select cause..." />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Storm",
                      "Wind",
                      "Hail",
                      "Fire",
                      "Water",
                      "Plumbing Leak",
                      "Vandalism",
                      "Other",
                    ].map((cause) => (
                      <SelectItem key={cause} value={cause}>
                        {cause}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldGroup>

              <FieldGroup
                label="Description of Damage"
                required
                fullWidth
                error={errors.damageDescription}
              >
                <Textarea
                  placeholder="Please describe the damage in detail... (minimum 50 characters)"
                  value={form.damageDescription}
                  onChange={(e) =>
                    setField("damageDescription", e.target.value)
                  }
                  className="font-body min-h-28 resize-none"
                  data-ocid="intake_form.textarea"
                  aria-required="true"
                  rows={5}
                />
                <p
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.55 0.03 270)" }}
                >
                  {form.damageDescription.length}/50 minimum characters
                </p>
              </FieldGroup>
            </FormSection>

            {/* File Uploads */}
            <div className="mb-8">
              <div
                className="flex items-center gap-3 mb-4 pb-2 border-b"
                style={{ borderColor: "oklch(0.90 0.012 240)" }}
              >
                <div
                  className="w-1 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "oklch(0.38 0.07 210)" }}
                />
                <h3
                  className="font-display font-semibold text-sm uppercase tracking-widest"
                  style={{ color: "oklch(0.27 0.06 252)" }}
                >
                  Upload Files
                </h3>
              </div>

              {/* Photos */}
              <div className="mb-5">
                <Label
                  className="font-body text-sm font-medium mb-2 block"
                  style={{ color: "oklch(0.32 0.04 270)" }}
                >
                  Upload Photos{" "}
                  <span
                    className="font-normal text-xs"
                    style={{ color: "oklch(0.55 0.03 270)" }}
                  >
                    (JPG/PNG, max 10MB each)
                  </span>
                </Label>

                {/* Photo grid */}
                {photos.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
                    {photos.map((photo, i) => (
                      <div
                        key={photo.id}
                        className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
                      >
                        <img
                          src={photo.preview}
                          alt={`Upload ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {photo.progress < 100 && !photo.error && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white text-xs font-medium">
                              {photo.progress}%
                            </span>
                          </div>
                        )}
                        {photo.error && (
                          <div className="absolute inset-0 bg-red-500/70 flex items-center justify-center">
                            <span className="text-white text-xs">Failed</span>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removePhoto(i)}
                          className="absolute top-1 right-1 w-5 h-5 bg-white/90 rounded-full flex items-center justify-center shadow"
                          aria-label="Remove photo"
                        >
                          <X className="w-3 h-3 text-gray-700" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed font-body text-sm transition-colors hover:border-teal"
                  style={{
                    borderColor: "oklch(0.38 0.07 210 / 0.4)",
                    color: "oklch(0.38 0.07 210)",
                  }}
                  data-ocid="intake_form.upload_button"
                >
                  <Upload className="w-4 h-4" />
                  Add Photos
                </button>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  multiple
                  onChange={handlePhotoChange}
                  className="hidden"
                  aria-label="Upload photos"
                />
              </div>

              {/* Video */}
              <div>
                <Label
                  className="font-body text-sm font-medium mb-2 block"
                  style={{ color: "oklch(0.32 0.04 270)" }}
                >
                  Upload Video{" "}
                  <span
                    className="font-normal text-xs"
                    style={{ color: "oklch(0.55 0.03 270)" }}
                  >
                    (MP4, max 50MB)
                  </span>
                </Label>

                {video ? (
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-lg border"
                    style={{
                      borderColor: "oklch(0.38 0.07 210 / 0.3)",
                      backgroundColor: "oklch(0.38 0.07 210 / 0.05)",
                    }}
                  >
                    <FileVideo
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: "oklch(0.38 0.07 210)" }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-body text-sm truncate"
                        style={{ color: "oklch(0.32 0.04 270)" }}
                      >
                        {video.file.name}
                      </p>
                      {video.progress < 100 && !video.error && (
                        <p
                          className="font-body text-xs"
                          style={{ color: "oklch(0.55 0.03 270)" }}
                        >
                          Uploading… {video.progress}%
                        </p>
                      )}
                      {video.error && (
                        <p className="text-red-500 text-xs">Upload failed</p>
                      )}
                      {video.fileId && (
                        <p
                          className="font-body text-xs"
                          style={{ color: "oklch(0.38 0.07 210)" }}
                        >
                          ✓ Uploaded
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setVideo(null)}
                      className="text-gray-400 hover:text-gray-600"
                      aria-label="Remove video"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed font-body text-sm transition-colors hover:border-teal"
                    style={{
                      borderColor: "oklch(0.38 0.07 210 / 0.4)",
                      color: "oklch(0.38 0.07 210)",
                    }}
                    data-ocid="intake_form.upload_button"
                  >
                    <FileVideo className="w-4 h-4" />
                    Add Video
                  </button>
                )}
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/mp4"
                  onChange={handleVideoChange}
                  className="hidden"
                  aria-label="Upload video"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isPending || isUploading}
                className="w-full btn-plum text-white font-body font-medium text-base py-3 h-auto border-0 rounded-lg shadow"
                data-ocid="intake_form.submit_button"
              >
                {isPending || isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit for Free Review"
                )}
              </Button>
              <p
                className="text-xs text-center mt-3 font-body"
                style={{ color: "oklch(0.55 0.03 270)" }}
              >
                By submitting, you agree to our{" "}
                <a
                  href="/privacy"
                  className="underline"
                  style={{ color: "oklch(0.38 0.07 210)" }}
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="/terms"
                  className="underline"
                  style={{ color: "oklch(0.38 0.07 210)" }}
                >
                  Terms & Conditions
                </a>
                .
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
