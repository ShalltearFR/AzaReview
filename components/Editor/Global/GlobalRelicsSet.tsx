"use client";
import React, { useEffect } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useSortable, SortableContext, arrayMove } from "@dnd-kit/sortable";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import AddSelect from "../Add/AddSelect";
import type {
  Option,
  LightConeOption,
  RelicSetOption,
  MainStatsOption,
  recommendedStatsOption,
} from "@/types/EditorPage";

interface GlobalRelicsSetProps {
  addRelicSet: any;
  relicsSetSetup: RelicSetOption[];
  handleRelicsSetChange: (
    option: any,
    index: number,
    isRecommended: boolean
  ) => void;
  handleRelicsNumChange: (
    num: number,
    index: number,
    isRecommended: boolean
  ) => void;
  deleteRelicsSet: (index: number, isRecommended: boolean) => void;
  isrecommended: boolean;
  addButtonText: string;
  setRelicsSetSetup: React.Dispatch<React.SetStateAction<RelicSetOption[]>>; // Pour mettre à jour le state
  updateData: () => void; // Pour mettre à jour les données
}

const DraggableItem: React.FC<{
  id: string;
  index: number;
  relic: RelicSetOption;
  onDelete: (index: number, isRecommended: boolean) => void;
  onChange: (option: any, index: number, isRecommended: boolean) => void;
  onNumChange: (num: number, index: number, isRecommended: boolean) => void;
  isRecommended: boolean;
}> = ({ id, index, relic, onDelete, onChange, onNumChange, isRecommended }) => {
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
        type="relicSet"
        value={relic}
        onChange={(option) => onChange(option, index, isRecommended)}
        index={index}
        className="w-64"
      />
      <AddSelect
        type="num"
        value={{
          value: `${relic.num}` || "2",
          label: `${relic.num || "2"} P`,
          id: "2",
        }}
        onChange={(option) =>
          onNumChange(Number(option?.value), index, isRecommended)
        }
        index={index}
        className="w-32"
      />
      <button onClick={() => onDelete(index, isRecommended)}>
        <TrashIcon className="h-8 w-8 p-2 rounded-full bg-red" />
      </button>
    </div>
  );
};

const GlobalRelicsSet: React.FC<GlobalRelicsSetProps> = ({
  addRelicSet,
  relicsSetSetup,
  handleRelicsSetChange,
  handleRelicsNumChange,
  deleteRelicsSet,
  isrecommended,
  addButtonText,
  setRelicsSetSetup,
  updateData,
}) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setRelicsSetSetup((items: RelicSetOption[]) => {
        const oldIndex = items.findIndex((item) => item.uid === active.id);
        const newIndex = items.findIndex((item) => item.uid === over.id);
        const newData = arrayMove(items, oldIndex, newIndex);
        return newData;
      });
    }
  };

  useEffect(() => {
    updateData();
  }, [relicsSetSetup]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col">
        <button
          className="flex items-center ml-auto mr-5 r-5 h-8 p-4 bg-green rounded-full text-black font-bold"
          onClick={() => addRelicSet(isrecommended)}
        >
          <span>{addButtonText}</span>
          <PlusIcon className="h-6 mt-1" />
        </button>
        <SortableContext
          items={relicsSetSetup.map((relic) => relic.uid as string)}
        >
          <div className="flex flex-wrap justify-center gap-y-5 gap-x-16 mt-5">
            {relicsSetSetup.map(
              (relic, index) =>
                relic.recommended === isrecommended && (
                  <div key={relic.uid as string}>
                    <DraggableItem
                      id={relic.uid as string}
                      index={index}
                      relic={relic}
                      onDelete={deleteRelicsSet}
                      onChange={handleRelicsSetChange}
                      onNumChange={handleRelicsNumChange}
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

export default GlobalRelicsSet;
