export default function InfoItem({ icon, label, value }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center gap-2 mb-2 text-muted-foreground">
        {icon}
        <span className="text-xs">{label}</span>
      </div>

      <p className="font-medium wrap-break-word">{value || "-"}</p>
    </div>
  );
}
