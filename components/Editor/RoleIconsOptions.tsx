"use client";

import { useState } from "react";
import { CDN2 } from "@/utils/cdn";

type Role = {
  value: string;
  icon: string;
};

type RoleIconsOptionsProps = {
  value: string;
  onChange: (value: string) => void;
};

const roles: Role[] = [
  {
    value: "assassin-pocket",
    icon: "assassin-pocket.png",
  },
  {
    value: "healing-shield",
    icon: "healing-shield.png",
  },
  {
    value: "pointy-sword",
    icon: "pointy-sword.png",
  },
  {
    value: "sparkles",
    icon: "sparkles.png",
  },
];

export const RoleIconsOptions = ({
  value,
  onChange,
}: RoleIconsOptionsProps) => {
  const [open, setOpen] = useState(false);

  const selected = roles.find((role) => role.value === value) ?? roles[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-md border bg-background"
      >
        <img
          src={`${CDN2}/img/roles/${selected.icon}`}
          width={48}
          height={48}
          alt=""
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 flex flex-col rounded-md border bg-background p-1">
          {roles.map((role) => (
            <button
              key={role.value}
              type="button"
              onClick={() => {
                onChange(role.value);
                setOpen(false);
              }}
              className="flex h-12 w-12 items-center justify-center rounded-md hover:bg-white/10"
            >
              <img
                src={`${CDN2}/img/roles/${role.icon}`}
                width={48}
                height={48}
                alt=""
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
