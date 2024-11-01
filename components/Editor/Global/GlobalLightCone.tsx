"use client";
import React, { useEffect } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useSortable, SortableContext, arrayMove } from "@dnd-kit/sortable";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import AddSelect from "../Add/AddSelect";
import { LightConeOption } from "@/types/EditorPage";

interface GlobalLightConeProps {
  addLightCone: any;
  lightConesSetup: LightConeOption[];
  handleChange: (option: any, index: number, isRecommended: boolean) => void;
  deleteLightCone: (index: number, isRecommended: boolean) => void;
  isRecommended: boolean;
  addButtonText: string;
  setLightConesSetup: React.Dispatch<React.SetStateAction<LightConeOption[]>>;
  updateData: () => void;
}

const DraggableItem: React.FC<{
  id: string;
  index: number;
  cone: LightConeOption;
  onDelete: (index: number, isRecommended: boolean) => void;
  onChange: (option: any, index: number, isRecommended: boolean) => void;
  isRecommended: boolean;
}> = ({ id, index, cone, onDelete, onChange, isRecommended }) => {
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
      className="relative flex gap-3 border border-gray px-3 rounded-lg"
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div className="absolute h-12 w-12" {...listeners} />
      <AddSelect
        type="lightCone"
        value={cone}
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

const GlobalLightCone: React.FC<GlobalLightConeProps> = ({
  addLightCone,
  lightConesSetup,
  handleChange,
  deleteLightCone,
  isRecommended,
  addButtonText,
  setLightConesSetup,
  updateData,
}) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setLightConesSetup((items: LightConeOption[]) => {
        const oldIndex = items.findIndex(
          (item: LightConeOption) => item.uid === active.id
        );
        const newIndex = items.findIndex(
          (item: LightConeOption) => item.uid === over.id
        );
        const newData = arrayMove(items, oldIndex, newIndex);
        return newData;
      });
    }
  };

  useEffect(() => {
    updateData();
  }, [lightConesSetup]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col">
        <button
          className="flex items-center ml-auto mr-5 r-5 h-8 p-4 bg-green rounded-full text-black font-bold"
          onClick={() => addLightCone(isRecommended)}
        >
          <span>{addButtonText}</span>
          <PlusIcon className="h-6 mt-1" />
        </button>
        <SortableContext
          items={lightConesSetup.map((cone) => cone.uid as string)}
        >
          <div className="flex flex-wrap justify-center gap-y-5 gap-x-16 mt-5">
            {lightConesSetup.map(
              (cone, index) =>
                cone.recommended === isRecommended && (
                  <div key={cone.uid as string}>
                    <DraggableItem
                      id={cone.uid as string}
                      index={index}
                      cone={cone}
                      onDelete={deleteLightCone}
                      onChange={handleChange}
                      isRecommended={isRecommended}
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

export default GlobalLightCone;
