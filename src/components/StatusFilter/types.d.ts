export interface StatusFiltersProps {
  statusFilter: StatusFilter;
  onChange: (status: keyof StatusFilter) => void;
}
