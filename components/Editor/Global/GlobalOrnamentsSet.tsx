"use client";
import React, { useEffect } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useSortable, SortableContext, arrayMove } from "@dnd-kit/sortable";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import AddSelect from "../Add/AddSelect";
import { RelicSetOption } from "@/types/EditorPage";

interface GlobalOrnamentsSetProps {
  addOrnamentsSet: (isRecommended: boolean) => void;
  ornamentsSetSetup: RelicSetOption[];
  handleOrnamentsSetChange: (
    option: any,
    index: number,
    isRecommended: boolean
  ) => void;
  deleteOrnamentsSet: (index: number, isRecommended: boolean) => void;
  isrecommended: boolean;
  addButtonText: string;
  setOrnamentsSetSetup: React.Dispatch<React.SetStateAction<RelicSetOption[]>>;
  updateData: () => void; // Pour mettre à jour les données
}

const DraggableItem: React.FC<{
  id: string;
  index: number;
  ornament: RelicSetOption;
  onDelete: (index: number, isRecommended: boolean) => void;
  onChange: (option: any, index: number, isRecommended: boolean) => void;
  isRecommended: boolean;
}> = ({ id, index, ornament, onDelete, onChange, isRecommended }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <div
      className="flex gap-3 border border-gray px-3 rounded-lg"
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div className="absolute h-12 w-12" {...listeners} />
      <AddSelect
        type="ormanentSet"
        value={ornament}
        onChange={(option) => onChange(option, index, isRecommended)}
        index={index}
        className="w-64"
      />
      <button onClick={() => onDelete(index, isRecommended)}>
        <TrashIcon className="h-8 w-8 p-2 rounded-full bg-red" />
      </button>
    </div>
  );
};

const GlobalOrnamentsSet: React.FC<GlobalOrnamentsSetProps> = ({
  addOrnamentsSet,
  ornamentsSetSetup,
  handleOrnamentsSetChange,
  deleteOrnamentsSet,
  isrecommended,
  addButtonText,
  setOrnamentsSetSetup,
  updateData,
}) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setOrnamentsSetSetup((items: RelicSetOption[]) => {
        const oldIndex = items.findIndex((item) => item.uid === active.id);
        const newIndex = items.findIndex((item) => item.uid === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  useEffect(() => {
    updateData();
  }, [ornamentsSetSetup]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col">
        <button
          className="flex items-center ml-auto mr-5 r-5 h-8 p-4 bg-green rounded-full text-black font-bold"
          onClick={() => addOrnamentsSet(isrecommended)}
        >
          <span>{addButtonText}</span>
          <PlusIcon className="h-6 mt-1" />
        </button>
        <SortableContext
          items={ornamentsSetSetup.map((ornament) => ornament.uid as string)}
        >
          <div className="flex flex-wrap justify-center gap-y-5 gap-x-16 mt-5">
            {ornamentsSetSetup.map(
              (ornament, index) =>
                ornament.recommended === isrecommended && (
                  <div key={ornament.uid as string}>
                    <DraggableItem
                      id={ornament.uid as string}
                      index={index}
                      ornament={ornament}
                      onDelete={deleteOrnamentsSet}
                      onChange={handleOrnamentsSetChange}
                      isRecommended={isrecommended}
                    />
                  </div>
                )
            )}
          </div>
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default GlobalOrnamentsSet;
