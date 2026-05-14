export function formatMoney(amount) {
  return 'Rs. ' + Number(amount || 0).toLocaleString('en-IN');
}

export function critColor(score) {
  if (score >= 75) return '#E24B4A';
  if (score >= 50) return '#EF9F27';
  return '#1D9E75';
}

export function badgeClass(status) {
  const map = {
    Active: 'badge-active',
    Draft: 'badge-draft',
    PendingReview: 'badge-pending',
    Funded: 'badge-funded',
    Closed: 'badge-closed',
    Rejected: 'badge-rejected',
  };
  return map[status] || 'badge-draft';
}

export const ALL_STATUSES = [
  'Draft',
  'PendingReview',
  'Active',
  'Funded',
  'Closed',
  'Rejected',
];