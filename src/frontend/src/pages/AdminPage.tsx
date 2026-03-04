import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQueryClient } from "@tanstack/react-query";
import {
  ExternalLink,
  Eye,
  Loader2,
  LogOut,
  Shield,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { IntakeSubmission } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useDeleteSubmission,
  useGetSubmissions,
  useIsCallerAdmin,
  useUpdateSubmissionStatus,
} from "../hooks/useQueries";

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    Pending: "bg-amber-100 text-amber-800 border-amber-200",
    Reviewed: "bg-blue-100 text-blue-800 border-blue-200",
    Qualified: "bg-green-100 text-green-800 border-green-200",
    Declined: "bg-red-100 text-red-800 border-red-200",
  };
  const cls = variants[status] || "bg-gray-100 text-gray-800 border-gray-200";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border font-body ${cls}`}
    >
      {status}
    </span>
  );
}

function formatDate(ts: bigint | string): string {
  if (typeof ts === "bigint") {
    // nanoseconds to ms
    const ms = Number(ts) / 1_000_000;
    return new Date(ms).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return ts;
}

function SubmissionDetail({
  submission,
  onClose,
}: {
  submission: IntakeSubmission;
  onClose: () => void;
}) {
  const [status, setStatus] = useState(submission.status);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { mutateAsync: updateStatus, isPending: updatingStatus } =
    useUpdateSubmissionStatus();
  const { mutateAsync: deleteSubmission, isPending: deleting } =
    useDeleteSubmission();

  const handleSaveStatus = async () => {
    try {
      await updateStatus({ id: submission.id, status });
      toast.success("Status updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSubmission(submission.id);
      toast.success("Submission deleted");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete submission");
    }
    setDeleteOpen(false);
  };

  const imageFileIds = submission.fileIds.filter(
    (id) => !id.includes("video") && !id.endsWith(".mp4"),
  );
  const videoFileIds = submission.fileIds.filter(
    (id) => id.includes("video") || id.endsWith(".mp4"),
  );

  return (
    <div className="space-y-6 font-body text-sm">
      {/* Status update */}
      <div
        className="p-4 rounded-xl border"
        style={{
          borderColor: "oklch(0.38 0.07 210 / 0.3)",
          backgroundColor: "oklch(0.38 0.07 210 / 0.05)",
        }}
      >
        <p
          className="font-semibold text-xs uppercase tracking-wide mb-2"
          style={{ color: "oklch(0.38 0.07 210)" }}
        >
          Submission Status
        </p>
        <div className="flex items-center gap-3">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="flex-1" data-ocid="admin.status.select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["Pending", "Reviewed", "Qualified", "Declined"].map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleSaveStatus}
            disabled={updatingStatus || status === submission.status}
            size="sm"
            className="btn-plum text-white border-0"
            data-ocid="admin.save_button"
          >
            {updatingStatus ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>

      {/* Contact info */}
      <Section title="Contact Information">
        <Field label="Full Name" value={submission.fullName} />
        <Field label="Phone" value={submission.phone} />
        <Field label="Email" value={submission.email} />
        <Field
          label="Property Address"
          value={submission.propertyAddress}
          fullWidth
        />
        <Field label="Preferred Contact" value={submission.preferredContact} />
        <Field label="Submitted" value={formatDate(submission.submittedAt)} />
      </Section>

      {/* Insurance info */}
      <Section title="Insurance Information">
        <Field label="Insurance Company" value={submission.insuranceCompany} />
        <Field
          label="Policy Number"
          value={submission.policyNumber || "Not provided"}
        />
        <Field label="Property Type" value={submission.propertyType} />
      </Section>

      {/* Damage info */}
      <Section title="Damage Information">
        <Field label="Date of Loss" value={submission.dateOfLoss} />
        <Field label="Cause of Loss" value={submission.causeOfLoss} />
        <Field
          label="Description"
          value={submission.damageDescription}
          fullWidth
          multiline
        />
      </Section>

      {/* Files */}
      {submission.fileIds.length > 0 && (
        <Section title="Uploaded Files">
          {imageFileIds.length > 0 && (
            <div className="col-span-2">
              <p
                className="text-xs font-medium mb-2"
                style={{ color: "oklch(0.50 0.03 270)" }}
              >
                Photos ({imageFileIds.length})
              </p>
              <div className="grid grid-cols-3 gap-2">
                {imageFileIds.map((id, i) => (
                  <a
                    key={id}
                    href={id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-square rounded-lg overflow-hidden bg-gray-100 block hover:opacity-90 transition-opacity"
                  >
                    <img
                      src={id}
                      alt={`Damage documentation ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
          {videoFileIds.length > 0 && (
            <div className="col-span-2">
              <p
                className="text-xs font-medium mb-2"
                style={{ color: "oklch(0.50 0.03 270)" }}
              >
                Videos
              </p>
              {videoFileIds.map((id, i) => (
                <a
                  key={id}
                  href={id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs hover:underline"
                  style={{ color: "oklch(0.38 0.07 210)" }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Video {i + 1}
                </a>
              ))}
            </div>
          )}
        </Section>
      )}

      {/* Delete */}
      <div className="pt-2 border-t border-gray-100">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setDeleteOpen(true)}
          className="w-full"
          data-ocid="admin.delete_button"
        >
          <Trash2 className="w-3.5 h-3.5 mr-2" />
          Delete Submission
        </Button>
      </div>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent data-ocid="admin.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Delete Submission?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body">
              This action cannot be undone. The submission from{" "}
              <strong>{submission.fullName}</strong> will be permanently
              deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              data-ocid="admin.confirm_button"
              className="bg-destructive text-destructive-foreground"
            >
              {deleting ? (
                <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
              ) : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p
        className="font-body text-xs font-semibold uppercase tracking-widest mb-2 pb-1 border-b"
        style={{
          color: "oklch(0.38 0.07 210)",
          borderColor: "oklch(0.38 0.07 210 / 0.2)",
        }}
      >
        {title}
      </p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  fullWidth,
  multiline,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
  multiline?: boolean;
}) {
  return (
    <div className={fullWidth ? "col-span-2" : ""}>
      <p
        className="text-xs font-medium mb-0.5"
        style={{ color: "oklch(0.55 0.03 270)" }}
      >
        {label}
      </p>
      <p
        className={`text-sm font-body ${multiline ? "whitespace-pre-wrap" : ""}`}
        style={{ color: "oklch(0.25 0.04 270)" }}
      >
        {value || "—"}
      </p>
    </div>
  );
}

export default function AdminPage() {
  const { identity, login, clear, isLoggingIn, isLoginIdle } =
    useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;

  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: submissions, isLoading: submissionsLoading } =
    useGetSubmissions();

  const [selectedSubmission, setSelectedSubmission] =
    useState<IntakeSubmission | null>(null);

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  // Loading state
  if (!isAuthenticated && isLoginIdle) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundColor: "oklch(0.27 0.06 252)" }}
      >
        <div
          className="w-full max-w-sm rounded-2xl p-8 shadow-card-lg"
          style={{ backgroundColor: "oklch(0.32 0.05 265)" }}
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-plum/50 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-white" strokeWidth={1.5} />
            </div>
            <h1 className="font-display text-2xl font-semibold text-white mb-1">
              Admin Login
            </h1>
            <p
              className="font-body text-sm"
              style={{ color: "oklch(0.75 0.025 75)" }}
            >
              Eternal Solutions LLC — Staff Portal
            </p>
          </div>
          <Button
            onClick={login}
            disabled={isLoggingIn}
            className="w-full btn-plum text-white font-body font-medium border-0 py-2.5 h-auto"
            data-ocid="admin.primary_button"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login with Internet Identity"
            )}
          </Button>
          <p
            className="font-body text-xs text-center mt-4"
            style={{ color: "oklch(0.60 0.02 75)" }}
          >
            For authorized staff only
          </p>
        </div>
      </div>
    );
  }

  if (isAuthenticated && adminLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "oklch(0.27 0.06 252)" }}
      >
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-white mx-auto mb-3" />
          <p className="font-body text-white/60 text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated && !adminLoading && !isAdmin) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundColor: "oklch(0.27 0.06 252)" }}
      >
        <div
          className="w-full max-w-sm rounded-2xl p-8 text-center shadow-card-lg"
          style={{ backgroundColor: "oklch(0.32 0.05 265)" }}
        >
          <h1 className="font-display text-xl font-semibold text-white mb-2">
            Access Denied
          </h1>
          <p
            className="font-body text-sm mb-6"
            style={{ color: "oklch(0.72 0.025 75)" }}
          >
            You don't have permission to access this dashboard.
          </p>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full font-body border-white/20 text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    );
  }

  // Admin dashboard
  const totalCount = submissions?.length || 0;
  const pendingCount =
    submissions?.filter((s) => s.status === "Pending").length || 0;
  const qualifiedCount =
    submissions?.filter((s) => s.status === "Qualified").length || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          backgroundColor: "oklch(0.27 0.06 252)",
          borderColor: "oklch(0.35 0.05 265)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-plum/60 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="font-display text-white text-sm font-semibold leading-none">
                Intake Submissions Dashboard
              </h1>
              <p
                className="font-body text-xs"
                style={{ color: "oklch(0.65 0.025 75)" }}
              >
                Eternal Solutions LLC
              </p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            size="sm"
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10 font-body"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Total Submissions",
              value: totalCount,
              color: "oklch(0.27 0.06 252)",
            },
            {
              label: "Pending Review",
              value: pendingCount,
              color: "oklch(0.72 0.18 75)",
            },
            {
              label: "Qualified",
              value: qualifiedCount,
              color: "oklch(0.52 0.15 150)",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-5 bg-white shadow-card border border-border"
            >
              <p className="font-body text-xs text-muted-foreground mb-1">
                {stat.label}
              </p>
              <p
                className="font-display text-3xl font-semibold"
                style={{ color: stat.color }}
              >
                {submissionsLoading ? "—" : stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-card border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2
              className="font-display text-lg font-semibold"
              style={{ color: "oklch(0.27 0.06 252)" }}
            >
              All Submissions
            </h2>
          </div>

          {submissionsLoading ? (
            <div className="p-6 space-y-3">
              {["sk1", "sk2", "sk3", "sk4", "sk5"].map((k) => (
                <Skeleton key={k} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          ) : !submissions || submissions.length === 0 ? (
            <div className="py-16 text-center" data-ocid="admin.empty_state">
              <p className="font-body text-muted-foreground text-sm">
                No submissions yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table data-ocid="admin.table">
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-body text-xs w-10">#</TableHead>
                    <TableHead className="font-body text-xs">Name</TableHead>
                    <TableHead className="font-body text-xs">Email</TableHead>
                    <TableHead className="font-body text-xs">Cause</TableHead>
                    <TableHead className="font-body text-xs">
                      Date of Loss
                    </TableHead>
                    <TableHead className="font-body text-xs">Status</TableHead>
                    <TableHead className="font-body text-xs">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((sub, index) => (
                    <TableRow
                      key={sub.id.toString()}
                      data-ocid={`admin.row.${index + 1}`}
                    >
                      <TableCell className="font-body text-xs text-muted-foreground">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-body text-sm font-medium">
                        {sub.fullName}
                      </TableCell>
                      <TableCell className="font-body text-sm text-muted-foreground">
                        {sub.email}
                      </TableCell>
                      <TableCell className="font-body text-sm">
                        {sub.causeOfLoss}
                      </TableCell>
                      <TableCell className="font-body text-sm">
                        {sub.dateOfLoss}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={sub.status} />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedSubmission(sub)}
                          className="font-body text-xs h-7 px-2.5"
                          data-ocid={`admin.view_button.${index + 1}`}
                        >
                          <Eye className="w-3 h-3 mr-1.5" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>

      {/* Detail sheet */}
      <Sheet
        open={!!selectedSubmission}
        onOpenChange={(open) => {
          if (!open) setSelectedSubmission(null);
        }}
      >
        <SheetContent
          className="w-full sm:max-w-lg overflow-y-auto"
          data-ocid="admin.sheet"
        >
          <SheetHeader className="mb-6">
            <SheetTitle
              className="font-display text-lg"
              style={{ color: "oklch(0.27 0.06 252)" }}
            >
              Submission Details
            </SheetTitle>
          </SheetHeader>
          {selectedSubmission && (
            <SubmissionDetail
              submission={selectedSubmission}
              onClose={() => setSelectedSubmission(null)}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
