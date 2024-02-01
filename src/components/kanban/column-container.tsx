import { Column, Id, Task } from "@/types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import TaskCard from "./task-card";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;

  createTask: (columnId: Id) => void;
  updateTask: (id: Id, content: string) => void;
  deleteTask: (id: Id) => void;
  tasks: Task[];
}

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}: Props) {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
          dark:bg-[#161C22]          
          opacity-40
          border-2
          border-pink-500
          w-[350px]
          h-[500px]
          max-h-[500px]
          rounded-md
          flex
          flex-col
        "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
        dark:bg-[#161C22]
        bg-secondary
        w-[350px]
        shadow-sm
        h-[500px]
        max-h-[500px]
        rounded-md
        flex
        flex-col
      "
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="
          dark:bg-[#0D1117]
          bg-secondary
          shadow-sm
          text-md          
          cursor-grab
          rounded-md
          rounded-b-none
          px-3
          py-1
          font-bold
          dark:border-[#161C22]
          border-1
          flex
          items-center
          justify-between
        "
      >
        <div className="flex gap-2">
          {!editMode && column.title}
          {editMode && (
            <Input
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="stroke-gray-500 hover:stroke-white dark:hover:bg-[#161C22] rounded px-1 py-2"
        >
          <Trash2Icon />
        </button>
      </div>

      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      {/* Column footer */}
      <button
        className="flex gap-2 items-center dark:border-[#161C22] border-2 rounded-md p-4 dark:border-x-[#161C22] dark:hover:bg-[#0D1117] hover:text-rose-500 dark:active:bg-black active:bg-white"
        onClick={() => {
          createTask(column.id);
        }}
      >
        <PlusCircleIcon />
        Add task
      </button>
    </div>
  );
}

export default ColumnContainer;
