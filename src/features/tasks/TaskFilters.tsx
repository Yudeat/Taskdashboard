'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setSearch, setStatusFilter, setPriorityFilter, setSortOrder } from '@/features/ui/uiSlice';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function TaskFilters() {
  const dispatch = useDispatch();
  const { searchQuery, statusFilter, priorityFilter, sortOrder } = useSelector((state: RootState) => state.ui);

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <Input
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="max-w-xs"
      />
      <Select value={statusFilter} onValueChange={(v) => dispatch(setStatusFilter(v as typeof statusFilter))}>
        <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
      <Select value={priorityFilter} onValueChange={(v) => dispatch(setPriorityFilter(v as typeof priorityFilter))}>
        <SelectTrigger className="w-36"><SelectValue placeholder="Priority" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
      <Select value={sortOrder} onValueChange={(v) => dispatch(setSortOrder(v as typeof sortOrder))}>
        <SelectTrigger className="w-36"><SelectValue placeholder="Sort" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Due Date ↑</SelectItem>
          <SelectItem value="desc">Due Date ↓</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
