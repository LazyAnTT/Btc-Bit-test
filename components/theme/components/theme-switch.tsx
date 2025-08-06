"use client";

import { FC } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import clsx from "clsx";

import { SunFilledIcon } from "@/components/theme/icons";
import { MoonFilledIcon } from "@/components/theme/icons";
import { useThemeSwitch } from "@/components/theme/hooks/use-theme-switch";

type Props = {
  className?: string;
};

export const ThemeSwitch: FC<Props> = ({ className }) => {
  const {
    Component,
    getBaseProps,
    getInputProps,
    getWrapperProps,
    slots,
    isSelected,
  } = useThemeSwitch();

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>

      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            "w-auto h-auto bg-transparent rounded-lg flex items-center justify-center !text-default-500 pt-px px-0 mx-0",
          ),
        })}
      >
        {isSelected ? (
          <MoonFilledIcon size={22} />
        ) : (
          <SunFilledIcon size={22} />
        )}
      </div>
    </Component>
  );
};
