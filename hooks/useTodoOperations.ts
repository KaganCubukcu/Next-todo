import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';

export const useTodoOperations = () => {
  const supabase = createClient();

  const addTodo = async (task: string, userId: string) => {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ task, user_id: userId, is_complete: false }])
      .select()
      .single();

    if (error) {
      toast.error('Failed to add todo');
      throw error;
    }

    toast.success('Todo added successfully');
    return data;
  };

  const updateTodo = async (id: number, updates: { task?: string; is_complete?: boolean }) => {
    const { data, error } = await supabase
      .from('todos')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      toast.error('Failed to update todo');
      throw error;
    }

    toast.success('Todo updated successfully');
    return data;
  };

  const deleteTodo = async (id: number) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete todo');
      throw error;
    }

    toast.success('Todo deleted successfully');
  };

  return {
    addTodo,
    updateTodo,
    deleteTodo,
  };
};
